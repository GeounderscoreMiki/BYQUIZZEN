// Brug:  node tools/build-game.mjs <landsdel>
// Læser regions/<landsdel>/byer.json og secret/spil.json (finalCoordinate; uploades IKKE til GitHub) og skriver
// regions/<landsdel>/gamedata.js med bynavne, hash af svarene og en krypteret finalkoordinat.
import { readFileSync, writeFileSync } from 'node:fs';
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';

const slug = process.argv[2];
if (!slug) { console.error('Brug: node tools/build-game.mjs <landsdel>'); process.exit(1); }

const ITER = 150000;
const root = new URL('../', import.meta.url);
const { municipalities } = await import(new URL(`regions/${slug}/config.js`, root));
const byer = JSON.parse(readFileSync(new URL(`regions/${slug}/byer.json`, root), 'utf8'));
const spil = { ...byer, ...JSON.parse(readFileSync(new URL(`regions/${slug}/secret/spil.json`, root), 'utf8')) };

const ids = municipalities.map((m) => m.id);
const missing = ids.filter((id) => !spil.towns?.[id]?.length);
if (missing.length) throw new Error(`Mangler byer for: ${missing.join(', ')}`);
const unknown = Object.keys(spil.towns).filter((id) => !ids.includes(id));
if (unknown.length) throw new Error(`Ukendte kommune-id'er i spil.json: ${unknown.join(', ')}`);
if (!spil.finalCoordinate) throw new Error('finalCoordinate mangler i spil.json');

const seen = new Map();
for (const [id, towns] of Object.entries(spil.towns)) {
  for (const t of towns) {
    if (seen.has(t.toLowerCase())) throw new Error(`"${t}" står både under ${seen.get(t.toLowerCase())} og ${id}`);
    seen.set(t.toLowerCase(), id);
  }
}

const salt = randomBytes(16);
const b64 = (b) => Buffer.from(b).toString('base64');

// Gruppe i = kommune i; svaret er kommunens id. Kun hash af svaret gemmes.
const groups = ids.map((id, i) => ({
  towns: spil.towns[id],
  check: b64(pbkdf2Sync(`${i}:${id}`, salt, ITER, 32, 'sha256')),
}));

// Nøglen er alle kommune-id'er i sorteret rækkefølge, så rækkefølgen af svar er ligegyldig.
const key = pbkdf2Sync([...ids].sort().join('|'), salt, ITER, 32, 'sha256');
const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', key, iv);
const enc = Buffer.concat([cipher.update(spil.finalCoordinate, 'utf8'), cipher.final(), cipher.getAuthTag()]);

const out = `// Genereret af tools/build-game.mjs – rediger secret/spil.json og kør scriptet igen.
export const iterations = ${ITER};
export const salt = '${b64(salt)}';
export const groups = ${JSON.stringify(groups, null, 2)};
export const vault = { iv: '${b64(iv)}', data: '${b64(enc)}' };
`;
writeFileSync(new URL(`regions/${slug}/gamedata.js`, root), out);
console.log(`regions/${slug}/gamedata.js skrevet (${groups.length} kommuner, ${seen.size} byer)`);
