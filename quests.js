import {homeBounds} from './progression.js?v=castle-crossroads-1';
import{siteType}from'./settlement.js?v=castle-crossroads-1';
export const LOCATIONS={hall:{x:500,y:180,name:'Hearthhall',action:'Manage your home'},warden:{x:350,y:405,name:'Warden Elara',action:'Speak to the warden'},grove:{x:155,y:370,name:'Fallen timber',action:'Gather fallen timber'},garden:{x:745,y:390,name:'The garden',action:'Tend the garden'},apothecary:{x:220,y:180,name:'Apothecary',action:'Visit the apothecary'},smithy:{x:780,y:180,name:'Blacksmith',action:'Visit the blacksmith'},sanctum:{x:1030,y:180,name:'Ancient sanctum',action:'Visit the sanctum'},enchanter:{x:-30,y:180,name:'Runeforge',action:'Enchant armor'},gate:{x:890,y:430,name:'Forest gate',action:'Enter the forest'},relic:{x:825,y:115,name:'Moonstone relic',action:'Recover the moonstone'},exit:{x:130,y:440,name:'Way home',action:'Return to Willowglen'}};
export const QUESTS=[
 {id:'welcome',title:'A warden’s welcome',description:'Walk to Warden Elara and press F to speak.',target:'warden',region:'home',coins:25,xp:15,wood:0},
 {id:'timber',title:'Roots of a haven',description:'Find fallen timber beside the western grove. Press F to gather it.',target:'grove',region:'home',coins:20,xp:20,wood:35},
 {id:'build',title:'A light in the window',description:'Walk to the Apothecary and restore it using its building options.',target:'apothecary',region:'home',coins:35,xp:25,wood:15},
 {id:'harvest',title:'Something worth growing',description:'Walk to the garden, plant a crop, then harvest it when it is ready.',target:'garden',region:'home',coins:30,xp:25,wood:10},
 {id:'hunt',title:'Shadows beneath the boughs',description:'Enter the forest and defeat six creatures.',target:'gate',region:'wild',coins:40,xp:35,wood:10},
 {id:'relic',title:'The lost moonstone',description:'Find the glowing moonstone in the forest and press F to recover it.',target:'relic',region:'wild',coins:45,xp:40,wood:15},
 {id:'clear',title:'Silence the whispering woods',description:'Follow a wild trail to its end, defeat its boss, and return home.',target:'gate',region:'wild',coins:60,xp:50,wood:25},
 {id:'return',title:'A home worth protecting',description:'Return to Warden Elara and tell her the woods are safe.',target:'warden',region:'home',coins:100,xp:75,wood:50}
];
export function ensureQuests(s){s.quests ||= {talks:0,timber:0,harvests:0,kills:0,relic:false,expeditions:0,reported:false,claimed:[]};return s.quests;}
export function questComplete(s,q){const p=ensureQuests(s);return({welcome:p.talks>0,timber:p.timber>0,build:s.buildings.apothecary>0,harvest:p.harvests>0,hunt:p.kills>=6,relic:p.relic,clear:p.expeditions>0,return:p.reported})[q.id];}
export function currentQuest(s){const p=ensureQuests(s);return QUESTS.find(q=>!p.claimed.includes(q.id))||null;}
export function claimQuests(s){const p=ensureQuests(s),claimed=[];let q;while((q=currentQuest(s))&&questComplete(s,q)){p.claimed.push(q.id);s.coins+=q.coins;s.wood+=q.wood;const c=s.classes[s.classId];c.xp+=q.xp;c.earned+=q.xp;claimed.push(q);}return claimed;}
export function nearLocation(player,location,radius=85){return Math.hypot(player.x-location.x,player.y-location.y)<radius;}
export function movementVector(horizontal,vertical){const x=(horizontal+vertical)*Math.SQRT1_2,y=(vertical-horizontal)*Math.SQRT1_2,n=Math.hypot(x,y)||1;return{x:x/n,y:y/n};}
export function canStand(x,y,region,s){const b=homeBounds(s||{});if(x<b.left||x>b.right||y<b.top||y>b.bottom)return false;if(region!=='home')return true;return !['hall','apothecary','smithy','sanctum','enchanter'].some(id=>{if(['apothecary','smithy'].includes(id)&&s&&!siteType(s,id))return false;const l=LOCATIONS[id];return Math.abs(l.x-x)<65&&Math.abs(l.y-y)<45;});}
