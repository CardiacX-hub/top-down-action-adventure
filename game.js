import{COMBAT,attackPattern,inCone,boundedTarget}from'./combat.js?v=town-trails-1';
import{createWorld}from'./world3d.js?v=town-trails-1';import{createInterface}from'./interface.js?v=town-trails-1';
import{CLASSES,advance,initialState,stats,reward}from'./model.js?v=town-trails-1';
import{ensureProgress,RECIPES,potionCount}from'./progression.js?v=town-trails-1';
import{LOCATIONS,ensureQuests,currentQuest,claimQuests,nearLocation,movementVector,canStand}from'./quests.js?v=town-trails-1';
import{ROUTES,pathY,newExpedition,routeFor,nextSpawn,forwardLimit,canWalkTrail,bossWarning}from'./expedition.js?v=town-trails-1';
const $=id=>document.getElementById(id),canvas=$('world');let world;try{world=createWorld(canvas);}catch(error){$('world-error').hidden=false;$('world-error').textContent='This 3D game needs WebGL 2. '+error.message;throw error;}
let s;try{s=JSON.parse(localStorage.getItem('conquest-save')||localStorage.getItem('elderwild-save'));if(s?.version!==1)s=null;}catch{}s ||=initialState();ensureProgress(s);ensureQuests(s);advance(s);
let mode='home',paused=false,player={x:520,y:450,hp:stats(s).health},keys={},pointerDown=false,destination=null,moving=false,aim={x:650,y:300},clock=0,toastTimer,navTarget=null;
let enemies=[],companions=[],effects=[],bolts=[],zones=[],hazards=[],expedition=null,wave=1,kills=0,attackCd=0,abilityCd=0,secondaryCd=0,transform=0,shield=0,summonTime=0,attackNumber=0;
let tonicTimers={renewal:0,iron:0,fury:0};
const ui=createInterface({state:()=>s,mode:()=>mode,portraits:world.portraits,pause:value=>paused=value,clearInput(){keys={};pointerDown=false;destination=null;},focus:()=>canvas.focus({preventScroll:true}),changed:note,classChanged:()=>player.hp=stats(s).health,venture,home,interact,navigate(id){navTarget=LOCATIONS[id];toast('Follow the marker to '+navTarget.name+'. Walk close to see its options.');}});
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3300);}
function save(){try{localStorage.setItem('conquest-save',JSON.stringify(s));}catch{toast('Saving is unavailable in this browser.');}}
function render(){ui.render();}
function checkQuests(){const claimed=claimQuests(s);for(const q of claimed)s.log.unshift('Quest complete: '+q.title+' · +'+q.coins+' coins · +'+q.xp+' XP');s.log=s.log.slice(0,5);if(claimed.length){toast('Quest complete: '+claimed.at(-1).title);save();}}
function note(message,notify=true){s.log.unshift(message);s.log=s.log.slice(0,5);if(notify)toast(message);checkQuests();save();render();}
function venture(id){if(mode!=='home'||!nearLocation(player,LOCATIONS.gate,135)){toast('Walk to the gate at the end of the village path to begin an expedition.');return;}mode='wild';paused=false;destination=null;navTarget=null;expedition=newExpedition(id);player={x:100,y:pathY(100),hp:stats(s).health};enemies=[];bolts=[];effects=[];zones=[];hazards=[];companions=[];wave=1;kills=0;abilityCd=0;secondaryCd=0;attackCd=0;transform=0;shield=0;summonTime=0;attackNumber=0;tonicTimers={renewal:0,iron:0,fury:0};const route=routeFor(expedition);$('map-label').textContent='↗ '+route.name.toUpperCase();$('map-badge').textContent='FOLLOW THE PATH';$('region-title').textContent=route.name.toUpperCase();$('map-hint').textContent='Follow the road · Space attack · Q/R skills · E potion';toast('Follow the road through five guarded clearings. '+route.boss+' waits at its end.');canvas.focus({preventScroll:true});render();}
function home(won=!!expedition?.bossDefeated){if(mode!=='wild')return;const route=routeFor(expedition);mode='home';paused=false;destination=null;navTarget=null;enemies=[];bolts=[];effects=[];zones=[];hazards=[];companions=[];transform=0;shield=0;tonicTimers={renewal:0,iron:0,fury:0};player={x:520,y:450,hp:stats(s).health};$('map-label').textContent='✧ WILLOWGLEN';$('map-badge').textContent='YOUR HOME';$('region-title').textContent='WILLOWGLEN · YOUR HAVEN';$('map-hint').textContent='Walk near a building to see its options.';if(won){s.quests.expeditions++;s.routeWins[route.id]=(s.routeWins[route.id]||0)+1;reward(s,route.coins,route.xp);s.wood+=50;note(route.boss+' defeated. Bounty: '+route.coins+' coins, '+route.xp+' XP, 50 timber.');}else note('Returned to Willowglen with the rewards already earned.');expedition=null;checkQuests();render();updateHUD();}
function hit(e,damage){if(e.dead)return;e.hp-=damage;effects.push({x:e.x,y:e.y,t:.6,text:Math.round(damage),color:e.boss?'#ffcfab':'#f5e3a4'});if(e.hp<=0){e.dead=true;kills++;s.quests.kills++;if(s.classId==='paladin'&&s.classes.paladin.skills[1]>=4)player.hp=Math.min(stats(s).health,player.hp+8);if(!e.boss){reward(s,8+wave*3,12+wave*2);effects.push({x:e.x,y:e.y+15,t:1.1,text:'+'+(8+wave*3)+' coins · +'+(12+wave*2)+' XP',color:'#e4e1b0'});}else effects.push({x:e.x,y:e.y,t:2,text:'GUARDIAN FELLED',color:'#f4c77d'});burst(e.x,e.y,e.boss?'#ecb678':'#e6d29a',e.boss?45:9);checkQuests();}}
function potion(){if(paused||mode!=='wild')return;const id=s.equippedPotion;if(potionCount(s,id)<=0){toast('No '+RECIPES[id].name+' left. Harvest ingredients and craft more at the Apothecary.');return;}if((id==='healing'||id==='elixir')&&player.hp>=stats(s).health){toast('Your health is already full.');return;}if(id==='healing')s.potions--;else s.tonics[id]--;if(id==='healing')player.hp=Math.min(stats(s).health,player.hp+40+s.buildings.apothecary*20);else if(id==='elixir'){player.hp=stats(s).health;shield=Math.max(shield,4);}else if(id==='soul'){abilityCd=0;secondaryCd=0;}else tonicTimers[id]=id==='renewal'?8:35;effects.push({x:player.x,y:player.y,t:1.4,text:RECIPES[id].name,color:'#d8edb0'});burst(player.x,player.y,'#c6df9c',14);save();render();}
function movePlayer(dt){let h=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0),v=(keys.KeyS||keys.ArrowDown?1:0)-(keys.KeyW||keys.ArrowUp?1:0);let vec=movementVector(h,v);if(h||v)destination=null;else if(destination){const dx=destination.x-player.x,dy=destination.y-player.y,n=Math.hypot(dx,dy);if(n<6)destination=null;else vec={x:dx/n,y:dy/n};}moving=Math.hypot(vec.x,vec.y)>.01;const speed=s.classId==='paladin'?160:transform>0?210:185,nx=player.x+vec.x*speed*dt,ny=player.y+vec.y*speed*dt,allowed=(x,y)=>mode==='home'?canStand(x,y,'home',s):canWalkTrail(x,y,routeFor(expedition),forwardLimit(expedition));if(allowed(nx,player.y))player.x=nx;if(allowed(player.x,ny))player.y=ny;}
function nearestInteraction(){const points=mode==='home'?Object.entries(LOCATIONS).filter(([id])=>!['relic','exit'].includes(id)).map(([id,p])=>({id,...p})):[{id:'exit',name:'Way home',action:expedition.bossDefeated?'Claim bounty & return home':'Retreat to Willowglen',x:expedition.bossDefeated?routeFor(expedition).length:100,y:pathY(expedition.bossDefeated?routeFor(expedition).length:100)},...(!s.quests.relic?[{id:'relic',name:'Moonstone relic',action:'Recover the moonstone',...expedition.relicPoint}]:[])];return points.filter(p=>nearLocation(player,p,p.id==='hall'?115:p.id==='gate'?120:p.id==='garden'?100+s.home.plots*45:100)).sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y))[0];}
function updateInteractPrompt(){const p=nearestInteraction();$('interact-prompt').hidden=!p;$('interact-label').textContent=p?p.action:'';ui.proximity(p);if(p&&navTarget&&p.name===navTarget.name)navTarget=null;}
function interact(){if(paused)return;const p=nearestInteraction();if(!p){toast('Walk closer to a building, person, resource, or relic.');return;}if(['hall','apothecary','smithy','sanctum','garden','gate'].includes(p.id)){ui.open(p.id);return;}if(p.id==='warden'){s.quests.talks++;if(s.quests.expeditions>0&&s.quests.claimed.includes('clear'))s.quests.reported=true;note(s.quests.reported?'Elara: Your courage has given Willowglen a future.':'Elara: Restore our haven, recover the moonstone, and defeat a guardian at the end of a wild trail.');}else if(p.id==='grove'){if(!s.quests.timber){s.quests.timber++;s.wood+=20;note('Gathered 20 fallen timber. Your woodcutters will keep gathering more.');}else toast('Fallen timber already gathered. Your villagers keep the stores supplied.');}else if(p.id==='exit')home();else if(p.id==='relic'){s.quests.relic=true;note('Recovered the moonstone. A guardian still waits at the road’s end.');}checkQuests();save();render();}
function updateTrail(){const event=nextSpawn(expedition,player.x,enemies.length);const route=routeFor(expedition);if(event==='camp'){wave=expedition.cleared+1;const p=expedition.checkpoints[expedition.cleared];enemies=Array.from({length:3+wave},(_,i)=>({x:p.x+Math.sin(i*2)*55,y:p.y+Math.cos(i*2)*65,hp:30+wave*10+ROUTES.indexOf(route)*12,max:30+wave*10+ROUTES.indexOf(route)*12,cd:0,type:i%3}));toast('Clearing '+wave+' / 5 · Defeat its guardians to open the road.');}else if(event==='boss'){const p=expedition.bossPoint,hp=route.kind==='beast'?560:route.kind==='demon'?760:960;enemies=[{...p,hp,max:hp,cd:1,spellCd:2,boss:true,name:route.boss,kind:route.kind,type:0}];toast('Guardian ahead: '+route.boss+'. Keep moving and dodge the crimson marks.');}else if(event==='won'){hazards=[];note('Trail conquered: '+route.boss+'. Claim your bounty or walk to the final gate.');}}
function updateHazards(dt){for(const h of hazards){h.t-=dt;if(h.t<=0&&!h.resolved){h.resolved=true;h.t=.6;if(h.kind==='charge'){const boss=enemies.find(e=>e.boss);if(boss){effects.push({x:boss.x,y:boss.y,tx:h.x,ty:h.y,t:.7,line:true,color:'#dd8f6d'});boss.x=h.x;boss.y=h.y;}}if(Math.hypot(player.x-h.x,player.y-h.y)<h.r){const damage=Math.max(5,h.damage-stats(s).armor-(shield>0?8:0)-(tonicTimers.iron>0?8:0));player.hp-=damage;effects.push({x:player.x,y:player.y,t:1,text:'−'+damage,color:'#ffb29d'});}burst(h.x,h.y,h.kind==='void'?'#bea4e1':'#f0aa6a',18);}}hazards=hazards.filter(h=>h.t>0);}
function updateHUD(){const boss=enemies.find(e=>e.boss&&!e.dead),route=expedition?routeFor(expedition):null,progress=expedition?Math.min(100,Math.round(player.x/route.length*100)):0;ui.combat({hp:player.hp,q:abilityCd,r:secondaryCd,boss,warning:boss&&boss.hp<boss.max*.5?'ENRAGED · faster attacks':'Dodge the crimson marks',trail:expedition?progress+'% · '+(boss?'GUARDIAN':expedition.bossDefeated?'VICTORY':'Clearing '+Math.min(5,expedition.cleared+1)+' / 5'):'',status:mode==='home'?'WALK UP TO BUILDINGS FOR OPTIONS':transform>0?(s.classId==='druid'?'BEAR FORM':'DEMON FORM')+' · '+Math.ceil(transform)+'s':Object.entries(tonicTimers).some(([,v])=>v>0)?Object.entries(tonicTimers).filter(([,v])=>v>0).map(([k,v])=>RECIPES[k].name+' '+Math.ceil(v)+'s').join(' · '):shield>0?'SACRED SHIELD · '+Math.ceil(shield)+'s':COMBAT[s.classId].attack,victory:expedition?.bossDefeated?route:null});}
function targetPoint(range){let target=aim;if(keys.Space){const e=enemies.filter(e=>!e.dead).sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y))[0];if(e)target=e;}return boundedTarget(player,target,range);}
function burst(x,y,color,count=16){for(let i=0;i<count;i++){const a=i/count*Math.PI*2;effects.push({x,y,vx:Math.cos(a)*(35+Math.random()*70),vy:Math.sin(a)*(35+Math.random()*70),t:.65+Math.random()*.3,particle:true,color});}}
function zone(x,y,radius,duration,kind,damage=0){zones.push({x,y,radius,t:duration,max:duration,kind,damage,tick:0});}
function ability(){
 if(paused||mode!=='wild'||abilityCd>0)return;
 const id=s.classId,t=s.classes[id].skills,st=stats(s);abilityCd=COMBAT[id].cooldown*(Math.max(...t)>=4?.8:1);
 if(id==='druid'){
  zone(player.x,player.y,135,5,'grove',7+t[1]*4);player.hp=Math.min(st.health,player.hp+18+t[2]*18);
  if(t[0]){transform=5+t[0]*2;burst(player.x,player.y,'#b5d881',25);}
 }else if(id==='paladin'){
  zone(player.x,player.y,155,5,'holy',10+t[2]*6);shield=4+t[0];player.hp=Math.min(st.health,player.hp+t[1]*20);
 }else if(id==='warlock'){
  const p=targetPoint(300);zone(p.x,p.y,115,.9,'rift');let count=0;
  enemies.filter(e=>!e.dead&&Math.hypot(e.x-p.x,e.y-p.y)<115).forEach(e=>{hit(e,st.damage*2.3);count++;});player.hp=Math.min(st.health,player.hp+count*8);
  if(t[1])transform=5+t[1]*2;burst(p.x,p.y,'#d799e0',28);
 }else{
  zone(player.x,player.y,180,1,'fire');enemies.filter(e=>!e.dead&&Math.hypot(e.x-player.x,e.y-player.y)<180).forEach(e=>{hit(e,st.damage*1.8+t[1]*10);e.burn=3;});burst(player.x,player.y,'#f1ba74',30);
 }
 effects.push({x:player.x,y:player.y-45,t:1,text:COMBAT[id].primary,color:'#faf0c3'});
}
function secondary(){
 if(paused||mode!=='wild'||secondaryCd>0)return;const id=s.classId,t=s.classes[id].skills,st=stats(s);secondaryCd=COMBAT[id].secondaryCooldown*(Math.max(...t)>=4?.85:1);
 if(id==='druid'){
  const p=targetPoint(260);zone(p.x,p.y,115,4,'roots',6+t[1]*3);enemies.filter(e=>Math.hypot(e.x-p.x,e.y-p.y)<115).forEach(e=>e.root=4);
 }else if(id==='paladin'){
  const from={x:player.x,y:player.y},to=targetPoint(195),angle=Math.atan2(to.y-from.y,to.x-from.x);player.x=canWalkTrail(to.x,to.y,routeFor(expedition),forwardLimit(expedition))?to.x:player.x;player.y=canWalkTrail(to.x,to.y,routeFor(expedition),forwardLimit(expedition))?to.y:player.y;shield=Math.max(shield,2);
  enemies.forEach(e=>{const along=(e.x-from.x)*Math.cos(angle)+(e.y-from.y)*Math.sin(angle),across=Math.abs(-(e.x-from.x)*Math.sin(angle)+(e.y-from.y)*Math.cos(angle));if(along>=-25&&along<=220&&across<45){hit(e,st.damage*2);e.root=1;}});
  effects.push({x:from.x,y:from.y,tx:player.x,ty:player.y,t:.6,line:true,color:'#f4dea1'});burst(player.x,player.y,'#f7e0a4');
 }else if(id==='warlock'){
  summonTime=12;zone(player.x+40,player.y,45,1.5,'rift');burst(player.x+40,player.y,'#c192d7');
 }else{
  const p=targetPoint(400),a=Math.atan2(p.y-player.y,p.x-player.x);bolts.push({x:player.x,y:player.y,vx:Math.cos(a)*540,vy:Math.sin(a)*540,t:1.3,d:st.damage*2,kind:'ice',color:'#a2e0eb',pierce:true,hits:new Set()});
  player.hp=Math.min(st.health,player.hp+t[2]*10);
 }
 effects.push({x:player.x,y:player.y-65,t:1,text:COMBAT[id].secondary,color:'#d9e9ef'});
}
function attack(){
 if(attackCd>0)return;const id=s.classId,t=s.classes[id].skills,p=attackPattern(id,t,transform>0);attackCd=p.interval;
 const target=targetPoint(600),a=Math.atan2(target.y-player.y,target.x-player.x),d=stats(s).damage*p.multiplier*(tonicTimers.fury>0?1.35:1);
 if(p.kind==='melee'){
  const color=id==='paladin'?'#f4d787':'#b6d38e';effects.push({x:player.x,y:player.y,t:.28,slash:true,angle:a,range:p.range,color});
  enemies.filter(e=>!e.dead&&inCone(player,e,a,p.range)).forEach(e=>{hit(e,d);burst(e.x,e.y,color,5);});return;
 }
 attackNumber++;
 for(let i=0;i<p.count;i++){
  const angle=a+(i-(p.count-1)/2)*.2,kind=p.kind==='elemental'?(attackNumber%2?'fire':'frost'):p.kind;
  bolts.push({x:player.x,y:player.y-8,vx:Math.cos(angle)*p.speed,vy:Math.sin(angle)*p.speed,t:1.9,d,kind,pierce:!!p.pierce,hits:p.pierce?new Set():undefined,homing:p.homing,color:kind==='fire'?'#efad68':kind==='frost'?'#9edee8':id==='druid'?'#bdd58b':'#c192dc'});
 }
}
function update(dt){
 if(paused)return;clock+=dt;effects.forEach(e=>{e.t-=dt;if(e.particle){e.x+=e.vx*dt;e.y+=e.vy*dt;e.vy+=30*dt;}});effects=effects.filter(e=>e.t>0);movePlayer(dt);updateInteractPrompt();if(mode!=='wild'){updateHUD();return;}for(const k of Object.keys(tonicTimers))tonicTimers[k]=Math.max(0,tonicTimers[k]-dt);if(tonicTimers.renewal>0)player.hp=Math.min(stats(s).health,player.hp+12*dt);if(s.classId==='druid'&&s.classes.druid.skills[2]>=5)player.hp=Math.min(stats(s).health,player.hp+2*dt);updateHazards(dt);
 attackCd-=dt;abilityCd=Math.max(0,abilityCd-dt);secondaryCd=Math.max(0,secondaryCd-dt);transform=Math.max(0,transform-dt);shield=Math.max(0,shield-dt);summonTime=Math.max(0,summonTime-dt);
 if(pointerDown||keys.Space)attack();
 for(const z of zones){z.t-=dt;z.tick-=dt;if(z.tick<=0){z.tick=.65;if(z.kind==='grove'&&Math.hypot(player.x-z.x,player.y-z.y)<z.radius)player.hp=Math.min(stats(s).health,player.hp+3+s.classes.druid.skills[2]*2);if(z.damage)enemies.filter(e=>!e.dead&&Math.hypot(e.x-z.x,e.y-z.y)<z.radius).forEach(e=>{hit(e,z.damage);if(z.kind==='roots')e.root=Math.max(e.root||0,.8);});}}
 zones=zones.filter(z=>z.t>0);
 for(const b of bolts){
  if(b.homing){const e=enemies.filter(e=>!e.dead).sort((a,c)=>Math.hypot(a.x-b.x,a.y-b.y)-Math.hypot(c.x-b.x,c.y-b.y))[0];if(e){const a=Math.atan2(e.y-b.y,e.x-b.x);b.vx+=(Math.cos(a)*310-b.vx)*dt*3;b.vy+=(Math.sin(a)*310-b.vy)*dt*3;}}
  b.x+=b.vx*dt;b.y+=b.vy*dt;b.t-=dt;
  for(const e of enemies){if(e.dead||b.hits?.has(e)||Math.hypot(b.x-e.x,b.y-e.y)>=24)continue;hit(e,b.d);burst(e.x,e.y,b.color,5);if(b.kind==='soul')player.hp=Math.min(stats(s).health,player.hp+2+(s.classes.warlock.skills[2]>=4?2:0));if(b.kind==='fire')e.burn=2;if(b.kind==='frost'){e.chill=2;if(s.classes.wizard.skills[2]>=5)e.root=1.2;}if(b.kind==='ice'){e.root=2.5+s.classes.wizard.skills[2]*.35;b.hits.add(e);}if(b.pierce)b.hits.add(e);else{b.t=0;break;}}
 }
 bolts=bolts.filter(b=>b.t>0);
 for(const e of enemies){
  if(e.dead)continue;for(const status of ['root','chill','burn'])e[status]=Math.max(0,(e[status]||0)-dt);
  if(e.burn>0){e.burnTick=(e.burnTick||0)-dt;if(e.burnTick<=0){hit(e,4+s.classes[s.classId].skills[1]*2);e.burnTick=.6;}}
  if(e.boss){e.spellCd-=dt;if(e.spellCd<=0){const h=bossWarning(e.kind,e,player);hazards.push(h);if(e.kind==='ancient')for(const off of [-85,85])hazards.push({...h,x:h.x+off,r:65});e.spellCd=e.hp<e.max*.5?3.3:5.3;}}const d=Math.hypot(player.x-e.x,player.y-e.y)||1,move=e.root>0?(e.boss?.3:0):e.chill>0?.45:1;
  if(d>(e.boss?58:22)){e.x+=(player.x-e.x)/d*(e.boss?(e.hp<e.max*.5?60:44):38+wave*6)*move*dt;e.y+=(player.y-e.y)/d*(e.boss?(e.hp<e.max*.5?60:44):38+wave*6)*move*dt;}e.cd-=dt;
  if(d<(e.boss?70:28)&&e.cd<=0){e.cd=1;const damage=Math.max(1,(e.boss?23:11+wave*2)-stats(s).armor-(tonicTimers.iron>0?8:0)-(shield>0?8:0)-(transform>0?3:0));player.hp-=damage;if(s.classId==='paladin'&&s.classes.paladin.skills[0]>=4)hit(e,5+damage*.65);effects.push({x:player.x,y:player.y-20,t:.6,text:'−'+damage,color:'#f3b5a7'});}
 }
 enemies=enemies.filter(e=>!e.dead);
 const t=s.classes[s.classId].skills,rank=(s.classId==='wizard'||s.classId==='warlock')?t[0]:0;
 if(rank||summonTime>0){
  const count=rank>=4?3:rank>=3?2:1;while(companions.length<count)companions.push({x:player.x+40,y:player.y,cd:0});
  for(let i=0;i<companions.length;i++){const c=companions[i],a=clock+i*Math.PI;c.x+=(player.x+Math.cos(a)*55-c.x)*dt*3;c.y+=(player.y+Math.sin(a)*40-c.y)*dt*3;c.cd-=dt;if(c.cd<=0&&enemies.length){const e=enemies.reduce((a,b)=>Math.hypot(a.x-c.x,a.y-c.y)<Math.hypot(b.x-c.x,b.y-c.y)?a:b);if(Math.hypot(e.x-c.x,e.y-c.y)<300){hit(e,8+rank*7);effects.push({x:c.x,y:c.y,tx:e.x,ty:e.y,t:.2,line:true,color:s.classId==='wizard'?'#a5e0e3':'#c493da'});c.cd=.9;}}}
 }else companions=[];
 if(player.hp<=0){s.coins=Math.max(0,s.coins-20);home(false);note('Rescued by your villagers. Recovery cost: up to 20 coins.');return;}
 updateTrail();updateHUD();

}

