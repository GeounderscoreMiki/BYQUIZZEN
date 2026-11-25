// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'vestsjaelland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor i Vestsjælland?";
export const regionName = "Vestsjælland";
export const regionPrep = "i Vestsjælland"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Vestsjællands byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Vestsjællands kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "vsj";
export const storageKey = "vsjName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#10283f', bg2: '#1f6a99', // baggrundsforløb (nederst/øverst)
  bar1: '#175a85', bar2: '#10283f', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#d9efff',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'kalundborg', name: 'Kalundborg', kode: '0326' },
  { id: 'holbaek', name: 'Holbæk', kode: '0316' },
  { id: 'odsherred', name: 'Odsherred', kode: '0306' },
  { id: 'slagelse', name: 'Slagelse', kode: '0330' },
  { id: 'soroe', name: 'Sorø', kode: '0340' },
  { id: 'ringsted', name: 'Ringsted', kode: '0329' },
];
