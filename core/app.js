// Fælles spilmotor til alle landsdelsspil. Alt landsdelsspecifikt hentes fra regions/<landsdel>/config.js
// (siden, der indlæser motoren, bestemmer hvilken landsdel der spilles).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore, doc, getDoc, setDoc, increment, addDoc, collection,
  query, orderBy, limit, getDocs, serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const base = (file) => new URL(file, document.baseURI).href;
const cfg = await import(base('config.js'));
const { mapView, mapRegions } = await import(base('mapdata.js'));
const { groups, vault, salt, iterations } = await import(base('gamedata.js'));
const {
  municipalities, firebaseConfig, questionSeconds, maxLives, collectionPrefix, storageKey, theme, images,
} = cfg;

const $ = (id) => document.getElementById(id);
const screens = ['start', 'game', 'lost', 'won', 'scores'];
const nameOf = Object.fromEntries(municipalities.map((m) => [m.id, m.name]));
const total = groups.length; // én korrekt by fra hver kommune
const scoresCol = `${collectionPrefix}_scores`;
const statsCol = `${collectionPrefix}_stats`;

// ---- Design og tekster fra konfigurationen ----
const root = document.documentElement.style;
Object.entries({
  '--bg1': theme.bg1, '--bg2': theme.bg2, '--bar1': theme.bar1, '--bar2': theme.bar2,
  '--accent': theme.accent, '--accent-dark': theme.accentDark, '--accent-glow': theme.accentGlow,
  '--map-bg': theme.mapBg, '--emblem': theme.emblem,
}).forEach(([k, v]) => v && root.setProperty(k, v));
if (images.background) {
  document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${base(images.background)})`;
  document.body.style.backgroundSize = 'cover';
}
document.title = cfg.title;
$('kicker').textContent = cfg.kicker;
$('title').textContent = cfg.title;
$('tagline').textContent = cfg.tagline;
$('map').setAttribute('aria-label', cfg.mapLabel);
$('emblem').querySelector('g').setAttribute('fill', theme.emblem);
if (images.cover) {
  const img = $('cover');
  img.src = base(images.cover);
  img.alt = `${cfg.kicker}: ${cfg.title}`;
  img.onerror = () => { $('hero').classList.add('noimg'); img.remove(); };
} else {
  $('hero').classList.add('noimg');
  $('cover').remove();
}
const sec = questionSeconds;
const secText = sec === 60 ? '1 minut' : `${sec} sekunder`;
[
  ['🏘️', `Du får vist navnet på en <strong>tilfældig by ${cfg.regionPrep}</strong>.`],
  ['📍', 'Tryk på den <strong>kommune</strong> på kortet, du tror byen hører til.'],
  ['🎯', `Du skal have <strong>${total} rigtige i træk</strong> – én i hver af ${cfg.regionName}s ${total} kommuner.`],
  ['⏱️', `Du har <strong>${secText}</strong> pr. spørgsmål. Løber tiden ud, tæller det som et forkert svar.`],
  ['❤️', `Du har <strong>${maxLives} liv</strong>. Et forkert svar eller tidsudløb koster ét liv og nulstiller din stime – du starter forfra med en ny række byer.`],
  ['💀', `Mister du alle ${maxLives} liv, er spillet slut, og du må starte et helt nyt spil.`],
  ['🏆', 'Din samlede tid løber hele vejen og bruges på scoreboardet sammen med dine resterende liv.'],
  ['🧰', `Klarer du alle ${total}, får du <strong>koordinatet til cachen</strong>!`],
].forEach(([icon, html]) => {
  const li = document.createElement('li');
  const s = document.createElement('span');
  s.textContent = icon;
  const t = document.createElement('div');
  t.innerHTML = html; // egne, faste tekster – ingen brugerdata
  li.append(s, t);
  $('rules').appendChild(li);
});
$('lives-max').textContent = `/${maxLives}`;

let db = null;
try { db = getFirestore(initializeApp(firebaseConfig)); } catch (e) { console.warn('Firebase ikke sat op', e); }

let playerName = localStorage.getItem(storageKey) || '';
let game = null; // { lives, solved:Set, answers, question, town, startedAt, deadline, over }
let map;
const regions = {};
const labels = {};
let tick = null;
let totalTick = null;

function show(name) {
  screens.forEach((s) => ($('screen-' + s).hidden = s !== name));
  $('topbar').hidden = name !== 'game';
  if (name === 'game' && !map) initMap();
}

function setFeedback(text, cls) {
  $('feedback').textContent = text;
  $('feedback').className = cls || '';
}

const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const formatTime = (s) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} sek`;

