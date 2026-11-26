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
60 sek. pr. spørgsmål · 10 liv · forkert svar/tidsudløb = −1 liv og nulstiller stimen · én rigtig by fra hver kommune · samlet timer · finalkoordinat vises først ved sejr · scoreboard (navn, tid, liv, dato, klokkeslæt) · statistik (spillere, vindere, gennemførelsesprocent). Tid og liv kan ændres pr. landsdel i `config.js`; kør derefter `node tools/build-rules.mjs` og udgiv `firestore.rules` igen.

## Opsætning af Hvor i Nordjylland?
1. Ret `finalCoordinate` i `regions/nordjylland/secret/spil.json` (nu en pladsholder).
2. `node tools/build-game.mjs nordjylland` (efter ændringer i byer/koordinat) og evt. `node tools/build-map.mjs nordjylland`.
3. `node tools/build-rules.mjs`, og indsæt `firestore.rules` i Firebase → Firestore → Rules → Publish. Filen indeholder de gamle spils regler uændret. Nordjylland bruger egne samlinger `nj_scores` og `nj_stats`.
4. GitHub Pages: upload alt undtagen `secret/` (gitignored); slå Pages til (`main` / root). Spillet ligger på `/regions/nordjylland/`.

## Skift finalkoordinat uden værktøjer
Åbn `koordinat.html` (fx https://geounderscoremiki.github.io/BYQUIZZEN/koordinat.html), vælg landsdel, skriv koordinatet, download den nye `gamedata.js` og upload den til `regions/<landsdel>/`. Krypteringen sker i browseren, og byer og svar-hashes bevares.

## Ny landsdel
```
node tools/new-region.mjs vestsjaelland "Hvor i Vestsjælland?" "Vestsjælland" vsj
```
Udfyld derefter `municipalities` i `config.js` (id, navn, DAGI-kommunekode), `byer.json` og `secret/spil.json`, evt. tema/billeder (`images.cover`, `images.background`), og kør `build-map`, `build-game` og `build-rules`. Hver landsdel har egen finalkoordinat og egne Firebase-samlinger (`<prefix>_scores`/`_stats`); `build-rules` afviser dublerede præfikser.

## Test lokalt
`python3 -m http.server 8000` → http://localhost:8000/regions/nordjylland/

## Bemærk
Der er ingen server, så en erfaren programmør kan i teorien læse sig til koordinatet. Det stopper almindelig snyd, men er ikke 100 % sikkert.

## Cirka-områder (tidligere kommuner)
Hvor en landsdel kun har få kommuner (Bornholm, Djursland), kan den deles i cirka-områder: i `config.js` angives `koder` (de officielle kommuner) og `seeds: [længde, bredde]` pr. område. Kortet tegnes ud fra nærmeste frøpunkt. Kør `npm install` én gang, før `tools/build-map.mjs` bruges til sådanne områder. `bbox` kan fjerne fjerntliggende øer (fx Anholt).
