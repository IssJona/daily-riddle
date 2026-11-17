import * as FB from "./firebase.js";

const TIERS = ["e", "m", "h", "i"];
const POINTS = { e: 1, m: 2, h: 3, i: 5 };

const UI = {
  en: {
    today: "Today", archive: "Archive", ranking: "Ranking",
    e: "Easy", m: "Medium", h: "Hard", i: "Invictus", day: "Day",
    hint: "Hint", answer: "Solution", showHint: "Hint", hideHint: "Hide hint",
    reveal: "Show solution", revealSure: "Sure? No points after this", hideAnswer: "Hide solution", showAnswer: "Show solution",
    yourAnswer: "Your answer", check: "Check", correct: "Correct!", wrong: "Not quite. Try again.", badNum: "Type a number.",
    markSolved: "I solved it", solved: "Solved ✓", revealedNote: "Solution seen: no points for this one.",
    pts: n => `${n} pt${n === 1 ? "" : "s"}`,
    back: "← Archive", notYet: "The first riddles arrive soon. Come back tomorrow!",
    noMore: "New riddles are on their way. Check back soon!",
    install: "Tip: add this page to your home screen to use it like an app.",
    legend: "● solved   ◌ solution seen",
    summary: (s, p, st) => `${s} solved · ${p} points · ${st}-day streak`,
    signIn: "Sign in with Google", signOut: "Sign out", signedAs: "Signed in as",
    signWhy: "Sign in to keep your progress on every device and appear in the ranking with your friends.",
    nameLabel: "Name shown in the ranking", save: "Save", saved: "Saved",
    rankNeedsLogin: "Sign in to see the ranking.", rankEmpty: "No players yet. Be the first!",
    player: "Player", points: "Pts", streak: "Streak", solvedCol: "Solved",
    fbOffline: "Sign-in isn't available right now (are you offline?). Your progress is saved on this device.",
    loginErr: "Sign-in failed: ", locale: "en-GB"
  },
  pt: {
    today: "Hoje", archive: "Arquivo", ranking: "Ranking",
    e: "Fácil", m: "Média", h: "Difícil", i: "Invictus", day: "Dia",
    hint: "Dica", answer: "Solução", showHint: "Dica", hideHint: "Esconder dica",
    reveal: "Ver solução", revealSure: "De certeza? Perdes os pontos", hideAnswer: "Esconder solução", showAnswer: "Ver solução",
    yourAnswer: "A tua resposta", check: "Verificar", correct: "Certo!", wrong: "Ainda não. Tenta outra vez.", badNum: "Escreve um número.",
    markSolved: "Resolvi", solved: "Resolvida ✓", revealedNote: "Viste a solução: esta não conta pontos.",
    pts: n => `${n} pt${n === 1 ? "" : "s"}`,
    back: "← Arquivo", notYet: "As primeiras charadas chegam em breve. Volta amanhã!",
    noMore: "Há charadas novas a caminho. Volta em breve!",
    install: "Dica: adiciona esta página ao ecrã principal para a usares como uma app.",
    legend: "● resolvida   ◌ solução vista",
    summary: (s, p, st) => `${s} resolvidas · ${p} pontos · série de ${st} dia${st === 1 ? "" : "s"}`,
    signIn: "Entrar com Google", signOut: "Sair", signedAs: "Sessão iniciada como",
    signWhy: "Entra para guardares o progresso em todos os dispositivos e apareceres no ranking com os teus amigos.",
    nameLabel: "Nome no ranking", save: "Guardar", saved: "Guardado",
    rankNeedsLogin: "Entra para veres o ranking.", rankEmpty: "Ainda não há jogadores. Sê o primeiro!",
    player: "Jogador", points: "Pts", streak: "Série", solvedCol: "Resolvidas",
    fbOffline: "O login não está disponível agora (estás offline?). O progresso fica guardado neste dispositivo.",
    loginErr: "O login falhou: ", locale: "pt-PT"
  }
};

// ---------- local storage (safe) ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

