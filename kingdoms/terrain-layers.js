/** Original procedural calibration textures. Replace these arrays with authored
 * maps of identical dimensions: albedo RGB (sRGB), height A (linear), tangent
 * normal RGB (linear), and roughness/metallic/AO RGB (linear). No borrowed assets. */
import * as THREE from '../vendor/three.module.js';
export function createTerrainLayers(size=256){
 const albedo=new Uint8Array(size*size*4*3),normal=new Uint8Array(albedo.length),orm=new Uint8Array(albedo.length);
 const colors=[[78,112,45],[116,87,57],[112,115,111]];
 // Tileable value noise avoids periodic bands and moiré at RTS zoom distances.
 const noise=(x,y,frequency,seed)=>{const px=x*frequency,py=y*frequency,ix=Math.floor(px),iy=Math.floor(py),fx=px-ix,fy=py-iy,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
  const hash=(a,b)=>{a=((a%frequency)+frequency)%frequency;b=((b%frequency)+frequency)%frequency;let h=Math.imul(a+seed*97,374761393)^Math.imul(b+seed*31,668265263);h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967295;};
  const a=hash(ix,iy),b=hash(ix+1,iy),c=hash(ix,iy+1),d=hash(ix+1,iy+1);return (a+(b-a)*sx)*(1-sy)+(c+(d-c)*sx)*sy;};
 const leaf=(x,y)=>{const u=((x*12)%1+1)%1,v=((y*12)%1+1)%1,w=.44*Math.sin(v*Math.PI),edge=w-Math.abs(u-.5);return Math.max(0,Math.min(1,edge*24))*(.5+.3*Math.exp(-Math.abs(u-.5)*45)+.2*Math.pow(Math.max(0,Math.cos((v-Math.abs(u-.5)*.7)*36)),10));};
 const height=(x,y,l)=>Math.min(.99,.36+.25*noise(x,y,4,l+1)+.20*noise(x,y,16,l+7)+(l===0?.035:.12)*noise(x,y,64,l+19)+(l===0?leaf(x,y)*.10:0));
 for(let l=0;l<3;l++)for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const i=((l*size+y)*size+x)*4,h=height(x/size,y/size,l),dx=height((x+1)/size,y/size,l)-height((x-1)/size,y/size,l),dy=height(x/size,(y+1)/size,l)-height(x/size,(y-1)/size,l);
  const inv=1/Math.hypot(dx*1.2,dy*1.2,1),n={x:-dx*1.2*inv,y:-dy*1.2*inv,z:inv};
  for(let c=0;c<3;c++)albedo[i+c]=Math.min(255,colors[l][c]*(.78+h*.4+(l===0?leaf(x/size,y/size)*.16:0)));
  albedo[i+3]=h*255;normal[i]=(n.x*.5+.5)*255;normal[i+1]=(n.y*.5+.5)*255;normal[i+2]=(n.z*.5+.5)*255;normal[i+3]=255;
  orm[i]=[.48,.87,.76][l]*255;orm[i+1]=0;orm[i+2]=( .72+h*.28)*255;orm[i+3]=255;
 }
 const texture=(data,srgb=false)=>{const t=new THREE.DataArrayTexture(data,size,size,3);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=THREE.LinearFilter;t.minFilter=THREE.LinearMipmapLinearFilter;t.generateMipmaps=true;t.colorSpace=srgb?THREE.SRGBColorSpace:THREE.NoColorSpace;t.needsUpdate=true;return t;};
 return {albedoHeight:texture(albedo,true),normal:texture(normal),orm:texture(orm)};
}
