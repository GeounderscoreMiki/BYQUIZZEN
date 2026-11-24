// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'sjaelland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor på Sjælland?";
export const regionName = "Sjælland";
export const regionPrep = "i Sjælland"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Sjællands byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Sjællands kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "sjl";
export const storageKey = "sjlName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#24103f', bg2: '#5b2e91', // baggrundsforløb (nederst/øverst)
  bar1: '#43207a', bar2: '#24103f', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#eadcff',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'faxe', name: 'Faxe', kode: '0320' },
  { id: 'greve', name: 'Greve', kode: '0253' },
  { id: 'guldborgsund', name: 'Guldborgsund', kode: '0376' },
  { id: 'holbaek', name: 'Holbæk', kode: '0316' },
  { id: 'kalundborg', name: 'Kalundborg', kode: '0326' },
  { id: 'koege', name: 'Køge', kode: '0259' },
  { id: 'lejre', name: 'Lejre', kode: '0350' },
  { id: 'lolland', name: 'Lolland', kode: '0360' },
  { id: 'naestved', name: 'Næstved', kode: '0370' },
  { id: 'odsherred', name: 'Odsherred', kode: '0306' },
  { id: 'ringsted', name: 'Ringsted', kode: '0329' },
  { id: 'roskilde', name: 'Roskilde', kode: '0265' },
  { id: 'slagelse', name: 'Slagelse', kode: '0330' },
  { id: 'solroed', name: 'Solrød', kode: '0269' },
  { id: 'soroe', name: 'Sorø', kode: '0340' },
  { id: 'stevns', name: 'Stevns', kode: '0336' },
  { id: 'vordingborg', name: 'Vordingborg', kode: '0390' },
];
