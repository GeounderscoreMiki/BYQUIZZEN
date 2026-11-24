// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'soenderjylland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor i Sønderjylland?";
export const regionName = "Sønderjylland";
export const regionPrep = "i Sønderjylland"; // bruges i sætninger: "tilfældig by i Sønderjylland"
export const tagline = "Kender du Sønderjyllands byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Sønderjyllands kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "sdj";
export const storageKey = "sdjName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#3a0a12', bg2: '#8a1c2b', // baggrundsforløb (nederst/øverst)
  bar1: '#6e1422', bar2: '#3a0a12', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#ffe3c8',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'aabenraa', name: 'Aabenraa', kode: '0580' },
  { id: 'billund', name: 'Billund', kode: '0530' },
  { id: 'esbjerg', name: 'Esbjerg', kode: '0561' },
  { id: 'fanoe', name: 'Fanø', kode: '0563' },
  { id: 'fredericia', name: 'Fredericia', kode: '0607' },
  { id: 'haderslev', name: 'Haderslev', kode: '0510' },
  { id: 'kolding', name: 'Kolding', kode: '0621' },
  { id: 'soenderborg', name: 'Sønderborg', kode: '0540' },
  { id: 'toender', name: 'Tønder', kode: '0550' },
  { id: 'varde', name: 'Varde', kode: '0573' },
  { id: 'vejen', name: 'Vejen', kode: '0575' },
  { id: 'vejle', name: 'Vejle', kode: '0630' },
];
