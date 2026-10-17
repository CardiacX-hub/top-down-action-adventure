# Conquest

[Play Conquest](https://cardiacx-hub.github.io/top-down-action-adventure/)

A browser-based isometric 3D voxel action-adventure with four classes, a growing settlement, crop-based alchemy, and three long boss expeditions. All runtime files are served locally; the game does not require a CDN.

## Controls

- **WASD / arrows:** move relative to the screen. Movement works in the village and on wild trails.
- **Left click:** walk in the village, or aim and attack in the wild.
- **Right click / Shift-click:** walk to a point in the wild.
- **Space:** attack the nearest creature continuously.
- **Q / R:** use the two class powers shown by their illustrated symbols and cooldowns.
- **E:** use the potion equipped at the Apothecary.
- **F:** open nearby building options, speak, gather, or collect the relic.
- **Esc:** close a building menu and resume the game.
- **+ / − / expand:** zoom or enter fullscreen.

Touch controls are included. Tap the ground to walk; use the direction pad and Attack/Q/R/F/E buttons beneath the world. Walk around buildings if a click destination is blocked; click movement does not automatically find paths around structures.

## Walk-up settlement menus

Management no longer requires scrolling below the world. Options appear automatically when you approach a location. Click an option or press F to open its dialog. Walking away dismisses the nearby options; an open management dialog pauses the game and scrolls internally if needed.

- **Hearthhall:** the main building near the starting area. Expand the estate three times, add three plots per farmland upgrade (6 → 15 total), research new crop varieties, recruit woodcutters, or choose/train a class. Extra farmland requires a matching estate expansion. Land and plots also expand visibly in the 3D world.
- **Ancient sanctum:** spend class XP in three five-tier branches (15 upgrades per class, 60 in total), or restore the building. Sanctum levels unlock tiers 1, 2, 3, then both final tiers at masterwork level 3.
- **Apothecary:** restore the building, craft potions from harvested ingredients, and equip one potion type in the E slot.
- **Blacksmith:** restore and upgrade the forge for permanent armor on every class.
- **Garden:** plant and harvest all unlocked crops using the nearby popup.
- **Forest gate:** at the end of the village path. Its popup lets you choose an expedition. Entering the gate requires a deliberate travel selection.

Each building has three restoration levels. Villagers gather timber continuously, including up to one day of offline gathering. Coins and class XP come from quests, harvests, and adventures.

## Longer expeditions and bosses

Each winding trail spans multiple terrain chunks. The camera follows your character along the road. Five guarded clearings open in sequence as you approach; defeat each group to open the road ahead. The final arena contains a distinctive voxel boss:

| Route | Trail length (game units) | Guardian | Signature attack |
| --- | ---: | --- | --- |
| Briarwild Road | 5,200 | Mawroot, the Thorn King | Antlered beast with a telegraphed charge |
| Cinder Pilgrimage | 6,400 | Azrath, Cinder Sovereign | Winged demon with a marked hellfire blast |
| Hollowfen Passage | 7,600 | The Hollow Colossus | Many-limbed ancient with overlapping void eruptions |

Crimson ground marks warn before attacks resolve. Move away from the marked area to dodge. Bosses become faster below half health. After victory, claim the bounty from the victory popup or walk to the final gate. Retreating early keeps ordinary earned rewards but does not award a boss bounty. Defeat costs up to 20 coins and returns you home.

The moonstone for the story quest is found partway along each trail, until collected. Quest progress and completed route victories are saved. Reloading returns the hero home; an unfinished expedition is not resumed.

## Crops and alchemy

Harvests provide coins and stored ingredients. They do **not** automatically grant potions. Research seeds at Hearthhall to unlock advanced crops.

| Crop | Growth | Research | Ingredients per harvest |
| --- | ---: | ---: | ---: |
| Carrots | 30s | 0 | 3 |
| Moonleaf | 65s | 0 | 3 |
| Sun pumpkins | 120s | 1 | 4 |
| Ember peppers | 100s | 1 | 3 |
| Frostberries | 150s | 2 | 4 |
| Sun lotus | 210s | 3 | 3 |
| Duskroot | 180s | 3 | 4 |

Crops grow while you adventure or are away. At the Apothecary, recipes show the exact available/required ingredients, coin cost, building requirement, and owned potion count.

| Potion | Required crops | Apothecary | Effect |
| --- | --- | ---: | --- |
| Healing draught | 2 carrots + 1 moonleaf | 1 | Restore 40 health + 20 per building level |
| Verdant renewal | 2 moonleaf + 1 pumpkin | 1 | Restore 12 health/second for 8 seconds |
| Ironbark tonic | 2 pumpkins + 1 frostberry | 2 | +8 armor for 35 seconds |
| Ember fury | 2 ember peppers + 1 moonleaf | 2 | +35% attack damage for 35 seconds |
| Dawn elixir | 1 sun lotus + 2 frostberries + 1 moonleaf | 3 | Full healing and a brief shield |
| Soulfire tincture | 2 duskroot + 1 ember pepper | 3 | Reset both active skill cooldowns |

Ingredients and coins are deducted only when all recipe requirements are satisfied. Craft a potion, equip it, then use E in an expedition. Temporary effects expire on returning home.

## Class progression

- **Druid:** antlers, leaf mantle, living staff; thorn volleys, Living grove (Q), Entangling roots (R), and a modeled bear form. Deeper casting ranks unlock piercing and five-thorn volleys; the final healing rank adds passive regeneration.
- **Paladin:** silver plate, sun shield, golden sword; melee cleaves, Consecration (Q), and Dawn charge (R). Deeper tanking reflects damage and deeper healing restores health on defeating foes.
- **Warlock:** horned hood, violet robes, grimoire; homing life-stealing bolts, Soul rupture (Q), Summon fiend (R), and a winged demon form. Final spell mastery grants triple homing volleys; summoning supports up to three companions.
- **Wizard:** starred blue hat and crystal staff; alternating fire/frost projectiles, Inferno nova (Q), Glacial lance (R), and elemental companions. Final fire mastery adds five-projectile volleys and final water mastery roots with frost bolts.

Ranks increase their branch's stats and power. Tier 4 techniques also reduce active cooldowns. XP is earned and spent separately for each class.

## Story and saves

Visit Warden Elara to begin eight story quests: welcome, timber gathering, apothecary restoration, harvesting, defeating creatures, recovering the moonstone, defeating a trail guardian, and reporting home. Rewards are paid once to the class completing the quest.

Progress autosaves in this browser/device. Existing Conquest and Elderwild saves migrate without deleting their classes, XP, buildings, crops, or potions. New estate, ingredient, and tonic fields are initialized when loading an older save.

## Development and deployment

Requires Node.js 20+ for the local server and a browser supporting WebGL 2.

```sh
npm ci
npm start
npm test
```

The server listens on port 3000, or `PORT`. Three.js 0.180.0 is pinned and its browser modules/license are included in `vendor/`, so GitHub Pages requires no build step.

Key modules: `game.js` (controls/combat), `interface.js` (proximity menus and dialogs), `model.js` (economy/skills/crops), `progression.js` (estate/alchemy), `expedition.js` (trail/boss rules), `world3d.js` and `trail-world.js` (3D presentation), `voxel-models.js` (editable procedural models), `power-icons.js` (power symbols), and `quests.js` (story progression).

GitHub Pages serves **main / (root)**. The `gh-pages` branch is also maintained as a static-only release. Publish all root application `.js` files (excluding the development server), `index.html`, `style.css`, `.nojekyll`, `vendor/`, and `assets/` together.
