// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'fyn';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor på Fyn?";
export const regionName = "Fyn";
export const regionPrep = "i Fyn"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Fyns byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Fyns kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "fyn";
export const storageKey = "fynName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#0b1a4a', bg2: '#2a3f9e', // baggrundsforløb (nederst/øverst)
  bar1: '#16296e', bar2: '#0b1a4a', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#dfe6ff',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'odense', name: 'Odense', kode: '0461' },
  { id: 'assens', name: 'Assens', kode: '0420' },
  { id: 'faaborg', name: 'Faaborg-Midtfyn', kode: '0430' },
  { id: 'kerteminde', name: 'Kerteminde', kode: '0440' },
  { id: 'langeland', name: 'Langeland', kode: '0482' },
  { id: 'middelfart', name: 'Middelfart', kode: '0410' },
  { id: 'nordfyns', name: 'Nordfyns', kode: '0480' },
  { id: 'nyborg', name: 'Nyborg', kode: '0450' },
  { id: 'svendborg', name: 'Svendborg', kode: '0479' },
  { id: 'aeroe', name: 'Ærø', kode: '0492' },
];
