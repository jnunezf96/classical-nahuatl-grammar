import {isClassicalNahuatlParticipantFrame} from '../../core/classical/participant_frame.mjs';
import {createOwnerOperationProtocol,projectOwnerOperationDecision} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
const operation='vnc:derivational-operation';
const routes=new Set(['frequentative','compound','purposive','honorific','reverential','pejorative']);
const scopes=new WeakSet(),contracts=new WeakSet(),snapshots=new WeakSet(),cache=new WeakMap(),events=new WeakMap();
export function createVerbalDerivationScope({owner,source,session,getIngress,getSourceContext=null,presentation=null}){
 if(!owner||!source||!session||typeof getIngress!=='function')return null;
 const scope=Object.freeze({owner,source,session,getIngress,getSourceContext,presentation});scopes.add(scope);return scope;
}
function current(scope,c){return scopes.has(scope)&&contracts.has(c)&&c.scope===scope&&(!c.sourceContext||scope.getSourceContext?.()===c.sourceContext);}
const protocol=createOwnerOperationProtocol({kind:'verbal-derivation-contract',select:s=>s.operationId===operation,routeId:s=>s.routeId,
 projectIntent:s=>Object.freeze({...s}),buildContract:()=>null,isCurrentFrame:current,projectCaptures:(_s,c)=>c.captures,
 isCurrentSnapshot:(s,event)=>{const scope=s.controller,p=scope.session.position,e=events.get(event);return p.operationContract===s&&!p.construction.sourcePending&&p.construction.source===s.source&&scope.getIngress()===s.ingress&&(!event||Boolean(e&&e.snapshot===s&&e.revision===p.revision));},
 transition:()=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'verbal-owner-reissue-required'}),equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&a.ingress===b.ingress&&a.routeId===b.routeId&&a.contract.ready===b.contract.ready&&same(a.contract.request,b.contract.request)&&same(a.contract.choices,b.contract.choices),staleReason:'verbal-choice-stale-frame'});
export function issueVerbalDerivationSnapshot(scope,{ingress,binding,request,sourceContext,prepared=null}={}){
 if(!scopes.has(scope)||scope.getIngress()!==ingress)return null;
 const owner=scope.owner;
 if(!binding)return issueRaw(scope,{ingress,request,sourceContext,prepared});
 const exact=owner.isClassicalNahuatlVncContinuationBindingFrame?.(binding)===true&&binding.exactInputResult===scope.source;
 const typed=owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true&&binding.exactSource===scope.source&&binding.navigator===ingress;
 if((!exact&&!typed)||binding.operationId!==operation)return null;
 const ownerRequest=exact?binding.ownerRequest:binding.ownerBindingFrame?.ownerRequest;
 const routeId=ownerRequest?.lateOperation||binding.effectiveSelections?.lateOperation||binding.callerSelections?.lateOperation;
 if(routeId && routeId!=="none" && !routes.has(routeId))return null;
 const old=cache.get(scope);if(old?.binding===binding&&old.ingress===ingress)return old.snapshot;
 const contract=Object.freeze({scope,binding,ingressKind:typed?'typed':'exact',request:ownerRequest,ready:binding.bindingStatus==='ready',blockReason:binding.blockReason,
  preview:binding.ownerPreflightResult||binding.ownerBindingFrame?.ownerPreflightResult,
  choices:binding.choiceOptionProjection||binding.ownerChoiceOptionProjection||Object.freeze({}),
  captures:Object.freeze([Object.freeze({role:'source',exact:scope.source})])});contracts.add(contract);
 const snapshot=protocol.issue(scope,{operationId:operation,routeId},scope.source,contract,null,ingress);
 if(snapshot){snapshots.add(snapshot);cache.set(scope,{binding,ingress,snapshot});}return snapshot;
}
export function projectVerbalDerivationExecution(snapshot){
 if(!snapshots.has(snapshot)||!snapshot.contract.ready||!current(snapshot.controller,snapshot.contract)||snapshot.controller.getIngress()!==snapshot.ingress)return null;
 const c=projectOwnerOperationDecision(snapshot);if(!c)return null;const b=c.binding;
 if(c.ingressKind==='raw')return Object.freeze({kind:'request',operation,source:snapshot.source,choices:c.request,request:c.executionRequest,...(c.prepared?{prepared:c.prepared}:{})});
 return c.ingressKind==='typed'?Object.freeze({kind:'typed',operation,source:snapshot.source,binding:b,choices:b.effectiveSelections||b.callerSelections||{}})
  :Object.freeze({kind:'request',operation,source:snapshot.source,choices:b.effectiveSelections||b.callerSelections||{},request:Object.freeze({operationId:operation,args:b.executionArgs})});
}
export const isCurrentVerbalDerivationSnapshot=protocol.isCurrent;
export function captureVerbalDerivationChoiceFrame(snapshot){if(!protocol.isCurrent(snapshot))return null;const event=Object.freeze({});events.set(event,{snapshot,revision:snapshot.controller.session.position.revision});return event;}

