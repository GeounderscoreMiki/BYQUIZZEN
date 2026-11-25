// Alt der er landsdelsspecifikt står i denne mappe. Kernen (core/) er fælles for alle landsdele.
// Firebase-nøglerne er ikke hemmelige – det er reglerne i firestore.rules, der beskytter databasen.
export const firebaseConfig = {
  apiKey: 'AIzaSyCtUQqA029yz0Xx27iSu0FE1IDbeR2Nsms',
  authDomain: 'fynsspil.firebaseapp.com',
  projectId: 'fynsspil',
  appId: '1:1021548556343:web:adc5b099009d10b5278fb2',
};

// Identitet og tekster
export const slug = 'sydsjaelland';
export const kicker = 'Geo_Miki præsenterer';
export const title = "Hvor i Sydsjælland, på Lolland og Falster?";
export const regionName = "Sydsjælland, Lolland og Falster";
export const regionPrep = "i Sydsjælland, Lolland og Falster"; // bruges i sætninger: "tilfældig by i Nordjylland"
export const tagline = "Kender du Sydsjælland, Lolland og Falsters byer og kommuner? Bevis det og find skatten. 🧭";
export const mapLabel = "Kort over Sydsjælland, Lolland og Falsters kommuner";

// Egne Firebase-samlinger pr. landsdel (<prefix>_scores og <prefix>_stats), så resultater aldrig blandes.
export const collectionPrefix = "ssj";
export const storageKey = "ssjName";

// Fælles spilleregler (kan overstyres pr. landsdel)
export const questionSeconds = 60;
export const maxLives = 10;

// Design
export const theme = {
  bg1: '#2a2a06', bg2: '#7a7a14', // baggrundsforløb (nederst/øverst)
  bar1: '#5c5c0e', bar2: '#2a2a06', // topbar
  accent: '#ffb627', accentDark: '#c77700', accentGlow: 'rgba(255,182,39,.4)',
  mapBg: '#cfe6f3',
  emblem: '#f7f7c8',
};
export const images = {
  cover: 'forside.png', // ligger i landsdelens mappe; mangler filen, vises logoet i stedet
  background: null, // fx 'baggrund.jpg' i landsdelens mappe
};

// Kommunerne: id, navn og DAGI-kommunekode (bruges af tools/build-map.mjs). Rækkefølgen er spørgsmålsgrupperne.
export const municipalities = [
  { id: 'naestved', name: 'Næstved', kode: '0370' },
  { id: 'vordingborg', name: 'Vordingborg', kode: '0390' },
  { id: 'faxe', name: 'Faxe', kode: '0320' },
  { id: 'stevns', name: 'Stevns', kode: '0336' },
  { id: 'lolland', name: 'Lolland', kode: '0360' },
  { id: 'guldborgsund', name: 'Guldborgsund', kode: '0376' },
];
