// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'hovedstaden';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor i Hovedstaden?";
export const regionName = "Hovedstaden";
export const regionPrep = "i Hovedstaden"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Hovedstadens byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Hovedstadens kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "hov";
export const storageKey = "hovName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 15;

// Design
export const theme = {
  bg1: '#2b1606', bg2: '#8a4a12', // baggrundsforløb (nederst/øverst)
  bar1: '#6b3a0e', bar2: '#2b1606', // topbar
  accent: '#5ec8ff', accentDark: '#1a86b8', accentGlow: 'rgba(94,200,255,.4)',
  mapBg: '#cfe6f3',
  emblem: '#ffe9cf',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'albertslund', name: 'Albertslund', kode: '0165' },
  { id: 'alleroed', name: 'Allerød', kode: '0201' },
  { id: 'ballerup', name: 'Ballerup', kode: '0151' },
  { id: 'bornholm', name: 'Bornholm', kode: '0400' },
  { id: 'broendby', name: 'Brøndby', kode: '0153' },
  { id: 'dragoer', name: 'Dragør', kode: '0155' },
  { id: 'egedal', name: 'Egedal', kode: '0240' },
  { id: 'fredensborg', name: 'Fredensborg', kode: '0210' },
  { id: 'frederiksberg', name: 'Frederiksberg', kode: '0147' },
  { id: 'frederikssund', name: 'Frederikssund', kode: '0250' },
  { id: 'furesoe', name: 'Furesø', kode: '0190' },
  { id: 'gentofte', name: 'Gentofte', kode: '0157' },
  { id: 'gladsaxe', name: 'Gladsaxe', kode: '0159' },
  { id: 'glostrup', name: 'Glostrup', kode: '0161' },
  { id: 'gribskov', name: 'Gribskov', kode: '0270' },
  { id: 'halsnaes', name: 'Halsnæs', kode: '0260' },
  { id: 'helsingoer', name: 'Helsingør', kode: '0217' },
  { id: 'herlev', name: 'Herlev', kode: '0163' },
  { id: 'hilleroed', name: 'Hillerød', kode: '0219' },
  { id: 'hvidovre', name: 'Hvidovre', kode: '0167' },
  { id: 'hoeje-taastrup', name: 'Høje-Taastrup', kode: '0169' },
  { id: 'hoersholm', name: 'Hørsholm', kode: '0223' },
  { id: 'ishoej', name: 'Ishøj', kode: '0183' },
  { id: 'koebenhavn', name: 'København', kode: '0101' },
  { id: 'lyngby-taarbaek', name: 'Lyngby-Taarbæk', kode: '0173' },
  { id: 'rudersdal', name: 'Rudersdal', kode: '0230' },
  { id: 'roedovre', name: 'Rødovre', kode: '0175' },
  { id: 'taarnby', name: 'Tårnby', kode: '0185' },
  { id: 'vallensbaek', name: 'Vallensbæk', kode: '0187' },
];
