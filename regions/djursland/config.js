// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'djursland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor på Djursland?";
export const regionName = "Djursland";
export const regionPrep = "i Djursland"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Djurslands byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Djurslands kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "dju";
export const storageKey = "djuName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#2b1f06', bg2: '#a9781b', // baggrundsforløb (nederst/øverst)
  bar1: '#7d5a12', bar2: '#2b1f06', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#fff0cc',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
// Områderne er cirka-områder (tidligere kommuner) tegnet ud fra nærmeste frøpunkt `seeds` [længde, bredde] inden for de officielle kommuner `koder`.
export const municipalities = [
  { id: 'grenaa', name: 'Grenaa', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.9, 56.41] },
  { id: 'noerre-djurs', name: 'Nørre Djurs', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.78, 56.5] },
  { id: 'rougsoe', name: 'Rougsø', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.35, 56.49] },
  { id: 'soenderhald', name: 'Sønderhald', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.5, 56.42] },
  { id: 'ebeltoft', name: 'Ebeltoft', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.68, 56.2] },
  { id: 'midtdjurs', name: 'Midtdjurs', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.62, 56.35] },
  { id: 'rosenholm', name: 'Rosenholm', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.33, 56.31] },
  { id: 'roende', name: 'Rønde', koder: ['0707', '0706'], bbox: [9.5, 56.0, 11.2, 56.8], seeds: [10.48, 56.29] },
];
