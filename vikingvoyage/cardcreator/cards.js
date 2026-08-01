/* ═══════════════════════════════════════════════════════════════════════
   VIKING VOYAGE — the card renderer.
   One data object per card; two faces rendered from it.

     renderCard(card, {face:'hand'|'full', injured:bool})
     renderJunk(junk, {face})
     renderBack({face})
     renderLeader(leader, {open:bool, spent:bool})
     renderConsumable(item)

   Authoring card two hundred costs a paragraph of data and one
   illustration — never a trip back to a paint tool.
   ═══════════════════════════════════════════════════════════════════════ */

const STAT_COLOR = {
  STR:'var(--stat-str)', DEX:'var(--stat-dex)', CON:'var(--stat-con)',
  CHA:'var(--stat-cha)', LUK:'var(--stat-luk)'
};
const BAND_ORDER = ['far','normal','close'];

/* ── the crew level tally: service marks struck around the base of the seal ── */
function sealNotches(level, size){
  if(!level || level < 1) return '';
  const pad = 9, box = size + pad * 2, c = box / 2;
  const r0 = size / 2 + 2, r1 = size / 2 + 7;
  const pitch = size > 40 ? 21 : 25;          // degrees between marks
  /* Every mark is struck twice: a pale halo first, the madder mark over it.
     The ring crosses the artwork's bottom edge, and madder alone would
     vanish against a dark plate. All halos are laid before any mark, so a
     neighbouring halo can never cover the mark next to it. */
  let halos = '', marks = '';
  for(let i = 0; i < level; i++){
    const a = (90 + (i - (level - 1) / 2) * pitch) * Math.PI / 180;
    const x0 = (c + Math.cos(a) * r0).toFixed(2), y0 = (c + Math.sin(a) * r0).toFixed(2);
    const x1 = (c + Math.cos(a) * r1).toFixed(2), y1 = (c + Math.sin(a) * r1).toFixed(2);
    halos += `<line class="halo" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/>`;
    marks += `<line class="mark" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/>`;
  }
  return `<svg class="notches" viewBox="0 0 ${box} ${box}">${halos}${marks}</svg>`;
}

function bandsHTML(c){
  return BAND_ORDER.map(b => {
    const cls = ['vvc-band'];
    if(c.bands[b])    cls.push('on');
    if(c.best === b)  cls.push('best');
    if(c.shiftTo === b) cls.push('shift');
    return `<div class="${cls.join(' ')}">${b === 'normal' ? 'Norm' : b}</div>`;
  }).join('');
}

function sealHTML(c, size){
  if(!c.portrait) return '';
  return `<div class="vvc-seal">
    <span class="face" style="background-image:url('${c.portrait}')"></span>
    ${sealNotches(c.level, size)}
  </div>`;
}

/* ═══════════ CARDS ═══════════ */