let lang = store.get("lang", null) || ((navigator.language || "en").toLowerCase().startsWith("pt") ? "pt" : "en");
let progress = store.get("progress2", {});   // { "12h": {s:1} | {r:1} }
let user = null, profile = null, fbReady = false, fbError = false, unwatch = null;
let index = null;
const batches = {};
const ui = { tier: store.get("tier", "e"), hint: false, answer: false, confirm: false, msg: null, lastKey: "" };

const t = () => UI[lang];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const view = document.getElementById("view");

// ---------- dates ----------
const dayNum = (y, m, d) => Math.floor(Date.UTC(y, m - 1, d) / 86400000);
let START = 0;
function todayIndex() { const n = new Date(); return dayNum(n.getFullYear(), n.getMonth() + 1, n.getDate()) - START; }
function dateOf(i) { const d = new Date((START + i) * 86400000); return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); }
function fmt(i, long) {
  return dateOf(i).toLocaleDateString(t().locale, long ? { weekday: "long", day: "numeric", month: "long" } : { day: "numeric", month: "short", year: "numeric" });
}
function lastDay() { return Math.min(todayIndex(), index.days - 1); }

// ---------- data ----------
async function loadIndex() {
  const r = await fetch("data/index.json", { cache: "no-cache" });
  index = await r.json();
  const [y, m, d] = index.start.split("-").map(Number);
  START = dayNum(y, m, d);
}
async function getDay(i) {
  const b = Math.floor(i / index.batch);
  if (!batches[b]) {
    const r = await fetch(`data/batch-${String(b + 1).padStart(2, "0")}.json`);
    batches[b] = await r.json();
  }
  return batches[b][i - b * index.batch];
}
async function getDays(upTo) {
  const need = Math.floor(upTo / index.batch);
  await Promise.all(Array.from({ length: need + 1 }, (_, b) => getDay(b * index.batch)));
}

// ---------- progress & scoring ----------
function stats() {
  const max = todayIndex();
  let solved = 0, points = 0;
  for (const [k, v] of Object.entries(progress)) {
    const d = parseInt(k, 10), tier = k.slice(-1);
    if (v.s && d <= max && POINTS[tier]) { solved++; points += POINTS[tier]; }
  }
  const daySolved = d => TIERS.some(x => progress[d + x] && progress[d + x].s);
  let streak = 0, d = max;
  if (!daySolved(d)) d--;           // today not done yet doesn't break the streak
  while (d >= 0 && daySolved(d)) { streak++; d--; }
  return { solved, points, streak };
}

function mergeProgress(a, b) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b || {})) {
    const o = out[k] || {};
    out[k] = { ...(o.s || v.s ? { s: 1 } : {}), ...(o.r || v.r ? { r: 1 } : {}) };
  }
  return out;
}

let saveTimer = null;
function setProgress(key, val) {
  progress[key] = { ...(progress[key] || {}), ...val };
  store.set("progress2", progress);
  if (user) { clearTimeout(saveTimer); saveTimer = setTimeout(pushRemote, 400); }
}
async function pushRemote() {
  if (!user) return;
  const s = stats();
  const name = (profile && profile.name) || user.displayName || "Player";
  try {
    await FB.saveUser(user.uid, { name: name.slice(0, 40), photo: user.photoURL || "", progress, points: s.points, solved: s.solved, streak: s.streak, lastDay: todayIndex() });
  } catch (e) { console.warn("save failed", e); }
}

// ---------- answer checking ----------
function parseNum(raw) {
  let s = String(raw).trim().replace(/−/g, "-").replace(/[^\d.,\/-]/g, "");
  if (!s) return NaN;
  const frac = s.match(/^(-?[\d.,]+)\/([\d.,]+)$/);
  if (frac) return parseNum(frac[1]) / parseNum(frac[2]);
  if (/^-?\d{1,3}(\.\d{3}){2,}$/.test(s) || /^-?\d{1,3}(,\d{3}){2,}$/.test(s)) s = s.replace(/[.,]/g, "");
  else s = s.replace(",", ".");
  return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? parseFloat(s) : NaN;
}
function isCorrect(r, x) {
  const tol = r.tol != null ? r.tol : 1e-6;
  return r.ans.some(a => Math.abs(a - x) <= Math.max(tol, Math.abs(a) * 1e-9));
}

