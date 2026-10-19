# Shared Kingdoms at War rendering modules

Adapted from `CardiacX-hub/Civ2` revision `e49824fa4e4fa1ca9b5ab8a024a2a2e505d1d5af`, the author's Kingdoms at War project.

The original procedural terrain textures, material standards, height-based PBR terrain blend and leaf-grass geometry are retained. Imports point to Conquest's vendored Three.js 0.180.0. The terrain material accepts a rectangular map size and origin so adjacent Conquest adventure chunks share continuous world-space texture coordinates.

Conquest's terrain is horizontal, so the material samples the original Y-axis triplanar terms directly. This gives the same blend at normal (0,1,0) while avoiding texture fetches whose weights are zero.
