import * as THREE from './vendor/three.module.js';
import{Voxels}from'./voxel-models.js?v=open-regions-1';
import{pathY,trailDistance}from'./expedition.js?v=open-regions-1';
import{biomeFor,mapBounds}from'./biomes.js?v=open-regions-1';
import{climateProp}from'./enemy-models.js?v=open-regions-1';
export function buildTrail(route){const root=new THREE.Group(),chunks=[],trees=[],climate=biomeFor(route),bounds=mapBounds(route),protos=[climateProp(route,0),climateProp(route,1)],index=route.biomeIndex;
 for(let start=60;start<bounds.right;start+=600){const group=new THREE.Group(),b=new Voxels(),details=new Voxels(),end=Math.min(start+600,bounds.right+20);
  for(let x=start;x<end;x+=20)for(let y=bounds.top;y<=bounds.bottom;y+=20){const ix=(x-500)/20,iz=(y-270)/20,d=trailDistance(x,y,route),cross=index%3===0?Math.abs(Math.sin(x/530)*500+270-y)<30:index%3===1?Math.abs((y-270)-Math.sin(x/790)*650)<30:Math.abs(Math.abs(y-270)-460)<25,path=d<35||cross,n=Math.abs(Math.round(x*7+y*13))%3,basin=Math.sin(x/260+index)*Math.cos(y/160+index),patch=!path&&basin>.72;
   b.v(ix,-1,iz,climate.rock).v(ix,0,iz,path?climate.road:patch?climate.water:climate.ground[n]);
   if(!path&&!patch&&(x+y)%100===0){const vx=Math.round((x-500)/2),vz=Math.round((y-270)/2);details.box(vx,2,vz,1,3,1,climate.flora).v(vx,5,vz,climate.accent);}
  }
  const ground=b.mesh(.4);ground.castShadow=false;group.add(ground);const plants=details.mesh(.04);plants.castShadow=false;group.add(plants);
  for(let x=start+80;x<end;x+=165)for(let j=0;j<7;j++){const y=bounds.top+75+j*(climate.width-150)/6+Math.sin(x*.37+j)*45;if(trailDistance(x,y,route)<75||Math.hypot(x-100,y-pathY(100,route))<100)continue;const m=protos[j%2].clone();m.material=m.material.clone();const p={x,y};m.position.set((x-500)/50,.03,(y-270)/50);m.scale.setScalar(.7+(j%3)*.13);group.add(m);trees.push({m,p});}
  const ruins=new Voxels();for(let i=0;i<3;i++){const x=start+90+i*170,y=pathY(x,route)+(i%2?1:-1)*(180+index*12),vx=Math.round((x-500)/2.5),vz=Math.round((y-270)/2.5);ruins.box(vx-4,0,vz-4,9,12+i*6,9,climate.rock).box(vx-5,12+i*6,vz-5,11,2,11,climate.ground[2]).v(vx,14+i*6,vz+5,climate.accent);if(index%3===1)ruins.line(vx-12,0,vz,vx+12,0,vz,2,climate.rock);}
  group.add(ruins.mesh(.05));root.add(group);chunks.push({group,center:(start+end)/2});
 }
 return{root,chunks,trees,climate};
}