// ---------- rendering ----------
function chrome(active) {
  document.documentElement.lang = lang;
  for (const k of ["today", "archive", "ranking"]) {
    const a = document.getElementById("nav-" + k);
    a.textContent = t()[k];
    a.classList.toggle("on", k === active);
  }
  document.querySelectorAll(".lang button").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));
  document.getElementById("install").textContent = t().install;
  const acct = document.getElementById("acct");
  if (user && user.photoURL) acct.innerHTML = `<img src="${esc(user.photoURL)}" alt="" referrerpolicy="no-referrer">`;
  else acct.textContent = user ? ((profile && profile.name) || user.displayName || "?").charAt(0).toUpperCase() : "👤";
}

async function renderDay(i, fromArchive) {
  const T = t();
  const day = await getDay(i);
  const tier = TIERS.includes(ui.tier) ? ui.tier : "e";
  const r = day[tier], L = r[lang];
  const key = i + tier, p = progress[key] || {};
  if (ui.lastKey !== key) { ui.hint = false; ui.answer = false; ui.confirm = false; ui.msg = null; ui.lastKey = key; }

  const tierBtns = TIERS.map(x => {
    const px = progress[i + x] || {};
    const st = px.s ? "✓" : px.r ? "◌" : "";
    return `<button class="tier ${x === tier ? "on" : ""}" data-t="${x}">${T[x]}<span class="st">${st}</span></button>`;
  }).join("");

  const solved = !!p.s, revealed = !!p.r;
  const ansBox = r.ans && !solved ? `
    <form class="ansrow" id="f-ans" autocomplete="off">
      <input id="ans" inputmode="decimal" placeholder="${T.yourAnswer}" aria-label="${T.yourAnswer}">
      <button class="btn primary" type="submit">${T.check}</button>
    </form>` : "";
  const msg = ui.msg ? `<div class="msg ${ui.msg[0]}">${esc(ui.msg[1])}</div>` : "";
  const selfBtn = !r.ans && !solved && !revealed ? `<button class="btn good" id="b-self">${T.markSolved}</button>` : "";
  const revealBtn = ui.answer
    ? `<button class="btn" id="b-ans">${T.hideAnswer}</button>`
    : solved || revealed
      ? `<button class="btn" id="b-ans">${T.showAnswer}</button>`
      : `<button class="btn ${ui.confirm ? "warn" : ""}" id="b-ans">${ui.confirm ? T.revealSure : T.reveal}</button>`;

  view.innerHTML = `
    ${fromArchive ? `<a class="back" href="#archive">${T.back}</a>` : ""}
    <div class="dayline"><span>${T.day} ${i + 1}</span><span>${esc(fmt(i, true))}</span></div>
    <div class="tiers">${tierBtns}</div>
    <article class="card">
      <span class="badge" data-t="${tier}">${T[tier]}</span><span class="pts">${T.pts(POINTS[tier])}</span>
      <h1>${esc(L.title)}</h1>
      <div class="q">${esc(L.q)}</div>
      ${ansBox}${msg}
      ${solved ? `<div class="done">${T.solved}</div>` : revealed ? `<div class="small" style="margin-top:12px">${T.revealedNote}</div>` : ""}
      <div class="actions">
        <button class="btn" id="b-hint">${ui.hint ? T.hideHint : T.showHint}</button>
        ${revealBtn}${selfBtn}
      </div>
      ${ui.hint ? `<div class="panel hint"><b>${T.hint}</b>${esc(L.hint)}</div>` : ""}
      ${ui.answer ? `<div class="panel answer"><b>${T.answer}</b>${esc(L.a)}</div>` : ""}
    </article>
    <p class="stats">${(s => T.summary(s.solved, s.points, s.streak))(stats())}</p>`;

  view.querySelectorAll(".tier").forEach(b => b.onclick = () => { ui.tier = b.dataset.t; store.set("tier", ui.tier); renderDay(i, fromArchive); });
  document.getElementById("b-hint").onclick = () => { ui.hint = !ui.hint; renderDay(i, fromArchive); };
  document.getElementById("b-ans").onclick = () => {
    if (ui.answer) ui.answer = false;
    else if (solved || revealed) ui.answer = true;
    else if (!ui.confirm) { ui.confirm = true; setTimeout(() => { if (ui.confirm) { ui.confirm = false; if (ui.lastKey === key) renderDay(i, fromArchive); } }, 4000); }
    else { ui.confirm = false; ui.answer = true; setProgress(key, { r: 1 }); }
    renderDay(i, fromArchive);
  };
  const self = document.getElementById("b-self");
  if (self) self.onclick = () => { setProgress(key, { s: 1 }); renderDay(i, fromArchive); };
  const form = document.getElementById("f-ans");
  if (form) form.onsubmit = e => {
    e.preventDefault();
    const raw = document.getElementById("ans").value;
    const x = parseNum(raw);
    // "5,040" or "5.040" could be a thousands separator: accept either reading
    const alt = /^\s*-?\d{1,3}[.,]\d{3}\s*$/.test(raw) ? parseFloat(raw.replace(/[.,]/, "")) : NaN;
    if (isNaN(x)) ui.msg = ["no", T.badNum];
    else if (isCorrect(r, x) || (!isNaN(alt) && isCorrect(r, alt))) { ui.msg = ["ok", T.correct]; if (!revealed) setProgress(key, { s: 1 }); else ui.answer = true; }
    else ui.msg = ["no", T.wrong];
    renderDay(i, fromArchive);
    if (ui.msg && ui.msg[0] === "no") { const inp = document.getElementById("ans"); if (inp) { inp.value = ""; inp.focus(); } }
  };
}

