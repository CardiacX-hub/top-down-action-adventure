export const GEAR_RECIPES={
 ironwood:{name:'Ironwood weapon',slot:'weapon',tier:1,level:1,wood:35,coins:35,ingredients:{herb:2},damage:6,description:'+6 attack damage for any class.'},
 runesteel:{name:'Runesteel weapon',slot:'weapon',tier:2,level:2,wood:65,coins:90,ingredients:{ember:3,frost:2},damage:14,description:'+14 attack damage for any class.'},
 starforged:{name:'Starforged weapon',slot:'weapon',tier:3,level:3,wood:100,coins:170,ingredients:{lotus:3,dusk:3},damage:24,description:'+24 attack damage for any class.'},
 traveler:{name:'Traveler’s cloak',slot:'cloak',tier:1,level:1,wood:20,coins:25,ingredients:{carrot:3,herb:1},health:20,description:'+20 maximum health.'},
 warden:{name:'Warden’s mantle',slot:'cloak',tier:2,level:2,wood:40,coins:65,ingredients:{pumpkin:3,frost:2},health:45,armor:2,description:'+45 maximum health and +2 armor.'},
 royal:{name:'Royal guardian cloak',slot:'cloak',tier:3,level:3,wood:75,coins:130,ingredients:{lotus:2,dusk:3},health:75,armor:4,description:'+75 maximum health and +4 armor.'}
};
export function canForge(s,id){const r=GEAR_RECIPES[id];return !!r&&s.buildings.smithy>=r.level&&(GEAR_RECIPES[s.equipment?.[r.slot]]?.tier||0)<r.tier&&s.wood>=r.wood&&s.coins>=r.coins&&Object.entries(r.ingredients).every(([k,n])=>(s.inventory?.[k]||0)>=n);}
export function forgeGear(s,id){if(!canForge(s,id))return false;const r=GEAR_RECIPES[id];s.wood-=r.wood;s.coins-=r.coins;for(const[k,n]of Object.entries(r.ingredients))s.inventory[k]-=n;s.equipment[r.slot]=id;return true;}
export function gearBonuses(s){const result={damage:0,health:0,armor:0};for(const slot of ['weapon','cloak']){const r=GEAR_RECIPES[s.equipment?.[slot]];if(r)for(const stat of Object.keys(result))result[stat]+=r[stat]||0;}return result;}
