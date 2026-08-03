# Viking Voyage — Card Forge

Internal design tool, deliberately unlisted. Lives at `thomasaj.com/vikingvoyage/cardcreator/`.

- **Three rooms:** *Card Creator* (leaders, starting decks, specialists + signature cards,
  enemies + their signature blows — same class→members→signature shape, but foe cards carry
  no d20/odds since enemies never roll — tactics, negative cards, consumables),
  *Card Anatomy* (the shared template — colours,
  plates, stocks/formats, fittings), and *The Smithy* (`smithy.html` + `cards.css`/`cards.js`
  — the drag-and-drop layout bench, embedded as a tab; its design library and export are
  separate from the chest, and it inherits the Anatomy's tokens live).
- **Storage:** localStorage in each designer's browser, autosaved. Sharing/handoff is the
  **Export JSON** file; Import merges by id. No server, no accounts.
- **Robots:** `noindex,nofollow` meta on the page + `Disallow: /vikingvoyage/` in the root
  `robots.txt`. Not linked from anywhere. (Note: this repo itself is public on GitHub.)
- The card renderer is a port of `card-preview.html` ("Vellum & Iron") from the game repo —
  anatomy tokens drive the same CSS variables, so what designers see is what the game prints.