async function renderArchive() {
  const T = t();
  const max = lastDay();
  if (max < 0) { view.innerHTML = `<p class="empty">${T.notYet}</p>`; return; }
  await getDays(max);
  let rows = "";
  for (let i = max; i >= 0; i--) {
    const day = batches[Math.floor(i / index.batch)][i % index.batch];
    const dots = TIERS.map(x => { const p = progress[i + x] || {}; return `<span class="dot ${p.s ? "s" : p.r ? "r" : ""}" data-t="${x}" title="${T[x]}: ${esc(day[x][lang].title)}"></span>`; }).join("");
    rows += `<li><a href="#day-${i + 1}"><span class="n">${T.day} ${i + 1} · ${esc(fmt(i, false))}</span><span class="dots">${dots}</span></a></li>`;
  }
  const s = stats();
  view.innerHTML = `<ul class="list">${rows}</ul>
    <div class="legend">${TIERS.map(x => `<span><span class="dot s" data-t="${x}" style="display:inline-block;vertical-align:-1px"></span> ${T[x]}</span>`).join("")}</div>
    <p class="stats">${T.summary(s.solved, s.points, s.streak)}</p>`;
}

async function renderRanking() {
  const T = t();
  if (!fbReady) { view.innerHTML = `<p class="empty">${fbError ? T.fbOffline : "…"}</p>`; return; }
  if (!user) {
    view.innerHTML = `<div class="card"><p>${T.rankNeedsLogin}</p><button class="btn primary" id="b-in">${T.signIn}</button></div>`;
    document.getElementById("b-in").onclick = doSignIn; return;
  }
  view.innerHTML = `<p class="empty">…</p>`;
  let rows = [];
  try { rows = await FB.leaderboard(); } catch (e) { view.innerHTML = `<p class="empty">${esc(e.message)}</p>`; return; }
  if (!rows.length) { view.innerHTML = `<p class="empty">${T.rankEmpty}</p>`; return; }
  const today = todayIndex();
  view.innerHTML = `<div class="card"><table class="rank">
    <tr><th></th><th>${T.player}</th><th>${T.points}</th><th>${T.solvedCol}</th><th>${T.streak}</th></tr>
    ${rows.map((r, n) => {
      const streak = r.lastDay >= today - 1 ? (r.streak || 0) : 0; // stale streaks from people who stopped playing
      return `<tr class="${user && r.uid === user.uid ? "me" : ""}"><td class="pos">${n + 1}</td><td>${esc(r.name || "?")}</td><td>${r.points || 0}</td><td>${r.solved || 0}</td><td>${streak}</td></tr>`;
    }).join("")}
  </table></div>`;
}