function renderCard(c, opts){
  opts = opts || {};
  const face = opts.face || 'full';
  const hand = face === 'hand';

  const el = document.createElement('article');
  el.className = `vvc vvc--${face}${c.crew ? ' vvc--crew' : ''}${opts.injured ? ' is-injured' : ''}`;
  el.style.setProperty('--plate', STAT_COLOR[c.stat]);

  const longTitle = c.title.length > (hand ? 15 : 17);
  const sure = hand ? (c.sureShort || c.sure) : c.sure;

  el.innerHTML = `
    ${hand ? '<span class="vvc-bar"></span>' : `
      <span class="vvc-rivet tl"></span><span class="vvc-rivet tr"></span>
      <span class="vvc-rivet bl"></span><span class="vvc-rivet br"></span>`}
    ${sealHTML(c, hand ? 32 : 56)}
    <div class="vvc-in">

      <div class="vvc-head">
        <div class="vvc-cost">${c.cost}</div>
        <div class="vvc-titles">
          <div class="vvc-title${longTitle ? ' long' : ''}">${c.title}</div>
          ${hand ? '' : `<div class="vvc-sub">${c.subtitle}</div>`}
        </div>
        <div class="vvc-stat"><span>${c.stat}</span></div>
      </div>

      <div class="vvc-art"><img src="${c.art}" alt=""></div>

      <div class="vvc-range">${bandsHTML(c)}</div>

      <div class="vvc-rules">
        <div class="vvc-sure">
          <div class="vvc-lbl">Sure</div>
          <p>${sure}</p>
        </div>

        <div class="vvc-split"><i></i><span class="vvc-d20">d20</span><i></i></div>

        <div class="vvc-roll">
          ${hand
            ? `<p><span class="vvc-tgt">${c.check}</span>${c.bonus}</p>`
            : `<div class="vvc-lbl"><span class="vvc-tgt">${c.check}</span></div>
               <p>${c.bonus}</p>
               <p class="vvc-grt">${c.greater}</p>`}
        </div>

        <div class="vvc-odds">
          <div class="vvc-meter">
            <i class="m-miss" style="width:${c.odds.miss}%"></i>
            <i class="m-bon"  style="width:${c.odds.bonus}%"></i>
            <i class="m-grt"  style="width:${c.odds.greater}%"></i>
          </div>
          <div class="vvc-okeys">
            ${hand
              ? `<span><b>${c.odds.bonus}%</b> bonus</span><span><b>${c.odds.greater}%</b> great</span>`
              : `<span>${c.odds.miss}% none</span>
                 <span><b>${c.odds.bonus}% bonus</b></span>
                 <span><b>${c.odds.greater}% greater</b></span>`}
          </div>
        </div>
      </div>

      <div class="vvc-foot">
        <div class="vvc-type">${c.type}${c.level ? `<span class="vvc-lvl">Lv ${c.level}</span>` : ''}</div>
        <div class="vvc-flav">${c.flavour}</div>
      </div>
    </div>`;

  if(!opts.injured) return el;

  /* An injured specialist's card is drawn but unplayable (§17.2).  The stamp
     sits OUTSIDE the greyed card, or the filter would mute the one element
     whose whole job is to be loud in a three-card hand (§21.4). */
  const shell = document.createElement('div');
  shell.className = 'vvc-shell';
  shell.appendChild(el);
  const stamp = document.createElement('div');
  stamp.className = `vvc-stamp vvc-stamp--${face}`;
  stamp.innerHTML = `Injured<small>Cannot be played</small>`;
  shell.appendChild(stamp);
  return shell;
}

/* ═══════════ JUNK — §21.3 ═══════════ */

function renderJunk(j, opts){
  opts = opts || {};
  const face = opts.face || 'full';
  const el = document.createElement('div');
  el.className = `vvj vvj--${face}`;
  /* the scrap is small; a wrapping two-line kicker reads as damage, not label */
  const kind = face === 'hand' ? 'Junk' : (j.kind || 'Junk · jammed into your deck');
  el.innerHTML = `
    <div class="vvj-in" style="transform:rotate(${j.tilt || -2.2}deg)">
      <div class="vvj-k">${kind}</div>
      <div class="vvj-n">${j.title}</div>
      <div class="vvj-d">${j.desc}</div>
      <div class="vvj-f">${j.flavour || ''}</div>
      <button class="vvj-clear" type="button">Destroy · ${j.clearCost} energy</button>
    </div>`;
  return el;
}

/* ═══════════ CARD BACK — §12.6 ═══════════ */

const CARD_BACK_SVG = `
<svg viewBox="0 0 112 157" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <rect width="112" height="157" fill="#ded2b4"/>
  <rect x="6" y="6" width="100" height="145" fill="none" stroke="#14100c" stroke-width="1.6"/>
  <rect x="10" y="10" width="92" height="137" fill="none" stroke="#14100c" stroke-width="0.7" opacity=".55"/>
  <g transform="translate(56,78.5)" stroke="#9e2b25" fill="none">
    <circle r="30" stroke-width="2.4"/><circle r="22" stroke-width="1.2" opacity=".7"/>
    <circle r="13" stroke-width="2"/><circle r="4.5" fill="#9e2b25" stroke="none"/>
    <g stroke-width="1.8">
      <path d="M0,-30 L0,-13"/><path d="M0,13 L0,30"/><path d="M-30,0 L-13,0"/><path d="M13,0 L30,0"/>
      <path d="M-21,-21 L-9,-9"/><path d="M21,-21 L9,-9"/><path d="M-21,21 L-9,9"/><path d="M21,21 L9,9"/>
    </g>
  </g>
  <g fill="#14100c">
    <circle cx="14" cy="14" r="2.4"/><circle cx="98" cy="14" r="2.4"/>
    <circle cx="14" cy="143" r="2.4"/><circle cx="98" cy="143" r="2.4"/>
  </g>
</svg>`;

