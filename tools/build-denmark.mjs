// Brug:  node tools/build-denmark.mjs
// Laver denmarkmap.js (klikbart Danmarkskort til forsiden) ud fra kommunekoderne i alle regions/*/config.js
// og DAGI-grænserne i data/kommuner.geojson. Hver kommune kobles til det spil, den indgår i.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const geo = JSON.parse(readFileSync(new URL('data/kommuner.geojson', root), 'utf8'));
const WIDTH = 1000, TOLERANCE = 0.5, MIN_AREA = 4;
// Overlap (fx Djursland i Midtjylland): det område, der står sidst, vinder på kortet.
const LAST = ['djursland'];
// Bornholm rykkes mod vest, så kortet ikke bliver unødigt bredt: [dx, dy] i kortpunkter.
const SHIFT = { bornholm: [-230, 0] };

const slugs = readdirSync(new URL('regions/', root)).filter((s) => !s.startsWith('.'));
slugs.sort((a, b) => LAST.includes(a) - LAST.includes(b));
const owner = {}, games = {};
for (const slug of slugs) {
  const c = await import(new URL(`regions/${slug}/config.js`, root));
  games[slug] = { slug, title: c.title, name: c.regionName, color: c.theme.bg2 };
  for (const m of c.municipalities) for (const k of m.koder || [m.kode]) owner[k] = slug;
}

const polys = {};
for (const f of geo.features) {
  const slug = owner[f.properties.KOMKODE];
  if (f.properties.KOMKODE === '0411') continue; // Christiansø er for lille til kortet
  if (!slug) throw new Error(`Kommune ${f.properties.KOMKODE} ${f.properties.KOMNAVN} er ikke med i noget spil`);
  const parts = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  (polys[slug] ||= []).push(...parts);
}
const missing = Object.keys(owner).filter((k) => !geo.features.some((f) => f.properties.KOMKODE === k));
if (missing.length) throw new Error(`Kommunekoder uden data: ${missing}`);

let lng0 = Infinity, lng1 = -Infinity, lat0 = Infinity, lat1 = -Infinity;
for (const list of Object.values(polys)) for (const p of list) for (const [lng, lat] of p[0]) {
  lng0 = Math.min(lng0, lng); lng1 = Math.max(lng1, lng); lat0 = Math.min(lat0, lat); lat1 = Math.max(lat1, lat);
}
const cos = Math.cos(((lat0 + lat1) / 2) * Math.PI / 180);
const scale = WIDTH / ((lng1 - lng0) * cos);
const height = (lat1 - lat0) * scale;
const project = ([lng, lat]) => [(lng - lng0) * cos * scale, (lat1 - lat) * scale];

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1e-9;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const area = (r) => r.reduce((s, p, i) => { const q = r[(i + 1) % r.length]; return s + (p[0] * q[1] - q[0] * p[1]); }, 0) / 2;

const out = slugs.map((slug) => {
  const parts = polys[slug]
    .map((rings) => rings.map((r) => {
      const p = r.map(project).map(([x, y]) => [x + (SHIFT[slug]?.[0] || 0), y + (SHIFT[slug]?.[1] || 0)]);
      // Lukkede ringe forenkles i to halvdele, så grundlinjen ikke har længde 0.
      const h = p.length >> 1;
      return [...simplify(p.slice(0, h + 1), TOLERANCE), ...simplify(p.slice(h), TOLERANCE).slice(1)];
    }).filter((r) => r.length >= 4))
    .filter((rings) => rings.length && Math.abs(area(rings[0])) >= MIN_AREA);
  const d = parts.map((rings) => rings.map((r) => `M${r.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`).join('')).join('');
  const big = parts.reduce((a, b) => (Math.abs(area(a[0])) >= Math.abs(area(b[0])) ? a : b))[0];
  const xs = big.map((p) => p[0]), ys = big.map((p) => p[1]);
  const lx = (Math.min(...xs) + Math.max(...xs)) / 2, ly = (Math.min(...ys) + Math.max(...ys)) / 2;
  return { ...games[slug], d, lx: +lx.toFixed(1), ly: +ly.toFixed(1) };
});

const maxX = Math.max(...out.flatMap((g) => [...g.d.matchAll(/[ML]([\d.]+) /g)].map((m) => +m[1])));
const file = `// Genereret af tools/build-denmark.mjs. Rediger ikke i hånden.
export const denmarkView = ${JSON.stringify({ width: Math.ceil(maxX + 10), height: +height.toFixed(1) })};
export const denmarkGames = ${JSON.stringify(out)};
`;
writeFileSync(new URL('denmarkmap.js', root), file);
console.log(`denmarkmap.js skrevet (${(file.length / 1024).toFixed(0)} kB, ${out.length} spil)`);