function renderAccount() {
  const T = t();
  if (!fbReady) { view.innerHTML = `<p class="empty">${fbError ? T.fbOffline : "…"}</p>`; return; }
  if (!user) {
    view.innerHTML = `<div class="card"><p>${T.signWhy}</p><button class="btn primary" id="b-in">${T.signIn}</button><div class="msg no" id="err"></div></div>`;
    document.getElementById("b-in").onclick = doSignIn; return;
  }
  const name = (profile && profile.name) || user.displayName || "";
  view.innerHTML = `<div class="card">
    <p class="small">${T.signedAs}</p><p style="margin-top:-6px"><b>${esc(user.email || user.displayName || "")}</b></p>
    <label class="small" for="nm">${T.nameLabel}</label>
    <form class="field" id="f-name"><input id="nm" maxlength="40" value="${esc(name)}"><button class="btn" type="submit">${T.save}</button></form>
    <div class="msg ok" id="nmsg"></div>
    <div class="actions"><button class="btn warn" id="b-out">${T.signOut}</button></div>
  </div>`;
  document.getElementById("f-name").onsubmit = async e => {
    e.preventDefault();
    const v = document.getElementById("nm").value.trim().slice(0, 40);
    if (!v) return;
    profile = { ...(profile || {}), name: v };
    await pushRemote();
    document.getElementById("nmsg").textContent = T.saved;
    chrome(null);
  };
  document.getElementById("b-out").onclick = async () => { await FB.signOut(); location.hash = "#today"; };
}

async function doSignIn() {
  try { await FB.signIn(); }
  catch (e) { const el = document.getElementById("err"); if (el) el.textContent = t().loginErr + (e.code || e.message); else alertless(e); }
}
function alertless(e) { console.warn(e); }

// ---------- routing ----------
async function route() {
  if (!index) return;
  const h = location.hash.replace("#", "");
  const m = h.match(/^day-(\d+)$/);
  const today = todayIndex();
  if (h === "archive") { chrome("archive"); return renderArchive(); }
  if (h === "ranking") { chrome("ranking"); return renderRanking(); }
  if (h === "account") { chrome(null); return renderAccount(); }
  if (m) {
    const i = parseInt(m[1], 10) - 1;
    if (i >= 0 && i <= lastDay()) { chrome("archive"); return renderDay(i, i !== today); }
  }
  chrome("today");
  if (today < 0) { view.innerHTML = `<p class="empty">${t().notYet}</p>`; return; }
  if (today >= index.days) { view.innerHTML = `<p class="empty">${t().noMore}</p>`; return; }
  return renderDay(today, false);
}

window.addEventListener("hashchange", () => { ui.lastKey = ""; route(); window.scrollTo(0, 0); });
document.querySelectorAll(".lang button").forEach(b => b.onclick = () => { lang = b.dataset.lang; store.set("lang", lang); route(); });
let shownDay = null;
document.addEventListener("visibilitychange", async () => {
  if (document.hidden) return;
  if (todayIndex() !== shownDay) {
    shownDay = todayIndex();
    try { await loadIndex(); } catch (e) {}
    route();
  }
});

// ---------- start ----------
(async function start() {
  try { await loadIndex(); } catch (e) { view.innerHTML = `<p class="empty">Offline</p>`; return; }
  shownDay = todayIndex();
  route();

  try {
    await FB.initFirebase();
    fbReady = true;
    FB.onUser(async u => {
      if (unwatch) { unwatch(); unwatch = null; }
      user = u; profile = null;
      if (u) {
        try {
          const remote = await FB.loadUser(u.uid);
          profile = remote ? { name: remote.name } : { name: u.displayName || "Player" };
          progress = mergeProgress(progress, remote && remote.progress);
          store.set("progress2", progress);
          await pushRemote();
          unwatch = FB.watchUser(u.uid, data => {
            const merged = mergeProgress(progress, data.progress);
            if (JSON.stringify(merged) !== JSON.stringify(progress)) { progress = merged; store.set("progress2", progress); route(); }
            if (data.name) profile = { ...(profile || {}), name: data.name };
          });
        } catch (e) { console.warn("sync failed", e); }
      }
      route();
    });
  } catch (e) {
    console.warn("Firebase unavailable", e);
    fbError = true; route();
  }

  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
})();
