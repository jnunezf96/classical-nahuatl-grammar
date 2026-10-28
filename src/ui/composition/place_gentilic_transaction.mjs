import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1';
const operation='nnc:place-gentilic';
const kinds=new Set(['place-name','gentilic','gentilic-collective','profession-place-association','profession-pertinency','gentilic-adjectival-use']);
const scopes=new WeakSet(),contracts=new WeakSet(),snapshots=new WeakSet(),events=new WeakMap(),cache=new WeakMap(),intents=new WeakSet();
const same=(a,b)=>a===b||Boolean(a&&b&&typeof a==='object'&&typeof b==='object'&&!a.kind&&!b.kind&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>same(a[k],b[k])));
function immutable(value,refs){if(!value||typeof value!=='object'||refs.has(value))return value;if(value.kind?.startsWith('classical-'))throw Error('unrecognized-canonical-parent');return Object.freeze(Array.isArray(value)?value.map(v=>immutable(v,refs)):Object.fromEntries(Object.entries(value).map(([k,v])=>[k,immutable(v,refs)])));}
export function createPlaceGentilicScope({owner,source,session,getIngress,getSourceContext=null}){if(!owner||!source||!session||typeof getIngress!=='function')return null;const scope=Object.freeze({owner,source,session,getIngress,getSourceContext,operationId:operation});scopes.add(scope);return scope;}
function current(scope,c){return scopes.has(scope)&&contracts.has(c)&&c.scope===scope&&(!c.sourceContext||scope.getSourceContext?.()===c.sourceContext);}
const protocol=createOwnerOperationProtocol({kind:'place-gentilic-contract',select:s=>s.operationId===operation,routeId:s=>s.routeId,projectIntent:s=>Object.freeze({...s}),buildContract:()=>null,isCurrentFrame:current,projectCaptures:(_s,c)=>c.captures,
 isCurrentSnapshot:(s,event)=>{const p=s.controller.session.position,e=events.get(event);return p.operationContract===s&&!p.construction.sourcePending&&p.construction.source===s.source&&s.controller.getIngress()===s.ingress&&(!event||Boolean(e&&e.snapshot===s&&e.revision===p.revision));},transition:()=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'place-owner-reissue-required'}),equivalent:(a,b)=>a===b,staleReason:'place-choice-stale-frame'});
