# Conquest

A browser-based top-down action adventure and settlement game. Built with native JavaScript and Canvas, with no runtime dependencies or external art assets.

## Run

Use Node.js 20 or later:

```sh
npm start
```

The server listens on port 3000 (override with `PORT`). Open it in your browser. Run `npm test` for the economy and progression tests.

## Play

Choose Druid, Paladin, Warlock, or Wizard in **Class & skill trees**. Each class has three branches with three upgrades. Class XP is earned and spent separately. The first skill tier is available immediately; build and upgrade the Ancient sanctum to unlock deeper tiers.

Enter the Whispering Woods from the adventure card. Move with **WASD / arrow keys**, aim and attack with **click**, or hold **Space** to target the nearest enemy. **Q** uses your class ability, **E** drinks a potion. Clear three encounters for a completion bonus, or return home at any time with earned rewards. Defeat returns you home and charges up to 20 coins for recovery.

Druid: shapeshifting, nature casting, healing. Paladin: tanking, healing, holy might. Warlock: fighting demon companion, demon transformation, demonic spells. Wizard: fighting elemental companion, fire damage, water slowing and healing.

Build and upgrade the Apothecary for stronger potions, Blacksmith for armor, and Ancient sanctum for skill tiers. Recruit villagers to gather timber continuously. Plant carrots (30 seconds), moonleaf (65 seconds, awards a potion), and pumpkins (120 seconds, awards bonus timber). Crops mature while away; villagers accrue up to one day of offline timber.

Progress autosaves locally in the browser every second. Saves belong to this device/browser. Fonts are optional Google Fonts with system fallbacks. Keyboard and mouse are recommended for combat.

## Publish with GitHub Pages

The `gh-pages` branch contains only the playable static site. In this repository’s **Settings → Pages**, select **Deploy from a branch**, choose **gh-pages** and **/ (root)**, then save. GitHub displays the live site URL when deployment finishes. The expected default address is `https://cardiacx-hub.github.io/top-down-action-adventure/`.

To update the site, publish `index.html`, `style.css`, `game.js`, `model.js`, and `.nojekyll` to `gh-pages`. No server or build step is required on GitHub Pages.
