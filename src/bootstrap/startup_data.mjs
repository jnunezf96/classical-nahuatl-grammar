import {STATIC_RUNTIME_PATHS} from './runtime_paths.mjs?v=20260904-cehui-nominal-root-430';

// Delivery only: the generated payload contains the unchanged JSON sources.
export const STARTUP_DATA_PATHS=Object.freeze([...Object.values(STATIC_RUNTIME_PATHS),
  'data/interface_organization.json','data/interface_layout.json']);
const payloads=new WeakMap();
function payloadFor(doc,required=false){
  if(payloads.has(doc))return payloads.get(doc);
  const node=doc?.getElementById?.('classical-startup-data');
  if(!node){if(required)throw Error('The page is missing its startup data.');return null;}
  const payload=JSON.parse(node.textContent);
  if(payload?.version!==1||!payload.files||typeof payload.files!=='object'
    ||Object.keys(payload).some(key=>!['version','files'].includes(key))
    ||Object.keys(payload.files).length!==STARTUP_DATA_PATHS.length
    ||Object.keys(payload.files).some(path=>!STARTUP_DATA_PATHS.includes(path))
    ||STARTUP_DATA_PATHS.some(path=>!Object.hasOwn(payload.files,path)
      ||!payload.files[path]||typeof payload.files[path]!=='object'))
    throw Error('The page startup data is incomplete or invalid.');
  payloads.set(doc,payload.files);return payload.files;
}
export function validateEmbeddedStartupData(doc){payloadFor(doc,true);return true;}
export function getEmbeddedStartupData(doc,path){
  if(!STARTUP_DATA_PATHS.includes(path))throw Error('Unknown startup data path: '+path);
  const files=payloadFor(doc);return files?JSON.parse(JSON.stringify(files[path])):undefined;
}
