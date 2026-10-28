// Custody and coordination only. Adapters retain all owner-specific authority.
const issued = new WeakMap();
export function areOwnerOperationSnapshotsEquivalent(a,b) {
 const protocol=issued.get(a);
 return Boolean(protocol && protocol===issued.get(b) && (a===b || protocol.equivalent(a,b)));
}
export function createOwnerOperationProtocol(adapter) {
 const protocol=Object.freeze({equivalent:adapter.equivalent});
 const owns=s=>Boolean(s && issued.get(s)===protocol);
 function issue(controller,selections,source,contract=null,prior=null,ingress=prior?.ingress || selections) {
  if(!adapter.select(selections))return null;
  // Adapter projects immutable intent; canonical objects remain exact captures.
  const intent=adapter.projectIntent(selections);
  contract ||= adapter.buildContract(controller,intent);
  if(!adapter.isCurrentFrame(controller,contract,intent))return null;
  const captures=Object.freeze(adapter.projectCaptures(controller,contract,intent).map(x=>Object.freeze({...x})));
  const retained=owns(prior)&&prior.controller===controller&&prior.source===source;
  if(!captures.some(x=>x.exact===source)&&!retained)return null;
  const snapshot=Object.freeze({kind:adapter.kind,routeId:adapter.routeId(intent),controller,source,ingress,selections:intent,contract,captures});
  issued.set(snapshot,protocol);return snapshot;
 }
 function isCurrent(snapshot,expectation=null) {
  if(!owns(snapshot)||!adapter.isCurrentFrame(snapshot.controller,snapshot.contract,snapshot.selections))return false;
  // Session currentness is separate from issuance: replacements are not staged yet.
  if(adapter.isCurrentSnapshot && !adapter.isCurrentSnapshot(snapshot,expectation))return false;
  const captures=adapter.projectCaptures(snapshot.controller,snapshot.contract,snapshot.selections);
  return captures.length===snapshot.captures.length&&snapshot.captures.every((x,i)=>captures[i].role===x.role&&captures[i].exact===x.exact);
 }
 function readSelections(snapshot,legacy,source) {
  return owns(snapshot)&&snapshot.ingress===legacy&&adapter.select(legacy)&&snapshot.source===source?snapshot.selections:legacy;
 }
 function transition(snapshot,intent,expectedFrame) {
  if(!isCurrent(snapshot,expectedFrame)||!adapter.isCurrentFrame(snapshot.controller,snapshot.contract,snapshot.selections,expectedFrame))
   return Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:adapter.staleReason});
  const result=adapter.transition(snapshot.controller,snapshot.selections,intent,expectedFrame);
  if(result.authorizationStatus!=='authorized')return result;
  return Object.freeze({...result,snapshot:issue(snapshot.controller,result.selections,snapshot.source,result.contract,snapshot)});
 }
 return Object.freeze({issue,isCurrent,readSelections,transition});
}
