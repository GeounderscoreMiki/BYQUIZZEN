# Geo_Miki præsenterer: Byquizzen (skabelon til geocaching-spil i hele Danmark)

Én fælles spilmotor (`core/`) og én mappe pr. landsdel (`regions/<landsdel>/`). Det eksisterende spil *Hvor på Fyn?* er kun brugt som reference og er ikke ændret.

## Struktur
```
core/app.js, style.css      fælles spilmotor og design (tema styres af config.js)
regions/<landsdel>/
  index.html                identisk for alle landsdele
  config.js                 titel, kommuner (id, navn, DAGI-kode), tema, Firebase-præfiks, tid/liv
  byer.json                 bydatabase: kommune-id -> byer
  mapdata.js                GENERERET kort (node tools/build-map.mjs)
  gamedata.js               GENERERET hash af svar + krypteret koordinat (node tools/build-game.mjs)
  secret/spil.json          finalCoordinate – uploades IKKE (gitignored)
tools/                      build-map, build-game, build-rules, new-region
data/kommuner.geojson       DAGI-kommunegrænser (ok-dk/dagi)
```

## Regler (fælles)
60 sek. pr. spørgsmål · 10 liv · forkert svar/tidsudløb = −1 liv og nulstiller stimen · én rigtig by fra hver kommune · samlet timer · finalkoordinat vises først ved sejr · scoreboard (navn, tid, liv, dato, klokkeslæt) · statistik (spillere, vindere, gennemførelsesprocent). Tid og liv kan ændres pr. landsdel i `config.js` (Hovedstaden har 15 liv); kør derefter `node tools/build-rules.mjs` og udgiv `firestore.rules` igen.

## Opsætning af Hvor i Nordjylland?
1. Ret `finalCoordinate` i `regions/nordjylland/secret/spil.json` (nu en pladsholder).
2. `node tools/build-game.mjs nordjylland` (efter ændringer i byer/koordinat) og evt. `node tools/build-map.mjs nordjylland`.
3. `node tools/build-rules.mjs`, og indsæt `firestore.rules` i Firebase → Firestore → Rules → Publish. Filen indeholder de gamle spils regler uændret. Nordjylland bruger egne samlinger `nj_scores` og `nj_stats`.
4. GitHub Pages: upload alt undtagen `secret/` (gitignored); slå Pages til (`main` / root). Spillet ligger på `/regions/nordjylland/`.

## Ny landsdel
```
node tools/new-region.mjs sjaelland "Hvor på Sjælland?" "Sjælland" sj
```
Udfyld derefter `municipalities` i `config.js` (id, navn, DAGI-kommunekode), `byer.json` og `secret/spil.json`, evt. tema/billeder (`images.cover`, `images.background`), og kør `build-map`, `build-game` og `build-rules`. Hver landsdel har egen finalkoordinat og egne Firebase-samlinger (`<prefix>_scores`/`_stats`); `build-rules` afviser dublerede præfikser.

## Test lokalt
`python3 -m http.server 8000` → http://localhost:8000/regions/nordjylland/

## Bemærk
Der er ingen server, så en erfaren programmør kan i teorien læse sig til koordinatet. Det stopper almindelig snyd, men er ikke 100 % sikkert.
