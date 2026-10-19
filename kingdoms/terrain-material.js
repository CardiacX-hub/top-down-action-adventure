import * as THREE from '../vendor/three.module.js';
import {createTerrainLayers} from './terrain-layers.js';
/** Height-priority splatting + signed triplanar projection. Array textures reduce
 * sampler pressure: three PBR layers need three samplers, rather than nine.
 * UV scale is inverse world tile size, so adjoining terrain chunks stay seamless. */
export function createTerrainMaterial(pipeline,{grass=0x4a6436,dirt=0x79664e,rock=0x727474,layers=null,splatmap=null,tileScale=.18,heightBlend=.18,mapSize=new THREE.Vector2(400,400),origin=new THREE.Vector2(0,0)}={}){
 const maps=layers||(pipeline.terrainLayers??=createTerrainLayers());
 const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1});pipeline.prepareMaterial(material,{rim:0});
 material.userData.ownedTextures=layers?[]:Object.values(maps);
 const tint=new THREE.Color(grass),baseTint=new THREE.Color(0x4e702d);tint.r/=baseTint.r;tint.g/=baseTint.g;tint.b/=baseTint.b;
 const compile=material.onBeforeCompile;
 material.onBeforeCompile=shader=>{
  compile(shader);Object.assign(shader.uniforms,{terrainWind:pipeline.weather?.windTime||{value:0},terrainAlbedo:{value:maps.albedoHeight},terrainNormal:{value:maps.normal},terrainOrm:{value:maps.orm},terrainScale:{value:tileScale},heightBlend:{value:Math.max(.01,heightBlend)},terrainSplat:{value:splatmap},terrainMapSize:{value:mapSize},terrainMapOrigin:{value:origin},terrainTint:{value:tint}});
  shader.vertexShader='varying vec3 terrainWorldNormal;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>','#include <beginnormal_vertex>\nterrainWorldNormal=normalize(mat3(modelMatrix)*objectNormal);');
  shader.fragmentShader=`varying vec3 terrainWorldNormal;
   uniform highp sampler2DArray terrainAlbedo,terrainNormal,terrainOrm;
   uniform vec3 terrainTint;uniform sampler2D terrainSplat;uniform float terrainScale,heightBlend,terrainWind;uniform vec2 terrainMapSize,terrainMapOrigin;
   // Conquest's terrain is horizontal: these are the exact Y-axis terms of
   // the source triplanar blend (weights 0,1,0), avoiding zero-weight fetches.
   vec4 triSample(highp sampler2DArray tex,vec3 p,vec3 n,vec3 w,float layer){
    return texture(tex,vec3(p.xz*vec2(sign(n.y),1.),layer));}
   vec3 triNormal(vec3 p,vec3 n,vec3 w,float layer){
    vec3 y=texture(terrainNormal,vec3(p.xz*vec2(sign(n.y),1.),layer)).xyz*2.-1.;
    return normalize(vec3(y.x*sign(n.y),y.z*sign(n.y),y.y));}
   `+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   vec3 tn=normalize(terrainWorldNormal),tw=pow(abs(tn),vec3(4.));tw/=max(dot(tw,vec3(1.)),.0001);
   vec3 tp=visualWorld*terrainScale;
   vec3 grassUV=tp+vec3(.018*sin(terrainWind*1.8+visualWorld.x*.29+visualWorld.z*.21),0.,.012*cos(terrainWind*1.2+visualWorld.x*.18));
   vec4 ta=triSample(terrainAlbedo,grassUV,tn,tw,0.),tb=triSample(terrainAlbedo,tp,tn,tw,1.),tc=triSample(terrainAlbedo,tp,tn,tw,2.);
   float slope=1.-abs(tn.y);float rocky=smoothstep(.18,.65,slope);
   vec3 masks=vec3((1.-rocky)*(.86+.06*sin(visualWorld.x*.04)*sin(visualWorld.z*.033)),(1.-rocky)*(.14-.06*sin(visualWorld.x*.04)*sin(visualWorld.z*.033)),rocky);
   ${splatmap?'masks=texture2D(terrainSplat,(visualWorld.xz-terrainMapOrigin)/terrainMapSize).rgb;':''}
   // Highest (height + coverage) layer wins; transition width softens boundaries.
   vec3 priority=vec3(ta.a,tb.a,tc.a)+masks;float peak=max(priority.x,max(priority.y,priority.z));
   vec3 blend=max(priority-peak+heightBlend,vec3(0.))*masks;blend/=max(dot(blend,vec3(1.)),.0001);
   diffuseColor.rgb=ta.rgb*terrainTint*blend.x+tb.rgb*blend.y+tc.rgb*blend.z;
   vec3 terrainProperties=triSample(terrainOrm,grassUV,tn,tw,0.).rgb*blend.x+triSample(terrainOrm,tp,tn,tw,1.).rgb*blend.y+triSample(terrainOrm,tp,tn,tw,2.).rgb*blend.z;
  `);
  shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=clamp(terrainProperties.r*(1.-wetness*.55),.08,1.);');
  shader.fragmentShader=shader.fragmentShader.replace('#include <metalnessmap_fragment>','#include <metalnessmap_fragment>\nmetalnessFactor=terrainProperties.g;');
  shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
   vec3 terrainDetail=triNormal(grassUV,tn,tw,0.)*blend.x+triNormal(tp,tn,tw,1.)*blend.y+triNormal(tp,tn,tw,2.)*blend.z;
   normal=normalize(mat3(viewMatrix)*terrainDetail);
  `);
  shader.fragmentShader=shader.fragmentShader.replace('#include <aomap_fragment>','#include <aomap_fragment>\nreflectedLight.indirectDiffuse*=terrainProperties.b;reflectedLight.indirectSpecular*=terrainProperties.b;');
 };
 material.customProgramCacheKey=()=>`height-triplanar-pbr-v2:${!!splatmap}`;return material;
}
