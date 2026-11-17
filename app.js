(function () {
  const UI = {
    en: {
      today: "Today", archive: "Archive", hint: "Hint", answer: "Solution",
      showHint: "Show hint", hideHint: "Hide hint",
      showAnswer: "Reveal solution", hideAnswer: "Hide solution",
      markSolved: "I solved it", solved: "Solved ✓",
      riddle: "Riddle", easy: "Easy", medium: "Medium", hard: "Hard",
      back: "← Archive", solvedCount: (s, t) => `${s} of ${t} solved`,
      notYet: "The first riddle arrives soon. Come back tomorrow!",
      install: "Tip: add this page to your home screen to use it like an app.",
      locale: "en-GB"
    },
    pt: {
      today: "Hoje", archive: "Arquivo", hint: "Dica", answer: "Solução",
      showHint: "Ver dica", hideHint: "Esconder dica",
      showAnswer: "Ver solução", hideAnswer: "Esconder solução",
      markSolved: "Resolvi", solved: "Resolvido ✓",
      riddle: "Charada", easy: "Fácil", medium: "Média", hard: "Difícil",
      back: "← Arquivo", solvedCount: (s, t) => `${s} de ${t} resolvidas`,
      notYet: "A primeira charada chega em breve. Volta amanhã!",
      install: "Dica: adiciona esta página ao ecrã principal para a usares como uma app.",
      locale: "pt-PT"
    }
  };

  // ---------- storage (safe) ----------
  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  let lang = load("lang", null) || ((navigator.language || "en").toLowerCase().startsWith("pt") ? "pt" : "en");
  let solved = load("solved", {}); // { dayIndex: true }
  const open = { hint: false, answer: false };

  // ---------- dates ----------
  function dayNumber(y, m, d) { return Math.floor(Date.UTC(y, m - 1, d) / 86400000); }
  const [sy, sm, sd] = START_DATE.split("-").map(Number);
  const START = dayNumber(sy, sm, sd);
  function todayIndex() {
    const n = new Date();
    return dayNumber(n.getFullYear(), n.getMonth() + 1, n.getDate()) - START;
  }
  function dateOf(index) {
    const ms = (START + index) * 86400000;
    const d = new Date(ms);
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  function fmtDate(index, long) {
    return dateOf(index).toLocaleDateString(UI[lang].locale,
      long ? { weekday: "long", day: "numeric", month: "long" } : { day: "numeric", month: "short", year: "numeric" });
  }
  function riddleFor(index) { return RIDDLES[((index % RIDDLES.length) + RIDDLES.length) % RIDDLES.length]; }

  // ---------- rendering ----------
  const view = document.getElementById("view");
  function esc(s) { return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function diffLabel(d) { const t = UI[lang]; return [t.easy, t.medium, t.hard][d - 1]; }
  function dots(d) { return "●".repeat(d) + "○".repeat(3 - d); }

  function renderRiddle(index, fromArchive) {
    const t = UI[lang];
    const r = riddleFor(index)[lang];
    const diff = riddleFor(index).diff;
    const isSolved = !!solved[index];
    view.innerHTML = `
      ${fromArchive ? `<a class="back" href="#archive">${t.back}</a>` : ""}
      <article class="card">
        <div class="meta">
          <span>${t.riddle} #${index + 1}</span>
          <span>${esc(fmtDate(index, true))}</span>
          <span class="dots" title="${diffLabel(diff)}">${dots(diff)}</span><span>${diffLabel(diff)}</span>
          ${isSolved ? `<span class="solvedtag">${t.solved}</span>` : ""}
        </div>
        <h1>${esc(r.title)}</h1>
        <div class="q">${esc(r.q)}</div>
        <div class="actions">
          <button class="btn" id="b-hint">${open.hint ? t.hideHint : t.showHint}</button>
          <button class="btn primary" id="b-answer">${open.answer ? t.hideAnswer : t.showAnswer}</button>
          <button class="btn good" id="b-solved">${isSolved ? t.solved : t.markSolved}</button>
        </div>
        ${open.hint ? `<div class="panel hint"><b>${t.hint}</b>${esc(r.hint)}</div>` : ""}
        ${open.answer ? `<div class="panel answer"><b>${t.answer}</b>${esc(r.a)}</div>` : ""}
      </article>
      <p class="stats">${t.solvedCount(countSolved(), todayIndex() + 1)}</p>`;
    document.getElementById("b-hint").onclick = () => { open.hint = !open.hint; renderRiddle(index, fromArchive); };
    document.getElementById("b-answer").onclick = () => { open.answer = !open.answer; renderRiddle(index, fromArchive); };
    document.getElementById("b-solved").onclick = () => {
      if (solved[index]) delete solved[index]; else solved[index] = true;
      save("solved", solved); renderRiddle(index, fromArchive);
    };
  }

  function countSolved() {
    const max = todayIndex();
    return Object.keys(solved).filter(k => +k >= 0 && +k <= max).length;
  }

  function renderArchive() {
    const t = UI[lang];
    const max = todayIndex();
    if (max < 0) { view.innerHTML = `<p class="empty">${t.notYet}</p>`; return; }
    let items = "";
    for (let i = max; i >= 0; i--) {
      items += `<li><a href="#day-${i + 1}">
        <span class="n">#${i + 1} · ${esc(fmtDate(i, false))}</span>
        <span class="t">${esc(riddleFor(i)[lang].title)}</span>
        <span class="s">${solved[i] ? "✓" : ""}</span></a></li>`;
    }
    view.innerHTML = `<ul class="list">${items}</ul><p class="stats">${t.solvedCount(countSolved(), max + 1)}</p>`;
  }

  function route() {
    const t = UI[lang];
    document.documentElement.lang = lang;
    document.getElementById("nav-today").textContent = t.today;
    document.getElementById("nav-archive").textContent = t.archive;
    document.getElementById("install").textContent = t.install;
    document.querySelectorAll(".lang button").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));

    const h = location.hash.replace("#", "");
    const m = h.match(/^day-(\d+)$/);
    const today = todayIndex();
    document.getElementById("nav-today").classList.toggle("on", !h || h === "today");
    document.getElementById("nav-archive").classList.toggle("on", h === "archive" || !!m);

    if (h === "archive") return renderArchive();
    if (m) {
      const i = parseInt(m[1], 10) - 1;
      if (i >= 0 && i <= today) return renderRiddle(i, i !== today);
    }
    if (today < 0) { view.innerHTML = `<p class="empty">${t.notYet}</p>`; return; }
    renderRiddle(today, false);
  }

  let lastRoute = "";
  window.addEventListener("hashchange", () => {
    if (location.hash !== lastRoute) { open.hint = false; open.answer = false; lastRoute = location.hash; }
    route(); window.scrollTo(0, 0);
  });
  document.querySelectorAll(".lang button").forEach(b => b.onclick = () => {
    lang = b.dataset.lang; save("lang", lang); route();
  });

  // Refresh at midnight / when the app comes back to the foreground
  let shownDay = todayIndex();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && todayIndex() !== shownDay) { shownDay = todayIndex(); open.hint = open.answer = false; route(); }
  });

  lastRoute = location.hash;
  route();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