function renderBack(opts){
  const face = (opts && opts.face) || 'full';
  const el = document.createElement('div');
  el.className = `vvb vvb--${face}`;
  el.innerHTML = CARD_BACK_SVG;
  return el;
}

/* ═══════════ LEADER — §13 ═══════════ */

const CURSE_GLYPH = {
  rigging: `<svg class="cg" viewBox="0 0 24 24" fill="none" stroke="#c98878" stroke-width="2.2" stroke-linecap="round"><path d="M3 5c6 3.4 12 3.4 18 0"/><path d="M5 12c4.6 4 9.4 4 14 0"/><path d="M9 19c2 1.6 4 1.6 6 0"/></svg>`,
  illwind: `<svg class="cg" viewBox="0 0 24 24" fill="none" stroke="#b58aa0" stroke-width="2.2" stroke-linecap="round"><path d="M2 8h13a3 3 0 1 0-3-3"/><path d="M2 14h16a3 3 0 1 1-3 3"/><path d="M2 20h9"/></svg>`
};

function renderLeader(L, opts){
  opts = opts || {};
  const open = !!opts.open;
  const el = document.createElement('div');
  el.className = `vvl vvl--${open ? 'open' : 'rail'}${opts.spent ? ' is-spent' : ''}`;

  /* the ability panel is shared by both faces — rest carries the authored
     short form, the open face the full wording */
  const abilityPanel = (text) => `
    <div class="vvl-ab">
      <div class="vvl-abhead">
        <span class="vvc-cost">${L.ability.cost}</span>
        <span class="vvl-abname">${L.ability.name}</span>
        <span class="vvl-once">${opts.spent ? 'Spent' : '1&times;/turn'}</span>
      </div>
      <p class="vvl-abtx">${text}</p>
      ${opts.spent ? '<span class="vvl-stamp">Spent &middot; returns next turn</span>' : ''}
    </div>`;

  const pill = L.curses.length
    ? `<div class="vvl-pill">${L.curses.map(c => CURSE_GLYPH[c.g] || '').join('')}</div>`
    : '';

  if(!open){
    /* THE RAIL — the portrait is the card */
    el.innerHTML = `
      <img class="vvl-img" src="${L.portrait}" alt="${L.name} ${L.byname}">
      ${pill}
      <div class="vvl-who"><div class="a">${L.name}</div><div class="b">${L.byname}</div></div>
      ${abilityPanel(L.ability.short || L.ability.text)}`;
    return el;
  }

  /* THE OPEN FACE — same order, more depth: portrait → ability → reference */
  const stats = L.stats.map(s =>
    `<div class="vvl-stat">
       <div class="v" style="color:${s.c}">${s.v}</div>
       <div class="n" style="color:${s.c}">${s.n}</div>
     </div>`).join('');

  const curseRows = L.curses.map(c =>
    `<div class="vvl-curse${c.perm ? ' perm' : ''}">
       ${CURSE_GLYPH[c.g] || ''}
       <div><div class="n">${c.n}</div><div class="e">${c.e}</div></div>
     </div>`).join('');

  el.innerHTML = `
    <div class="vvl-port">
      <img src="${L.portrait}" alt="${L.name} ${L.byname}">
      <div class="vvl-who"><div class="a">${L.name}</div><div class="b">${L.byname}</div></div>
    </div>
    ${abilityPanel(L.ability.text)}
    <div class="vvl-ref">
      <div class="vvl-stats">${stats}</div>
      ${curseRows ? `<div class="vvl-sect"><div class="th curse-th">Curses</div>${curseRows}</div>` : ''}
      <div class="vvl-sect">
        <div class="th passive-th">Always active</div>
        <div class="tn">${L.passive.name}</div>
        <p>${L.passive.text}</p>
      </div>
      <p class="vvl-quote">${L.quote}</p>
    </div>
    <div class="vvl-foot">Always available &middot; Never drawn &middot; Once per turn</div>`;
  return el;
}

/* ═══════════ CONSUMABLES — §13.1 ═══════════
   Hand-drawn glyphs, three inks only.  An emoji would render in full
   colour and break the palette rule that keeps every asset matching. */

/* Solid silhouettes, not outlines. At 42px a 2px stroke reads as a scratch —
   these have to be recognisable at a glance in a combat rail. */
