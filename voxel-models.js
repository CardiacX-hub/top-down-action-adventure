import * as THREE from './vendor/three.module.js';
const cube = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshLambertMaterial({color:0xffffff,vertexColors:true});
const shade=(x,y,z)=>((Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453)%1)*.045;
export class Voxels {
 constructor(){this.cells=new Map();}
 v(x,y,z,color){this.cells.set(`${x},${y},${z}`,{x,y,z,color});return this;}
 box(x,y,z,w,h,d,c){for(let i=0;i<w;i++)for(let j=0;j<h;j++)for(let k=0;k<d;k++)this.v(x+i,y+j,z+k,c);return this;}
 ball(x,y,z,rx,ry,rz,c){for(let i=-Math.ceil(rx);i<=rx;i++)for(let j=-Math.ceil(ry);j<=ry;j++)for(let k=-Math.ceil(rz);k<=rz;k++)if(i*i/(rx*rx)+j*j/(ry*ry)+k*k/(rz*rz)<=1)this.v(Math.round(x+i),Math.round(y+j),Math.round(z+k),c);return this;}
 line(x,y,z,tx,ty,tz,r,c){const n=Math.ceil(Math.hypot(tx-x,ty-y,tz-z)*1.5);for(let i=0;i<=n;i++){const t=i/(n||1);this.ball(Math.round(x+(tx-x)*t),Math.round(y+(ty-y)*t),Math.round(z+(tz-z)*t),r,r,r,c);}return this;}
 mesh(unit=.04){
  // Keep every visible micro-voxel, but omit faces hidden by neighboring cubes.
  // This preserves the block resolution while cutting GPU work dramatically.
  const positions=[],normals=[],colors=[];let count=0;const tint=new THREE.Color();
  const faces=[
   {n:[1,0,0],p:[[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5],[.5,-.5,.5]]},
   {n:[-1,0,0],p:[[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5],[-.5,-.5,-.5]]},
   {n:[0,1,0],p:[[-.5,.5,-.5],[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5]]},
   {n:[0,-1,0],p:[[-.5,-.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5]]},
   {n:[0,0,1],p:[[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,.5]]},
   {n:[0,0,-1],p:[[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5],[.5,-.5,-.5]]}
  ];
  for(const v of this.cells.values()){let exposed=false;tint.set(v.color);tint.offsetHSL(0,0,shade(v.x,v.y,v.z));
   for(const face of faces){const[a,b,c]=face.n;if(this.cells.has(`${v.x+a},${v.y+b},${v.z+c}`))continue;exposed=true;
    for(const i of [0,1,2,0,2,3]){const p=face.p[i];positions.push((v.x+p[0])*unit,(v.y+p[1])*unit,(v.z+p[2])*unit);normals.push(a,b,c);colors.push(tint.r,tint.g,tint.b);}
   }if(exposed)count++;
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeBoundingSphere();const mesh=new THREE.Mesh(geometry,material);mesh.count=count;mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.voxelCount=count;return mesh;
 }

}
const gold='#d2aa4c',silver='#cbd8d7',skin='#d9b48c';
export function characterModel(id,form=false){const g=new THREE.Group(),b=new Voxels();
 if(form&&id==='druid'){
  b.ball(0,15,0,13,11,17,'#69533a').ball(0,22,13,10,9,9,'#8e7350').ball(-8,29,13,4,4,3,'#6b563a').ball(8,29,13,4,4,3,'#6b563a').ball(0,20,20,6,4,4,'#baa079').box(-2,21,24,5,2,1,'#34382a');
  for(const x of [-9,9])for(const z of [-11,11])b.box(x-3,1,z-3,7,13,7,'#5d4f36');
  for(const x of [-5,5])b.box(x,25,21,2,2,1,'#b7e889');for(let i=0;i<14;i++)b.ball(Math.round(Math.sin(i*2)*11),23+i%3,Math.round(Math.cos(i*2)*12),3,2,3,'#78914c');
  for(const side of [-1,1]){b.line(side*7,29,9,side*13,42,7,1,'#b2a378');b.line(side*11,36,8,side*19,41,6,1,'#b2a378');}
 }else if(form&&id==='warlock'){
  b.ball(0,22,0,10,13,6,'#714580').ball(0,39,1,7,8,6,'#a96c9d');for(const side of [-1,1]){b.line(side*6,44,1,side*12,58,-2,2,'#d6c09e');b.line(side*8,30,0,side*17,12,2,3,'#976095');b.box(side*5-3,0,-3,6,14,7,'#4a3555');for(let i=0;i<22;i++){const height=Math.round(31+i*.5);b.line(side*(8+i),height,-3,side*(10+i),15+i*.6,-7,1,'#693a64');}b.line(side*7,33,-3,side*30,47,-6,1,'#bd85ad');}b.ball(0,27,7,3,5,1,'#a4e494');b.box(-5,40,7,3,2,1,'#c4f89b').box(3,40,7,3,2,1,'#c4f89b');
 }else{
  const robe={druid:'#526b37',paladin:'#8c999e',warlock:'#51315f',wizard:'#344d83'}[id];
  for(let y=9;y<30;y++){const width=id==='paladin'?8:Math.round(12-(y-9)*.25);b.box(-width,y,-5,width*2+1,1,11,robe);}
  b.ball(0,37,1,7,8,6,skin);b.box(-5,38,7,2,1,1,'#34352e').box(4,38,7,2,1,1,'#34352e');
  if(id==='druid'){
   for(let i=0;i<19;i++){const a=i/19*Math.PI*2;b.ball(Math.round(Math.cos(a)*11),29+i%3,Math.round(Math.sin(a)*7),3,4,3,i%3?'#829d4e':'#b3c572');}b.ball(0,43,0,8,3,7,'#698344');
   for(const side of [-1,1]){b.line(side*5,44,0,side*13,57,-2,1,'#b8aa7c').line(side*12,52,-1,side*20,55,-2,1,'#b8aa7c').line(side*12,53,-1,side*10,61,-3,1,'#b8aa7c');}
   b.line(15,1,3,16,43,4,1,'#85633f').line(16,43,4,20,48,4,1,'#85633f').ball(18,44,4,3,4,3,'#8bbf61');for(let i=0;i<6;i++)b.ball(16+Math.round(Math.sin(i)*3),13+i*4,4,2,1,2,'#8caa55');
  }else if(id==='paladin'){
   b.box(-10,20,-6,21,12,13,silver).box(-14,27,-7,8,7,14,gold).box(7,27,-7,8,7,14,gold);b.box(-1,18,8,3,13,1,gold).box(-6,25,8,13,3,1,gold);b.ball(0,39,0,8,9,7,silver).box(-6,39,8,13,2,1,'#3b4a52').box(-1,34,9,3,14,1,gold).box(-1,48,-4,3,8,10,'#b9694d');
   for(let y=13;y<34;y++){const w=y<18?Math.round((y-10)*.8):8;b.box(-24,y,0,w*2,1,3,gold);if(y>17&&y<31)b.box(-22,y,3,12,1,1,'#e1d7b6');}b.box(-17,19,5,2,10,1,gold).box(-21,25,5,10,2,1,gold);
   b.box(16,9,3,2,30,2,'#f1e9c6').box(12,18,2,10,2,4,gold).box(16,3,3,2,14,2,'#8d6c40');for(let y=32;y<42;y++)b.box(16,y,3,2,1,2,'#f5e6ab');
  }else if(id==='warlock'){
   for(let y=32;y<49;y++){const w=Math.max(2,Math.round((51-y)*.5));b.box(-w,y,-5,w*2+1,1,11,'#6e467a');}b.box(-6,34,7,13,9,1,'#292c37').box(-4,39,8,2,2,1,'#b8f697').box(3,39,8,2,2,1,'#b8f697');for(const side of [-1,1])b.line(side*6,44,0,side*15,55,-3,1.5,'#c3a7ad');
   b.box(14,23,1,11,2,12,'#a17e43').box(15,25,2,9,3,10,'#e1cca1').box(19,28,2,1,1,10,'#9c7852').ball(-16,24,3,3,5,3,'#a8d97b');for(let y=11;y<29;y+=4)b.box(-1,y,7,3,2,1,'#be9c79');
  }else{
   b.box(-12,44,-8,25,2,17,'#3c5895');for(let y=46;y<66;y++){const w=Math.max(1,Math.round((66-y)*.4)),offset=Math.round((y-46)*.15);b.box(-w+offset,y,-Math.max(1,w-1),w*2+1,1,Math.max(3,w*2),'#42649e');}b.box(-10,46,-7,22,2,15,gold);for(let i=0;i<16;i++){const x=Math.round(Math.sin(i*13)*9),y=12+i*2;b.box(x,y,6,1,2,1,'#b9b487');}b.box(-4,29,7,9,7,1,'#dfdfcc').box(-2,23,7,5,6,1,'#dfdfcc');b.line(16,1,2,16,40,2,1,'#91754a').ball(16,46,2,3,6,3,'#92d9dc').box(12,39,0,9,2,5,gold);
  }
  for(let side=-1;side<=1;side+=2){const leg=new Voxels().box(-2,0,-2,5,10,6,id==='paladin'?silver:'#534c3e').box(-2,0,1,5,3,4,'#48483b').mesh();leg.geometry.translate(0,-.36,0);leg.position.set(side*.19,.36,0);leg.name=side<0?'legL':'legR';g.add(leg);}
  for(const side of [-1,1]){b.line(side*11,28,1,side*15,20,4,2,robe).ball(side*15,18,4,2,3,2,skin);}
  // Tiny contrasting stitches, clasps, plates, and robe embroidery.
  for(let y=12;y<29;y+=3)for(const x of [-7,7])b.v(x,y,6,id==='warlock'?'#c69db8':id==='wizard'?'#c6bf8d':'#b7b879');
 }
 const rig=new THREE.Group();rig.name='bodyRig';g.add(rig);const armParts={armL:new Voxels(),armR:new Voxels()},pawParts={pawFL:new Voxels(),pawFR:new Voxels(),pawBL:new Voxels(),pawBR:new Voxels()};for(const[key,v]of [...b.cells]){if((!form||(id==='warlock'&&v.z>=0))&&Math.abs(v.x)>=12&&v.y<44){const name=v.x<0?'armL':'armR';armParts[name].v(v.x-(v.x<0?-12:12),v.y-29,v.z,v.color);b.cells.delete(key);}if(form&&id==='druid'&&v.y<14&&Math.abs(v.x)>5){const name='paw'+(v.z>0?'F':'B')+(v.x<0?'L':'R');pawParts[name].v(v.x-(v.x<0?-9:9),v.y-13,v.z-(v.z>0?11:-11),v.color);b.cells.delete(key);}}for(const[name,part]of Object.entries(form&&id==='druid'?pawParts:armParts)){if(!part.cells.size)continue;const limb=part.mesh();limb.name=name;if(name.startsWith('paw'))limb.position.set(name.endsWith('L')?-.36:.36,.52,name[3]==='F'?.44:-.44);else limb.position.set(name==='armL'?-.48:.48,1.16,0);rig.add(limb);}if(form&&id==='warlock')for(const side of [-1,1]){const part=new Voxels();for(const[key,v]of [...b.cells])if(v.y<14&&Math.sign(v.x)===side){part.v(v.x-side*5,v.y-13,v.z,v.color);b.cells.delete(key);}const leg=part.mesh();leg.name=side<0?'legL':'legR';leg.position.set(side*.2,.52,0);g.add(leg);}const core=b.mesh();core.name='body';rig.add(core);g.userData.kind=id;g.userData.form=form;g.userData.voxelCount=0;g.traverse(o=>{if(o.isMesh)g.userData.voxelCount+=o.userData.voxelCount||0;});return g;
}
export function buildingModel(type){const b=new Voxels(),stone='#c6c1aa',timber='#775534';b.box(-30,0,-25,61,3,51,'#8e8f7b');
 if(type==='sanctum'||type==='enchanter'){
  for(let i=0;i<4;i++)b.box(-25+i*3,3+i*2,8+i*3,51-i*6,2,20-i*3,'#d8d0b3');
  for(const side of [-1,1]){b.box(side*20-4,3,-15,9,48,9,stone);b.box(side*20-6,3,-17,13,4,13,'#a4a591');b.box(side*20-6,47,-17,13,5,13,'#d9d2b7');for(let y=10;y<44;y+=7)b.box(side*20-5,y,-9,11,1,1,'#a5aa99');for(let y=18;y<40;y+=6)b.v(side*20,y,-9,'#9cced3');}
  for(let x=-22;x<=22;x++){const y=45+Math.round(Math.sqrt(Math.max(0,22*22-x*x))*.6);b.box(x,y,-15,1,5,9,stone);}b.ball(0,24,-5,7,13,7,'#7dc6d2');for(let y=14;y<37;y++)b.v(0,y,3,'#d1f3e6');b.box(-8,4,-13,17,5,17,'#aeac92');
 }else{
  b.box(-24,3,-20,49,32,41,'#d6c7a4');b.box(-25,3,-21,51,7,43,'#b4b09a');
  for(const x of [-24,0,24])b.box(x,8,21,2,28,2,timber);for(const y of [10,25,34])b.box(-25,y,21,51,2,2,timber);b.box(-5,4,22,11,21,2,'#85643f').box(-4,5,24,9,19,1,'#a17b47').v(3,15,25,'#e4c578');
  for(const x of [-16,15]){b.box(x-5,17,22,10,10,2,timber).box(x-4,18,24,8,8,1,'#eac776').box(x,18,25,1,8,1,timber).box(x-4,22,25,8,1,1,timber);b.box(x-6,15,23,12,2,5,'#9a7748');for(let i=-4;i<5;i+=2)b.ball(x+i,18,26,1,2,1,'#8b9b56');}
  const roof=type==='smithy'?'#667078':'#647c42';for(let x=-29;x<=29;x++){const y=53-Math.floor(Math.abs(x)*.6);b.box(x,y,-25,1,3,51,roof);for(let z=-24;z<=24;z+=5){b.box(x,y+3,z,1,1,1,type==='smithy'?'#879191':'#81954e');}}
  for(let z=-25;z<=25;z+=3)b.box(-1,54,z,3,1,2,'#9b9e74');b.box(14,33,-11,8,26,8,'#a3886b');for(let y=36;y<58;y+=4)b.box(14,y,-11,8,1,8,'#bdac8a');
  if(type==='apothecary'){b.box(12,5,27,16,11,8,'#8a6943').box(11,16,26,18,2,10,'#b39662');for(let i=0;i<5;i++){const x=13+i*3;b.box(x,18,28,2,4+i%2,2,['#9dce94','#c4a5ce','#8dc7c6'][i%3]).v(x,23+i%2,28,'#d5bc82');}for(let i=0;i<60;i++){const x=Math.round(Math.sin(i*17)*25),z=Math.round(Math.cos(i*13)*23),y=57-Math.floor(Math.abs(x)*.6);if(i%4)b.ball(x,y,z,2,1,2,'#8ba157');else b.v(x,y+1,z,'#eadbb1');}}
  else{b.box(-37,3,9,13,11,13,'#777f7b').box(-39,15,7,17,4,15,'#a1aaa4').box(-34,12,11,7,4,7,'#a1aaa4');b.box(25,3,-6,14,16,15,'#928370').box(26,8,10,10,8,1,'#f5b56a');for(let i=0;i<8;i++)b.box(27+(i%3)*3,3+Math.floor(i/3)*2,17,3,2,5,'#b7c3bd');}
 }
 if(type==='enchanter'){b.ball(0,32,0,9,9,9,'#b296dc');for(let i=0;i<8;i++){const x=Math.round(Math.cos(i*Math.PI/4)*22),z=Math.round(Math.sin(i*Math.PI/4)*22);b.box(x,3,z,3,9,3,'#b3a0d0').v(x,13,z,'#e1d5fa');}}
 // Irregular ivy and individual blossoms at the masonry edges.
 for(let i=0;i<32;i++){const x=i%2?25:-25,y=5+(i*7)%28,z=18-(i%5)*3;b.ball(x,y,z,1,2,1,'#7e9856');if(i%7===0)b.v(x+1,y+2,z+1,'#e5dbb5');}
 const g=new THREE.Group();g.add(b.mesh(.047));g.userData.voxelCount=g.children[0].count;return g;
}
export function treeModel(){const b=new Voxels();b.box(-1,0,-1,3,18,3,'#80633e');b.ball(0,24,0,10,12,9,'#5e7e42').ball(-6,19,3,7,7,7,'#769347').ball(6,20,-2,6,8,6,'#8ba254');for(let i=0;i<20;i++){const x=Math.round(Math.sin(i*12)*8),z=Math.round(Math.cos(i*18)*7);b.v(x,28+i%3,z,'#adc075');}return b.mesh(.075);}
export function creatureModel(type){const b=new Voxels();if(type===0){b.ball(0,10,0,10,8,13,'#7c8b50').ball(0,10,12,7,5,4,'#b4aa76');for(const x of [-7,7]){b.box(x-2,0,-7,4,6,4,'#657445').box(x-2,0,8,4,6,4,'#657445');b.box(x,13,10,1,2,2,'#e3e1ac');b.line(x,6,13,x*1.5,12,14,1,'#e2ce99');}for(let i=0;i<6;i++)b.ball(Math.round(Math.sin(i)*7),17,Math.round(Math.cos(i)*8),2,2,2,'#9eac6a');}
 else if(type===1){b.ball(0,10,0,7,7,14,'#927868').ball(0,16,12,6,7,6,'#bba184').ball(0,13,18,3,3,5,'#d1baa0');b.box(-6,21,12,3,7,3,'#bba184').box(4,21,12,3,7,3,'#bba184');for(const x of [-4,4])b.box(x,0,-9,3,9,3,'#7c695b').box(x,0,9,3,9,3,'#7c695b');b.line(0,11,-13,0,18,-23,2,'#ad9279');b.v(-3,17,18,'#f4df99').v(3,17,18,'#f4df99');}
 else{b.ball(0,18,0,8,11,7,'#ac95c1').box(-5,18,7,11,10,1,'#ddd0dc').box(-4,23,8,3,2,1,'#60456e').box(2,23,8,3,2,1,'#60456e');for(let i=-5;i<=5;i+=5)b.line(i,10,0,i+3,1,0,1,'#9e83b0');}return b.mesh(.045);}
export function companionModel(id){const b=new Voxels();if(id==='warlock'){b.ball(0,12,0,6,8,5,'#a16a88').line(-4,17,0,-9,27,-2,1,'#d7c49b').line(4,17,0,9,27,-2,1,'#d7c49b').box(-3,15,5,2,2,1,'#caf29b').box(2,15,5,2,2,1,'#caf29b');for(let i=0;i<10;i++)b.box(-8-i,13+i*.5|0,-2,1,4,2,'#784a75').box(8+i,13+i*.5|0,-2,1,4,2,'#784a75');}else{b.ball(0,12,0,7,12,6,'#84c6cd').box(-4,16,6,2,2,1,'#e3f1cd').box(3,16,6,2,2,1,'#e3f1cd');for(let y=0;y<24;y++)b.v(0,y,6,'#b5e5df');}return b.mesh(.045);}
export function hallModel(level=0){const b=new Voxels(),wood='#775536',plaster='#d8c8a2',roof='#647d83';b.box(-35,0,-27,71,4,55,'#a7a38a').box(-29,4,-22,59,48,45,plaster);for(const x of [-29,-14,14,28])b.box(x,5,23,2,46,2,wood);for(const y of [8,30,48])b.box(-30,y,23,61,2,2,wood);b.box(-7,4,24,15,23,2,'#9a7847').box(-1,4,26,2,23,1,'#d2af6e');for(const x of [-20,20])for(const y of [18,39]){b.box(x-5,y-5,24,11,11,2,wood).box(x-4,y-4,26,9,9,1,'#e5d3a0').box(x,y-4,27,1,9,1,wood);}for(let x=-35;x<=35;x++){const y=74-Math.floor(Math.abs(x)*.6);b.box(x,y,-28,1,3,57,roof);for(let z=-27;z<29;z+=5)b.v(x,y+3,z,'#91a3a0');}b.box(-8,47,25,17,22,4,plaster).box(-9,68,24,19,2,6,wood);for(let x=-12;x<=12;x++)b.box(x,77-Math.abs(x),23,1,2,10,roof);b.ball(0,60,30,5,5,1,'#c6a85d').box(-1,60,32,2,4,1,'#7c7556').box(0,59,32,4,1,1,'#7c7556');b.box(25,47,-8,8,28,8,'#a3896c');for(let i=0;i<4;i++)b.box(-14-i*3,3-i,26+i*3,29+i*6,1,4,'#bfbaa0');for(const side of [-1,1]){b.box(side*27,6,28,1,27,1,'#a38b5c').box(side*27,24,29,1,14,8,'#bdaa65');b.box(side*27,29,30,1,2,6,'#e1d2a1');}if(level>=1){for(const side of [-1,1])b.box(side*36-8,0,-21,17,38+level*4,43,'#c4bfa6');}if(level>=2){for(const side of [-1,1]){b.box(side*43-10,0,-24,21,77+(level-2)*20,25,'#b7bdaf');for(let y=12;y<70;y+=15)b.box(side*43-3,y,2,7,9,1,'#6d8b91');for(let x=-10;x<=10;x+=7)b.box(side*43+x,78+(level-2)*20,-25,4,7,27,'#d5d3bb');}}if(level>=3){b.box(-55,0,-32,111,15,8,'#b7bdaf');for(const side of [-1,1]){b.box(side*43-12,91,-25,25,4,27,'#d4d3bb').box(side*43,98,-13,1,24,1,'#b59b58').box(side*43+1,111,-13,13,9,1,'#6c859d');}b.box(-37,25,26,75,8,5,'#c2bc9d');}const g=new THREE.Group();g.add(b.mesh(.048));g.userData.voxelCount=g.children[0].count;return g;}
export function bossModel(kind,theme){const b=new Voxels();
 if(kind==='beast'){
  b.ball(0,24,0,19,16,25,'#4f6340').ball(0,34,23,14,12,13,'#817052').ball(0,28,34,9,6,7,'#ad9873');for(const x of [-13,13])for(const z of [-16,17]){b.box(x-4,0,z-4,9,22,9,'#586047');for(let i=0;i<3;i++)b.box(x-4+i*3,0,z+5,2,3,4,'#d5c198');}
  for(const side of [-1,1]){b.line(side*8,43,21,side*19,65,12,2,'#c4b388').line(side*15,56,16,side*31,62,12,2,'#c4b388').line(side*19,62,13,side*16,74,8,1,'#c4b388').line(side*9,27,34,side*12,37,39,1.5,'#d8c79b');b.box(side*6-2,37,35,4,3,2,'#f2996c');}
  for(let i=0;i<28;i++){const x=Math.round(Math.sin(i*13)*19),z=Math.round(Math.cos(i*17)*22);b.ball(x,37+i%4,z,3,3,3,'#83944b');if(i%4===0)b.line(x,38,z,x*1.2,49+i%5,z,1,'#bcad78');}b.ball(0,40,2,5,7,5,'#cf9c70');
 }else if(kind==='demon'){
  b.ball(0,34,0,14,20,8,'#703e49').ball(0,59,2,10,12,9,'#ad665b').box(-6,24,9,13,24,3,'#5b424c');for(const side of [-1,1]){b.box(side*8-4,0,-5,9,22,11,'#5c3a42').box(side*8-4,0,3,9,5,9,'#9b745e');b.line(side*11,48,1,side*24,23,5,4,'#a05b55');b.line(side*7,67,0,side*20,84,-6,2,'#dbc29a');b.line(side*19,82,-6,side*24,75,-9,1,'#dbc29a');for(let i=0;i<36;i++){const h=Math.round(45+i*.6);b.line(side*(13+i),h,-5,side*(15+i),20+i*.6,-11,1,'#793c4d');}b.line(side*12,50,-6,side*49,69,-10,2,'#be7b6a');b.box(side*6-2,61,11,4,2,2,'#f4c26b');b.box(side*14,44,2,7,8,7,'#b2956c');}b.ball(0,39,12,5,9,2,'#f1a461').box(26,8,4,3,36,3,'#e8b57a').box(22,21,3,12,3,5,'#c8a46e');for(let i=0;i<12;i++)b.box(25,40+i,4,5-i%3,1,3,'#f2c075');
 }else{
  b.ball(0,37,0,18,23,14,'#4b6770').ball(0,65,0,13,15,11,'#8c9f9b').box(-9,57,12,19,20,2,'#c2c6b4').box(-7,67,15,5,4,1,'#b18cd2').box(3,67,15,5,4,1,'#b18cd2').box(-3,58,15,7,4,1,'#5a4c6d');
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2,x=Math.round(Math.cos(a)*20),z=Math.round(Math.sin(a)*17);b.line(x*.5,35,z*.5,x,15,z,3,'#718c8c').line(x,15,z,x*1.7,2,z*1.6,2,'#637c80');for(let j=0;j<6;j++)b.ball(x+j%2,18+j*4,z,1,2,1,'#a08abe');}for(const side of [-1,1]){b.line(side*14,48,0,side*32,23,4,4,'#7a9593');b.line(side*8,75,-4,side*18,89,-6,2,'#b9bda8');}for(let i=0;i<20;i++)b.ball(Math.round(Math.sin(i*17)*16),20+i%10*4,Math.round(Math.cos(i*13)*12),2,3,2,'#9e8cbb');b.ball(0,39,17,5,8,2,'#bea0d9');
 }
 if(theme){const tint=new THREE.Color();for(const v of b.cells.values()){tint.set(v.color);tint.lerp(new THREE.Color(theme==='ice'?'#a9dce9':theme==='storm'?'#8a85be':'#765098'),.58);v.color='#'+tint.getHexString();}const crystal=theme==='ice'?'#e1faff':theme==='storm'?'#f6e2a2':'#d8a9f0';if(theme==='ice')for(let i=0;i<7;i++){const z=-20+i*7;b.line(0,37,z,0,55+i%3*5,z-5,2,crystal);}if(theme==='ice')for(const side of [-1,1])b.line(side*10,50,13,side*22,84,9,2,crystal);if(theme==='storm')for(const side of [-1,1]){b.line(side*12,76,0,side*26,97,0,2,crystal).line(side*26,97,0,side*18,102,0,1,crystal).line(side*18,102,0,side*29,117,0,1,crystal);}if(theme==='void'){for(let i=0;i<9;i++){const a=i/9*Math.PI*2,x=Math.round(Math.cos(a)*18),z=Math.round(Math.sin(a)*16);b.ball(x,87,z,2,3,2,crystal).line(x,84,z,x*.6,74,z*.6,1,'#b29bc7');}b.ball(0,46,13,6,7,3,crystal);}}const g=new THREE.Group(),m=b.mesh(kind==='beast'?.055:.052);m.castShadow=false;g.add(m);g.userData.voxelCount=m.count;g.userData.kind=kind;return g;
}
