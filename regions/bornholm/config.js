// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'bornholm';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor på Bornholm?";
export const regionName = "Bornholm";
export const regionPrep = "i Bornholm"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Bornholms byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Bornholms kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "bho";
export const storageKey = "bhoName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#2b0a0a', bg2: '#9b2323', // baggrundsforløb (nederst/øverst)
  bar1: '#7a1818', bar2: '#2b0a0a', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#ffdcdc',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
// Områderne er cirka-områder (tidligere kommuner) tegnet ud fra nærmeste frøpunkt `seeds` [længde, bredde] inden for de officielle kommuner `koder`.
export const municipalities = [
  { id: 'roenne', name: 'Rønne', koder: ['0400'], seeds: [14.7, 55.1] },
  { id: 'hasle', name: 'Hasle', koder: ['0400'], seeds: [14.73, 55.18] },
  { id: 'allinge-gudhjem', name: 'Allinge-Gudhjem', koder: ['0400'], seeds: [14.9, 55.24] },
  { id: 'aakirkeby', name: 'Aakirkeby', koder: ['0400'], seeds: [14.93, 55.07] },
  { id: 'nexoe', name: 'Nexø', koder: ['0400'], seeds: [15.1, 55.08] },
];