const KIT_GLYPH = {
  /* a drinking horn with a banded mouth, as they were actually mounted */
  draught: `<svg viewBox="0 0 48 48">
      <path d="M18 6C32 10 42 24 44 44 28 38 14 26 6 14Z" fill="#14100c"/>
      <path d="M18 6 6 14" stroke="#9e2b25" stroke-width="5.4" stroke-linecap="round"/>
    </svg>`,
  /* a rune amulet hung from a ring */
  charm: `<svg viewBox="0 0 48 48" fill="none" stroke-linejoin="round">
      <circle cx="24" cy="9" r="5" stroke="#14100c" stroke-width="2.8"/>
      <path d="M24 16 40 30 24 44 8 30Z" stroke="#14100c" stroke-width="2.8"/>
      <path d="M19 24v12M19 24l10 12M29 24v12" stroke="#9e2b25" stroke-width="2.8" stroke-linecap="round"/>
    </svg>`,
  /* a written scrap, struck through */
  purge: `<svg viewBox="0 0 48 48" fill="none" stroke-linejoin="round">
      <path d="M13 7h22v34H13z" stroke="#14100c" stroke-width="2.8"/>
      <path d="M18 15h12M18 21h12M18 27h8" stroke="#14100c" stroke-width="2" opacity=".55"/>
      <path d="M5 37 43 10" stroke="#9e2b25" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  /* a bearded axe: a flared blade on a haft, not a symmetrical arc */
  fury: `<svg viewBox="0 0 48 48">
      <rect x="18" y="4" width="5.5" height="40" fill="#14100c"/>
      <path d="M23.5 8 37 5.5C44 13 44.5 24 39.5 33L23.5 30Z"
            fill="#9e2b25" stroke="#14100c" stroke-width="2.4" stroke-linejoin="round"/>
    </svg>`
};

function renderConsumable(k){
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `vvk${k.spent ? ' is-spent' : ''}`;
  el.innerHTML = `
    <span class="vvc-rivet tl"></span><span class="vvc-rivet tr"></span>
    <span class="vvk-slash"></span>
    <span class="vvk-glyph">${KIT_GLYPH[k.glyph] || ''}</span>
    <span class="vvk-name">${k.name}</span>
    <span class="vvk-foot">
      <span class="vvk-cost">${k.cost}</span>
      <span class="vvk-once">${k.spent ? 'Spent' : 'One<br>use'}</span>
    </span>`;
  return el;
}

/* ═══════════════════════════════════════════════════════════════════════
   SAMPLE DATA
   Art is reused across a few cards — this is a frame study, not the
   final illustration set.
   ═══════════════════════════════════════════════════════════════════════ */

const CARDS = {
  rake: {
    id:'rake_oar_bank', title:'Rake the Oar-Bank', subtitle:'Oar Work',
    cost:2, stat:'STR', type:'Tactic',
    art:'art/card-rake-the-oar-bank.jpg',
    bands:{far:false,normal:true,close:true}, best:'close', shiftTo:'close',
    sure:'Close one band. Deal <b>6</b> to enemy <b>Sail</b>.',
    check:'STR 9+',
    bonus:'The enemy cannot change range next turn.',
    greater:'Also deal <b>3</b> to enemy <b>Crew</b>.',
    odds:{miss:40,bonus:45,greater:15},
    flavour:'Oars are cheaper than men.<br>Take the oars.'
  },
  lash: {
    id:'lash_the_hulls', title:'Lash the Hulls', subtitle:'Seamanship',
    cost:1, stat:'CON', type:'Tactic',
    art:'art/card-lash-the-hulls.jpg',
    bands:{far:true,normal:true,close:true}, best:null, shiftTo:null,
    sure:'Repair <b>4</b> to one area. Until your next turn the range cannot change.',
    sureShort:'Repair <b>4</b> to one area. Range is locked until your next turn.',
    check:'CON 7+',
    bonus:'Incoming area damage &minus;<b>2</b> this round.',
    greater:'Also discard a junk card.',
    odds:{miss:30,bonus:60,greater:10},
    flavour:'Now it is one deck,<br>and one of us leaves it.'
  },
  terms: {
    id:'strike_the_colours', title:'Offer Terms', subtitle:'Parley',
    cost:1, stat:'CHA', type:'Tactic',
    art:'art/battlefield-banner.jpg',
    bands:{far:true,normal:true,close:false}, best:'normal', shiftTo:null,
    sure:'Break enemy <b>Nerve</b> by <b>3</b>.',
    check:'CHA 8+',
    bonus:'They lose their next reaction.',
    greater:'If their nerve is below half, they strike sail.',
    odds:{miss:35,bonus:50,greater:15},
    flavour:'Every man aboard<br>has a price.'
  },
  swell: {
    id:'read_the_swell', title:'Read the Swell', subtitle:'Weatherwise',
    cost:0, stat:'LUK', type:'Tactic',
    art:'art/card-lash-the-hulls.jpg',
    bands:{far:true,normal:true,close:true}, best:'far', shiftTo:'far',
    sure:'Open one band. Draw a card.',
    check:'LUK 6+',
    bonus:'Your next roll this turn counts <b>+2</b>.',
    greater:'Draw a second card.',
    odds:{miss:25,bonus:55,greater:20},
    flavour:'The sea tells you twice.<br>Listen the first time.'
  }
};

/* Crew cards are the sole exception to flat card power (§12.1): they level
   with use, permanently and across runs, and levels raise numbers only. */
function sigrunAtLevel(level){
  const strike = 4 + level;
  const far    = 7 + level;
  const second = 2 + Math.floor(level / 2);
  return {
    id:'sigruns_volley', title:'Sigrún’s Volley', subtitle:'Bowmaster',
    cost:2, stat:'DEX', type:'Crew — Sigrún Bow-Hand', crew:true, level:level,
    art:'art/card-sigruns-volley.jpg',
    portrait:'art/crew-sigrun-bow-hand.jpg',
    bands:{far:true,normal:true,close:false}, best:'far', shiftTo:null,
    sure:`Strike a chosen area for <lv>${strike}</lv>. At far, for <lv>${far}</lv>.`,
    check:'DEX 8+',
    bonus:'That area cannot be repaired next turn.',
    greater:`Also strike a second area for <lv>${second}</lv>.`,
    odds:{miss:35,bonus:45,greater:20},
    flavour:'She counts the swell,<br>not the men.'
  };
}

const JUNK = {
  scorched: {
    title:'Scorched Rigging', clearCost:1,
    kind:'Junk · jammed into your deck',
    desc:'Cannot be played. Occupies a hand slot until removed.',
    flavour:'The fire ship left more than smoke.',
    tilt:-2.2
  },
  screaming: {
    title:'Screaming in the Hold', clearCost:1,
    kind:'Junk · jammed into your deck',
    desc:'Cannot be played. Persists across fights until removed.',
    flavour:'Nobody will go below to check.',
    tilt:2.6
  }
};

/* No rank, no renown — v3 cut both. What persists is crew levels, the
   consumable chest, the starting deck, and accrued legend (§11). */
const LEADER = {
  name:'Ingrith', byname:'Scale-Hand',
  portrait:'art/leader-ingrith-scale-hand.jpg',
  quote:'Weigh-master at Hedeby for nineteen years. She did not become a raider because she wanted more. She became one because she was owed.',
  stats:[
    {n:'Str', v:2, c:'#c85c52'}, {n:'Dex', v:3, c:'#6ba295'},
    {n:'Con', v:3, c:'#7b8b96'}, {n:'Cha', v:5, c:'#d09a4a'},
    {n:'Luck',v:2, c:'#a4788a'}
  ],
  passive:{
    name:'Weighed and Written',
    text:'You see the goods and prices of ports <b>one node further ahead</b>, and every surrender you accept pays <b>tribute</b> instead of salvage.'
  },
  ability:{
    name:'Name Your Price', cost:3,
    short:'Break enemy nerve by <b>4</b>. On <b>CHA 10+</b> a weakened foe strikes sail at once.',
    text:'Break the enemy’s nerve by <b>4</b>. <b>CHA 10+</b> — if their nerve is already below half, they strike their sail and offer terms at once.'
  },
  curses:[
    {g:'rigging', n:'Fouled Rigging', e:'Speed &minus;1. Decays after three nodes.'},
    {g:'illwind', n:'The Prize’s Weight', e:'Pursuit gains a node each port. Never curable.', perm:true}
  ]
};

const KIT = [
  {glyph:'draught', name:'Healing Draught',  cost:1, spent:false},
  {glyph:'charm',   name:'Rune of Unbinding',cost:1, spent:false},
  {glyph:'purge',   name:'Purge the Deck',   cost:2, spent:false},
  {glyph:'fury',    name:'Berserk Draught',  cost:2, spent:true}
];