// ---- Firebase ----
async function bump(field) {
  if (!db) return;
  try { await setDoc(doc(db, statsCol, 'counters'), { [field]: increment(1) }, { merge: true }); } catch (e) { console.warn(e); }
}

async function loadStats() {
  if (!db) return;
  try {
    const d = await getDoc(doc(db, statsCol, 'counters'));
    const { attempts = 0, completed = 0 } = d.exists() ? d.data() : {};
    const pct = attempts ? Math.round((completed / attempts) * 1000) / 10 : 0;
    $('stats').textContent = `${attempts} spillere · ${completed} vindere · ${String(pct).replace('.', ',')} % gennemførelse`;
  } catch (e) { console.warn(e); }
}

async function showScores() {
  stopTimers();
  const body = $('score-body');
  body.replaceChildren();
  show('scores');
  if (!db) return;
  try {
    const snap = await getDocs(query(collection(db, scoresCol), orderBy('seconds', 'asc'), limit(50)));
    snap.docs.forEach((d, i) => {
      const r = d.data();
      const t = r.createdAt?.toDate ? r.createdAt.toDate() : null;
      const row = [
        i + 1, r.name, formatTime(r.seconds), r.lives == null ? '–' : `❤️ ${r.lives}`,
        t ? t.toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '–',
        t ? t.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }) : '–',
      ];
      const tr = document.createElement('tr');
      row.forEach((v) => tr.appendChild(Object.assign(document.createElement('td'), { textContent: v })));
      body.appendChild(tr);
    });
  } catch (e) { console.warn(e); }
}

// ---- Kryptering (svar er kun gemt som hash, koordinaten er krypteret) ----
const enc = new TextEncoder();
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const toB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

async function pbkdf2(password, bits = 256) {
  const keyBase = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: fromB64(salt), iterations, hash: 'SHA-256' }, keyBase, bits);
}

async function isCorrect(groupIndex, regionId) {
  return toB64(await pbkdf2(`${groupIndex}:${regionId}`)) === groups[groupIndex].check;
}

async function openVault(answers) {
  const key = await crypto.subtle.importKey('raw', await pbkdf2([...answers].sort().join('|')), 'AES-GCM', false, ['decrypt']);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(vault.iv) }, key, fromB64(vault.data));
  return new TextDecoder().decode(plain);
}

