// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'nordsjaelland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor i Nordsjælland?";
export const regionName = "Nordsjælland";
export const regionPrep = "i Nordsjælland"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Nordsjællands byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Nordsjællands kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "nsj";
export const storageKey = "nsjName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#0a2f2a', bg2: '#1f8a7a', // baggrundsforløb (nederst/øverst)
  bar1: '#146b5e', bar2: '#0a2f2a', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#d4fff6',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'helsingoer', name: 'Helsingør', kode: '0217' },
  { id: 'fredensborg', name: 'Fredensborg', kode: '0210' },
  { id: 'hilleroed', name: 'Hillerød', kode: '0219' },
  { id: 'gribskov', name: 'Gribskov', kode: '0270' },
  { id: 'halsnaes', name: 'Halsnæs', kode: '0260' },
  { id: 'frederikssund', name: 'Frederikssund', kode: '0250' },
  { id: 'egedal', name: 'Egedal', kode: '0240' },
  { id: 'alleroed', name: 'Allerød', kode: '0201' },
  { id: 'rudersdal', name: 'Rudersdal', kode: '0230' },
  { id: 'hoersholm', name: 'Hørsholm', kode: '0223' },
  { id: 'furesoe', name: 'Furesø', kode: '0190' },
  { id: 'lyngby-taarbaek', name: 'Lyngby-Taarbæk', kode: '0173' },
  { id: 'gentofte', name: 'Gentofte', kode: '0157' },
];
