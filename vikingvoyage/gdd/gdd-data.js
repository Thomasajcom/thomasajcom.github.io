/* Viking Voyage — the game design document.
 *
 * THIS FILE IS THE DESIGN. index.html only draws it.
 *
 * Each module has:
 *   id, part, title, sum (one line)
 *   items   — { s, t, why?, rec?, list?, see?, tag? }
 *               s    "decided" | "played" | "open" | "risk" | "rejected"
 *               t    the statement, one short sentence
 *               why  the reason, one or two short sentences
 *               rec  a recommendation on an open question (a suggestion, not a decision)
 *               list short sub-points that belong to the statement
 *               see  ids of related modules
 *               tag  a small label, e.g. "Deferred"
 *   numbers — quantities that still need a value. Never invent one here.
 *   profiles — optional side-by-side panels, e.g. captains: { name, role, fields: [[label, text]] }
 *
 * Decided = chosen, not yet played.   Played = proven in a running game.
 * Open    = undecided; ask the designer, never infer.
 * Risk    = forward-looking caution.  Rejected = cut on purpose.
 *
 * After editing:  node gdd/check.mjs
 */
window.GDD = {
  meta: {
    title: "Viking Voyage",
    kind: "Game design document",
    revised: "2026-11-18",
    pitch: "Captain a longship. Steal a saga's prize. Carry it home. Then decide whether to set out again with everything you now carry.",
    facts: [
      ["Genre", "Viking naval roguelite"],
      ["Platform", "PC, Steam Early Access"],
      ["Engine", "Godot"],
      ["Team", "One person"],
      ["One voyage", "45–60 minutes"],
      ["Stage", "Design. No game code yet"]
    ]
  },

  /* The voyage, drawn as a route across the top of the page. */
  route: [
    { label: "Choose a saga", sub: "Captain fixed for the expedition", to: "endings", kind: "port" },
    { label: "Act I: outward", sub: "About 8 nodes", to: "map", kind: "leg", dots: 8 },
    { label: "The raid", sub: "Steal the prize", to: "voyage", kind: "peak" },
    { label: "Act II: sprint home", sub: "4–5 nodes, pursuit closing", to: "prize", kind: "leg", dots: 5 },
    { label: "Final battle", sub: "Saga-specific", to: "enemies", kind: "peak" },
    { label: "Homecoming", sub: "Set out again, or conclude", to: "expedition", kind: "port" }
  ],

  parts: [
    { id: "game", title: "The game" },
    { id: "captain", title: "Captains and progression" },
    { id: "ship", title: "The ship and the sea" },
    { id: "combat", title: "Combat" },
    { id: "make", title: "Presentation and production" },
    { id: "record", title: "The record" }
  ],

  modules: [

    /* ───────────────────────────── THE GAME ───────────────────────────── */

    {
      id: "pitch", part: "game", title: "At a glance",
      sum: "Steal a saga's prize, carry it home, decide whether to sail again.",
      items: [
        { s: "decided", t: "A single-player Viking naval roguelite, set around the year 1000." },
        { s: "decided", t: "You captain one longship: sail out, steal a known prize, fight to bring it home." },
        { s: "decided", t: "Solo project. PC first, on Steam. Built in Godot.", why: "It is a portfolio piece. Finishing something excellent matters more than revenue." },
        { s: "decided", t: "It shares no code, art or systems with any other project." },
        { s: "decided", t: "Tone: grounded historical survival first, heroic saga second. Myth is real but grows after the raid." },
        { s: "decided", t: "The structure borrows from FTL (ship health, scarce resources, a pursuer) and Slay the Spire (a branching route map). All content is original." },
        { s: "decided", t: "The originality lives in four things.", why: "Mechanics are not the moat. These four are what to pitch.",
          list: ["The heist structure", "The boon-and-drawback prize", "The per-captain convergence", "The single-expedition true ending"],
          see: ["voyage", "prize", "endings"] },
        { s: "decided", t: "Six pillars.",
          list: [
            "The longship is the build. Big choices change the vessel, not a crew you micromanage.",
            "Discovery earns replay. Sparse route information, unknown events, unusual rewards.",
            "Every gain competes for something finite: cargo space, station slots, silver.",
            "The raid is the hinge. You prepare for a known target, and success changes the voyage.",
            "Failure still advances you. Victory completes you.",
            "Legibility over density. Tense and clever without micromanagement."
          ] },
        { s: "decided", t: "The prime directive: every scope call is judged by one question. Can one person finish, fill and balance this in side-project time?" },
        { s: "risk", t: "Legibility's stress test is combat, which is a large system.", see: ["combat"] }
      ]
    },

    {
      id: "voyage", part: "game", title: "The voyage",
      sum: "One saga, 45–60 minutes: out, raid, sprint home.",
      items: [
        { s: "decided", t: "A voyage is one saga played out. It is the unit of play." },
        { s: "decided", t: "Target length: 45–60 minutes for a full successful voyage.", why: "A loss at minute 50 stings less than one at minute 85, and fewer nodes means less to author." },
        { s: "decided", t: "Four beats, always in this order.",
          list: ["Act I: the outward leg, about 8 nodes", "The midpoint raid", "Act II: the sprint home, 4–5 nodes", "The saga's final battle"] },
        { s: "decided", t: "Act I is for building enough ship, crew and knowledge to attempt a raid you know is coming." },
        { s: "decided", t: "Act II is short on purpose. It is a chase, not a second journey.", why: "The emotional peak is the theft. A long, burdened return could only feel like a comedown." },
        { s: "decided", t: "7–8 ordinary fights per voyage, plus the raid and the finale. Storm fights count.", see: ["combat"] },
        { s: "decided", t: "That leaves only 4–6 nodes without a fight, so ports and events are scarce and precious." },
        { s: "decided", t: "Each saga's raid has its own form: a blend of bespoke naval battle and event beats.", why: "One may be nearly all battle. Another may be a heist told mostly through events around a short fight." },
        { s: "decided", t: "Winning the raid does not complete a saga. Only bringing the prize home does." },
        { s: "decided", t: "A saga ends in its own final naval battle, not at a map exit." },
        { s: "decided", t: "The voyage ends at a homecoming, which is a junction, not an ending.", see: ["expedition"] },
        { s: "risk", t: "Act II must not be 'Act I but harder with a debuff'. Its novelty has to come from the drawback and the pursuit, with new node content." },
        { s: "risk", t: "The two-act heist has no genre precedent. Expect it to need more rework than anything else here." },
        { s: "risk", t: "The time budget barely closes. Fighting alone takes 30–44 of the 45–60 minutes.", see: ["combat"] },
        { s: "open", t: "Do elite fights count among the 7–8 ordinary fights, or come on top of them?" }
      ],
      numbers: ["Exact node counts by act and by branch"]
    },

    {
      id: "expedition", part: "game", title: "Expeditions and the chain",
      sum: "At every homecoming: set out again with the same ship, or conclude.",
      items: [
        { s: "decided", t: "An expedition is one captain's unbroken chain of voyages." },
        { s: "decided", t: "At each homecoming you choose: set out for another saga with the same ship, or conclude and bank everything." },
        { s: "decided", t: "A one-saga expedition is the default. Chaining is opt-in, every time." },
        { s: "decided", t: "Concluding at home is a victory, never a failure." },
        { s: "decided", t: "Everything carries between voyages.",
          list: ["Ship and upgrades", "Deck", "Specialists", "Hull damage", "Silver", "Every prize aboard, boon and drawback alike"] },
        { s: "decided", t: "Prizes are never shelved mid-expedition. Only concluding puts them in the hall." },
        { s: "decided", t: "Stacked drawbacks are the chain's only escalation. The world never scales.", why: "Later voyages are harder because the captain is rich and increasingly haunted, not because enemies grew.", see: ["prize"] },
        { s: "decided", t: "Which saga to take first is the chain's strategy: which boon you want longest, which drawback you can live with." },
        { s: "decided", t: "Home is the best port in the game.",
          list: ["Full repair and refit, for silver", "The travelling salesman", "Re-equip consumables from the chest", "Free crew reassignment"] },
        { s: "decided", t: "The starting-deck builder is pre-expedition only. Mid-chain the deck changes through rewards and paid removal." },
        { s: "decided", t: "Each saga at most once per expedition. The chain is three sagas in any order, then the convergence." },
        { s: "decided", t: "Defeat anywhere ends the expedition. No checkpoints, no retries.", see: ["defeat"] },
        { s: "decided", t: "Finishing the third saga while chained leads straight into the convergence as the final voyage.", see: ["endings"] },
        { s: "risk", t: "A defeat on the fourth voyage forfeits hours of play. Banking at every homecoming and save-and-quit are the counterweights and must be protected." },
        { s: "risk", t: "Every saga must work for two arrivals: fair for a fresh ship, still a challenge for a rich, cursed one." },
        { s: "risk", t: "A later voyage starts already haunted, so its Act I is no longer clean exploration. That is intended." },
        { s: "risk", t: "A chained ship may outgrow the sagas. There is a warning sign for a chain that is too hard, but none yet for one that is too easy.", see: ["stakes"] },
        { s: "open", t: "After the third saga, is there a homecoming with repairs and the choice to conclude before the convergence begins?" },
        { s: "open", t: "A captain completed a saga in an earlier expedition. Mid-chain, can they take that prize from the hall, or must they replay the saga?" }
      ],
      numbers: ["Home repair and refit prices between voyages"]
    },

    {
      id: "endings", part: "game", title: "Sagas, convergence, endings",
      sum: "Three sagas in any order unlock a fourth. One unbroken expedition earns the true ending.",
      items: [
        { s: "decided", t: "Three deeply different raid sagas, plus a fourth: the convergence." },
        { s: "decided", t: "Each saga sets its own prize, raid, enemy and weather palette, boon, drawback and final battle." },
        { s: "decided", t: "The three can be attempted in any order. Completed sagas stay replayable." },
        { s: "decided", t: "The sagas are deliberately unequal. Each has its own flat difficulty, shown at saga selection.", why: "A newcomer is steered without being gated." },
        { s: "decided", t: "Difficulty never ramps with the order you play them." },
        { s: "decided", t: "Progress is tracked per captain. A captain who has brought home all three prizes, over any number of expeditions, unlocks their convergence." },
        { s: "decided", t: "In the convergence the captain carries all three prizes: three boons, three drawbacks, one final raid." },
        { s: "decided", t: "The convergence is one authored saga, not one per captain. Captains differ by their own kit." },
        { s: "decided", t: "It is hand-built as the hardest content in the game, tuned for a fresh ship taking the three prizes from the hall." },
        { s: "decided", t: "Winning it that way is the normal ending." },
        { s: "decided", t: "The true ending: win the convergence as the last voyage of one unbroken expedition. All three sagas, each once, no defeat." },
        { s: "decided", t: "The true ending has its own finale, a harder hand-built fight, and its own epilogue.", why: "A chained ship is stronger than the fresh one the convergence is tuned for. The crown should not be the easy version." },
        { s: "decided", t: "The chain gates only that finale and epilogue. Every saga and the convergence itself can be reached without chaining." },
        { s: "risk", t: "The convergence couples the sagas: three boons must combine and three drawbacks must stack fairly. It cannot be judged until all three exist. This is the highest-risk system." },
        { s: "risk", t: "Design each prize asking how it reads next to the other two, from the start." },
        { s: "open", t: "The content of all three sagas and the convergence: prizes, targets, raids, palettes, final battles." },
        { s: "open", t: "How the three boons combine and the three drawbacks stack." },
        { s: "open", t: "Does the convergence follow the same two-act shape as a saga?" },
        { s: "open", t: "Do final-battle allies exist at all?" }
      ]
    },

    {
      id: "defeat", part: "game", title: "Winning and losing",
      sum: "Nobody dies. Defeat ends the expedition, not the captain.",
      items: [
        { s: "decided", t: "The captain always survives and washes home. There is no game-over screen." },
        { s: "decided", t: "Defeat means the ship is lost at sea: its Hull HP reached zero." },
        { s: "decided", t: "Defeat ends the expedition, wherever in the chain it happens." },
        { s: "decided", t: "Kept on defeat.",
          list: ["Crew levels earned", "Consumables recovered along the way", "Every saga already brought home", "Silver banked at earlier homecomings"] },
        { s: "decided", t: "Lost on defeat.",
          list: ["The ship build and its upgrades", "Specialists", "Cargo", "Any prize still in transit", "Silver earned since the last homecoming"] },
        { s: "decided", t: "Silver only becomes safe at a homecoming.", why: "It gives 'set out again or conclude' a real stake, and stops defeat being cheap." },
        { s: "decided", t: "A saga banked at a homecoming is permanent, whatever happens later." },
        { s: "decided", t: "A broken chain still counts toward the convergence for every saga it brought home." },
        { s: "risk", t: "The loss is severe by design. What is kept must be enough to sail again better equipped." },
        { s: "open", t: "Is the purse brought from home also lost on defeat, or only what the expedition earned?" },
        { s: "open", t: "Are equipped but unused consumables kept on defeat?" }
      ]
    },

    /* ─────────────────────── CAPTAINS AND PROGRESSION ─────────────────────── */

    {
      id: "captains", part: "captain", title: "Captains",
      sum: "Each captain champions one statistic and one way to win a fight.",
      items: [
        { s: "decided", t: "Each captain champions one statistic, and with it one way to win a fight.", why: "Without this, captains would be the same captain with a different number highlighted.",
          list: [
            "Strength: sink them",
            "Dexterity: strip them, area by area",
            "Charisma: break their crew and make them surrender",
            "Constitution: outlast them (a later captain)",
            "Luck: gamble on the dice (a later captain)"
          ], see: ["roster", "dice", "enemies"] },
        { s: "decided", t: "The first version has three captains: Strength, Dexterity and Charisma.", why: "These are the three ways the rules actually end a fight. Constitution and Luck are the hardest to design, and get easier once combat has been played.", see: ["roster", "production"] },
        { s: "decided", t: "More captains are added over Early Access. The total may pass five." },
        { s: "decided", t: "The first captains share one home settlement. Each had a trade before raiding, and the trade explains the kit.", why: "It fits the grounded tone and a settlement that sends its own people. Later captains may come from further afield." },
        { s: "decided", t: "A captain's statistics have one peak, one hole and three equal ones in the middle.", why: "The hole matters as much as the peak. It decides which rewards you pass on." },
        { s: "decided", t: "Statistics are fixed when you pick a captain and never change.", why: "Every economy in the game assumes a player who never out-scales the content." },
        { s: "decided", t: "That makes captain choice the weightiest decision in the game. It sets which cards sparkle and which range you prefer." },
        { s: "decided", t: "The captain is fixed for the whole expedition." },
        { s: "decided", t: "Each captain has a two-part kit: one always-on passive and one unique active ability." },
        { s: "decided", t: "The passive bends one resource: cargo, repair supplies, crew or silver.", why: "It must be explainable in one sentence, never mandatory for a saga, and need no micromanagement." },
        { s: "decided", t: "The active ability works like a card: a guaranteed effect, then a d20 roll on the captain's best statistic.", why: "One rule for everything the player does, and the champion of a statistic feels it every turn.", see: ["turn", "dice"] },
        { s: "decided", t: "No part of a kit grants information. Scouting belongs to specialists.", see: ["map"] },
        { s: "decided", t: "When a Luck captain is added, their kit bends the dice rule for them alone.", why: "Luck only enlarges bonuses that another statistic triggers, so a Luck-first captain would otherwise be its worst user. For everyone else Luck stays 'bigger, never more often'.", see: ["dice"] },
        { s: "decided", t: "Each captain has a set base deck that defines how they play. You may customise it before an expedition, within limits." },
        { s: "decided", t: "A new player picks from two captains. The third arrives after a number of finished expeditions, won or lost.", why: "A real choice on day one, and one thing to earn. Counting losses too means nobody gains by throwing a voyage.", see: ["roster"] },
        { s: "decided", t: "Captains added later arrive the same way, or are met and recruited through story events." },
        { s: "risk", t: "Every captain is two ability designs, a stat line and a starting deck to tell apart and balance." },
        { s: "risk", t: "Nobody champions Constitution or Luck at first. Check that cards keyed to them are still rewards worth taking." },
        { s: "risk", t: "Deck limits must be tight enough that a Strength captain still feels like one after customising." },
        { s: "risk", t: "The captain-select screen must show how each one plays, not only their numbers." },
        { s: "open", t: "The Constitution and Luck captains, and any beyond five." },
        { s: "open", t: "How exactly a Luck captain bends the dice. A reroll is one example." },
        { s: "open", t: "The starting-deck limits.", rec: "A maximum deck size, and minimum counts by role: attack, defence, healing." },
        { s: "open", t: "Should a captain's passive be able to grant limited field repair?", rec: "Yes, as a way to tell captains apart." }
      ],
      numbers: ["Finished expeditions needed for a new captain", "Starting deck size and make-up per captain"]
    },

    {
      id: "roster", part: "captain", title: "The first three captains",
      sum: "A whaler who sinks them, a sailmaker who strips them, a skald who talks them out of fighting.",
      profiles: [
        { name: "Thorgrim Cold-Iron", role: "The Whaler", fields: [
          ["Best at", "Strength, 10"],
          ["Worst at", "Charisma, 0"],
          ["Wins by", "Sinking them"],
          ["Ability: Cold Iron", "Harpoon the Hull. At Far, haul the enemy to Close. At Close, the blow lands harder instead. Strength roll: the line holds, and they cannot pull away next turn."],
          ["Passive: Nothing Wasted", "A ship you sink gives up more salvage."],
          ["Available", "From the start"]
        ] },
        { name: "Thora Wool-Wind", role: "The Sailmaker", fields: [
          ["Best at", "Dexterity, 10"],
          ["Worst at", "Strength, 0"],
          ["Wins by", "Stripping them, area by area"],
          ["Ability: Needle's Eye", "Strike one chosen area precisely, from any range. Dexterity roll: the strike also damages a second area of your choice."],
          ["Passive: Mend and Make Do", "Your own area repairs use fewer supplies."],
          ["Available", "From the start"]
        ] },
        { name: "Eirikur Gull-Tongue", role: "The Skald", fields: [
          ["Best at", "Charisma, 10"],
          ["Worst at", "Dexterity, 0"],
          ["Wins by", "Breaking their crew, then demanding surrender"],
          ["Ability: The Shaming Verse", "A mocking verse that damages the enemy's Crew area. Charisma roll: a ship that is damaged enough surrenders. If it cannot surrender yet, the verse does more Crew damage."],
          ["Passive: Sung Home", "Your injured specialists are rescued more often."],
          ["Available", "Arrives after a number of finished expeditions"]
        ] }
      ],
      items: [
        { s: "decided", t: "Each one's worst statistic is another's best.", why: "Each captain is bad at one of the other two ways to win. None can do everything, and their reward choices differ sharply.",
          list: ["Thorgrim is worst at Charisma", "Eirikur is worst at Dexterity", "Thora is worst at Strength"] },
        { s: "decided", t: "Each stat line is 10 in the best statistic, 0 in the worst, and 5 in the other three.", see: ["dice"] },
        { s: "decided", t: "Each passive bends a different resource: cargo for Thorgrim, repair supplies for Thora, crew for Eirikur." },
        { s: "decided", t: "Eirikur's roll always matters. When a ship cannot surrender yet, the verse does more Crew damage instead.", why: "Early in a fight no ship is damaged enough, and in multi-ship fights nobody can surrender. Without this his roll would usually do nothing." },
        { s: "decided", t: "Thorgrim's harpoon changes the range without a card. Everyone else needs a range card for that.", why: "He hunted whales from an open boat. Choosing the distance is his whole trade.", see: ["range"] },
        { s: "decided", t: "Thora's ability is precise at any range. Everyone else must close to reliably hit the area they choose.", why: "Stripping a ship needs dependable aim, and she spent a life learning where rigging fails.", see: ["range", "areas"] },
        { s: "decided", t: "Eirikur's verse is a demand for surrender that is always to hand. Other captains need a Charisma card to make one.", see: ["enemies"] },
        { s: "decided", t: "Thorgrim and Thora are available from the start. Eirikur arrives later.", see: ["captains"] },
        { s: "risk", t: "One use of Cold Iron always brings a Far ship to Close. The enemy roster needs ships that hurt at Close, or nothing can keep him off.", see: ["enemies"] },
        { s: "risk", t: "Thorgrim changes range without a card. Check that range cards still matter in his deck." },
        { s: "risk", t: "Thora never needs to close. Check that close range still matters to her." },
        { s: "risk", t: "Needle's Eye can damage two areas in one action. Keep its numbers small." },
        { s: "risk", t: "Eirikur's passive stacks with Charisma, which already improves the rescue roll. He may lose almost no crew." },
        { s: "risk", t: "Nobody can surrender in a multi-ship fight. There Eirikur leans on Crew damage and on his own crew.", see: ["enemies"] },
        { s: "open", t: "The greater effect of each ability, on its Luck roll." },
        { s: "open", t: "Can Cold Iron still haul a ship in when Thorgrim's own Sail is disabled?" },
        { s: "open", t: "The three base decks." },
        { s: "open", t: "A line or two of story for each captain, and their portraits." },
        { s: "open", t: "The home settlement's name." }
      ],
      numbers: ["Energy cost of each ability", "How much harder Cold Iron hits at Close", "How much extra salvage Thorgrim takes", "How many supplies Thora's repairs save", "How much Eirikur improves the rescue roll"]
    },

    {
      id: "progression", part: "captain", title: "What you keep",
      sum: "Captains never get stronger. The crew, the chest and the purse do.",
      items: [
        { s: "decided", t: "What persists across expeditions.",
          list: ["Crew type levels", "The consumable collection", "Banked silver", "Unlocked cards", "Saga completions, per captain", "Ship classes", "Captains"] },
        { s: "decided", t: "Silver is the only currency that persists. There is no rank ladder." },
        { s: "decided", t: "Captains never gain raw statistics." },
        { s: "decided", t: "Crew levels attach to the type, not the person. Every Healer you ever hire uses the same Healer level." },
        { s: "decided", t: "A type levels once per fight won in which its signature card was played.", why: "Progress cannot be farmed by stalling, and a lost voyage still levels crew through the fights it won.", see: ["deck"] },
        { s: "decided", t: "Levels raise numbers only: damage, healing and the like. Never rules or new effects." },
        { s: "decided", t: "A handful of levels per type, each clearly felt. A veteran crew is a real power spike." },
        { s: "decided", t: "Levels are permanent and survive any individual's death." },
        { s: "decided", t: "Consumables are one-use items in a collection that only grows. You equip a few per expedition.", see: ["turn"] },
        { s: "decided", t: "Every voyage recovers some, win or lose. Successful ones recover more." },
        { s: "decided", t: "Consumable equip slots unlock through achievements." },
        { s: "decided", t: "Unlocked cards widen what a starting deck can be built from. They are discovered during voyages." },
        { s: "decided", t: "Before an expedition sails.",
          list: ["Choose a captain", "Customise the starting deck", "Equip consumables", "Visit the travelling salesman"] },
        { s: "decided", t: "The salesman sells consumables, cards and more." },
        { s: "decided", t: "The settlement is the home screen between expeditions. It does not grow, and has nothing to upgrade.",
          list: ["Captain select", "The deck builder", "The consumable chest", "The travelling salesman", "The hall of prizes"], see: ["rejected"] },
        { s: "decided", t: "One difficulty. No selector, no tiers, no scaling to player power." },
        { s: "decided", t: "The game gets easier as crew levels, consumables and silver accumulate. This is intended.", why: "Accumulating is how a player earns the harder sagas and the convergence." },
        { s: "decided", t: "The veteran's challenge is the expedition chain: structure, not a difficulty dial.", see: ["expedition"] },
        { s: "decided", t: "At least three ship classes. One from the start; the others are unlocked." },
        { s: "risk", t: "The difficulty curve is inverted. A newcomer meets the harshest version: level-one crew, an empty chest, no silver. The retention risk lives in the first voyages." },
        { s: "risk", t: "Ship classes should differ by slots and statistics only. Bespoke rules per class are expensive." },
        { s: "open", t: "The achievement system. It gates equip slots and possibly ship classes, and is undefined." },
        { s: "open", t: "How ship classes unlock, and how far they differ." },
        { s: "open", t: "The salesman's stock and prices." },
        { s: "open", t: "Are crew levels, silver and the chest shared by all captains, or kept per captain?" },
        { s: "open", t: "What does buying a card from the salesman do: unlock it for good, or add it to this expedition's deck?" }
      ],
      numbers: ["Levels per specialist type, and what each adds", "Fights won per level, and whether that escalates", "Equip-slot count and unlock pacing", "Consumables recovered per voyage, won versus lost"]
    },

    /* ───────────────────────── THE SHIP AND THE SEA ───────────────────────── */

    {
      id: "ship", part: "ship", title: "The longship",
      sum: "Five areas, a few big upgrades, a crew that fits the stations.",
      items: [
        { s: "decided", t: "The ship has five areas.", why: "Deliberately lighter than a room-by-room model.",
          list: ["Hull", "Sail and rigging", "Weapons", "Cargo", "Crew"], see: ["areas"] },
        { s: "decided", t: "Four ship statistics: Hull HP, Speed, station capacity, cargo capacity." },
        { s: "decided", t: "Major rewards come in three classes.",
          list: ["Area module: attaches to one area and changes it", "Artifact: changes a broad rule for the whole expedition", "Specialist: a named crew member who gives the ship a capability"] },
        { s: "decided", t: "Most upgrades are area-bound." },
        { s: "decided", t: "A major upgrade changes the ship and grants a card.", why: "If upgrades gave only cards, the build would be the deck and the vessel would be scenery." },
        { s: "decided", t: "A first voyage reaches the raid with 3–5 major upgrades and specialists. Small and legible." },
        { s: "decided", t: "A major upgrade can be replaced at any time. The old one is lost.", why: "Slots fill during the first voyage. Without replacement, the later voyages of a chain would have no ship-building left." },
        { s: "decided", t: "Ordinary upgrades are pure benefits. Their cost is the slot. Real drawbacks are kept for mythic artifacts and the prize." },
        { s: "decided", t: "Specialists are named individuals with a portrait and a role. They appear in the log and in events. You never control them directly." },
        { s: "decided", t: "Crew capacity is station slots. A full ship cannot recruit without letting someone go.", why: "That is the whole cost of crew. There is no upkeep.", see: ["crew"] },
        { s: "decided", t: "At most one specialist of each type aboard.", why: "Crew cards never duplicate, and recruiting stays a question of who, not how many." },
        { s: "decided", t: "Every specialist type is available from the first voyage. They come from events, fights and the salesman." },
        { s: "decided", t: "A specialist who is lost is gone for good. The type can be hired again, at the level it has reached." },
        { s: "decided", t: "Losing a specialist should sting, but be rare." },
        { s: "risk", t: "Keep crew writing small but real: a name, a portrait, a role, a line or two. No companion arcs." },
        { s: "open", t: "When an upgrade is replaced, does the card it granted leave the deck?" },
        { s: "open", t: "Slot counts per area, and the rules for specialist capacity." },
        { s: "open", t: "Are artifacts limited by slots?" },
        { s: "open", t: "The specialist roster. Navigator, shipwright, bowmaster, healer, trader and seer are examples only." },
        { s: "open", t: "The catalogue of modules and artifacts." }
      ],
      numbers: ["Hull HP by ship class", "Station slots per area, per class", "Cargo capacity", "What each upgrade moves"]
    },

    {
      id: "resources", part: "ship", title: "Resources and pressure",
      sum: "Hull is the pressure. Silver, cargo and pursuit shape it.",
      items: [
        { s: "decided", t: "Four resources: hull condition, silver, cargo, pursuit." },
        { s: "decided", t: "Hull is the primary pressure and the only long-term attrition.", why: "Damage is hard to undo, so it shapes which route you dare take." },
        { s: "decided", t: "Silver is an abstract number, not cargo. It is spent at ports, at home between voyages, and at the salesman." },
        { s: "decided", t: "Silver has three competing jobs: repair now, refit at home, or bank it for next time." },
        { s: "decided", t: "Cargo holds trade goods, salvage and repair supplies. The prize and the crew take no cargo space." },
        { s: "decided", t: "Repair supplies are a repair material, not upkeep.", why: "Nothing uses them except your own repairs, and running out ends nothing.", see: ["areas"] },
        { s: "decided", t: "Pursuit is a visible track that starts after the raid. Act II only." },
        { s: "decided", t: "Pursuit advances every node, and Act II choices add to it or shed it." },
        { s: "decided", t: "The pursuit level you arrive with decides how strong the final battle is, from a few hand-built versions.", why: "A track you can only watch tick is tension without agency." },
        { s: "decided", t: "No reputation, no food, no hunger.", see: ["rejected"] },
        { s: "risk", t: "Pursuit is close to FTL's rebel fleet. Give it saga flavour: a named pursuer, the drawback feeding the chase." },
        { s: "risk", t: "Repair supplies behave much like the food resource that was rejected: a stock in the hold that depletes and burns. Watch that they never become a chore." },
        { s: "open", t: "How many versions of the final battle each saga needs." }
      ],
      numbers: ["Pursuit starting value and number of steps", "Supply capacity", "Supplies used per repair"]
    },

    {
      id: "map", part: "ship", title: "The route map",
      sum: "A branching map with sparse information and guaranteed set pieces.",
      items: [
        { s: "decided", t: "A branching route map. No free roaming." },
        { s: "decided", t: "Usually two onward routes. Important moments offer three or four." },
        { s: "decided", t: "Each saga has a fixed broad shape with procedural node contents. The raid and the final battle are guaranteed." },
        { s: "decided", t: "Map information is sparse: you see a node's broad type. Specialists reveal a little more." },
        { s: "decided", t: "Everyone always sees a node's broad threat level and enemy class, elite status included.", why: "You cannot flee a fight, so the choice to fight must be an informed one. No hire should be mandatory for that.", see: ["stakes"] },
        { s: "decided", t: "Eight node types.",
          list: [
            "Naval combat",
            "Port or trader: repairs, card removal, hiring, trade",
            "Storm or dangerous passage: a fight with weather, or a choice with hull and cargo at stake",
            "Story event",
            "Salvage or wreck",
            "Rival Viking crew",
            "Mythic encounter",
            "Small coastal raid: optional, lucrative, hull-risking"
          ] },
        { s: "decided", t: "Common: combat, events, ports, storms. Rare and exciting: salvage, rivals, mythic encounters, small raids." },
        { s: "decided", t: "Node type sets the weather and terrain a fight carries.", see: ["enemies"] },
        { s: "decided", t: "Act I: about 8 nodes. Difficulty rises with depth. Safe ports are guaranteed. Dangerous optional branches trade risk for reward." },
        { s: "decided", t: "Act II: 4–5 nodes, more mythic, shaped by the saga's prize. Slightly harder, while good preparation feels powerful." },
        { s: "decided", t: "Act II has exactly one haven. It repairs and refits, but cannot lift curses." },
        { s: "decided", t: "The prize cannot be abandoned or destroyed." },
        { s: "risk", t: "Eight node types is a lot for one person. Four need depth early; the rare four can each start as one strong example." },
        { s: "risk", t: "Every Act II node must land. It should be the most saga-distinct content in the game, not recycled Act I fights." },
        { s: "risk", t: "Most nodes are fights and most choices offer two routes, so the map often decides which fight, not whether to fight." },
        { s: "open", t: "Generation rules: spacing of ports, elites and events; duplicate prevention; rarity of mythic nodes and small raids." },
        { s: "open", t: "What exactly a navigator reveals. Deliberately modest." },
        { s: "open", t: "Does the map show the range a fight will start at?", rec: "Yes. Enemy class is always shown before you commit, so the class can tell you." },
        { s: "open", t: "Specs for salvage, rival, mythic and small-raid nodes. Each is one line so far." },
        { s: "open", t: "Seed display and sharing." }
      ]
    },

    {
      id: "events", part: "ship", title: "Events, rewards, rivals",
      sum: "Many events, card rewards after every fight, rivals that last one expedition.",
      items: [
        { s: "decided", t: "Events are a headline feature, and there will be many. They carry flavour, lore and much of the loot." },
        { s: "decided", t: "Two shapes: choice events with uncertain outcomes, and pure reward events." },
        { s: "decided", t: "Events are a main source of specialists, captains, cards and consumables." },
        { s: "decided", t: "Outcomes are mostly hidden. Players learn through repeated play." },
        { s: "decided", t: "The fairness rule: the writing must give enough fictional clues that a consequence feels earned.", why: "It is the difference between 'mysterious' and 'the game cheated me'." },
        { s: "decided", t: "Events branch on ship state, resources, crew and captain passives. Never on how the player has behaved." },
        { s: "decided", t: "A normal fight offers two or three reward directions, with some randomness." },
        { s: "decided", t: "Cards are the main reward. Nearly every source grants one.", see: ["deck"] },
        { s: "decided", t: "Hull is never handed back for free after a fight. It is patched with supplies, or mended at a port for silver." },
        { s: "decided", t: "Elites offer a choice among major modules, rare artifacts and exceptional specialists." },
        { s: "decided", t: "Most enemies are disposable. Named rivals recur within one expedition only.", why: "No memory between expeditions, no saved grudges, nothing to balance against a levelled crew." },
        { s: "decided", t: "A rival appears when a named enemy escaped an earlier fight, or a named character from an event returns as a fight." },
        { s: "decided", t: "Sparing a surrendered enemy yields intact cargo. Finishing them yields salvage. Different loot, not less, and no lasting consequence." },
        { s: "risk", t: "Events are the largest content commitment. Budget for rewrites once playtests show which ones read as arbitrary." },
        { s: "risk", t: "With flat card power and full slots, the later voyages of a chain may offer few rewards worth wanting." },
        { s: "open", t: "How many rivals may recur in one expedition, and whether a rival can become an ally." },
        { s: "open", t: "How many events the game needs." }
      ],
      numbers: ["Cards per reward offer", "The automatic resource trickle after a fight", "The reduced offer when an enemy escapes"]
    },

    {
      id: "prize", part: "ship", title: "The prize",
      sum: "A boon you chose and a drawback you did not.",
      items: [
        { s: "decided", t: "Three words, three meanings.",
          list: [
            "Drawback: what carrying the prize costs. Fixed per saga, never curable.",
            "Curse: a supernatural debuff. Never a card.",
            "Negative cards: junk cards jammed into your deck until removed."
          ], see: ["clutter"] },
        { s: "decided", t: "Every prize has a drawback. Some are curses. Others are purely physical: a heavy bell makes a slow ship.", why: "A physical drawback reuses ship statistics, so it is far cheaper to build. Not every prize needs to be haunted." },
        { s: "decided", t: "The prize sits in its own protected slot. It takes no cargo space and cannot be damaged, destroyed or stolen." },
        { s: "decided", t: "The boon is passive and always on." },
        { s: "decided", t: "You see the boon when choosing the saga. The drawback is unknown until it emerges.", why: "An informed temptation that still keeps a discovery." },
        { s: "decided", t: "The drawback creeps in over Act II: a small wrongness first, then escalating." },
        { s: "decided", t: "On a continuing expedition the drawback stays at full strength for every later voyage.", see: ["expedition"] },
        { s: "decided", t: "One fixed drawback per prize. It is part of the saga's identity." },
        { s: "decided", t: "Nothing cures a drawback. Not consumables, not ports, not the haven." },
        { s: "decided", t: "The prize adds no cards to the deck." },
        { s: "decided", t: "The boon is the most important balance lever in the game.", why: "A wounded, cursed ship must still feel formidable on the way home.", see: ["stakes"] },
        { s: "risk", t: "A passive-only boon can feel flat. The boon or the drawback must change how the voyage is played, not only its numbers." },
        { s: "risk", t: "Before building a prize, work one through on paper: the exact boon, the exact drawback, and the three Act II nodes it changes." },
        { s: "open", t: "The three prizes, their boons and their drawbacks." },
        { s: "open", t: "Should the prize influence combat more directly than this?" }
      ]
    },

    /* ─────────────────────────────── COMBAT ─────────────────────────────── */

    {
      id: "combat", part: "combat", title: "Combat at a glance",
      sum: "A card game between longships that take each other apart.",
      items: [
        { s: "decided", t: "Naval combat is the game's only tactical system.", why: "The moment a 'small land combat mode' appears, the project doubles." },
        { s: "decided", t: "The feeling: dismantle an enemy ship piece by piece while keeping your own afloat." },
        { s: "decided", t: "Turn-based, with unlimited time to inspect before committing." },
        { s: "decided", t: "You command the ship, never individual Vikings. No boarding control." },
        { s: "decided", t: "Three ways to act, one energy pool: cards, the captain's ability, consumables.", see: ["turn"] },
        { s: "decided", t: "Time budget.",
          list: ["Normal fight: 2–4 minutes", "Raid and final battle: 8–10 minutes each"] },
        { s: "decided", t: "The voyage only fits its length if normal fights sit at 2–3 minutes.", see: ["voyage"] },
        { s: "decided", t: "Most fights are one against one." },
        { s: "decided", t: "The player cannot flee and cannot surrender. The decision to fight is made on the map.", see: ["stakes"] },
        { s: "risk", t: "If fights routinely pass four minutes, something must be cut, not accommodated." },
        { s: "risk", t: "About 25 card plays in a 2–3 minute fight is roughly six seconds per play, enemy turns included." },
        { s: "risk", t: "This is a large system. Do not claim 'simpler than FTL' until a playtester says so." },
        { s: "open", t: "Elite fight length. 4–6 minutes is an interpolation, not a decision." },
        { s: "open", t: "The in-combat condition model: stacking, expiry, display." }
      ],
      numbers: ["Turns in a normal fight", "Elite fight length"]
    },

    {
      id: "dice", part: "combat", title: "Cards and dice",
      sum: "Every card has a sure part and a lucky part. Dice only ever give.",
      items: [
        { s: "decided", t: "Every card resolves in two parts: a guaranteed effect, then a d20 roll for something extra." },
        { s: "decided", t: "There is no failure penalty anywhere.", why: "Punishing dice on top of random draws, no escape and expedition-ending loss would make a death spiral driven by luck, not decisions." },
        { s: "decided", t: "Two thresholds: a lower one for a modest bonus, a higher one for a much larger effect." },
        { s: "decided", t: "The card's primary statistic sets the chance of the bonus. Luck sets the chance it becomes the greater effect.", why: "Luck can never make a bonus happen, only make one bigger. That stops it being a super-stat." },
        { s: "decided", t: "A statistic is the number you add to the d20. Nothing is hidden.", why: "Anyone can check the odds in their head, and a curse that dulls Strength by 2 means exactly that." },
        { s: "decided", t: "First values: 10 in a captain's best statistic, 5 in the middle, 0 in the worst, against a card target of 16.", why: "The bonus lands 3 times in 4 on your best statistic, half the time in the middle, and 1 time in 4 on your worst.", see: ["roster"] },
        { s: "decided", t: "The greater effect is a second d20, rolled with Luck, and only when the bonus has landed." },
        { s: "decided", t: "Odds are capped below certainty.", why: "Otherwise a well-matched captain's dice quietly stop existing." },
        { s: "decided", t: "Odds also shift with range and situation: enemy state, disabled areas, conditions." },
        { s: "decided", t: "Exact odds are shown before you commit." },
        { s: "decided", t: "Off-stat cards are never dead. They deliver the full guaranteed effect; only the bonus lands less often.", why: "With five statistics and one captain, most offered cards key to a statistic you lack. They must still be worth taking." },
        { s: "decided", t: "Five statistics.",
          list: [
            "Strength: heavy attacks, ramming, brute tactics",
            "Dexterity: precision, targeting areas, deft manoeuvres",
            "Constitution: holding the line, soaking area damage, better repairs",
            "Charisma: nerve, rallying, intimidation, driving surrender",
            "Luck: escalation only"
          ], see: ["captains"] },
        { s: "decided", t: "No card can be Luck-primary." },
        { s: "risk", t: "All pressure comes from the enemy and the environment, because dice never punish. Design them accordingly." },
        { s: "risk", t: "Luck must be worth having without becoming the stat everyone needs." },
        { s: "risk", t: "A second die on every landed bonus adds waiting to fights that must take 2–3 minutes. Keep that roll fast." },
        { s: "open", t: "Do all cards share the target of 16, or does each card set its own?" },
        { s: "risk", t: "Constitution is the classic dead stat. If six interesting Constitution cards cannot be written, fold it into Hull, knowing that orphans a captain." },
        { s: "open", t: "What a natural 1 and a natural 20 do.", rec: "A 20 grants the greater effect outright. A 1 just means no bonus. A penalty on a 1 would bring back punishing dice." }
      ],
      numbers: ["The Luck roll's target for the greater effect", "The cap below certainty", "How much range and enemy state shift the odds"]
    },

    {
      id: "deck", part: "combat", title: "The deck",
      sum: "No rare cards. A deck is good because it fits together.",
      items: [
        { s: "decided", t: "Cards are literal, named Viking tactics." },
        { s: "decided", t: "A card carries five things.",
          list: ["A guaranteed effect", "A roll effect", "An energy cost", "A primary statistic", "Any range preference"] },
        { s: "decided", t: "No rarity and no power tiers. All cards are peers, with one exception: crew cards." },
        { s: "decided", t: "Cards are never used up, and there is no per-fight limit on replaying them." },
        { s: "decided", t: "The card pool is universal. No saga-specific cards." },
        { s: "decided", t: "With power flat, coherence is the game. Cards relate along four axes.",
          list: ["Range band", "Captain statistic", "Crew", "Targeting focus"] },
        { s: "decided", t: "No separate keyword or tag system." },
        { s: "decided", t: "Declining a card reward is always free." },
        { s: "decided", t: "Ports offer cheap, frequent card removal." },
        { s: "decided", t: "The deck has a minimum size you cannot trim below by choice. Losing a specialist may drop it lower." },
        { s: "decided", t: "Each specialist type has a small set of cards, shared by everyone of that type. One is the signature card." },
        { s: "decided", t: "Crew cards grow with the type's level. They are the only cards that get stronger.", see: ["progression"] },
        { s: "decided", t: "A crew card leaves the deck when its specialist is lost, and is drawn but unplayable while they are injured.", see: ["crew"] },
        { s: "decided", t: "When the draw pile empties, the discard pile reshuffles into it." },
        { s: "risk", t: "Synergy is implicit. The card face must make range, statistic and focus readable at once, or players never see the deck they are building." },
        { s: "risk", t: "Cheap removal plus unlimited replays invites trimming to crew cards and spamming them. Minimum deck size is the only guard. If testers converge on identical minimum decks, it is too low." },
        { s: "open", t: "The card pool itself: how many cards, and what they are." }
      ],
      numbers: ["Minimum deck size", "How card costs are spread", "Card removal price, and whether it rises"]
    },

    {
      id: "turn", part: "combat", title: "Turns, energy and Speed",
      sum: "Fast ships act often with small hands. Slow ships act rarely with big ones.",
      items: [
        { s: "decided", t: "Draw to a full hand each turn: five at baseline. Unplayed cards are discarded." },
        { s: "decided", t: "Cards cost 0–3 energy. Unspent energy does not carry over." },
        { s: "decided", t: "Energy is never reduced by damage or any condition.", why: "A wrecked ship still has a full set of choices. This is the strongest anti-spiral guard in the design." },
        { s: "decided", t: "The player always acts first. No initiative roll; enemies are stronger to compensate." },
        { s: "decided", t: "After that, a visible timeline driven by Speed sets the turn order." },
        { s: "decided", t: "The Speed trade: a faster build acts more often, with a smaller hand and less energy each turn.", why: "Speed buys timing, never resources. Neither build is stronger." },
        { s: "decided", t: "Speed comes in two or three fixed steps, each with a hand-picked hand size and energy. An upgrade moves a whole step.", why: "With whole cards and whole energy, a sliding scale cannot stay fair." },
        { s: "decided", t: "Only build Speed (ship class plus upgrades) sets hand and energy. Sail damage and card effects change turn timing only.", why: "A wrecked sail genuinely hurts, and no hand ever resizes mid-fight." },
        { s: "decided", t: "Enemy Speed has no hand or energy cost. A fast enemy simply acts more often." },
        { s: "decided", t: "The captain's ability is always available, costs energy, and works once per turn. It is priced to use most of a turn's energy.", why: "No turn is ever dead, even with a hand that cannot be played.", see: ["captains"] },
        { s: "decided", t: "A fast captain using the ability every turn is an accepted way to play, not an exploit." },
        { s: "decided", t: "Consumables sit in their own slots, cost energy from the same pool, and are gone for good once used.", why: "A reusable, always-available effect would beat the same effect printed on a card.", see: ["progression"] },
        { s: "decided", t: "No limit on consumables per fight beyond stock and energy." },
        { s: "decided", t: "Consumables are active only. Examples: a healing draught, a curse cure, a junk-card purge, a burst of damage." },
        { s: "risk", t: "Two uses of the ability must never strictly beat one use plus cards." },
        { s: "risk", t: "A small hand suffers far more from dead cards. One dead card in three is a third of the turn.", see: ["clutter"] },
        { s: "risk", t: "Speed means two things: smaller turns for you, simply more turns for an enemy. The interface must not imply they match." },
        { s: "risk", t: "A Speed step with less than 3 energy can never play a 3-cost card. Check this when the steps are set." }
      ],
      numbers: ["How many Speed steps: two or three", "Hand size and energy at each step", "Baseline energy", "Consumable energy costs", "Timeline granularity"]
    },

    {
      id: "range", part: "combat", title: "Range and movement",
      sum: "Two bands, Close and Far. Your deck decides which one you want.",
      items: [
        { s: "decided", t: "Two range bands: Close and Far. Facing is not modelled.", why: "Decks want to be close or want to be far. A middle band nobody builds for only adds travel, and every card would need a third behaviour." },
        { s: "decided", t: "Most cards work at either range, stronger at one. Some work at only one." },
        { s: "decided", t: "Close range grants precision: you reliably hit the area you choose." },
        { s: "decided", t: "Your preferred range is a property of your deck, not a universal rule.", why: "Both sides fight for their own band, and neither band is simply better." },
        { s: "decided", t: "Every range change is a card. There is no separate move action." },
        { s: "decided", t: "Range cards always do something else too: strike and close, fire and pull away.", why: "It kills the empty tug-of-war where both ships shove at the distance and nothing happens." },
        { s: "decided", t: "Holding range is also a card. A family of Constitution cards denies enemy movement.", why: "A statistic never blocks anything by itself. It makes the cards that block better." },
        { s: "decided", t: "Enemy range moves are ordinary telegraphed actions." },
        { s: "decided", t: "Either side can flip the range until its Sail is disabled. A ship with a disabled Sail cannot change range at all.", why: "With two bands, one move turns the fight around. Wrecking the rigging is how the tug-of-war ends.", see: ["areas"] },
        { s: "decided", t: "The enemy's type sets where a fight starts. Raiders might ambush at Close; archers might open at Far.", see: ["enemies"] },
        { s: "decided", t: "Some fights have several enemy ships, each at its own range. There is no hard cap on their number.", see: ["interface"] },
        { s: "decided", t: "Being outnumbered is meant to feel dire." },
        { s: "decided", t: "Multi-target cards are uncommon. More often, hitting a second target is the roll bonus." },
        { s: "risk", t: "With no middle band, one move takes a deck from its best range to its worst." },
        { s: "risk", t: "A deck built for one range can be denied it on the first turn, in a fight it cannot flee." },
        { s: "risk", t: "Sail is now an even more tempting first target. Its extra toughness has to carry more weight.", see: ["areas"] },
        { s: "risk", t: "The fight over range must never settle into a stalemate." }
      ],
      numbers: ["How sharply being denied your range punishes"]
    },

    {
      id: "areas", part: "combat", title: "Damage, defence, repair",
      sum: "Only Hull hits sink. Everything else strips a capability.",
      items: [
        { s: "decided", t: "Both sides use the same five areas. The rules are fully symmetric, including total disable." },
        { s: "decided", t: "Only Hull hits sink a ship. Hitting any other area damages that area and nothing else.", why: "Every attack is a choice: advance the kill, or strip a capability. Never both." },
        { s: "decided", t: "What each target does.",
          list: [
            "Hull: lowers Hull HP, the path to sinking",
            "Sail: less Speed. Once disabled, no range changes and no withdrawing",
            "Weapons: weaker attacks",
            "Crew: slower repairs, loss of special actions, and open to a demand for surrender",
            "Cargo: destroys repair supplies and loot"
          ] },
        { s: "decided", t: "Hull has no disable state. Its state is the HP pool." },
        { s: "decided", t: "Sail is deliberately harder to disable.", why: "It strips range control and traps the enemy for loot. Without a cost it would be the automatic opening." },
        { s: "decided", t: "Broad defence is cards: brace, shieldwall, evade." },
        { s: "decided", t: "Defending one specific area needs the specialist who can read the enemy's aim." },
        { s: "decided", t: "In-combat repair is an emergency that costs tempo. You choose the area, and even a disabled one can be repaired." },
        { s: "decided", t: "Every starting deck contains repair cards.", why: "Crew lives depend on repair. A deck without it would make crew loss a deckbuilding accident." },
        { s: "decided", t: "Every repair away from port uses repair supplies from cargo. No supplies, no repair.", see: ["resources"] },
        { s: "decided", t: "Repairing between fights on the map also needs the right specialist." },
        { s: "decided", t: "Ports and the haven repair fully, for silver. No specialist or supplies needed." },
        { s: "decided", t: "Enemies spend their own finite supplies, so their repair is limited." },
        { s: "decided", t: "Hull HP and area damage persist between fights." },
        { s: "risk", t: "Burning an enemy's hold cripples their repairs at the cost of loot. The same can be done to you." },
        { s: "risk", t: "Check in playtests that Sail's toughness really deters opening on it." },
        { s: "risk", t: "In a short fight, racing the Hull may always beat stripping areas. Taking a ship apart has to pay off inside 2–3 minutes." },
        { s: "open", t: "What Crew damage removes from the player: the meaning of 'special actions'." },
        { s: "open", t: "How many damage states an area has, and where disable sits." }
      ],
      numbers: ["Damage bands", "Damage states per area and the disable threshold", "How much harder Sail is to disable", "Repair rates in combat versus port", "Enemy supply stocks"]
    },

    {
      id: "crew", part: "combat", title: "Crew stations",
      sum: "When an area falls, the specialist stationed there is in danger.",
      items: [
        { s: "decided", t: "Specialists stand at stations laid out per area: Hull, Sail, Weapons, Cargo. Slot counts vary by ship class, and upgrades can add more." },
        { s: "decided", t: "The Crew area holds no stations. It is the general complement that drives repair speed." },
        { s: "decided", t: "Crew can be reassigned freely between fights, never during one." },
        { s: "decided", t: "Crew are in danger only when their area is fully disabled. They are injured, not killed." },
        { s: "decided", t: "While a specialist is injured, their cards are still drawn but cannot be played." },
        { s: "decided", t: "Repairing the station recovers them." },
        { s: "decided", t: "Still injured when the fight ends: lost, unless a rescue roll saves them." },
        { s: "decided", t: "The rescue roll can only save. Charisma and a healer improve it.", why: "A death check would be the only punishing die in the game." },
        { s: "risk", t: "One area falling can cost the area, the specialist and their cards at once." },
        { s: "risk", t: "Winning fast while someone is down is what kills them. If testers stall to patch a station, add a rescue window after the fight." },
        { s: "open", t: "Hull has no disable state, so a Hull station is never in danger. Is that intended?" }
      ],
      numbers: ["Rescue odds and what improves them"]
    },

    {
      id: "enemies", part: "combat", title: "Enemies and fights",
      sum: "They never roll, always show their intent, and some of them flee.",
      items: [
        { s: "decided", t: "Enemy actions are fully deterministic. Enemies never roll.", why: "A telegraphed attack means exactly what it says. Only the player has dice, and that edge is what makes symmetric rules survivable." },
        { s: "decided", t: "You always see the type of action an enemy will take. Specialists add exact numbers, the target area and further lookahead." },
        { s: "decided", t: "One action per enemy turn. An action may be 'take two actions next turn'." },
        { s: "decided", t: "Enemies hold no cards." },
        { s: "decided", t: "Fights get harder with depth through composition: tougher types, more elites, then several ships.", why: "More enemy hull makes fights longer, and the time budget has no room." },
        { s: "decided", t: "Three ways to win: sink them, force a surrender, or neutralise them until they withdraw." },
        { s: "decided", t: "Neutralised means Weapons fully disabled. All of an enemy's offence lives there, card-jamming included." },
        { s: "decided", t: "A neutralised merchant or raider withdraws after a few turns and takes its loot. With its sail wrecked, it cannot leave." },
        { s: "decided", t: "Zealots, elites and bosses never withdraw. They repair and re-arm, so neutralising them buys tempo only." },
        { s: "decided", t: "Ship class shows which enemies flee. Scouting confirms it." },
        { s: "decided", t: "Only elites and bosses have crewed stations. Wreck a station and they lose the ability it gave." },
        { s: "decided", t: "Each elite has one signature mechanic: a ram that punishes closing, a shieldwall that blunts area hits, archers that punish distance." },
        { s: "decided", t: "The map always marks an elite. Scouting reveals its mechanic." },
        { s: "decided", t: "Surrender is damage first, then a demand. Once a ship is damaged enough, a demand can be made, and a Charisma roll decides it.", why: "It follows the dice rule: a refused demand costs nothing but its energy." },
        { s: "decided", t: "Damaged enough means the Crew area is disabled, or the Hull is nearly gone." },
        { s: "decided", t: "Charisma effects deal damage too, to the enemy's Crew area.", why: "Taunts, threats and verses hit their people. The Crew area is the enemy's nerve, with no extra bar on screen.", see: ["areas"] },
        { s: "decided", t: "Any captain can demand surrender, through Charisma cards.", why: "It keeps all three ways to win open to everyone. The Skald simply always has a demand to hand.", see: ["roster"] },
        { s: "decided", t: "A boss fought alone can be made to yield, at a tougher threshold. In a raid, that means they hand over the prize." },
        { s: "decided", t: "No surrender in multi-ship fights." },
        { s: "decided", t: "Some fights carry weather or terrain, set by node type. The effects hit both ships equally.", why: "One-sided weather would read as the game targeting your build." },
        { s: "decided", t: "In those fights, conditions escalate the longer the battle lasts." },
        { s: "decided", t: "There is no universal fight clock. Open-water duels rely on a tuning contract.",
          list: ["Offence must outpace repair, for both sides", "Enemy repair is finite", "The fight over range must never be a stable stalemate"] },
        { s: "risk", t: "The withdraw rule makes the best fork in a fight: wreck the rigging to trap them and keep the loot, or the weapons to stop the bleeding. Protect it." },
        { s: "risk", t: "An unbounded enemy count is an interface constraint, not only an encounter freedom.", see: ["interface"] },
        { s: "risk", t: "A normal fight lasting half again its target length means the tuning contract is broken. The cheapest fix is escalating conditions on every fight." },
        { s: "risk", t: "Surrender is Charisma's way to win, and it is unavailable in multi-ship fights." },
        { s: "risk", t: "The Crew area must be tough enough that breaking it is not the fastest win every time." },
        { s: "risk", t: "Each raid needs a surrender ending written, and tuning so that it is not the easy route." },
        { s: "open", t: "The enemy roster, archetypes, preferred ranges and targeting logic." }
      ],
      numbers: ["How low Hull must be before a demand can be made", "The tougher surrender threshold for a boss", "Turns before a neutralised ship withdraws", "How fast conditions escalate"]
    },

    {
      id: "clutter", part: "combat", title: "Curses and dead cards",
      sum: "Curses weaken you. Junk cards clog your hand.",
      items: [
        { s: "decided", t: "A curse is always a debuff, never a card. Some dull a statistic or slow the rigging. Others sour events or hasten pursuit." },
        { s: "decided", t: "Curses come from some prizes, mythic artifacts and certain enemies.", see: ["prize"] },
        { s: "decided", t: "Curses persist between nodes and across homecomings. They fade after a number of nodes, or are lifted by a consumable." },
        { s: "decided", t: "A curse that is a prize's drawback is never curable." },
        { s: "decided", t: "Certain enemy ships (fire ships, screamers, cursed vessels) jam junk cards into your deck mid-fight." },
        { s: "decided", t: "Junk cards are shuffled into the draw pile. Once drawn, they fill a hand slot and cannot be played." },
        { s: "decided", t: "Disable the jammer's Weapons and the jamming stops." },
        { s: "decided", t: "Junk cards stay until removed, across fights and homecomings." },
        { s: "decided", t: "Three ways to be rid of a junk card.", why: "The energy cost is optional. A forced cost would let an enemy drain your energy, which no condition may do.",
          list: ["Pay energy when you discard it in combat", "Pay silver at a port", "Spend a consumable that clears them"] },
        { s: "decided", t: "Temporary conditions do not persist between fights." },
        { s: "risk", t: "Dead cards have four sources: junk cards, an injured specialist's cards, repair cards with no supplies, and range-locked cards at the wrong band. A whole hand can be unplayable. Each source must look different at a glance." },
        { s: "risk", t: "Junk cards never clear by themselves. A struggling player must always have an affordable way out." },
        { s: "open", t: "Can ordinary ports lift curses? Only the haven is stated as unable." },
        { s: "open", t: "A mythic artifact's curse can fade or be cured, which removes the artifact's cost. Should those curses be permanent?" },
        { s: "open", t: "A shipping name for negative cards." }
      ],
      numbers: ["Curse strengths, and how many nodes they last", "Junk cards per enemy action", "Energy cost to destroy a junk card"]
    },

    {
      id: "stakes", part: "combat", title: "No escape, and what softens it",
      sum: "Seven harsh rules push the same way. Five things push back.",
      items: [
        { s: "decided", t: "The player cannot flee a fight and cannot surrender. Losing one ends the expedition.", see: ["defeat"] },
        { s: "decided", t: "The compensating rule: the decision to fight is made on the map, with the threat always visible.", see: ["map"] },
        { s: "decided", t: "Seven decisions compound in the same direction.", why: "Each is defensible alone. Together they are the design's largest risk.",
          list: [
            "Area damage persists, and field repair needs a specialist and supplies",
            "Full symmetry: anything you can wreck can be wrecked on you",
            "Cargo damage destroys your loot and your repair supplies",
            "Crew are lost with disabled stations",
            "No escape, and a loss ends the expedition",
            "Open-water duels have no clock",
            "Prize drawbacks can never be lifted"
          ] },
        { s: "decided", t: "Five counterweights.",
          list: [
            "Energy is never reduced",
            "Only the player has dice",
            "The Act II haven",
            "The prize's boon",
            "Everything banked at a homecoming is safe"
          ] },
        { s: "decided", t: "The boon carries the load. Act II must make good preparation feel powerful, not punish relentlessly.", see: ["prize"] },
        { s: "decided", t: "No rollback plan. Difficulty is tuned inside these rules, not by softening them." },
        { s: "risk", t: "Warning signs to watch for in playtests.",
          list: [
            "A voyage lost to a string of fights that were unwinnable after the first",
            "Fights passing the time budget because neither side can finish",
            "A loss decided several nodes earlier, with no agency in between",
            "Act II reading as attrition, not a powerful, hunted homecoming",
            "Nobody ever sets out again, because the chain's loss reads as unpayable"
          ] },
        { s: "risk", t: "If a warning sign fires, the only levers are the boon's strength and enemy numbers. The cheapest reversals: one Act II purge, then a costly retreat, in that order." }
      ]
    },

    /* ──────────────────── PRESENTATION AND PRODUCTION ──────────────────── */

    {
      id: "interface", part: "make", title: "Screen and interface",
      sum: "An over-the-shoulder camera that shows only what the rules model.",
      items: [
        { s: "decided", t: "The combat camera sits over the player's shoulder: above and behind the stern, looking down the deck at the enemy." },
        { s: "decided", t: "The two range bands are rungs up the frame: Close past the bow, Far near the horizon.", why: "The rules have one axis, toward or away. A top-down view promises heading and flanking that the rules do not model." },
        { s: "decided", t: "Enemies are drawn broadside.", why: "Heading carries no information, and broadside is the clearest longship silhouette." },
        { s: "decided", t: "Areas are targeted with five markers anchored to the ship, drawn at a constant size. Never by clicking the artwork.", why: "At far range a sail is a few pixels, and parts overlap." },
        { s: "decided", t: "Damage is shown by shape and pattern, not colour alone." },
        { s: "decided", t: "The focus rule: only your ship and the one enemy you are focused on show five markers and a full readout. Others show their action type and a sliver of hull.", why: "Six ships with five callouts each is thirty callouts, and the screen cannot hold them." },
        { s: "decided", t: "The acceptance test: ship state readable at a glance." },
        { s: "decided", t: "Mouse first. Layouts stay controller-feasible. Full controller and Steam Deck support come late." },
        { s: "decided", t: "Rolls get a quick animation the player can speed up.", why: "About 250 rolls per voyage makes animation length a pacing decision, not polish." },
        { s: "decided", t: "Accessibility.",
          list: ["A readable roll and action log", "Colourblind-safe area indicators", "Scalable text", "Reduced-motion and speed options"] },
        { s: "decided", t: "Teaching happens by drip inside the first voyage's real fights: cards and energy, then range, then targeting, then crew stations. Whichever saga is chosen." },
        { s: "risk", t: "Any view that looks like a simulation promises freedoms the rules will refuse." },
        { s: "open", t: "Art direction: Vellum & Iron or Stonecut." },
        { s: "open", t: "The renderer: 3D meshes on a fixed camera rail, or 2D. Settle it before ship art is made." },
        { s: "open", t: "The meta screens have no direction yet: pre-expedition flow, homecoming, map, port, events, rewards, summaries." },
        { s: "open", t: "How much the first voyage teaches beyond combat." },
        { s: "open", t: "Audio direction. Nothing is written yet." }
      ]
    },

    {
      id: "save", part: "make", title: "Saving and learning",
      sum: "Save between nodes. A crash never costs more than one fight.",
      items: [
        { s: "decided", t: "Mid-voyage save-and-quit is required.", why: "A chained expedition is several sessions, never a marathon sitting." },
        { s: "decided", t: "The game saves between nodes." },
        { s: "decided", t: "Closing the game mid-fight restarts that fight from its beginning, with the same shuffle and the same dice.", why: "A crash costs minutes, not hours of a chain." },
        { s: "decided", t: "A defeat must visibly advance something: crew levels, recovered consumables, banked sagas.", see: ["defeat"] },
        { s: "decided", t: "The voyage log names what happened, and to whom." },
        { s: "decided", t: "An end-of-voyage summary lets the player say why the voyage went as it did. A finished expedition gets its own tally." },
        { s: "risk", t: "A player can quit a losing fight and replay it knowing what is coming. Accepted as the price of crash safety." },
        { s: "risk", t: "A raid or finale is up to ten minutes with no save point inside it." },
        { s: "open", t: "The save model: what belongs to the voyage, the expedition and the profile. Settle it before building the act structure." },
        { s: "open", t: "What the voyage and expedition summaries contain." }
      ]
    },

    {
      id: "production", part: "make", title: "Scope and build order",
      sum: "Everything ships, in stages. The design locks before anything is tested.",
      items: [
        { s: "decided", t: "The finished game is everything in this document. Nothing is optional." },
        { s: "decided", t: "It reaches players in stages, through Steam Early Access.", why: "Early Access changes the order players receive the game, not what the game is." },
        { s: "decided", t: "The first version.",
          list: ["Three captains", "The settlement", "A couple of sagas", "Act I", "The raid"], see: ["roster", "voyage"] },
        { s: "decided", t: "Features still to come, such as Act II, are described clearly to players." },
        { s: "decided", t: "Whether to build more before the Early Access release is decided once the first version is playable." },
        { s: "decided", t: "No cut order and no fallback scope. Everything ships by the full release." },
        { s: "decided", t: "No testing until the design is locked." },
        { s: "decided", t: "The heaviest content costs, in order.",
          list: [
            "Three sagas and the convergence, by a wide margin",
            "Event writing",
            "Combat's own surface: cards, enemies, elite mechanics, numbers",
            "The captains: two abilities, a stat line and a base deck each",
            "Named specialists",
            "Persistence systems"
          ] },
        { s: "decided", t: "Build order for the voyage.",
          list: [
            "One ship, the combat core, one captain, a generated Act I",
            "The raid, Act II with pursuit and haven, one finale",
            "One full saga: prize, resources, specialists, modules, artifacts",
            "Persistence, save and resume, result screens",
            "Sagas two and three, rare node types, rivals, the chain and true ending, the convergence"
          ] },
        { s: "decided", t: "Build order for combat.",
          list: [
            "The core loop: deck, hand, energy, Speed, range, targeting, intent, ability, one against one",
            "Ship statistics and upgrades",
            "Crew stations, injury, rescue",
            "Environment, elites, surrender, withdrawal",
            "Curses, junk cards, multi-ship, the voyage economy"
          ] },
        { s: "decided", t: "The order follows dependencies. No stage is a gate, and early stages are expected to change." },
        { s: "decided", t: "The game is working when a player can say:",
          list: [
            "What prize they were chasing",
            "Why they chose their route",
            "How 3–5 build choices changed their expedition",
            "What the raid changed",
            "Why cargo, hull, stations and pursuit mattered",
            "How the voyage advanced their crew and collection",
            "Why they dared, or declined, to set out again",
            "Why they want another route, build or captain next time"
          ] },
        { s: "decided", t: "Having no reputation system is the largest single scope saving.", see: ["rejected"] },
        { s: "risk", t: "A solo build of this size is a multi-year effort." },
        { s: "risk", t: "The first version stops at the raid. It leaves out Act II, the most original and least proven idea, so players first judge the more familiar half." },
        { s: "open", t: "What happens after a won raid in the first version: does the prize come home, and can you set out again?" },
        { s: "open", t: "What a prize's boon and drawback do in a version without Act II." },
        { s: "open", t: "Which sagas are in the first version." },
        { s: "open", t: "What 'locked' means: which open questions must be answered before testing starts." },
        { s: "open", t: "The first saga, captain and prize to build against." },
        { s: "open", t: "A per-saga content checklist: event counts, enemy counts, boss definitions." }
      ]
    },

    /* ─────────────────────────────── THE RECORD ─────────────────────────────── */

    {
      id: "rejected", part: "record", title: "Cut on purpose",
      sum: "Considered and rejected. Recorded so settled questions stay settled.",
      items: [
        { s: "rejected", t: "Reputation: an Honorable-to-Feared axis that shifted with oaths, tribute and mercy.", why: "Cost. It only matters if many events offer different, balanced options at each pole, which roughly doubles their writing. If ever revived: a one-way notoriety track." },
        { s: "rejected", t: "Hostility: raiding a coast makes that region dangerous.", why: "Part of the reputation system, and gone with it." },
        { s: "rejected", t: "Provisions and hunger: food consumed by travel, with starvation as a second way to lose.", why: "The archetypal chore. To be tolerable it must be softened until it is toothless. Station slots do its one real job, the cost of crew. If ever revived: don't. A condition that fades is cheaper than a stock that depletes." },
        { s: "rejected", t: "Direct boarding control.", why: "A second tactical system. Refusing it is a deliberate scope decision." },
        { s: "rejected", t: "Difficulty tiers.", why: "A dial exists only to offset persistent stat growth, which the game does not have." },
        { s: "rejected", t: "Renown: a meta-currency earned every voyage, building into ranks.", why: "Crew levelling does its job better: it accrues in defeat and is concrete. If ever revived: only as a currency spent on crew training, never a parallel ladder." },
        { s: "rejected", t: "Leader scars: captains gathering scars and a visible history.", why: "Unnecessary. The captain always survives, and that is the whole story." },
        { s: "rejected", t: "Settlement growth.", why: "The settlement is a home screen and a voice in the fiction. It has nothing to build or upgrade." },
        { s: "rejected", t: "Shared tactical objects to contest in combat.", why: "Weather and terrain cover the need." },
        { s: "rejected", t: "Passive items.", why: "Consumables are one-use and active. The starting loadout covers the passive niche." },
        { s: "rejected", t: "Flooding as a combat state.", why: "Too complex for what it adds.", tag: "Deferred" },
        { s: "rejected", t: "Ship classes beyond the launch three.", why: "Wait until the default longship is stable. They may not change the five-area layout.", tag: "Deferred" },
        { s: "rejected", t: "Drawback variants per voyage.", why: "Each saga's drawback is fixed for now.", tag: "Deferred" },
        { s: "rejected", t: "A custom-captain creator.", why: "Revisit only after the five shipped captains prove distinct.", tag: "Late, if at all" },
        { s: "risk", t: "Several exclusions hold each other up: tiers with stat growth, hostility with reputation, upkeep with provisions. Reviving one reopens its partner's problem." }
      ]
    }
  ]
};
