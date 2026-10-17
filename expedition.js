export const ROUTES=[
 {id:'briar',name:'The Briarwild Road',icon:'♞',length:5200,boss:'Mawroot, the Thorn King',kind:'beast',description:'Explore branching woodland roads, hidden treasure spurs, and five wolf-infested clearings. A corrupted antlered beast guards its end.',color:'#779853',sky:'#c9d8c0',coins:160,xp:180},
 {id:'cinder',name:'The Cinder Pilgrimage',icon:'♨',length:6400,boss:'Azrath, Cinder Sovereign',kind:'demon',description:'Explore forked ash roads and dead-end ruined shrines. A horned, winged demon waits beyond the burning gates.',color:'#a78267',sky:'#cdb8a7',coins:220,xp:230},
 {id:'hollow',name:'The Hollowfen Passage',icon:'☽',length:7600,boss:'The Hollow Colossus',kind:'ancient',description:'Explore looping marsh roads and hidden haunted groves to confront a towering, many-limbed ancient.',color:'#78969b',sky:'#b9cdd1',coins:280,xp:280}
];
export function pathY(x){return 270+Math.sin(x/320)*85+Math.sin(x/710)*40;}
export function routePoint(route,fraction){const x=Math.round(route.length*fraction);return{x,y:pathY(x)};}
export function trailWidth(x,route){return x>route.length-650?180:105;}
const branchCache=new WeakMap();
export function branchSegments(route){if(branchCache.has(route))return branchCache.get(route);const list=[];for(let i=0;i<4;i++){const x=route.length*(.19+i*.16),side=i%2?1:-1,a={x:x-170,y:pathY(x-170)},b={x:x+30,y:pathY(x)+side*340},c={x:x+300,y:pathY(x+300)};list.push({a,b,width:85},{a:b,b:c,width:85});const end={x:x+90,y:b.y+side*220};list.push({a:b,b:end,width:80,cache:i});}branchCache.set(route,list);return list;}
export function segmentDistance(x,y,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a.x-t*dx,y-a.y-t*dy);}
export function trailDistance(x,y,route){return Math.min(Math.abs(y-pathY(x)),...branchSegments(route).map(s=>segmentDistance(x,y,s.a,s.b)));}
export function canWalkTrail(x,y,route,limit=Infinity){return x>=60&&x<=route.length+40&&x<=limit&&(Math.abs(y-pathY(x))<=trailWidth(x,route)||branchSegments(route).some(s=>segmentDistance(x,y,s.a,s.b)<=s.width));}
export function newExpedition(id){const route=ROUTES.find(r=>r.id===id)||ROUTES[0];return{id:route.id,cleared:0,active:false,bossSpawned:false,bossDefeated:false,finished:false,discovered:[],checkpoints:[.14,.29,.44,.59,.74].map(f=>routePoint(route,f)),bossPoint:routePoint(route,.94),relicPoint:{...routePoint(route,.52),y:pathY(route.length*.52)+62}};}
export function routeFor(exp){return ROUTES.find(r=>r.id===exp.id)||ROUTES[0];}
export function forwardLimit(exp){if(!exp.active)return Infinity;return exp.bossSpawned?routeFor(exp).length+40:exp.checkpoints[exp.cleared].x+150;}
export function nextSpawn(exp,playerX,enemiesLeft){if(exp.bossDefeated)return null;if(exp.active&&enemiesLeft===0){exp.active=false;if(exp.bossSpawned){exp.bossDefeated=true;return'won';}exp.cleared++;}if(exp.active)return null;const point=exp.cleared<5?exp.checkpoints[exp.cleared]:exp.bossPoint;if(playerX>=point.x-200){exp.active=true;if(exp.cleared>=5){exp.bossSpawned=true;return'boss';}return'camp';}return null;}
export function bossWarning(kind,boss,player){if(kind==='beast')return{x:player.x,y:player.y,r:70,warn:1.2,t:1.2,damage:32,kind:'charge',fromX:boss.x,fromY:boss.y};if(kind==='demon')return{x:player.x,y:player.y,r:100,warn:1.5,t:1.5,damage:36,kind:'hellfire'};return{x:player.x,y:player.y,r:110,warn:1.8,t:1.8,damage:40,kind:'void'};}