export function issuePlaceGentilicSnapshot(scope,{ingress,binding,request,sourceContext=null,intent=null}={}){
 if(!scopes.has(scope)||scope.getIngress()!==ingress)return null;
 const owner=scope.owner,typed=owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true;
 if(typed){
  if(binding.operationId!==operation||binding.exactSource!==scope.source||binding.navigator!==ingress||owner.isClassicalNahuatlPlaceNominalBindingFrame?.(binding.ownerBindingFrame)!==true||binding.ownerBindingFrame.exactSourceFrame!==scope.source)return null;
  const old=cache.get(scope);if(old&&old.binding===binding&&old.ingress===ingress)return old.snapshot;
  const c=Object.freeze({scope,binding,ingressKind:'typed',request:binding.ownerBindingFrame.ownerRequest,preview:binding.ownerBindingFrame.ownerPreflightResult,ready:binding.bindingStatus==='ready',blockReason:binding.blockReason,captures:Object.freeze([Object.freeze({role:'canonicalNominalSourceFrame',exact:scope.source})])});
  return issue(scope,ingress,c,'place-name:n-can',{binding,ingress});
 }
 if(!request||!kinds.has(request.constructionKind))return null;
 const refs=new Set(),captures=[Object.freeze({role:'source',exact:scope.source})];
 if(binding){
  if(owner.isClassicalGrammarFormationResultBindingFrame?.(binding)!==true||binding.operationId!==operation||binding.exactResult!==scope.source)return null;
  const key=binding.ownerPreflightFrame.canonicalVncResult===scope.source?'canonicalVncResult':'canonicalNncResult';
  if(request[key]!==scope.source||binding.selectedOwnerChoices?.['classical-place-gentilic-result-kind']!==request.constructionKind||binding.selectedOwnerChoices?.['classical-place-gentilic-formation']!==request.formation)return null;
  refs.add(scope.source);captures.push(Object.freeze({role:key,exact:scope.source}));
 }else if(!sourceContext||sourceContext.source!==scope.source||sourceContext.ingress!==ingress||sourceContext.committed!==true||scope.getSourceContext?.()!==sourceContext||request.canonicalNncResult||request.canonicalVncResult||request.canonicalNominalSourceFrame)return null;
 if(!binding){
  const declaration=sourceContext.declaration;
  if(!declaration||!['whole-stem','embed-matrix'].includes(declaration.mode))return null;
  const embed=declaration.mode==='embed-matrix'?declaration.sourceEmbedStem:declaration.sourceWholeStem;
  if(request.source?.embedStem!==embed||declaration.mode==='embed-matrix'&&request.source?.matrixStem!==declaration.sourceMatrixStem)return null;
 }
 const prior=scope.session.position.operationContract;
 if(intent&&(!intents.has(intent)||intent.snapshot!==prior||prior?.controller!==scope||!protocol.isCurrent(prior,intent.event)))return null;
 const memory=intent?intent.memory:prior?.controller===scope&&current(scope,prior.contract)&&prior.contract.sourceContext===sourceContext?prior.contract.memory||Object.freeze({}):Object.freeze({});
 const old=cache.get(scope);if(old&&old.binding===binding&&old.ingress===ingress&&old.sourceContext===sourceContext&&same(old.request,request)&&same(old.memory,memory))return old.snapshot;
 let declared,preview;try{declared=immutable(request,refs);preview=owner.evaluatePlaceGentilicNnc(declared);}catch{return null;}
 if(owner.isPlaceGentilicNncFrame?.(preview)!==true)return null;
 if(binding&&preview.authorizationStatus==='authorized'){
  const key=request.canonicalVncResult?'canonicalVncResult':'canonicalNncResult';if(preview[key]!==scope.source||preview.sourceAnalysis?.[key]!==scope.source)return null;
 }
 const retained=preview.authorizationStatus==='authorized'?owner.getClassicalNahuatlPlaceReloadInputs?.(preview):declared;
 const ready=preview.authorizationStatus==='authorized'&&Boolean(retained);
 const c=Object.freeze({scope,binding,sourceContext,memory,ingressKind:binding?'exact':'raw',request:retained||declared,preview,ready,blockReason:preview.blockReason||(!retained?'owner-retained-request-required':''),captures:Object.freeze(captures)});
 const route=['place-name','gentilic'].includes(request.constructionKind)?`${request.constructionKind}:${request.formation}`:request.constructionKind;
 return issue(scope,ingress,c,route,{binding,ingress,sourceContext,memory,request:declared});
}
function issue(scope,ingress,contract,routeId,entry){contracts.add(contract);const snapshot=protocol.issue(scope,{operationId:operation,routeId},scope.source,contract,null,ingress);if(snapshot){snapshots.add(snapshot);cache.set(scope,{...entry,snapshot});}return snapshot;}
export const isCurrentPlaceGentilicSnapshot=protocol.isCurrent;
export function capturePlaceGentilicChoiceFrame(snapshot){if(!protocol.isCurrent(snapshot))return null;const event=Object.freeze({});events.set(event,{snapshot,revision:snapshot.controller.session.position.revision});return event;}
export function adoptPlaceGentilicCandidate(snapshot,binding,event){if(!protocol.isCurrent(snapshot,event))return null;return issuePlaceGentilicSnapshot(snapshot.controller,{ingress:snapshot.ingress,binding});}
export function projectPlaceGentilicExecution(snapshot){if(!snapshots.has(snapshot)||!current(snapshot.controller,snapshot.contract)||snapshot.controller.getIngress()!==snapshot.ingress||!snapshot.contract.ready)return null;const c=snapshot.contract;return c.ingressKind==='typed'?Object.freeze({kind:'typed',operation,source:snapshot.source,binding:c.binding,choices:c.binding.effectiveSelections}):Object.freeze({kind:'request',operation,source:snapshot.source,choices:c.request,request:Object.freeze({operationId:operation,args:Object.freeze([c.request])})});}
// Remembered formations are nonauthorizing intent in the one current snapshot.
export function recordPlaceGentilicFormation(snapshot,formation,event,offered=[]){
 if(!protocol.isCurrent(snapshot,event)||!formation||!offered.includes(formation)||!snapshot.contract.request)return false;
 const kind=snapshot.contract.request.constructionKind;
 const intent=Object.freeze({snapshot,event,memory:Object.freeze({...snapshot.contract.memory,[kind]:formation})});
 intents.add(intent);return intent;
}
export function getRememberedPlaceGentilicFormation(snapshot,kind,offered,request,intent=null){
 if(!protocol.isCurrent(snapshot)||!request)return '';
 if(intent&&(!intents.has(intent)||intent.snapshot!==snapshot||!protocol.isCurrent(snapshot,intent.event)))return '';
 const value=(intent?.memory||snapshot.contract.memory)?.[kind];if(!value||!offered.includes(value))return '';
 try{const p=snapshot.controller.owner.evaluatePlaceGentilicNnc({...request,formation:value});return snapshot.controller.owner.isPlaceGentilicNncFrame(p)&&p.authorizationStatus==='authorized'?value:'';}catch{return '';}
}
