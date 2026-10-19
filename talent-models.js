import * as THREE from './vendor/three.module.js';
import {Voxels,characterModel} from './voxel-models.js?v=kingdoms-art-1';
// Geometry is rebuilt only when a talent is learned, not on animation frames.
export function talentModel(id,skills=[0,0,0,0],demon=false){
 const model=characterModel(id,demon),colors={druid:['#caa56d','#88d65e','#e2edab','#c5dbef'],paladin:['#c4d5e8','#fff2b0','#ffc34c','#ffed8c'],warlock:['#94de78','#d4a2e8','#bf80ed','#ec617e'],wizard:['#90e9dc','#ff944d','#a4eaff','#e5e4ff']}[id],b=new Voxels();
 skills.forEach((rank,branch)=>{for(let n=0;n<rank;n++){const x=(branch-1.5)*9,z=n%2?8:-8,y=31+n*4;b.ball(x,y,z,1.5+n*.15,2,1.5,colors[branch]);b.line(x,y,z,x+(x<0?-1:1)*(2+n),y+3,z,1,colors[branch]);}if(rank)for(let n=0;n<rank*2;n++){const a=n/(rank*2)*Math.PI*2;b.v(Math.round(Math.cos(a)*(10+branch)),14+branch*4,Math.round(Math.sin(a)*(7+branch)),colors[branch]);}});
 if(b.cells.size){const mesh=b.mesh(.04);mesh.name='talentRegalia';model.getObjectByName('bodyRig').add(mesh);model.userData.voxelCount+=mesh.count;}return model;
}
export function druidFormModel(form='bear',rank=1){
 const g=new THREE.Group(),body=new THREE.Group();body.name='bodyRig';g.add(body);const b=new Voxels(),wolf=form==='wolf',were=!wolf&&rank===5,fur=wolf?['#666e78','#585b68','#424956','#353d4b','#27343f'][rank-1]:['#816144','#725b3c','#65523c','#544b3d','#493d35'][rank-1],mane=wolf?'#9ba8b6':'#9a7950';
 if(were){
  b.ball(0,29,-2,15,15,9,fur).ball(0,39,-1,18,10,11,fur).ball(0,38,10,10,9,9,mane).ball(0,32,18,7,5,6,fur).box(-5,31,23,11,4,1,'#282325');
  for(const side of [-1,1]){b.ball(side*8,44,10,4,4,3,fur);const arm=new Voxels().ball(0,-7,2,6,13,6,fur).ball(0,-18,6,6,5,6,mane);for(let i=-1;i<=1;i++)arm.line(i*3,-18,10,i*3,-24,14,1,'#e0c9a1');const m=arm.mesh();m.name=side<0?'armL':'armR';m.position.set(side*.64,1.4,.04);body.add(m);const leg=new Voxels().ball(0,-6,0,6,10,6,fur).box(-5,-17,-2,11,5,13,fur).mesh();leg.name=side<0?'legL':'legR';leg.position.set(side*.28,.68,0);g.add(leg);}
 }else{
  b.ball(0,wolf?19:18,0,wolf?9:14,wolf?9:12,wolf?19:18,fur).ball(0,wolf?25:26,14,wolf?7:10,8,8,mane).ball(0,wolf?22:24,wolf?24:21,wolf?4:7,4,wolf?10:5,fur).box(-2,wolf?23:24,wolf?33:26,5,2,1,'#252c32');
  for(const side of [-1,1]){if(wolf)b.line(side*5,29,14,side*7,40,12,2,fur);else b.ball(side*8,33,13,4,4,3,fur);for(const z of [-12,12]){const limb=new Voxels().box(-3,-14,-3,7,15,7,fur).box(-3,-16,-2,7,4,10,fur);for(let i=-1;i<=1;i++)limb.box(i*2,-16,7,1,2,3,'#d9c9b0');const m=limb.mesh();m.name='paw'+(z>0?'F':'B')+(side<0?'L':'R');m.position.set(side*(wolf?.27:.4),.65,z*.04);body.add(m);}}
  if(wolf)b.line(0,20,-17,0,26,-34,3,fur);
 }
 const eyeY=were?39:wolf?27:29,eyeZ=were?19:wolf?21:21;for(const side of [-1,1]){b.box(side*5-1,eyeY,eyeZ,3,2,2,wolf?'#fa7373':'#e8bd61');b.line(side*4,were?32:wolf?20:23,were?23:wolf?29:25,side*4,were?26:wolf?16:19,were?24:wolf?29:26,1,'#f1e2c0');}
 // Each rank adds its own silhouette: mane layers, bone plates, thorns, moon crystals.
 for(let stage=1;stage<=rank;stage++){for(const side of [-1,1]){b.line(side*(6+stage),were?42:29,6-stage*6,side*(10+stage*2),were?48+stage:32+stage*2,4-stage*6,1.2,stage<3?mane:stage<5?'#b8b49c':'#b9dce5');}for(let i=0;i<stage+2;i++)b.ball(Math.round(Math.sin(i*2.4)*10),were?38:27,Math.round(Math.cos(i*2.4)*11),2,2,2,stage%2?fur:mane);}
 const core=b.mesh();body.add(core);g.userData={kind:'druid',form,rank,biped:were,voxelCount:0};g.traverse(o=>{if(o.isMesh)g.userData.voxelCount+=o.count||0;});return g;
}
export function workshopModel(type){
 const g=new THREE.Group(),b=new Voxels(),stone='#b9bba8',wood='#806042';b.box(-30,0,-25,61,4,51,stone);
 if(type==='lumbermill'){
  b.box(-20,4,-18,40,30,36,'#bb9b6b');for(let x=-25;x<=25;x++)b.box(x,49-Math.floor(Math.abs(x)*.55),-24,1,3,47,'#985f43');for(let n=0;n<12;n++){const a=n*Math.PI/6,x=32+Math.round(Math.sin(a)*15),y=20+Math.round(Math.cos(a)*15);b.box(x-2,y-2,-3,5,5,8,wood).line(32,20,0,x,y,0,1,wood);}for(let n=0;n<7;n++)b.box(-29+n%3*8,5+Math.floor(n/3)*6,23,7,5,13,wood);
 }else if(type==='lodge'){
  b.box(-24,4,-19,49,30,39,'#c8b88e');for(let x=-30;x<=30;x++)b.box(x,55-Math.floor(Math.abs(x)*.65),-24,1,3,49,'#4a7058');for(const side of [-1,1])b.box(side*22,4,21,3,30,3,wood).line(side*8,38,25,side*17,48,23,1,'#ddd1a9');b.box(-5,4,22,11,23,2,wood).box(17,4,-15,9,46,9,stone);for(let i=0;i<4;i++)b.box(-26,5,25+i*5,52,1,2,'#8f956b');
 }else{
  b.box(-18,4,-18,37,44,37,'#aca8bf');for(let y=7;y<45;y+=8)b.box(-19,y,19,39,2,1,'#ddd3b0');for(let x=-22;x<=22;x++)b.box(x,68-Math.floor(Math.abs(x)*.7),-22,1,3,45,'#475e86');b.line(-16,55,0,21,77,0,5,'#b8c9cc').ball(23,78,0,6,6,6,'#8ce0ed');for(let i=0;i<12;i++)b.v(Math.round(Math.cos(i)*19),45+i%3,Math.round(Math.sin(i)*19),'#f4d782');
 }
 const mesh=b.mesh(.047);g.add(mesh);g.userData.voxelCount=mesh.count;return g;
}
