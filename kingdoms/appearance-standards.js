/** One restrained surface and animation standard for every original asset.
 * Painted albedo, normal maps, silhouettes and authored transparency are retained.
 * These limits prevent plastic stone and mirror-like metal at the RTS camera. */
export const lightingStandard={sun:2.9,fill:1.05,environment:.42,exposure:1};
export function surfaceStandard(material){
 if(!material || !Number.isFinite(material.roughness))return material;
 const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
 if((material.opacity??1)<.85){material.roughness=clamp(material.roughness,.25,.8);return material;}
 if(/stone|masonry|rock|bark|wood|cloth/i.test(material.name||'')){
  material.metalness=0;material.roughness=clamp(material.roughness,.78,.98);
 }else if(material.isMeshPhysicalMaterial){
  // Preserve authored water, scale and leaf highlights that reveal curved anatomy.
  material.roughness=clamp(material.roughness,.12,.85);
 }else if((material.metalness||0)>=.4){
  material.roughness=clamp(material.roughness,.32,.62);
 }else{material.roughness=clamp(material.roughness,.7,.96);}
 if(material.emissiveIntensity!==undefined)material.emissiveIntensity=clamp(material.emissiveIntensity,0,2);
 return material;
}
export const animationStandard={blend:.12,stride:45,maxPoseDistance:50};
