"""Reuse the author's Kingdoms at War GLBs, sharing byte-identical embedded textures.
Usage: python tools/import-kingdoms-art.py /path/to/Civ2
Mesh attributes, skeletons, animation clips and texture pixels are retained.
"""
import hashlib,json,struct,sys,subprocess
from pathlib import Path
src=Path(sys.argv[1]);dest=Path(__file__).resolve().parents[1]/'assets/kingdoms';(dest/'textures').mkdir(parents=True,exist_ok=True)
names=['knight','mage','hunter','cov-worker','worker','bogbreaker','troll','orc','marksman','cov-burrower','cov-centipede','cov-archer','cov-wasp','specialist-ashShaman','specialist-waterElemental','specialist-rootColossus','specialist-ancientTreantCombat','dragon','ranger','cov-captain','specialist-bloomWeaver','world-base','world-base-level2','world-base-level3','world-base-level4','world-house','world-mill','world-forge','world-altar','world-roost','world-tower','world-tree','world-pine','world-mountain']
manifest={'sourceRepository':'https://github.com/CardiacX-hub/Civ2','sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=src,text=True).strip(),'models':{}}
for name in names:
 original=(src/'assets'/('model-'+name+'.glb')).read_bytes();jlen=struct.unpack_from('<I',original,12)[0];j=json.loads(original[20:20+jlen]);binary=original[28+jlen:];image_views=set();shared=[]
 for image in j.get('images',[]):
  viewid=image.pop('bufferView');view=j['bufferViews'][viewid];raw=binary[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']];digest=hashlib.sha256(raw).hexdigest();ext='png' if image.get('mimeType')=='image/png' else 'jpg';uri='textures/'+digest+'.'+ext;(dest/uri).write_bytes(raw);image['uri']=uri;image_views.add(viewid);shared.append(uri)
 newbin=bytearray();views=[];remap={}
 for i,v in enumerate(j['bufferViews']):
  if i in image_views:continue
  while len(newbin)%4:newbin.append(0)
  offset=len(newbin);newbin.extend(binary[v.get('byteOffset',0):v.get('byteOffset',0)+v['byteLength']]);remap[i]=len(views);views.append({**v,'byteOffset':offset})
 for accessor in j['accessors']:
  if 'bufferView' in accessor:accessor['bufferView']=remap[accessor['bufferView']]
  for v in accessor.get('sparse',{}).values():
   if isinstance(v,dict) and 'bufferView' in v:v['bufferView']=remap[v['bufferView']]
 while len(newbin)%4:newbin.append(0)
 j['bufferViews']=views;j['buffers']=[{'byteLength':len(newbin)}];encoded=json.dumps(j,separators=(',',':')).encode();encoded+=b' '*((-len(encoded))%4);output=struct.pack('<III',0x46546c67,2,28+len(encoded)+len(newbin))+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',len(newbin),0x004e4942)+newbin;(dest/(name+'.glb')).write_bytes(output)
 manifest['models'][name]={'sourceSHA256':hashlib.sha256(original).hexdigest(),'sourceBytes':len(original),'bytes':len(output),'textures':shared,'animations':[a['name'] for a in j.get('animations',[])]}
for name in ['knight','mage','hunter','cov-worker']:(dest/('portrait-'+name+'.webp')).write_bytes((src/'assets'/('portrait-'+name+'.webp')).read_bytes())
(dest/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');print('Models:',len(names),'Shared textures:',len(list((dest/'textures').iterdir())),'Total MB:',round(sum(f.stat().st_size for f in dest.rglob('*') if f.is_file())/1e6,1))
