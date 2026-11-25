// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'oestsjaelland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor i Østsjælland?";
export const regionName = "Østsjælland";
export const regionPrep = "i Østsjælland"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Østsjællands byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Østsjællands kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "osj";
export const storageKey = "osjName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#3f1030', bg2: '#99246f', // baggrundsforløb (nederst/øverst)
  bar1: '#7a1c58', bar2: '#3f1030', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#ffdcf0',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'roskilde', name: 'Roskilde', kode: '0265' },
  { id: 'lejre', name: 'Lejre', kode: '0350' },
  { id: 'koege', name: 'Køge', kode: '0259' },
  { id: 'greve', name: 'Greve', kode: '0253' },
  { id: 'solroed', name: 'Solrød', kode: '0269' },
];
