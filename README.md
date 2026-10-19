# Conquest

[Play Conquest](https://cardiacx-hub.github.io/top-down-action-adventure/)

A browser-based isometric 3D action-adventure using the author’s Kingdoms at War graphics, with four classes, a growing settlement, crop-based alchemy, and nine sequential boss expeditions. All runtime files are served locally; the game does not require a CDN.

## Controls

- **WASD / arrows:** move relative to the screen. Movement works in the village and on wild trails.
- **Left click:** select a building to review its options, walk on village ground, or aim and attack in the wild.
- **Right click / Shift-click:** walk to a point in either region, including behind buildings.
- **Space:** attack continuously in the direction your character faces.
- **Q / R / Z / X:** use the four class powers shown by their illustrated symbols and cooldowns.
- **E:** use the potion equipped at the Apothecary.
- **F:** quick-harvest nearby ripe crops, open building options, speak, gather, or collect the relic.
- **Esc:** close a building menu and resume the game.
- **+ / − / expand:** zoom or enter fullscreen.

Phone controls use a left thumb joystick with analog movement and a dead zone. Circular buttons on the right provide hold-to-attack, four class powers with symbols/cooldowns, potions and interaction. Movement and powers support simultaneous touches. The joystick sets your facing; attacks and targeted powers fire in that direction. Mouse movement sets facing on desktop. A gold ground indicator shows your firing line. Soul bolts fly straight. Lightning must hit an enemy along that line before it chains. Release, cancellation, focus loss and opening a menu reset movement. Tap ground to walk as an alternative. Village click movement routes around buildings, including the forge and anvil.

## Walk-up settlement menus

Management no longer requires scrolling below the world. Options appear automatically when you approach a location. Click an option or press F to open its dialog. Walking away dismisses the nearby options; an open management dialog pauses the game and scrolls internally if needed.

- **Hearthhall:** aligned with the workshop row on a larger starting estate. Upgrade it into a Grand Hearthhall, a fortified keep, then a castle to unlock each next estate tier. Expand the estate three times, add three plots per farmland upgrade (6 → 15 total), research new crop varieties, recruit woodcutters, or choose/train a class. Extra farmland requires a matching estate expansion. Land and plots also expand visibly in the 3D world.
- **Ancient sanctum:** spend class XP in four five-tier branches (20 upgrades per class, 80 in total), or restore the building. Sanctum levels unlock tiers 1, 2, 3, then both final tiers at masterwork level 3.
- **Building plots:** new games begin with exactly one empty building plot. Choose from six workshop types: Apothecary, Blacksmith, Runeforge, Lumbermill, Ranger lodge, or Star observatory. Every Hearthhall upgrade automatically unlocks one additional plot (four total), without a separate land purchase. Each workshop type can be built once. Existing saves keep their constructed workshops and sufficient plot capacity.
- **Apothecary:** craft potions from harvested ingredients and equip one type in the E slot. Every returned adventure reveals a stronger crop-based Wayfarer’s reserve recipe. Reserves automatically fill in when the equipped potion supply runs out.
- **Blacksmith:** browse and purchase armor that affects actual combat defense. Every returned adventure reveals a new armor pattern; advanced patterns require a higher forge level.
- **Runeforge:** absent at the start; construct it on an available building plot, upgrade it, then bind armor, health, or damage runes to purchased armor. One enchantment can be active at a time.
- **Garden:** plant crops in the garden menu. A quick-harvest popup appears within 100 units of ripe crops; click it or press F to walk over and cut nearby crops with a sickle animation. Only mature crops are collected, once each. Movement cancels the queue. Harvesting from the garden menu also uses the cutting animation.
- **Forest gate:** at the end of the village path. Its popup lets you choose an expedition. Entering the gate requires a deliberate travel selection.

Each building has three restoration levels. Villagers gather timber continuously, including up to one day of offline gathering. Villagers produce 1.5 timber per minute each, plus 1 per Lumbermill level. Ranger lodge grants +15 health per level. Star observatory grants +2 damage and 3% shorter power cooldowns per level. Each talent costs 60 class XP; a completed venture awards 41–49 XP, plus up to 8 XP from optional caches, so a new talent takes roughly one or two victories. Ordinary kills and village quests grant no XP. Kill bounties are 1–3 coins; each cache grants 3 coins and 2 timber; boss victory grants 5 timber. Harvests yield two ingredients and two coins profit. Existing saved XP and resources are preserved.

## Open regions and resident enemies

The first venture is available immediately. Each subsequent venture requires saved victories in every preceding venture; retreat, rescue and equipment discoveries do not unlock destinations. Existing victory records are retained. Returning after a boss victory unlocks the next destination. Enemy health, damage, armor, speed and boss strength rise at every stage; each region has 105 ordinary residents plus its boss.

Each region is 1,800–2,400 units wide and freely walkable across its full length. Roads are landmarks rather than movement restrictions: travel cross-country, take braided roads, explore loops, and find four optional caches. All enemies and the boss are placed when you enter; moving across a checkpoint never creates a wave or locks the road. Groups range from solitary enemies to packs of eight, spread across five optional districts. Defeating the boss completes the region without requiring every resident to be killed.

| Route | Trail length (game units) | Guardian | Signature attack |
| --- | ---: | --- | --- |
| Briarwild Road | 5,200 | Mawroot, the Thorn King | Antlered beast with a telegraphed charge |
| Cinder Pilgrimage | 6,400 | Azrath, Cinder Sovereign | Winged demon with a marked hellfire blast |
| Hollowfen Passage | 7,600 | The Hollow Colossus | Many-limbed ancient with overlapping void eruptions |
| Frostfang Highlands | 8,200 | Skadi, the Glacier Matriarch | Glacier-armored beast with a marked charge |
| Stormglass Ruins | 9,000 | Veyr, the Thunder Titan | Lightning-crowned titan with overlapping eruptions |
| Abyssal Crown | 10,000 | Nhal, the Eclipse Regent | Eclipse-crowned demon with a marked blast |
| Sunken Archive | 11,000 | Thalassa, Keeper of the Deep | Coral-crowned leviathan with overlapping eruptions |
| Blightroot Expanse | 12,000 | Vorruk, the Plagueheart | Plague-crowned beast with a marked charge |
| Infernal Throne | 13,200 | Malachar, the Last Infernal King | Flame-crowned demon with a marked blast |

Crimson ground marks warn before attacks resolve. Move away from the marked area to dodge. Bosses become faster below half health. After victory, claim the bounty from the victory popup or walk to the final gate. Retreating early keeps ordinary earned rewards but does not award a boss bounty. Defeat costs up to 20 coins and returns you home. Victory, retreat and rescue each open an adventure summary showing time, foes, secured districts, hidden caches, potion use, net coins, earned XP and timber. Each outing also advances the armor and potion discovery catalogs.

Characters use articulated shoulders, hips, torso turns and spell gestures. Bear form evolves through five appearances, ending in a vicious hunched werebear with two animated legs and clawed arms. Wolf form evolves through five lean, fanged appearances; it moves faster and deals more damage, while bear has more armor and maximum health. Press B or tap the form selector to choose a learned form, then Q to transform. Earlier bear ranks have four moving paws and a crimson three-claw attack swipe. Estate expansion rebuilds one continuous grass/path surface and moves the boundary trees to its new edge.

The moonstone for the story quest is found partway along each trail, until collected. Quest progress and completed route victories are saved. Reloading returns the hero home; an unfinished expedition is not resumed.

## Crops and alchemy

Harvests provide coins and stored ingredients. They do **not** automatically grant potions. Research seeds at Hearthhall to unlock advanced crops.

| Crop | Growth | Research | Ingredients per harvest |
| --- | ---: | ---: | ---: |
| Carrots | 30s | 0 | 2 |
| Moonleaf | 65s | 0 | 2 |
| Sun pumpkins | 120s | 1 | 2 |
| Ember peppers | 100s | 1 | 2 |
| Frostberries | 150s | 2 | 2 |
| Sun lotus | 210s | 3 | 2 |
| Duskroot | 180s | 3 | 2 |

Crops grow while you adventure or are away. At the Apothecary, recipes show the exact available/required ingredients, coin cost, building requirement, and owned potion count.

| Potion | Required crops | Apothecary | Effect |
| --- | --- | ---: | --- |
| Healing draught | 2 carrots + 1 moonleaf | 1 | Restore 40 health + 20 per building level |
| Verdant renewal | 2 moonleaf + 1 pumpkin | 1 | Restore 12 health/second for 8 seconds |
| Ironbark tonic | 2 pumpkins + 1 frostberry | 2 | +8 armor for 35 seconds |
| Ember fury | 2 ember peppers + 1 moonleaf | 2 | +35% attack damage for 35 seconds |
| Dawn elixir | 1 sun lotus + 2 frostberries + 1 moonleaf | 3 | Full healing and a brief shield |
| Soulfire tincture | 2 duskroot + 1 ember pepper | 3 | Reset all four active skill cooldowns |

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
- **Warlock:** horned hood, violet robes, grimoire; directional life-stealing bolts, Soul rupture (Q), Summon fiend (R), and a winged demon form. Final spell mastery grants triple directional volleys; summoning supports up to three companions.
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

Key modules: `game.js` (controls/combat), `interface.js` (proximity menus and dialogs), `model.js` (economy/skills/crops), `progression.js` (estate/alchemy), `settlement.js` (workshop placement, equipment, enchants and expedition summaries), `crafting.js` (forge recipes), `abilities.js` (additional powers and targeting), `expedition.js` (ordered campaign, difficulty and bosses), `farming.js` (crop positions and nearby harvest checks), `world3d.js` and `kingdoms-terrain.js` (3D presentation), `kingdoms-art.js` (source asset loading and animation), `kingdoms-beasts.js` (articulated druid forms), `voxel-models.js` (legacy procedural models), `power-icons.js` (power symbols), and `quests.js` (story progression).

GitHub Pages serves **main / (root)**. The `gh-pages` branch is also maintained as a static-only release. Publish all root application `.js` files (excluding the development server), `index.html`, `style.css`, `.nojekyll`, `vendor/`, and `assets/` together.

All talent ranks add visible class-specific crystals, crests, embroidery, or sigils. The fourth branches are Wolf predator (Druid), Zeal (Paladin), Blood pact (Warlock), and Lightning (Wizard).

## Climates and enemy behavior

| Region | Climate | Weather |
| --- | --- | --- |
| Briarwild | Temperate woodland | Drifting pollen |
| Cinder | Volcanic badlands | Falling ash |
| Hollowfen | Humid marsh | Rain |
| Frostfang | Alpine snowfields | Snowfall |
| Stormglass | Storm highlands | Rain and lightning |
| Abyss | Eclipse wasteland | Void motes |
| Sunken Archive | Tropical coast | Sea spray |
| Blightroot | Fungal jungle | Spores |
| Infernal Throne | Lava fields | Rising embers |

Each climate has its own road geometry, ground colors, pools or vents, vegetation, lighting, ruins and enemy names. Twelve enemy model families cover wolves, boars, stags, spiders, crabs, serpents, archers, skeletons, shamans, imps, wisps and golems. Every level uses eight families. Enemies patrol near their original locations, engage only when approached or attacked, and return home if led too far away. Ranged attackers keep their distance and telegraph straight, dodgeable shots; healers mend nearby allies; chargers telegraph a rush; brutes trade speed for armor and health. Coin drops are limited to a third of residents to preserve the slower economy.

The paladin's full silver-and-gold sword is attached to the right wrist. Attacks animate the shoulder, torso and wrist together through a broad blade sweep.

## Kingdoms at War art integration

Conquest reuses actual models, materials, textures, portraits and animation clips from the author's [Civ2 — Kingdoms at War](https://github.com/CardiacX-hub/Civ2), revision `e49824fa4e4fa1ca9b5ab8a024a2a2e505d1d5af`. The four heroes use its Covenant woodland keeper, Knight, Mage and Hunter models. Settlement buildings use its human architecture and four progressively larger Stronghold tiers. Workers, monsters, elementals, trees and rocks also reuse the original models. The terrain uses Kingdoms at War's painted PBR texture layers and leaf-grass geometry, with continuous roads across Conquest's home expansions and open regions.

Assets load locally from `assets/kingdoms/`; models share exact source texture pixels by content hash to avoid repeating embedded image downloads. The importer and provenance manifest are documented in [assets/kingdoms/README.md](assets/kingdoms/README.md). No multiplayer service, account or upstream Kingdoms at War website is required to play Conquest. Loading the first adventure prepares additional enemy models; the settlement remains available if loading fails.

Bear/wolf forms retain Conquest-specific smooth articulated models and all five talent appearances, including the final bipedal werebear. Combat, manual facing, crop harvesting, village construction, class XP, adventure unlocks and existing saves are retained.
