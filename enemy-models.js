import * as THREE from './vendor/three.module.js';
import{Voxels}from'./voxel-models.js?v=open-regions-1';
import{biomeFor,ENEMY_TYPES}from'./biomes.js?v=open-regions-1';
export function enemyModel(type,route){const b=new Voxels(),climate=biomeFor(route),fur=climate.rock,trim=climate.flora,glow=climate.accent,shape=ENEMY_TYPES[type].shape,bone='#d6c9a7';
 if(['wolf','boar','stag'].includes(shape)){const wolf=shape==='wolf';b.ball(0,14,0,wolf?7:11,9,wolf?15:13,fur).ball(0,21,13,wolf?6:8,7,7,trim).ball(0,18,21,wolf?4:7,3,wolf?7:4,fur);for(const side of [-1,1]){for(const z of [-10,10])b.box(side*6-2,0,z-2,5,14,5,fur);b.box(side*4,25,12,3,7,3,trim).v(side*4,23,19,glow);b.line(side*4,18,23,side*7,23,25,1,bone);if(shape==='stag'){b.line(side*4,26,12,side*13,44,7,1,bone).line(side*9,35,9,side*18,40,4,1,bone);}}b.line(0,18,-13,0,25,-25,wolf?2:1,fur);
 }else if(shape==='spider'||shape==='crab'||shape==='serpent'){
  if(shape==='serpent'){for(let i=0;i<9;i++)b.ball(Math.round(Math.sin(i*.8)*6),4+i,12-i*5,5,4,5,fur);b.ball(0,14,15,7,5,6,trim);b.line(-2,12,21,-2,8,25,1,glow).line(2,12,21,2,8,25,1,glow);}else{b.ball(0,11,-5,shape==='crab'?13:8,8,12,fur).ball(0,10,10,6,5,5,trim);for(const side of [-1,1])for(let i=0;i<4;i++)b.line(side*5,11,-10+i*6,side*(17+i%2*5),6,-15+i*9,1.5,trim).line(side*(17+i%2*5),6,-15+i*9,side*(23+i%2*3),0,-18+i*10,1,fur);for(const side of [-1,1]){b.ball(side*5,14,12,2,2,2,glow);if(shape==='crab')b.line(side*8,10,9,side*20,15,23,2,fur).ball(side*21,17,25,5,3,6,trim);}}
 }else if(shape==='golem'){
  b.box(-11,13,-7,23,23,15,fur).ball(0,43,0,8,9,7,trim).box(-5,42,8,3,3,1,glow).box(3,42,8,3,3,1,glow);for(const side of [-1,1])b.box(side*7-4,0,-5,9,15,11,fur).ball(side*17,30,0,7,9,7,trim).box(side*17-4,10,-4,9,19,9,fur);for(let i=0;i<5;i++)b.box(-9+i*4,19,8,2,13,1,trim);b.ball(0,28,9,3,4,2,glow);
 }else if(shape==='wisp'){
  b.ball(0,23,0,9,13,8,trim).ball(0,24,2,5,8,6,glow);for(let i=0;i<4;i++)b.line(-7+i*5,13,0,-12+i*7,1-i%2*4,0,1,trim);b.box(-4,28,9,2,2,1,'#343342').box(3,28,9,2,2,1,'#343342');
 }else{
  const imp=shape==='imp',skeleton=shape==='skeleton';b.box(-7,12,-4,15,18,9,skeleton?bone:trim).ball(0,37,0,6,7,6,skeleton?bone:fur);for(const side of [-1,1])b.box(side*4-2,0,-3,5,13,6,fur).line(side*8,28,0,side*13,17,4,2,fur);b.box(-4,38,6,2,2,1,glow).box(3,38,6,2,2,1,glow);
  if(shape==='archer'||skeleton){for(let i=0;i<14;i++){const a=-Math.PI/2+i/13*Math.PI;b.ball(-15,24+Math.round(Math.sin(a)*15),5+Math.round(Math.cos(a)*7),1,1,1,bone);}b.line(-15,9,5,-15,39,5,.6,glow).line(-16,24,4,-16,24,22,1,bone);}else if(shape==='shaman'){b.line(14,0,4,14,42,4,1,bone).ball(14,46,4,4,6,4,glow);for(const side of [-1,1])b.line(side*5,42,0,side*12,50,-3,1,bone);}else if(imp){for(const side of [-1,1])b.line(side*5,42,0,side*10,51,-2,1,bone).line(side*8,28,-2,side*22,37,-5,1,fur);for(let i=0;i<10;i++)b.box(-20+i,24+i,-5,1,5,1,trim).box(20-i,24+i,-5,1,5,1,trim);}
 }
 const g=new THREE.Group(),mesh=b.mesh(.042);g.add(mesh);g.userData.voxelCount=mesh.count;g.userData.shape=shape;return g;
}
export function climateProp(route,variant=0){const b=new Voxels(),c=biomeFor(route),i=route.biomeIndex||0;
 if(i===0){b.box(-2,0,-2,5,25,5,'#806240').ball(0,36,0,15,17,14,c.flora).ball(10,30,5,10,12,10,'#779951');}
 else if(i===3){b.box(-1,0,-1,3,38,3,c.rock);for(let n=0;n<5;n++){const w=15-n*2;b.ball(0,15+n*8,0,w,8,w,c.flora).ball(0,19+n*8,0,w,4,w,c.ground[2]);}}
 else if([1,5,8].includes(i)){b.box(-2,0,-2,5,32,5,c.rock);for(const side of [-1,1])b.line(0,20,0,side*14,37,side*5,2,c.rock).line(side*10,31,side*4,side*10,44,side*6,1,c.accent);if(i===5)b.ball(0,42,0,5,9,5,c.accent);}
 else if(i===2){for(let n=0;n<7;n++){const x=Math.round(Math.sin(n*8)*9),z=Math.round(Math.cos(n*5)*8);b.box(x,0,z,1,22+n%3*5,1,c.flora).box(x-1,22+n%3*5,z-1,3,6,3,'#aa9564');}}
 else if(i===4){for(let n=0;n<5;n++){const x=(n-2)*7;b.box(x,0,-3,5,10+n%3*12,7,c.rock).line(x,8+n%3*12,0,x+2,22+n%3*12,0,2,c.accent);}}
 else if(i===6){for(const side of [-1,1])for(let n=0;n<4;n++)b.line(0,4,0,side*(8+n*3),17+n*4,n*3,2,n%2?c.accent:c.flora);b.box(-2,0,-2,5,16,5,c.rock);}
 else{b.box(-2,0,-2,5,19+variant*3,5,c.flora).ball(0,22+variant*3,0,15,6,14,c.accent);for(let n=0;n<14;n++)b.ball(Math.round(Math.sin(n*9)*12),27+variant*3,Math.round(Math.cos(n*7)*10),2,1,2,c.rock);}
 const g=b.mesh(.05);g.castShadow=false;return g;
}
