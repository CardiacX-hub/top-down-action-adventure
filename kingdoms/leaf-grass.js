/** Small, individually scattered leaf blades give the meadow the same dielectric sheen as foliage.
 * One shared geometry/material is instanced in cullable chunks; no alpha cards. */
import * as THREE from '../vendor/three.module.js';
export function createLeafGrassGeometry(){
 const positions=[],colors=[],uv=[],indices=[];
 // Twelve separate pointed leaves, two triangles each: retain the old 24-triangle budget.
 for(let leaf=0;leaf<12;leaf++){
  const base=positions.length/3,angle=leaf*2.399,dx=Math.sin(angle),dz=Math.cos(angle),length=.60+(leaf%3)*.07,anchorX=Math.sin(leaf*7.13)*.85,anchorZ=Math.cos(leaf*5.37)*.85;
  for(const [t,side] of [[0,0],[.5,-1],[.5,1],[1,0]]){
   const width=.125,along=t*length;
   positions.push(anchorX+dx*along+dz*side*width,Math.sin(t*Math.PI*.72)*(.32+leaf%3*.045),anchorZ+dz*along-dx*side*width);
   colors.push(.65+t*.30,.78+t*.20,.50+t*.24);uv.push(.5+side*.5,t);
  }
  indices.push(base,base+1,base+2,base+1,base+3,base+2);
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
export function createLeafGrassMaterial(){
 const size=256,data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=x/(size-1),v=y/(size-1),mid=Math.exp(-Math.abs(u-.5)*90),vein=Math.pow(Math.max(0,Math.cos((v-Math.abs(u-.5)*.75)*85)),16),shine=.76+.16*Math.sin(u*Math.PI)+mid*.10+vein*.06,i=(y*size+x)*4;
  data[i]=shine*230;data[i+1]=shine*255;data[i+2]=shine*185;data[i+3]=255;
 }
 const texture=new THREE.DataTexture(data,size,size);texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.generateMipmaps=true;texture.anisotropy=8;texture.needsUpdate=true;
 const material=new THREE.MeshPhysicalMaterial({color:0xffffff,map:texture,bumpMap:texture,bumpScale:.009,vertexColors:true,metalness:0,roughness:.43,clearcoat:.32,clearcoatRoughness:.38,side:THREE.DoubleSide});material.userData.kawThinSurface=.24;return material;
}
