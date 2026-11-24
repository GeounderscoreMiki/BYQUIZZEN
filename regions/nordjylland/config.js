// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'nordjylland';
export const kicker = 'Geo_Miki præsenterer';
export const title = 'Hvor i Nordjylland?';
export const regionName = 'Nordjylland';
export const regionPrep = 'i Nordjylland'; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = 'Kender du Nordjyllands byer og kommuner? Bevis det og find skatten. 🧭';
export const mapLabel = 'Kort over Nordjyllands kommuner';

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = 'nj';
export const storageKey = 'njName';

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#04222c', bg2: '#0e5a6b', // baggrundsforløb (nederst/øverst)
  bar1: '#0e4a5a', bar2: '#04222c', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#cdeff5',
};
export const images = {
  cover: null, // fx 'forside.png' i landsdelens mappe
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'aalborg', name: 'Aalborg', kode: '0851' },
  { id: 'broenderslev', name: 'Brønderslev', kode: '0810' },
  { id: 'frederikshavn', name: 'Frederikshavn', kode: '0813' },
  { id: 'hjoerring', name: 'Hjørring', kode: '0860' },
  { id: 'jammerbugt', name: 'Jammerbugt', kode: '0849' },
  { id: 'laesoe', name: 'Læsø', kode: '0825' },
  { id: 'mariagerfjord', name: 'Mariagerfjord', kode: '0846' },
  { id: 'morsoe', name: 'Morsø', kode: '0773' },
  { id: 'rebild', name: 'Rebild', kode: '0840' },
  { id: 'thisted', name: 'Thisted', kode: '0787' },
  { id: 'vesthimmerland', name: 'Vesthimmerland', kode: '0820' },
];
