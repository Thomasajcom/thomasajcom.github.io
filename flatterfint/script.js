(() => {
  "use strict";

  /* ============================================================
     EDIT THESE
     ============================================================ */

  // Where "Book a flat chat" and the plan buttons send people.
  const CONTACT_EMAIL = "hello@example.com";

  // Leave a price empty ("") to hide it. Example: { en: "€90", no: "990 kr" }
  const PRICES = {
    stroll:  { en: "", no: "" },
    plateau: { en: "", no: "" },
    plain:   { en: "", no: "" },
  };

  /* ============================================================
     Norwegian copy. English lives in index.html.
     ============================================================ */

  const NO = {
    "nav.phil": "Filosofi",
    "nav.plans": "Planer",
    "nav.cta": "Ta en flat prat",

    "hero.eyebrow": "Livscoaching. Ingen topper.",
    "hero.h1": "<span>Flatt</span> <span>er fint.</span>",
    "hero.motto": "«Jeg vil ikke ha motbakke. Jeg vil ikke oppover. Flatt er fint!»",
    "hero.cta": "Ta en flat prat",
    "hero.hint": "Scroll for å flate ut fjellet ↓",

    "idiom.l1": "Et gammelt norsk ordtak",
    "idiom.l2": "Mitt svar",
    "idiom.body1": "Hver coach, hver podkast og hver plakat med en ørn på selger deg det samme: en topp. Ingen stopper opp og spør om du egentlig ville dit. Det er kaldt. Det blåser. Du tar ett bilde og går ned igjen.",
    "idiom.body2": "<strong>Jeg coacher det andre.</strong> Livet nede på flatmark, der kafeene ligger.",

    "truths.h": "Tre flate sannheter.",
    "t1.h": "Opp er en retning. Ikke en dyd.",
    "t1.p": "De fleste fjellene på lista di ble satt der av noen andre: en sjef, en forelder, en fremmed på LinkedIn. Vi går gjennom dem ett for ett og leverer dem tilbake.",
    "t2.h": "Lett er ikke juks.",
    "t2.p": "Når noe føles lett, betyr det ikke at du slurver. Det betyr at det passer. Vi bygger dagene dine av mer av akkurat det.",
    "t3.h": "Nok er et sted du kan bo.",
    "t3.p": "Ikke en base camp på vei mot mer. En ordentlig adresse. Jeg hjelper deg å finne den, og så møblerer vi.",

    "d.eyebrow": "Et ord fra René Descartes (1596–1650)",
    "d.h": "Selv Descartes holdt seg på planet.",
    "d.lead": "Mannen ga oss det kartesiske planet. Et <em>plan</em>. Flatt i alle retninger, for alltid. Fire hundre år senere kaller folk det fortsatt genialt. Han sa også et og annet, og jeg har lest det slik han selv ville gjort: liggende.",
    "g.sell": "det de selger deg ↗",
    "g.fine": "y = fint",
    "g.x": "livet ditt →",
    "g.y": "innsats →",
    "d.reading": "Flat lesning",
    "q1.q": "«Jeg tenker, altså er jeg.»",
    "q1.s": "Om metoden, 1637",
    "q1.r": "Ikke «jeg strever, altså er jeg». For ham holdt det å finnes.",
    "q2.q": "«…de som går svært langsomt, kan komme mye lenger, så lenge de holder seg til den rette veien, enn de som løper og forlater den.»",
    "q2.s": "Om metoden, første del",
    "q2.r": "Langsomt. Rett. Vei. Mannen beskriver en flat gåtur.",
    "q3.q": "«…å beseire meg selv heller enn skjebnen, og forandre mine ønsker heller enn verdens orden.»",
    "q3.s": "Om metoden, tredje del",
    "q3.r": "Du kan flytte fjellet, eller du kan slutte å ønske deg det. Bare det ene er gratis.",
    "q4.q": "«Det er ikke nok å ha et godt hode; det viktigste er å bruke det godt.»",
    "q4.s": "Om metoden, første del",
    "q4.r": "Å bruke det godt inkluderer å oppdage at du aldri ville til toppen.",
    "bed.h": "En advarende historie",
    "bed.p": "Nesten hele livet ble Descartes liggende i senga til langt på formiddagen og tenke. Det gikk strålende: moderne filosofi, analytisk geometri. I 1649 tok han en jobb i Stockholm, med undervisning for dronning Kristina klokka fem om morgenen, midt på vinteren. I februar 1650 var han død. Jeg sier ikke at det var de tidlige morgenene. Jeg sier at han hadde det fint så lenge han lå flatt.",

    "f.eyebrow": "Gratis smaksprøve",
    "f.h": "Ta med et fjell. Jeg flater det ut.",
    "f.p": "Skriv inn det du tror du må bestige.",
    "f.label": "Fjellet ditt",
    "f.ph": "f.eks. løpe maraton",
    "f.btn": "Flat det ut",
    "c1": "Løpe maraton",
    "c2": "Tom innboks",
    "c3": "Stå opp klokka fem",
    "c4": "Bli partner",
    "c5": "Elske nettverking",

    "p.eyebrow": "Coachingplaner",
    "p.h": "Tre planer. Null høydemeter.",
    "p.sub": "Alle planene har samme garanti: Du blir ikke bedt om å bestige noe som helst.",
    "p.stat": "Høydemeter",
    "p.btn": "Velg flatt",
    "p1.dur": "Én samtale",
    "p1.name": "Rusleturen",
    "p1.pitch": "Ta med ett fjell. Vi ser på det sammen, på behagelig avstand, og finner ut om det noen gang var ditt.",
    "p1.b1": "Én økt på 60 minutter",
    "p1.b2": "Ett fjell, grundig vurdert",
    "p1.b3": "En skriftlig flat plan du får beholde",
    "p2.tag": "Coachens favoritt",
    "p2.dur": "Seks uker",
    "p2.name": "Platået",
    "p2.pitch": "Finn nivået ditt, og bli der. Med vilje.",
    "p2.b1": "Seks ukentlige økter",
    "p2.b2": "Revisjon av lånte mål: Hvem sine fjell er dette?",
    "p2.b3": "En uke bygget rundt det som allerede er lett",
    "p2.b4": "Meldinger mellom øktene",
    "p3.dur": "Tre måneder",
    "p3.name": "Sletta",
    "p3.pitch": "Et helt liv, lagt om til flatmark.",
    "p3.b1": "Tolv økter i gangfart",
    "p3.b2": "Jobb, hjem og hode: alt flates ut",
    "p3.b3": "En plan for neste gang noen rekker deg et fjell",
    "p3.b4": "Alt som er med i Platået",

    "m.h": "Hva fjellene sier",
    "m1": "«Ingen har besteget meg på flere uker. Jeg har aldri følt meg så respektert.»",
    "m2": "«Ærlig talt begynte all trafikken å gå meg på nervene.»",
    "m3": "«Jeg tar meg uansett best ut nedenfra.»",

    "faq.h": "Rimelige spørsmål.",
    "fq1": "Er ikke dette bare å gi opp?",
    "fa1": "Nei. Å gi opp er å snu halvveis og få dårlig samvittighet. Dette er å velge dalen med vilje og ha det helt utmerket.",
    "fq2": "Hva om jeg faktisk har lyst til å bestige noe?",
    "fa2": "Da gjør du det. Jeg vinker nedenfra. Jobben er å skille fjellene du selv vil opp på, fra dem du bare fikk utdelt.",
    "fq3": "Kommer jeg fortsatt til å vokse?",
    "fa3": "Sidelengs. Der er det mye bedre plass.",
    "fq4": "Tror du at jorda er flat?",
    "fa4": "Nei. Jorda er rund. Det er kalenderen din som ikke trenger å være bratt.",

    "cta.h": "Kom ned derfra.",
    "cta.p": "Send meg noen ord om hvilket fjell du er lei av. Så tar vi det derfra. Sakte.",
    "cta.btn": "Ta en flat prat",

    "foot.elev": "Høyde: 0 moh.",
    "foot.note": "Ingen fjell ble besteget under produksjonen av denne nettsiden.",
  };

  // Strings that are built in code.
  const UI = {
    en: {
      htmlLang: "en",
      title: "Flatt er fint · Flat is fine. Life coaching with no summits.",
      toggle: "Norsk",
      toggleLabel: "Bytt til norsk",
      elev: (n) => `Elevation ${n} m`,
      elevFlat: "0 m. There. Much better.",
      stageIdle: "Your mountain",
      count: (n) => `Mountains flattened: ${n}`,
      results: [
        (x) => `“${x}” is now a pleasant field. Stroll across it whenever. Or don't.`,
        (x) => `“${x}”: 0 m above sea level. Nice view, no lactic acid.`,
        (x) => `Done. “${x}” is flat. No need to thank me, but you can book me.`,
      ],
      subject: "A flat chat",
      subjectPlan: (p) => `A flat chat about ${p}`,
    },
    no: {
      htmlLang: "nb",
      title: "Flatt er fint · Livscoaching uten topper.",
      toggle: "English",
      toggleLabel: "Switch to English",
      elev: (n) => `Høyde ${n} moh.`,
      elevFlat: "0 moh. Sånn. Mye bedre.",
      stageIdle: "Fjellet ditt",
      count: (n) => `Fjell flatet ut: ${n}`,
      results: [
        (x) => `«${x}» er nå en hyggelig slette. Rusle over den når du vil. Eller la være.`,
        (x) => `«${x}»: 0 moh. Fin utsikt, ingen melkesyre.`,
        (x) => `Ferdig. «${x}» er flatt. Du trenger ikke takke meg, men du kan booke meg.`,
      ],
      subject: "En flat prat",
      subjectPlan: (p) => `En flat prat om ${p}`,
    },
  };

  /* ============================================================ */

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode: fine */ } },
  };

  /* ---------- Language ---------- */

  const nodes = $$("[data-i18n]").map((el) => ({ el, key: el.dataset.i18n, en: el.innerHTML }));
  const placeholders = $$("[data-i18n-placeholder]").map((el) => ({ el, key: el.dataset.i18nPlaceholder, en: el.placeholder }));
  const EN = Object.fromEntries(nodes.map((n) => [n.key, n.en]));
  const toggle = $("#lang");

  let lang = store.get("lang") || (/^(nb|nn|no)\b/i.test(navigator.language || "") ? "no" : "en");
  if (lang !== "no") lang = "en";

  const text = (key) => {
    const html = (lang === "no" && NO[key]) || EN[key] || "";
    const tmp = document.createElement("span");
    tmp.innerHTML = html;
    return tmp.textContent.trim();
  };

  function applyLang() {
    const ui = UI[lang];
    root.lang = ui.htmlLang;
    document.title = ui.title;
    for (const n of nodes) n.el.innerHTML = (lang === "no" && NO[n.key]) || n.en;
    for (const p of placeholders) p.el.placeholder = (lang === "no" && NO[p.key]) || p.en;
    toggle.textContent = ui.toggle;
    toggle.setAttribute("aria-label", ui.toggleLabel);

    for (const a of $$("[data-mail]")) {
      const subject = a.dataset.plan ? ui.subjectPlan(text(a.dataset.plan)) : ui.subject;
      a.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
    }
    for (const el of $$("[data-price]")) {
      const price = (PRICES[el.dataset.price] || {})[lang] || "";
      el.textContent = price;
      el.hidden = !price;
    }
    renderReadout(true);
    renderStage();
  }

  toggle.addEventListener("click", () => {
    lang = lang === "no" ? "en" : "no";
    store.set("lang", lang);
    applyLang();
  });

  /* ---------- Hero: scroll flattens the range ---------- */

  const PEAK = 2469; // Galdhøpiggen, Norway's highest. Not for long.
  const hero = $(".hero");
  const readout = $("#readout");
  const fmt = (n) => n.toLocaleString("nb-NO").replace(/ | /g, " ");
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  let flatness = 0;
  let lastShown = -1;
  let ticking = false;

  function renderReadout(force) {
    const metres = Math.round(PEAK * (1 - flatness));
    if (!force && metres === lastShown) return;
    lastShown = metres;
    readout.textContent = metres === 0 ? UI[lang].elevFlat : UI[lang].elev(fmt(metres));
    readout.classList.toggle("is-flat", metres === 0);
  }

  function onScroll() {
    ticking = false;
    const distance = hero.offsetHeight - window.innerHeight;
    const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    flatness = ease(Math.min(1, progress / 0.82));
    root.style.setProperty("--flat", flatness.toFixed(4));
    renderReadout(false);
  }
  const requestTick = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);

  /* ---------- Reveal ---------- */

  const revealables = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Flatten a mountain ---------- */

  const stage = $("#stage");
  const label = $("#stage-label");
  const result = $("#stage-result");
  const countEl = $("#stage-count");
  const form = $("#flat-form");
  const input = $("#mountain");
  const state = { name: "", flat: false, shown: null, count: Number(store.get("flattened")) || 0, timer: 0 };

  function renderStage() {
    label.textContent = state.name || UI[lang].stageIdle;
    result.textContent = state.shown ? UI[lang].results[state.shown.i](state.shown.name) : "";
    countEl.textContent = state.count > 0 ? UI[lang].count(state.count) : "";
  }

  function rise() {
    clearTimeout(state.timer);
    state.flat = false;
    state.shown = null;
    stage.classList.remove("is-flat");
  }

  function flatten() {
    const name = input.value.trim();
    if (!name) {
      form.classList.remove("nudge");
      void form.offsetWidth;
      form.classList.add("nudge");
      input.focus();
      return;
    }
    const wasFlat = state.flat;
    if (wasFlat) rise();
    state.name = name;
    renderStage();
    clearTimeout(state.timer);
    state.timer = setTimeout(() => {
      stage.classList.add("is-flat");
      state.flat = true;
      state.timer = setTimeout(() => {
        state.shown = { i: state.count % UI[lang].results.length, name };
        state.count += 1;
        store.set("flattened", String(state.count));
        renderStage();
      }, 1000);
    }, wasFlat ? 520 : 0);
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); flatten(); });
  input.addEventListener("input", () => {
    if (state.flat) rise();
    state.name = input.value.trim();
    renderStage();
  });
  for (const chip of $$(".chips button")) {
    chip.addEventListener("click", () => { input.value = chip.textContent.trim(); flatten(); });
  }

  /* ---------- Go ---------- */

  $("#year").textContent = new Date().getFullYear();
  applyLang();
  onScroll();
})();
