# Conquest

A playable isometric 3D voxel action-adventure and settlement game. Choose a Druid, Paladin, Warlock, or Wizard, explore Willowglen and the Whispering Woods, and complete an eight-quest story while developing your haven.

## Play

[Play Conquest on GitHub Pages](https://cardiacx-hub.github.io/top-down-action-adventure/)

- **WASD / arrows:** move in screen-relative directions, in the village and forest.
- **Left click:** walk in the village; aim and attack in the forest.
- **Right click / Shift-click:** walk toward a point in the forest.
- **Space:** continuously attack the nearest foe.
- **Q / R:** use your two class abilities. Aim targeted abilities with the cursor.
- **F:** interact with nearby NPCs, resources, buildings, gates, and the relic.
- **E:** drink a healing potion.
- **+ / − / expand button:** zoom or enter fullscreen.

Touch players can tap the ground to walk and use the direction pad, Attack, Q/R, F, and potion buttons below the world. Buildings block walking; click destinations do not automatically find a path around them, so use the direction pad or keyboard to go around obstacles.

Follow the golden marker and the active quest card. Start by walking to **Warden Elara** and pressing F. The quest journal tracks all eight objectives: meeting Elara, gathering fallen timber, restoring the apothecary, harvesting a crop, defeating six creatures, recovering the moonstone, completing an expedition, and reporting back. Rewards are paid once, to the class completing each quest. Quests, crops, upgrades, resources, and class XP autosave locally on this browser/device. Existing Conquest and Elderwild saves are supported.

## Four distinct classes

- **Druid:** an antler crown, leaf mantle, and living staff. Thorn volleys, a healing Living grove (Q), and Entangling roots (R). Shapeshifting unlocks a fully modeled bear with melee claws. Casting upgrades add a three-thorn volley.
- **Paladin:** silver plate, golden sword, and sun shield. Directional melee cleaves, a lingering Consecration field and protective shield (Q), and Dawn charge (R). Extra base health and armor support close combat.
- **Warlock:** horned violet hood, fel flame, and grimoire. Homing, life-stealing Soul bolts, cursor-targeted Soul rupture (Q), and a temporary fiend summon (R). Demon form has wings and horns; summoning upgrades grant permanent companions.
- **Wizard:** a starred blue hat, beard, embroidered robes, and crystal staff. Alternating burning fire and slowing frost, Inferno nova (Q), and a piercing, freezing Glacial lance (R). Upgrades grant crystal elemental companions.

Each class has three skill branches and three ranks per branch. Earn and spend class XP separately. The first tier is available immediately; build and upgrade the Ancient sanctum to unlock deeper tiers. The highest summoning rank grants two companions.

Clear three forest encounters for a completion bonus, or return through the forest exit or Return home button with earned rewards. Defeat returns you home and charges up to 20 coins for recovery. The moonstone remains collectible on another expedition if you finish combat before recovering it.

## Settlement and garden

Build and upgrade the Apothecary for stronger potions, Blacksmith for armor, and Ancient sanctum for skill tiers. Recruit villagers to gather timber. Plant carrots (30 seconds), moonleaf (65 seconds, also awards a potion), and sun pumpkins (120 seconds, also awards timber). Crops mature while away; villagers accrue up to one day of offline timber.

## Development

Requires Node.js 20+ to run the local server and a browser supporting **WebGL 2** for the game. All runtime JavaScript, 3D engine files, and art are served locally; there are no CDN or font-service requirements.

```sh
npm ci
npm start
# Port 3000 by default, or set PORT.
npm test
```

Three.js 0.180.0 is pinned in the lockfile; its browser modules and license are included in `vendor/` so GitHub Pages needs no build step. `npm ci` is useful when refreshing dependencies; the checked-in site can be served directly.

`voxel-models.js` defines the editable procedural 3D models: over 3,000 exposed micro-voxels per class and over 10,000 per building. Hidden faces are removed while retaining the block resolution. The same real model geometry renders in-world characters and portraits. `world3d.js` handles the orthographic camera, lighting, terrain, shadows, model animation, depth, ray-based cursor targeting, and cube spell effects. `quests.js` owns the saved story progression. `assets/conquest-voxel-concepts.png` is the original visual reference, used in the adventure card; it is not substituted for the 3D gameplay models.

`npm test` covers economy, progression, class attacks, quest ordering and rewards, collision bounds, isometric movement, and actual voxel geometry. Browser checks additionally exercise real keyboard movement, NPC interaction, construction, crops, combat, and save restoration.

## Deployment

GitHub Pages currently serves **main / (root)**. Pushing the tested game to main triggers its deployment. The `gh-pages` branch is also maintained as a static-only release, if branch-based hosting is switched to it.

Publish `index.html`, `style.css`, `game.js`, `model.js`, `combat.js`, `quests.js`, `world3d.js`, `voxel-models.js`, `vendor/`, `assets/`, and `.nojekyll` together. No Node server runs on Pages; all game state and rendering run in the browser.
