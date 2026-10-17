# Conquest

[Play Conquest](https://cardiacx-hub.github.io/top-down-action-adventure/)

A browser-based isometric 3D voxel action-adventure with four classes, a growing settlement, crop-based alchemy, and six long boss expeditions. All runtime files are served locally; the game does not require a CDN.

## Controls

- **WASD / arrows:** move relative to the screen. Movement works in the village and on wild trails.
- **Left click:** select a building to review its options, walk on village ground, or aim and attack in the wild.
- **Right click / Shift-click:** walk to a point in either region, including behind buildings.
- **Space:** attack the nearest creature continuously.
- **Q / R / Z / X:** use the four class powers shown by their illustrated symbols and cooldowns.
- **E:** use the potion equipped at the Apothecary.
- **F:** open nearby building options, speak, gather, or collect the relic.
- **Esc:** close a building menu and resume the game.
- **+ / − / expand:** zoom or enter fullscreen.

Phone controls use a left thumb joystick with analog movement and a dead zone. Circular buttons on the right provide hold-to-attack, four class powers with symbols/cooldowns, potions and interaction. Movement and powers support simultaneous touches. Targeted phone powers aim at the nearest enemy. Release, cancellation, focus loss and opening a menu reset movement. Tap ground to walk as an alternative. Village click movement routes around buildings, including the forge and anvil.

## Walk-up settlement menus

Management no longer requires scrolling below the world. Options appear automatically when you approach a location. Click an option or press F to open its dialog. Walking away dismisses the nearby options; an open management dialog pauses the game and scrolls internally if needed.

- **Hearthhall:** aligned with the workshop row on a larger starting estate. Upgrade it into a Grand Hearthhall, a fortified keep, then a castle to unlock each next estate tier. Expand the estate three times, add three plots per farmland upgrade (6 → 15 total), research new crop varieties, recruit woodcutters, or choose/train a class. Extra farmland requires a matching estate expansion. Land and plots also expand visibly in the 3D world.
- **Ancient sanctum:** spend class XP in three five-tier branches (15 upgrades per class, 60 in total), or restore the building. Sanctum levels unlock tiers 1, 2, 3, then both final tiers at masterwork level 3.
- **Workshop plots:** the Apothecary and Blacksmith begin as empty land. Select either plot to choose either workshop; each type can be built once. Existing saves keep their restored shops.
- **Apothecary:** craft potions from harvested ingredients and equip one type in the E slot. Every returned adventure reveals a stronger crop-based Wayfarer’s reserve recipe. Reserves automatically fill in when the equipped potion supply runs out.
- **Blacksmith:** browse and purchase armor that affects actual combat defense. Every returned adventure reveals a new armor pattern; advanced patterns require a higher forge level.
- **Runeforge:** build and upgrade this enchanting building, then bind armor, health, or damage runes to purchased armor. One enchantment can be active at a time.
- **Garden:** plant and harvest all unlocked crops using the nearby popup.
- **Forest gate:** at the end of the village path. Its popup lets you choose an expedition. Entering the gate requires a deliberate travel selection.

Each building has three restoration levels. Villagers gather timber continuously, including up to one day of offline gathering. Coins and class XP come from quests, harvests, and adventures.

## Longer expeditions and bosses

Each winding trail spans multiple terrain chunks, with four alternate loops and four treasure spurs ending in hidden cache rooms. Forks extend hundreds of units beyond the main road; optional caches reward coins, class XP and timber. The camera follows your character along the road. Five guarded clearings open in sequence as you approach; defeat each group to open the road ahead. The final arena contains a distinctive voxel boss:

| Route | Trail length (game units) | Guardian | Signature attack |
| --- | ---: | --- | --- |
| Briarwild Road | 5,200 | Mawroot, the Thorn King | Antlered beast with a telegraphed charge |
| Cinder Pilgrimage | 6,400 | Azrath, Cinder Sovereign | Winged demon with a marked hellfire blast |
| Hollowfen Passage | 7,600 | The Hollow Colossus | Many-limbed ancient with overlapping void eruptions |
| Frostfang Highlands | 8,200 | Skadi, the Glacier Matriarch | Glacier-armored beast with a marked charge |
| Stormglass Ruins | 9,000 | Veyr, the Thunder Titan | Lightning-crowned titan with overlapping eruptions |
| Abyssal Crown | 10,000 | Nhal, the Eclipse Regent | Eclipse-crowned demon with a marked blast |

Crimson ground marks warn before attacks resolve. Move away from the marked area to dodge. Bosses become faster below half health. After victory, claim the bounty from the victory popup or walk to the final gate. Retreating early keeps ordinary earned rewards but does not award a boss bounty. Defeat costs up to 20 coins and returns you home. Victory, retreat and rescue each open an adventure summary showing time, foes, clearings, hidden caches, potion use, net coins, earned XP and timber. Each outing also advances the armor and potion discovery catalogs.

Characters use articulated shoulders, hips, torso turns and spell gestures. Bear form has four moving paws and a crimson three-claw attack swipe. Estate expansion rebuilds one continuous grass/path surface and moves the boundary trees to its new edge.

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

## More crafting and workshop recovery

The Blacksmith now forges three weapon tiers (+6/+14/+24 damage) and three cloak tiers (+20/+45/+75 health, with armor on higher tiers), using timber, coins and crops. Crafted gear equips automatically and upgrades replace the same slot. Crop ingredients are also required for three new Runeforge enchants: Storm sigil, Worldroot weave and Eclipse binding.

The Apothecary adds Windrunner cordial (+40% movement), Bottled lightning (+10 lightning damage per attack) and Guardian’s brew (armor and shield). Soulfire now refreshes all four power cooldowns.

Constructing a workshop while standing on its vacant plot previously enclosed the hero in collision geometry. Construction, leaving menus and movement now recover enclosed heroes to nearby walkable ground. Village click destinations also use obstacle-aware routes. Forge/anvil and castle collision footprints match the larger models.

## Class progression

- **Druid Z/X:** Spirit stampede launches three piercing spirit beasts; Thornskin adds armor and regeneration.
- **Paladin Z/X:** Hammer of dawn pierces and roots enemies; Heaven’s judgment calls holy pillars and heals.
- **Warlock Z/X:** Chaos meteor blasts and burns an area; Soul tether chains enemies, roots them and steals health.
- **Wizard Z/X:** Chain lightning jumps across up to five enemies; Froststep blinks along valid ground, freezes nearby foes and grants a shield. Phone powers target nearby enemies.

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

Key modules: `game.js` (controls/combat), `interface.js` (proximity menus and dialogs), `model.js` (economy/skills/crops), `progression.js` (estate/alchemy), `settlement.js` (workshop placement, equipment, enchants and expedition summaries), `crafting.js` (forge recipes), `abilities.js` (additional powers and targeting), `expedition.js` (trail/boss rules), `world3d.js` and `trail-world.js` (3D presentation), `voxel-models.js` (editable procedural models), `power-icons.js` (power symbols), and `quests.js` (story progression).

GitHub Pages serves **main / (root)**. The `gh-pages` branch is also maintained as a static-only release. Publish all root application `.js` files (excluding the development server), `index.html`, `style.css`, `.nojekyll`, `vendor/`, and `assets/` together.
