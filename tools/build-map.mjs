// Brug:  node tools/build-map.mjs <landsdel>
// Læser kommunekoderne i regions/<landsdel>/config.js og laver regions/<landsdel>/mapdata.js
// ud fra DAGI-kommunegrænserne i data/kommuner.geojson (ok-dk/dagi).
import { readFileSync, writeFileSync } from 'node:fs';

const slug = process.argv[2];
if (!slug) { console.error('Brug: node tools/build-map.mjs <landsdel>'); process.exit(1); }

const root = new URL('../', import.meta.url);
const { municipalities } = await import(new URL(`regions/${slug}/config.js`, root));
const geo = JSON.parse(readFileSync(new URL('data/kommuner.geojson', root), 'utf8'));

const WIDTH = 1000;
const TOLERANCE = 0.35; // Douglas-Peucker i kortpunkter
const MIN_AREA = 3; // små skær og holme fjernes
const PALETTE = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6',
  '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#aaffc3', '#808000'];

// Samler polygoner pr. kommune (DAGI har én feature pr. polygon-del).
const polys = Object.fromEntries(municipalities.map((m) => [m.kode, []]));
for (const f of geo.features) {
  const code = f.properties.KOMKODE;
  if (!polys[code]) continue;
  const parts = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  polys[code].push(...parts);
}
for (const m of municipalities) {
  if (!polys[m.kode].length) throw new Error(`Kommunekode ${m.kode} (${m.name}) findes ikke i DAGI-data`);
}

// Fælles projektion (equirektangulær med cos(bredde)), så alle kommuner passer sammen.
let lng0 = Infinity, lng1 = -Infinity, lat0 = Infinity, lat1 = -Infinity;
for (const list of Object.values(polys)) for (const p of list) for (const [lng, lat] of p[0]) {
  lng0 = Math.min(lng0, lng); lng1 = Math.max(lng1, lng);
  lat0 = Math.min(lat0, lat); lat1 = Math.max(lat1, lat);
}
const cos = Math.cos(((lat0 + lat1) / 2) * Math.PI / 180);
const scale = WIDTH / ((lng1 - lng0) * cos);
const height = (lat1 - lat0) * scale;
const project = ([lng, lat]) => [(lng - lng0) * cos * scale, (lat1 - lat) * scale];

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [fx, fy] = pts[0], last = pts[pts.length - 1];
  if (fx === last[0] && fy === last[1] && pts.length > 3) {
    // Lukket ring: del ved det fjerneste punkt, så grundlinjen ikke har længde 0.
    let far = 1;
    pts.forEach((p, i) => { if (Math.hypot(p[0] - fx, p[1] - fy) > Math.hypot(pts[far][0] - fx, pts[far][1] - fy)) far = i; });
    return [...simplify(pts.slice(0, far + 1), tol), ...simplify(pts.slice(far), tol).slice(1)];
  }
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
const fmt = (n) => n.toFixed(1);

function inside(pt, ring) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const distSeg = (p, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
};

// Placerer navnet i det punkt i den største del, der ligger længst fra kanten.
function labelPoint(rings) {
  const outer = rings[0];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  outer.forEach(([x, y]) => { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); });
  let best = { d: -1, p: outer[0] };
  const N = 40;
  for (let i = 1; i < N; i++) for (let j = 1; j < N; j++) {
    const p = [minX + ((maxX - minX) * i) / N, minY + ((maxY - minY) * j) / N];
    if (!inside(p, outer) || rings.slice(1).some((h) => inside(p, h))) continue;
    let d = Infinity;
    for (const ring of rings) for (let k = 0; k < ring.length; k++) d = Math.min(d, distSeg(p, ring[k], ring[(k + 1) % ring.length]));
    if (d > best.d) best = { d, p };
  }
  return best.p;
}

const regions = municipalities.map((m, i) => {
  const parts = polys[m.kode]
    .map((rings) => rings.map((r) => simplify(r.map(project), TOLERANCE)).filter((r) => r.length >= 4))
    .filter((rings) => rings.length && Math.abs(area(rings[0])) >= MIN_AREA);
  const d = parts.map((rings) => rings.map((r) => `M${r.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L')}Z`).join('')).join('');
  if (!parts.length) throw new Error(`${m.name}: ingen polygoner tilbage`);
  const biggest = parts.reduce((a, b) => (Math.abs(area(a[0])) >= Math.abs(area(b[0])) ? a : b));
  const [lx, ly] = labelPoint(biggest);
  return { id: m.id, c: m.color || PALETTE[i % PALETTE.length], d, lx: +lx.toFixed(1), ly: +ly.toFixed(1) };
});

const mapView = { width: WIDTH, height: +height.toFixed(1) };
const out = `// Genereret af tools/build-map.mjs (kommunegrænser: DAGI / ok-dk/dagi). Rediger ikke i hånden.
export const mapView = ${JSON.stringify(mapView)};
export const mapRegions = ${JSON.stringify(regions)};
`;
writeFileSync(new URL(`regions/${slug}/mapdata.js`, root), out);
console.log(`regions/${slug}/mapdata.js skrevet (${(out.length / 1024).toFixed(0)} kB, ${regions.length} kommuner)`);
