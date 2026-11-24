// Brug:  node tools/new-region.mjs <slug> "<Titel>" "<Landsdel>" <prefix>
// Eksempel:  node tools/new-region.mjs sjaelland "Hvor på Sjælland?" "Sjælland" sj
// Opretter regions/<slug>/ med index.html, config.js og en tom bydatabase. Udfyld derefter
// kommuner i config.js, byer i byer.json og finalCoordinate i secret/spil.json, og kør:
//   node tools/build-map.mjs <slug> && node tools/build-game.mjs <slug> && node tools/build-rules.mjs
import { mkdirSync, copyFileSync, writeFileSync, existsSync, readFileSync } from 'node:fs';

const [slug, title, regionName, prefix] = process.argv.slice(2);
if (!slug || !title || !regionName || !prefix) {
  console.error('Brug: node tools/new-region.mjs <slug> "<Titel>" "<Landsdel>" <prefix>');
  process.exit(1);
}
const root = new URL('../', import.meta.url);
const dir = new URL(`regions/${slug}/`, root);
if (existsSync(dir)) { console.error(`regions/${slug} findes allerede – intet overskrevet.`); process.exit(1); }
mkdirSync(new URL('secret/', dir), { recursive: true });
copyFileSync(new URL('regions/nordjylland/index.html', root), new URL('index.html', dir));
copyFileSync(new URL('regions/nordjylland/secret/spil.example.json', root), new URL('secret/spil.example.json', dir));
writeFileSync(new URL('secret/spil.json', dir), '{\n  "finalCoordinate": "N 00° 00.000 E 000° 00.000"\n}\n');
writeFileSync(new URL('byer.json', dir), '{\n  "towns": {\n    "kommune-id": ["By 1", "By 2"]\n  }\n}\n');

const j = JSON.stringify;
const cfg = readFileSync(new URL('regions/nordjylland/config.js', root), 'utf8')
  .replace("slug = 'nordjylland'", `slug = ${j(slug).replace(/"/g, "'")}`)
  .replace("title = 'Hvor i Nordjylland?'", `title = ${j(title)}`)
  .replace("regionName = 'Nordjylland'", `regionName = ${j(regionName)}`)
  .replace("regionPrep = 'i Nordjylland'", `regionPrep = ${j('i ' + regionName)}`)
  .replace(/tagline = '.*?';/, `tagline = ${j(`Kender du ${regionName}s byer og kommuner? Bevis det og find skatten. 🧭`)};`)
  .replace(/mapLabel = '.*?';/, `mapLabel = ${j(`Kort over ${regionName}s kommuner`)};`)
  .replace("collectionPrefix = 'nj'", `collectionPrefix = ${j(prefix)}`)
  .replace("storageKey = 'njName'", `storageKey = ${j(prefix + 'Name')}`)
  .replace(/export const municipalities = \[[\s\S]*\];\s*$/, "export const municipalities = [\n  // { id: 'kommune-id', name: 'Kommunenavn', kode: '0000' }, // DAGI-kommunekode\n];\n");
writeFileSync(new URL('config.js', dir), cfg);
console.log(`regions/${slug}/ oprettet.`);