window.addEventListener('keydown',e=>{if(paused)return;if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();keys[e.code]=true;if(e.repeat)return;if(e.code==='KeyQ')ability();if(e.code==='KeyR')secondary();if(e.code==='KeyE')potion();if(e.code==='KeyF')interact();});window.addEventListener('keyup',e=>keys[e.code]=false);window.addEventListener('blur',()=>{keys={};pointerDown=false;});
canvas.addEventListener('pointermove',e=>aim=world.pick(e.clientX,e.clientY));canvas.addEventListener('pointerdown',e=>{if(paused)return;canvas.setPointerCapture(e.pointerId);canvas.focus({preventScroll:true});aim=world.pick(e.clientX,e.clientY);if(mode==='home'||e.button===2||e.shiftKey||e.pointerType==='touch'){destination={...aim};pointerDown=false;}else pointerDown=true;});for(const evt of ['pointerup','pointercancel'])canvas.addEventListener(evt,()=>pointerDown=false);canvas.addEventListener('contextmenu',e=>e.preventDefault());
$('interact-prompt').onclick=interact;$('touch-interact').onclick=interact;for(const id of ['q-skill','touch-q'])$(id).onclick=ability;for(const id of ['r-skill','touch-r'])$(id).onclick=secondary;for(const id of ['potion-skill','touch-potion'])$(id).onclick=potion;$('return').onclick=()=>home();$('save').onclick=()=>{save();toast('Your haven and progress are saved on this device.');};
for(const b of document.querySelectorAll('[data-move]')){const code=b.dataset.move;b.addEventListener('pointerdown',e=>{e.preventDefault();if(paused)return;b.setPointerCapture(e.pointerId);keys[code]=true;});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>keys[code]=false);}$('touch-attack').addEventListener('pointerdown',e=>{e.preventDefault();if(paused)return;e.currentTarget.setPointerCapture(e.pointerId);keys.Space=true;});for(const event of ['pointerup','pointercancel','lostpointercapture'])$('touch-attack').addEventListener(event,()=>keys.Space=false);
$('zoom-in').onclick=()=>world.zoom(.2);$('zoom-out').onclick=()=>world.zoom(-.2);$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.querySelector('.world-card').requestFullscreen();}catch{toast('Fullscreen is unavailable. You can still use the zoom buttons.');}};
function draw(){world.render({s,mode,player,enemies,companions,bolts,effects,zones,hazards,expedition,navTarget,clock,transform,shield,moving,attackCd,facingTarget:mode==='wild'&&(pointerDown||keys.Space)?targetPoint(600):null});}
let last=performance.now(),lastDraw=0;function frame(now){let remaining=Math.min((now-last)/1000,.5);last=now;if(!document.hidden){while(remaining>0){const step=Math.min(remaining,1/30);update(step);remaining-=step;}if(now-lastDraw>1000/24){draw();lastDraw=now;}}requestAnimationFrame(frame);}render();updateHUD();requestAnimationFrame(frame);setInterval(()=>{advance(s);checkQuests();render();save();},1000);window.addEventListener('pagehide',save);
