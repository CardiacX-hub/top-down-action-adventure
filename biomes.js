// Every destination has its own climate, road layout, ecology and atmosphere.
export const BIOMES=[
 {climate:'Temperate woodland',weather:'pollen',layout:'meandering forest lanes',width:1800,ground:['#799950','#88a65b','#99b26a'],road:'#c4af7e',water:'#6da8a0',rock:'#87947a',flora:'#4e793e',accent:'#e9d990',sky:'#c2d7b6',fog:'#c8dcbf',light:'#fff1c5',enemies:['Briar wolf','Thorn boar','Grove archer','Moss troll','Briar spider','Leaf shaman','Wild stag','Woodland wisp']},
 {climate:'Dry volcanic badlands',weather:'ash',layout:'braided ash highways',width:2000,ground:['#706354','#85715b','#9a8061'],road:'#b59a73',water:'#dc713b',rock:'#5b5050',flora:'#6f5441',accent:'#ffc075',sky:'#b79b82',fog:'#c4a78a',light:'#ffd4a0',enemies:['Ash imp','Cinder hound','Ember cultist','Basalt brute','Scoria crawler','Flame priest','Ashwing','Cinder revenant']},
 {climate:'Humid misty marsh',weather:'rain',layout:'curving reed banks and moss causeways',width:2200,ground:['#627c66','#738c76','#829a7b'],road:'#a0ac89',water:'#4f7d7b',rock:'#798c81',flora:'#4a7260',accent:'#b9d9bd',sky:'#9fbab4',fog:'#a8c3b8',light:'#c7e5d9',enemies:['Fen lurker','Bog spider','Reed hunter','Mire ogre','Marsh leech','Bog witch','Rot stag','Fen lantern']},
 {climate:'Alpine blizzard',weather:'snow',layout:'snowfield switchbacks and glacial rings',width:2000,ground:['#d7e6e8','#c6dae0','#e4eff0'],road:'#9ebdcc',water:'#82b8cf',rock:'#8cabb8',flora:'#7a9ea4',accent:'#d9fcff',sky:'#c2ddeb',fog:'#d5e9f1',light:'#dcf4ff',enemies:['Frostfang wolf','Iceback boar','Glacier archer','Snow yeti','Frost crawler','Rime shaman','Snow elk','Ice sprite']},
 {climate:'Storm-swept highlands',weather:'storm',layout:'angular crystal roads and broken plazas',width:2300,ground:['#78839d','#8995ab','#9ca5b9'],road:'#bcb5cc',water:'#687eac',rock:'#73758f',flora:'#647f86',accent:'#d8c9ff',sky:'#8e9ab5',fog:'#a3afc5',light:'#d5deff',enemies:['Storm prowler','Spark beetle','Stormglass marksman','Thunder golem','Crystal scuttler','Storm oracle','Tempest ram','Lightning shade']},
 {climate:'Cold eclipse wasteland',weather:'void',layout:'obsidian spokes and ritual circles',width:2100,ground:['#4c465e','#5e536e','#6a5f7d'],road:'#9681a7',water:'#665096',rock:'#443d55',flora:'#69517c',accent:'#cb9cf3',sky:'#6d6485',fog:'#9382a8',light:'#d1b5ed',enemies:['Void hound','Abyssal spider','Eclipse acolyte','Obsidian sentinel','Rift scarab','Soul binder','Dreadhorn','Eclipse specter']},
 {climate:'Tropical tidal coast',weather:'spray',layout:'sandy coastal loops and coral avenues',width:2400,ground:['#93bdb1','#a8cec0','#c1d8c3'],road:'#e0d3a8',water:'#439cae',rock:'#87a8a4',flora:'#528f7d',accent:'#f0b6ac',sky:'#b7dfe3',fog:'#b8dfe0',light:'#fff1ce',enemies:['Reef stalker','Coral crab','Tide hunter','Coral colossus','Pearl crawler','Tide priest','Reef charger','Drowned spirit']},
 {climate:'Poisonous fungal jungle',weather:'spores',layout:'tangled root trails and fungal clearings',width:2200,ground:['#7d8654','#91945c','#a3a369'],road:'#b9a774',water:'#85934d',rock:'#79815c',flora:'#647846',accent:'#d8c56d',sky:'#b7ba8d',fog:'#c3c79c',light:'#e9e6b2',enemies:['Blight wolf','Plague boar','Spore hunter','Fungal behemoth','Venom spider','Plague witch','Briar charger','Spore phantom']},
 {climate:'Scorching lava fields',weather:'embers',layout:'fractured basalt roads and lava-side rings',width:2400,ground:['#553b3d','#674547','#7a4e48'],road:'#a86b57',water:'#ed6937',rock:'#443941',flora:'#714b48',accent:'#ffd084',sky:'#9c665c',fog:'#bd8875',light:'#ffc594',enemies:['Hell hound','Infernal scarab','Flame legionary','Molten juggernaut','Lava crawler','Infernal priest','Flame ravager','Burning shade']}
];
export const ENEMY_TYPES=[
 {shape:'wolf',role:'stalker',health:.75,damage:.85,speed:1.4},
 {shape:'boar',role:'charger',health:1.1,damage:1.1,speed:.9},
 {shape:'archer',role:'ranged',health:.7,damage:.8,speed:.8},
 {shape:'golem',role:'brute',health:2.1,damage:1.4,speed:.56},
 {shape:'spider',role:'swarm',health:.45,damage:.55,speed:1.25},
 {shape:'shaman',role:'healer',health:.85,damage:.65,speed:.75},
 {shape:'stag',role:'charger',health:1.2,damage:1.2,speed:1.15},
 {shape:'wisp',role:'ranged',health:.55,damage:.8,speed:1.1},
 {shape:'crab',role:'brute',health:1.6,damage:1.1,speed:.7},
 {shape:'skeleton',role:'ranged',health:.8,damage:1,speed:.85},
 {shape:'imp',role:'stalker',health:.65,damage:.8,speed:1.35},
 {shape:'serpent',role:'swarm',health:.7,damage:.8,speed:1.2}
];
export function biomeFor(route){return BIOMES[route.biomeIndex||0];}
export function mapBounds(route){const half=biomeFor(route).width/2;return{left:60,right:route.length+40,top:270-half,bottom:270+half};}
export function updateAwareness(e,player,dt,clock){
 const d=Math.hypot(player.x-e.x,player.y-e.y),home=Math.hypot(player.x-e.homeX,player.y-e.homeY);
 if(d<(e.boss?340:e.role==='ranged'||e.role==='healer'?300:215))e.alert=true;
 if(home>(e.boss?650:530)){e.alert=false;e.returning=true;}
 if(e.returning&&Math.hypot(e.x-e.homeX,e.y-e.homeY)<20)e.returning=false;
 if(!e.alert||e.returning){const x=e.homeX+(e.returning?0:Math.cos(clock*.35+e.seed)*32),y=e.homeY+(e.returning?0:Math.sin(clock*.28+e.seed)*27),dx=x-e.x,dy=y-e.y,n=Math.hypot(dx,dy)||1,speed=Math.min(n,e.speed*(e.returning?1:.22)*dt);e.x+=dx/n*speed;e.y+=dy/n*speed;return false;}return true;
}
