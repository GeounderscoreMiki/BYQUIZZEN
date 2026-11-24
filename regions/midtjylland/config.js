// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'midtjylland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor i Midtjylland?";
export const regionName = "Midtjylland";
export const regionPrep = "i Midtjylland"; // bruges i sætninger: "tilfældig by i Midtjylland"
export const tagline = "Kender du Midtjyllands byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Midtjyllands kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "mj";
export const storageKey = "mjName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#12301a', bg2: '#2f7a3f', // baggrundsforløb (nederst/øverst)
  bar1: '#256333', bar2: '#12301a', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#e3f5c8',
};
export const images = {
  cover: null, // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'aarhus', name: 'Aarhus', kode: '0751' },
  { id: 'favrskov', name: 'Favrskov', kode: '0710' },
  { id: 'hedensted', name: 'Hedensted', kode: '0766' },
  { id: 'herning', name: 'Herning', kode: '0657' },
  { id: 'holstebro', name: 'Holstebro', kode: '0661' },
  { id: 'horsens', name: 'Horsens', kode: '0615' },
  { id: 'ikast', name: 'Ikast-Brande', kode: '0756' },
  { id: 'lemvig', name: 'Lemvig', kode: '0665' },
  { id: 'norddjurs', name: 'Norddjurs', kode: '0707' },
  { id: 'odder', name: 'Odder', kode: '0727' },
  { id: 'randers', name: 'Randers', kode: '0730' },
  { id: 'ringkoebing', name: 'Ringkøbing-Skjern', kode: '0760' },
  { id: 'samsoe', name: 'Samsø', kode: '0741' },
  { id: 'silkeborg', name: 'Silkeborg', kode: '0740' },
  { id: 'skanderborg', name: 'Skanderborg', kode: '0746' },
  { id: 'skive', name: 'Skive', kode: '0779' },
  { id: 'struer', name: 'Struer', kode: '0671' },
  { id: 'syddjurs', name: 'Syddjurs', kode: '0706' },
  { id: 'viborg', name: 'Viborg', kode: '0791' },
];
