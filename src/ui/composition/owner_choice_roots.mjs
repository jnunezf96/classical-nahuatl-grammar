// Presentation ownership only: the grammar binding remains the choice authority.
// A moved bucket has one registered logical host, so replacing owner projections
// can discard it without ever discarding the native collector beside it.
const portals=new WeakMap();
const hostId='classical-capability-operation-choices';
export function registerOwnerChoicePortal(doc,bucket){
  const host=doc?.getElementById?.(hostId);
  if(!host||!bucket)return;
  let entries=portals.get(doc);if(!entries){entries=new Map();portals.set(doc,entries);}
  entries.set(bucket,host);bucket.dataset.ownerChoicePortal=hostId;
}
export function releaseOwnerChoicePortal(doc,bucket){
  portals.get(doc)?.delete(bucket);delete bucket.dataset.ownerChoicePortal;
}
export function ownerChoiceRoots(doc){
  const host=doc?.getElementById?.(hostId);const roots=host?[host]:[];
  for(const [bucket,owner]of portals.get(doc)||[]){
    if(owner!==host||!doc.documentElement.contains(bucket)){releaseOwnerChoicePortal(doc,bucket);continue;}
    if(!host.contains(bucket))roots.push(bucket);
  }
  return roots;
}
export function ownerChoiceHost(node,doc=node?.ownerDocument){
  if(!node||!doc)return null;
  return ownerChoiceRoots(doc).some(root=>root===node||root.contains(node))?doc?.getElementById?.(hostId):null;
}
export function findOwnerChoice(doc,selector){
  for(const root of ownerChoiceRoots(doc)){const field=root.querySelector(selector);if(field)return field;}
  return null;
}
export function clearOwnerChoicePortals(doc){
  for(const bucket of [...(portals.get(doc)?.keys()||[])]){releaseOwnerChoicePortal(doc,bucket);bucket.remove();}
}
