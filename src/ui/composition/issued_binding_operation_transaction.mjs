import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1';
const scopes=new WeakSet(),events=new WeakMap(),snapshots=new WeakSet();
const operations=new Set(['nnc:ordinary','vnc:application','vnc:ordered-voice-application']);
// Intent is ordinary data. Authentic Sources/bindings are separate references.
function immutableIntent(value){
 if(value===null||['string','number','boolean','undefined'].includes(typeof value))return value;
 if(Array.isArray(value))return Object.freeze(value.map(immutableIntent));
 if(typeof value!=='object'||![Object.prototype,null].includes(Object.getPrototypeOf(value))
   ||typeof value.kind==='string'&&value.kind.startsWith('classical-'))throw Error('owner-reference-is-not-intent-data');
 return Object.freeze(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,immutableIntent(v)])));
}
function validBinding(scope,binding){
 if(!scopes.has(scope)||!binding||binding.operationId!==scope.operationId)return false;
 if(scope.ingressKind==='nnc-exact'){
  const context=scope.owner.getClassicalNahuatlOrdinaryNncReinflectionContext?.(scope.source);
  return scope.operationId==='nnc:ordinary'&&Boolean(context)
   &&scope.owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true
   &&binding.exactSource===context.sourceFrame&&binding.navigator===scope.navigator;
 }
 return scope.ingressKind==='typed'
  ? scope.owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true
    &&binding.exactSource===scope.source&&binding.navigator===scope.navigator
  : scope.owner.isClassicalNahuatlVncContinuationBindingFrame?.(binding)===true
    &&binding.exactInputResult===scope.source;
}
const equal=(a,b)=>a===b||Boolean(a&&b&&typeof a==='object'&&typeof b==='object'&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>equal(a[k],b[k])));
function contractFor(scope,binding,intentMemory=null){
 if(!validBinding(scope,binding))return null;
 return Object.freeze({binding,intentMemory,currentChoiceFrame:binding,authorizationStatus:binding.bindingStatus==='ready'?'authorized':'blocked',
  choices:binding.choiceOptionProjection||binding.ownerChoiceOptionProjection||Object.freeze({}),
  effectiveSelections:binding.effectiveSelections||Object.freeze({}),requiredChoiceIds:binding.requiredChoiceIds||Object.freeze([])});
}
export function createIssuedBindingOperationScope({owner,source,operationId,ingressKind,navigator=null,session,getIngress,reissue}){
 if(!operations.has(operationId)||!['typed','exact','nnc-exact'].includes(ingressKind)||!source||!session||typeof getIngress!=='function'||typeof reissue!=='function')return null;
 const scope=Object.freeze({owner,source,operationId,ingressKind,navigator,session,getIngress,reissue});scopes.add(scope);return scope;
}
const protocol=createOwnerOperationProtocol({
 kind:'issued-binding-operation-contract',select:s=>operations.has(s?.operationId),
 routeId:s=>s.operationId==='vnc:application'?`${s.operationId}:${s.intent.requestedDerivation||'direct'}`:s.operationId,
 projectIntent:s=>Object.freeze({operationId:s.operationId,intent:immutableIntent(s.intent)}),
 buildContract:()=>null,
 isCurrentFrame:(scope,contract,selections,expected)=>validBinding(scope,contract?.binding)&&scope.operationId===selections.operationId
  &&(!expected||expected===contract.binding||events.get(expected)?.binding===contract.binding),
 projectCaptures:scope=>[{role:'source',exact:scope.source}],
 isCurrentSnapshot:(s,event)=>{
  const scope=s.controller,p=scope.session.position,e=event&&events.get(event);
  return !p.construction.sourcePending&&p.operationContract===s&&scope.getIngress()===s.ingress&&p.construction.source===s.source
   &&(!event||Boolean(e&&e.snapshot===s&&e.revision===p.revision&&e.ingress===s.ingress));
 },
 transition:(scope,selections,intent,event)=>{
  const e=events.get(event),blocked=reason=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:reason});
  if(!e||intent.type!=='set-choice')return blocked('issued-binding-choice-intent-required');
  const offers=e.snapshot.contract.choices[intent.key]||[];
  if(!offers.some(x=>String(x.optionId)===String(intent.value)&&x.availabilityStatus==='available'))return blocked('issued-binding-choice-not-offered');
  const next={...selections.intent,[intent.key]:intent.value};
  const binding=scope.reissue(next,{previousBinding:e.binding,choiceId:intent.key,explicitValidated:true});
  const contract=contractFor(scope,binding);if(!contract)return blocked('issued-binding-choice-reissue-failed');
  return Object.freeze({handled:true,authorizationStatus:'authorized',selections:{operationId:scope.operationId,intent:binding.callerSelections},contract});
 },
 equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&a.ingress===b.ingress&&equal(a.selections,b.selections)
  &&equal(a.contract.effectiveSelections,b.contract.effectiveSelections)&&equal(a.contract.choices,b.contract.choices)
  &&a.contract.authorizationStatus===b.contract.authorizationStatus,
 staleReason:'issued-binding-choice-stale-frame'
});
export function issueIssuedBindingOperationSnapshot(scope,binding,ingress,intentMemory=null){
 const contract=contractFor(scope,binding,intentMemory);if(!contract)return null;
 try{const snapshot=protocol.issue(scope,{operationId:scope.operationId,intent:binding.callerSelections||{}},scope.source,contract,null,ingress);if(snapshot)snapshots.add(snapshot);return snapshot;}catch{return null;}
}
export const isCurrentIssuedBindingOperationSnapshot=protocol.isCurrent;
export const readIssuedBindingOperationSelections=protocol.readSelections;
export function transitionIssuedBindingOperationSnapshot(...args){const result=protocol.transition(...args);if(result.snapshot)snapshots.add(result.snapshot);return result;}
export function captureIssuedBindingChoiceFrame(snapshot){
 if(!protocol.isCurrent(snapshot))return null;
 const frame=Object.freeze({binding:snapshot.contract.binding});events.set(frame,Object.freeze({snapshot,revision:snapshot.controller.session.position.revision,ingress:snapshot.ingress,binding:snapshot.contract.binding}));return frame;
}

