// Brug:  node tools/build-rules.mjs
// Genererer firestore.rules med scoreboard- og tællerregler for hver landsdel i regions/*/config.js.
// De ældre spils regler (Fynsspil og Hvor på Fyn?) er med uændret, så de ikke påvirkes, når reglerne udgives.
import { readdirSync, existsSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const prefixes = [];
for (const e of readdirSync(new URL('regions/', root), { withFileTypes: true })) {
  if (!e.isDirectory() || !existsSync(new URL(`regions/${e.name}/config.js`, root))) continue;
  const { collectionPrefix, title, maxLives } = await import(new URL(`regions/${e.name}/config.js`, root));
  prefixes.push({ prefix: collectionPrefix, title, dir: e.name, maxLives });
}
const dup = prefixes.find((p, i) => prefixes.findIndex((q) => q.prefix === p.prefix) !== i);
if (dup) throw new Error(`collectionPrefix "${dup.prefix}" bruges af flere landsdele`);

const block = (scores, stats, label, maxLives = 10, minSeconds = 20) => `
    // ---- ${label} ----
    // Scoreboard: alle kan læse og tilføje en score, men ikke ændre eller slette.
    match /${scores}/{id} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['name', 'seconds', 'lives', 'createdAt'])
        && request.resource.data.lives is int
        && request.resource.data.lives >= 1
        && request.resource.data.lives <= ${maxLives}
        && request.resource.data.name is string
        && request.resource.data.name.size() >= 1
        && request.resource.data.name.size() <= 20
        && request.resource.data.seconds is int
        && request.resource.data.seconds >= ${minSeconds}
        && request.resource.data.seconds <= 86400;
      allow update, delete: if false;
    }

    // Tæller: kan kun tælles op med 1 ad gangen (attempts = spillere, completed = vindere).
    match /${stats}/counters {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['attempts', 'completed'])
        && request.resource.data.get('attempts', 0) <= 1
        && request.resource.data.get('completed', 0) <= 1;
      allow update: if request.resource.data.keys().hasOnly(['attempts', 'completed'])
        && request.resource.data.get('attempts', 0) - resource.data.get('attempts', 0) in [0, 1]
        && request.resource.data.get('completed', 0) - resource.data.get('completed', 0) in [0, 1];
    }
`;

const out = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
${prefixes.map((p) => block(`${p.prefix}_scores`, `${p.prefix}_stats`, p.title, p.maxLives, 5)).join('')}${block('hpf_scores', 'hpf_stats', 'Hvor på Fyn? (eksisterende – uændret)')}${block('scores', 'stats', 'Fynsspil (eksisterende – uændret)')}  }
}
`;
writeFileSync(new URL('firestore.rules', root), out);
console.log(`firestore.rules skrevet (${prefixes.map((p) => p.prefix).join(', ')})`);
