# Kingdoms at War graphics in Conquest

These models, portraits, textures and menu illustration are reused from the game author's **Civ2 — Kingdoms at War**, at the author's request.

Source: https://github.com/CardiacX-hub/Civ2
Imported revision: `e49824fa4e4fa1ca9b5ab8a024a2a2e505d1d5af`.

`manifest.json` records each original GLB's SHA-256, imported size and animation names. `tools/import-kingdoms-art.py` extracts byte-identical embedded images into content-addressed shared PNG files and rebuilds the GLB buffer-view offsets. It retains authored mesh attributes, materials, joints and animation clips. No upstream CDN or game server is required at runtime.

Conquest uses Knight, Mage, Hunter and Covenant woodland keeper models for its four classes, Kingdoms at War worker and enemy models, all four human Stronghold tiers, and the game's workshops, trees and rocks. Source portraits and the Dawnward illustration are used in the interface.

Bear, wolf, boar and stag models remain Conquest-specific. Their rounded articulated geometry and the retained bear/wolf talent appearances are adapted to the imported game's painted PBR materials; these animals are not claimed to be Kingdoms at War source meshes.

The `kingdoms/` modules adapt Kingdoms at War's terrain layers, PBR splatting, leaf-grass geometry and restrained material standards. Three.js and its addons remain under the MIT license in `vendor/LICENSE`.