function immutableParticipant(value,seen=new WeakMap()){
 if(!value||typeof value!=='object')return value;
 if(seen.has(value))return seen.get(value);
 const copy=Array.isArray(value)?[]:{};seen.set(value,copy);
 for(const [key,item]of Object.entries(value))copy[key]=immutableParticipant(item,seen);
 return Object.freeze(copy);
}
function authored(value,refs=new Set()){
 if(refs.has(value))return value;
 if(isClassicalNahuatlParticipantFrame(value))return immutableParticipant(value);
 if(value===null||['string','number','boolean','undefined'].includes(typeof value))return value;
 if(typeof value!=='object'||typeof value.kind==='string'&&value.kind.startsWith('classical-'))throw Error('canonical-reference-requires-issued-binding');
 return Array.isArray(value)?Object.freeze(value.map(x=>authored(x,refs))):Object.freeze(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,authored(v,refs)])));
}
const same=(a,b)=>a===b||Boolean(a&&b&&typeof a==='object'&&typeof b==='object'&&((!a.kind&&!b.kind)||(isClassicalNahuatlParticipantFrame(a)&&isClassicalNahuatlParticipantFrame(b)))&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>same(a[k],b[k])));
function issueRaw(scope,{ingress,request,sourceContext,prepared}){
 if(!request||!routes.has(request.lateOperation)||scope.presentation?.operationIds&&!scope.presentation.operationIds.includes(request.lateOperation)||!sourceContext||sourceContext.source!==scope.source||sourceContext.ingress!==ingress||sourceContext.committed!==true||scope.getSourceContext?.()!==sourceContext)return null;
 const refs=new Set(),captures=[Object.freeze({role:'source',exact:scope.source})];
 for(const [key,validator]of [['attitudeCompoundClosureFrame','isClassicalNahuatlClosureFrame'],['sourceApplicationFrame','isClassicalNahuatlVncApplicationFrame']]){
  const exact=request[key];if(!exact)continue;
  if(scope.owner[validator]?.(exact)!==true||exact.authorizationStatus!=='authorized')return null;
  refs.add(exact);captures.push(Object.freeze({role:key,exact}));
 }
 for(const item of request.sourceObjectRequests||[]){const exact=item.participantFrame;if(!exact)continue;if(isClassicalNahuatlParticipantFrame(exact)!==true)return null;}
 if(prepared&&refs.size)return null;
 const old=cache.get(scope);if(old&&same(old.raw,request)&&old.prepared===prepared&&old.ingress===ingress&&old.sourceContext===sourceContext)return old.snapshot;
 let declared,executionRequest,preview;
 try{
  if(prepared){
   executionRequest=prepared.request;declared=executionRequest?.args?.[0];
   if(executionRequest?.operationId!==operation||!same(declared,request))return null;
   preview=scope.owner.previewClassicalGrammarApplicationRequest(executionRequest,prepared);
  }else{
   declared=authored(request,refs);executionRequest=Object.freeze({operationId:operation,args:Object.freeze([declared])});
   preview=scope.owner.evaluateClassicalNahuatlLateVncDerivation(declared);
  }
 }catch{return null;}
 if(prepared){if(scope.owner.isClassicalGrammarApplicationPreview?.(preview)!==true)return null;preview=preview.canonicalResult;}
 if(scope.owner.isClassicalNahuatlClosureFrame?.(preview)!==true)return null;
 const facts=preview.operationFrame?.operationFacts;
 if(request.attitudeCompoundClosureFrame&&facts?.typedCompoundSourceFrame!==request.attitudeCompoundClosureFrame)return null;
 if(request.sourceApplicationFrame&&facts?.derivedSourceApplicationFrame!==request.sourceApplicationFrame&&preview.baseApplicationFrame!==request.sourceApplicationFrame)return null;
 const contract=Object.freeze({scope,sourceContext,ingressKind:'raw',presentation:scope.presentation,request:declared,executionRequest,prepared,preview,ready:preview.authorizationStatus==='authorized',blockReason:preview.blockReason,choices:preview.choiceOptionProjection||Object.freeze({}),captures:Object.freeze(captures)});contracts.add(contract);
 const snapshot=protocol.issue(scope,{operationId:operation,routeId:declared.lateOperation},scope.source,contract,null,ingress);
 if(snapshot){snapshots.add(snapshot);cache.set(scope,{raw:declared,prepared,ingress,sourceContext,snapshot});}return snapshot;
}
export function adoptVerbalDerivationCandidate(snapshot,binding,event){if(!protocol.isCurrent(snapshot,event))return null;return issueVerbalDerivationSnapshot(snapshot.controller,{ingress:snapshot.ingress,binding});}