// ---- Kort (indbygget SVG, ingen eksterne korttjenester) ----
const NS = 'http://www.w3.org/2000/svg';
const svgEl = (name, attrs) => {
  const el = document.createElementNS(NS, name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};

function initMap() {
  map = $('map');
  map.setAttribute('viewBox', `0 0 ${mapView.width} ${mapView.height}`);
  mapRegions.forEach(({ id, d, c }) => {
    const p = svgEl('path', { d, class: 'land', 'fill-rule': 'evenodd', fill: c });
    p.addEventListener('click', () => guess(id));
    map.appendChild(p);
    regions[id] = p;
  });
  mapRegions.forEach(({ id, lx, ly }) => {
    const t = svgEl('text', { x: lx, y: ly, class: 'label' });
    t.textContent = nameOf[id];
    t.setAttribute('visibility', 'hidden');
    map.appendChild(t);
    labels[id] = t;
  });
}

function styleMap() {
  Object.entries(regions).forEach(([id, p]) => {
    const done = game.solved.has(id);
    p.classList.toggle('done', done);
    labels[id].setAttribute('visibility', done ? 'visible' : 'hidden');
  });
  $('done-list').textContent = game.solved.size ? [...game.solved].map((id) => nameOf[id]).join(', ') : 'ingen endnu';
}

function flashWrong(id) {
  const p = regions[id];
  if (!p) return;
  p.classList.add('flash-bad');
  setTimeout(() => p.classList.remove('flash-bad'), 700);
}

// ---- Spil ----
function nextQuestion() {
  const open = groups.map((g, i) => i).filter((i) => game.answers[i] === undefined);
  game.question = open[Math.floor(Math.random() * open.length)];
  const towns = groups[game.question].towns;
  game.town = towns[Math.floor(Math.random() * towns.length)];
  game.deadline = Date.now() + questionSeconds * 1000;
}

function renderGame(keepFeedback) {
  $('player').textContent = playerName;
  $('lives').textContent = `❤️ ${game.lives}`;
  $('progress').textContent = `${game.solved.size}/${total}`;
  $('town').textContent = game.town;
  if (!keepFeedback) setFeedback('Tryk på den rigtige kommune på kortet.');
  show('game');
  styleMap();
  startTimers();
}

// Et liv mistes, og stimen nulstilles (den samlede tid løber videre).
function loseLife() {
  game.lives--;
  if (game.lives <= 0) {
    game.over = true;
    stopTimers();
    show('lost');
    return true;
  }
  game.solved = new Set();
  game.answers = [];
  return false;
}

async function guess(id) {
  if (!game || game.over || game.busy || game.solved.has(id)) return;
  game.busy = true;
  const current = game;
  const qi = game.question;
  const correct = await isCorrect(qi, id);
  current.busy = false;
  if (game !== current || game.over || game.question !== qi) return;
  if (correct) {
    game.solved.add(id);
    game.answers[qi] = id;
    if (game.solved.size === total) return win();
    nextQuestion();
    renderGame();
    setFeedback('Rigtigt! Her er næste by.', 'good');
  } else {
    if (loseLife()) return;
    nextQuestion();
    renderGame(true);
    flashWrong(id);
    setFeedback('Forkert – du mistede et liv og starter forfra med en ny række byer.', 'bad');
  }
}

function startTimers() {
  stopTimers();
  const update = () => {
    const left = Math.max(0, game.deadline - Date.now());
    const s = Math.ceil(left / 1000);
    $('timer').textContent = clock(s);
    $('timer').className = s <= 20 ? 'low' : '';
    if (left <= 0) {
      stopTimers();
      if (loseLife()) return;
      nextQuestion();
      renderGame(true);
      setFeedback('Tiden løb ud – du mistede et liv og starter forfra med en ny række byer.', 'bad');
    }
  };
  const updateTotal = () => { $('total').textContent = clock(Math.floor((Date.now() - game.startedAt) / 1000)); };
  update();
  updateTotal();
  tick = setInterval(update, 250);
  totalTick = setInterval(updateTotal, 500);
}

function stopTimers() {
  clearInterval(tick);
  clearInterval(totalTick);
  tick = totalTick = null;
}

async function win() {
  game.over = true;
  stopTimers();
  const seconds = Math.round((Date.now() - game.startedAt) / 1000);
  $('won-time').textContent = formatTime(seconds);
  $('won-lives').textContent = `❤️ ${game.lives} af ${maxLives}`;
  try { $('final-coord').textContent = await openVault(game.answers); } catch { $('final-coord').textContent = 'Fejl – kontakt cache-ejeren'; }
  show('won');
  bump('completed');
  if (db) {
    try { await addDoc(collection(db, scoresCol), { name: playerName, seconds, lives: game.lives, createdAt: serverTimestamp() }); } catch (e) { console.warn(e); }
  }
  loadStats();
}

function start(name) {
  playerName = name.replace(/\s+/g, ' ').trim().slice(0, 20);
  if (!playerName) return;
  localStorage.setItem(storageKey, playerName);
  game = { lives: maxLives, solved: new Set(), answers: [], startedAt: Date.now(), over: false };
  nextQuestion();
  renderGame();
  bump('attempts').then(loadStats);
}

$('start-form').addEventListener('submit', (e) => { e.preventDefault(); start($('name').value); });
$('retry').addEventListener('click', () => { $('name').value = playerName; show('start'); });
$('to-scores-start').addEventListener('click', (e) => { e.preventDefault(); showScores(); });
$('to-scores-won').addEventListener('click', showScores);
$('back').addEventListener('click', () => {
  if (game && !game.over) renderGame(true);
  else show('start');
});

$('name').value = playerName;
loadStats();
show('start');