// Native controls may author several related coordinates in one owner reissue.
// They still need the exact rendered binding and current session event.
export function adoptIssuedBindingOperationCandidate(snapshot,binding,event,intentMemory=null){
 if(!protocol.isCurrent(snapshot,event)||events.get(event)?.binding!==snapshot?.contract?.binding)return null;
 return issueIssuedBindingOperationSnapshot(snapshot.controller,binding,snapshot.ingress,intentMemory);
}

// Ready packets are projections of one issued revision, never parallel authority.
export function matchesIssuedBindingExecutionPacket(snapshot,packet){
 if(!snapshots.has(snapshot)||!validBinding(snapshot.controller,snapshot.contract.binding))return false;
 const scope=snapshot.controller,binding=snapshot.contract.binding;
 if(packet?.kind==='result-edit')packet=packet.inner;
 if(!packet||packet.operation!==scope.operationId||packet.source!==snapshot.source||binding.bindingStatus!=='ready')return false;
 if(scope.ingressKind==='typed')return packet.kind==='typed'&&packet.binding===binding
  &&equal(packet.choices,binding.effectiveSelections||binding.callerSelections||{});
 if(packet.kind!=='request'||packet.request?.operationId!==scope.operationId)return false;
 const args=packet.request.args;
 if(scope.ingressKind==='nnc-exact')return Array.isArray(args)&&args.length===2&&args[0]===snapshot.source
  &&equal(args[1],binding.callerSelections)&&equal(packet.choices,args[1]);
 return Array.isArray(args)&&Array.isArray(binding.executionArgs)&&args.length===binding.executionArgs.length
  &&args.every((value,index)=>value===binding.executionArgs[index])
  &&equal(packet.choices,binding.effectiveSelections||binding.callerSelections||{});
}
