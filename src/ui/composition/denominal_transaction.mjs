import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1';
const operation='vnc:denominal';
const scopes=new WeakSet(),contracts=new WeakSet(),snapshots=new WeakSet(),events=new WeakMap(),cache=new WeakMap(),intents=new WeakSet();
const same=(a,b)=>a===b||Boolean(a&&b&&typeof a==='object'&&typeof b==='object'&&!a.kind&&!b.kind&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>same(a[k],b[k])));
function immutable(value,refs){if(!value||typeof value!=='object'||refs.has(value))return value;if(value.kind?.startsWith('classical-'))throw Error('unrecognized-canonical-parent');return Object.freeze(Array.isArray(value)?value.map(v=>immutable(v,refs)):Object.fromEntries(Object.entries(value).map(([k,v])=>[k,immutable(v,refs)])));}
export function createDenominalScope({owner,source,session,getIngress,getSourceContext=null}){if(!owner||!source||!session||typeof getIngress!=='function')return null;const scope=Object.freeze({owner,source,session,getIngress,getSourceContext,operationId:operation});scopes.add(scope);return scope;}
function current(scope,c){return scopes.has(scope)&&contracts.has(c)&&c.scope===scope&&(!c.sourceContext||scope.getSourceContext?.()===c.sourceContext);}
const protocol=createOwnerOperationProtocol({kind:'denominal-contract',select:s=>s.operationId===operation,routeId:s=>s.routeId,projectIntent:s=>Object.freeze({...s}),buildContract:()=>null,isCurrentFrame:current,projectCaptures:(_s,c)=>c.captures,
 isCurrentSnapshot:(s,event)=>{const p=s.controller.session.position,e=events.get(event);return p.operationContract===s&&!p.construction.sourcePending&&p.construction.source===s.source&&s.controller.getIngress()===s.ingress&&(!event||Boolean(e&&e.snapshot===s&&e.revision===p.revision));},transition:()=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'denominal-owner-reissue-required'}),equivalent:(a,b)=>a===b,staleReason:'denominal-choice-stale-frame'});
export function issueDenominalSnapshot(scope,{ingress,binding=null,request,sourceContext=null,intent=null}={}){
 if(!scopes.has(scope)||scope.getIngress()!==ingress)return null;
 const owner=scope.owner,prior=scope.session.position.operationContract;
 if(intent&&(!intents.has(intent)||intent.snapshot!==prior||prior?.controller!==scope||!protocol.isCurrent(prior,intent.event)))return null;
 let memory=intent?intent.memory:prior?.controller===scope&&current(scope,prior.contract)&&prior.ingress===ingress?prior.contract.memory||Object.freeze({}):Object.freeze({});
 const typed=owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true;
 if(typed){
  if(binding.operationId!==operation||binding.exactSource!==scope.source||binding.navigator!==ingress||owner.isClassicalNahuatlNominalSourceDenominalBindingFrame?.(binding.ownerBindingFrame)!==true||binding.ownerBindingFrame.exactSourceFrame!==scope.source)return null;
  const old=cache.get(scope);if(old?.binding===binding&&old.ingress===ingress)return old.snapshot;
  const c=Object.freeze({scope,memory,binding,ingressKind:'typed',request:binding.ownerBindingFrame.ownerRequest,ready:binding.bindingStatus==='ready',blockReason:binding.blockReason,captures:Object.freeze([Object.freeze({role:'source',exact:scope.source})])});
  contracts.add(c);const snapshot=protocol.issue(scope,{operationId:operation,routeId:c.request?.operationPath?.at(-1)||''},scope.source,c,null,ingress);if(snapshot){snapshots.add(snapshot);cache.set(scope,{binding,ingress,snapshot});}return snapshot;
 }
 if(!request)return null;
 const refs=new Set(),captures=[Object.freeze({role:'source',exact:scope.source})];
 let inventoryRequest,ingressKind;
 if(binding){
  if(owner.isClassicalGrammarFormationResultBindingFrame?.(binding)!==true||binding.operationId!==operation||binding.exactResult!==scope.source||request.canonicalNncResult!==scope.source)return null;
  inventoryRequest={canonicalNncResult:scope.source};refs.add(scope.source);captures.push(Object.freeze({role:'canonicalNncResult',exact:scope.source}));ingressKind='exact';
 }else if(request.canonicalNncSourceFrame){
  const preparation=request.verbalStemPreparationFrame;
  if(request.canonicalNncSourceFrame===scope.source&&owner.isClassicalNahuatlOrdinaryNncSourceFrame?.(scope.source)===true&&!preparation&&request.operationPath?.[0]==='inceptive-hui'){
   const shapeInventory=owner.getClassicalNahuatlDenominalVerbalStemShapeInventory?.(scope.source,'inceptive-hui');
   if(shapeInventory?.authorizationStatus!=='authorized'||shapeInventory.canonicalNncSourceFrame!==scope.source)return null;
   const old=cache.get(scope);if(old?.ingress===ingress&&same(old.request,request)&&(prior?.controller!==scope&&!intent||same(old.snapshot.contract.memory,memory)))return old.snapshot;
   let declared;try{declared=immutable(request,new Set([scope.source]));}catch{return null;}
   const c=Object.freeze({scope,memory,ingressKind:'prepared',shapeInventory,request:declared,ready:false,blockReason:'denominal-verbal-stem-shape-required',captures:Object.freeze([Object.freeze({role:'canonicalNncSourceFrame',exact:scope.source})])});
   contracts.add(c);const snapshot=protocol.issue(scope,{operationId:operation,routeId:request.operationId||'inceptive-hui'},scope.source,c,null,ingress);if(snapshot){snapshots.add(snapshot);cache.set(scope,{ingress,request:declared,snapshot});}return snapshot;
  }

  if(request.canonicalNncSourceFrame!==scope.source||owner.isClassicalNahuatlOrdinaryNncSourceFrame?.(scope.source)!==true||owner.isClassicalNahuatlDenominalVerbalStemPreparation?.(preparation)!==true||preparation.canonicalNncSourceFrame!==scope.source)return null;
  inventoryRequest={canonicalNncSourceFrame:scope.source,verbalStemPreparationFrame:preparation};refs.add(scope.source);refs.add(preparation);captures.push(Object.freeze({role:'canonicalNncSourceFrame',exact:scope.source}));ingressKind='prepared';
 }else{
  // Native authority is the actual committed Apply declaration, not freezing.
  if(!sourceContext||sourceContext.source!==scope.source||sourceContext.ingress!==ingress||sourceContext.committed!==true||scope.getSourceContext?.()!==sourceContext)return null;
  const d=sourceContext.declaration;if(!d||d.mode!=='whole-stem'||((request.nounStem||request.nounRoot||request.sourceVerbStem)!==d.sourceWholeStem&&(request.operationId||request.operationPath?.length)))return null;
  inventoryRequest={nounStem:d.sourceWholeStem,sourceNounClass:request.sourceNounClass,...(request.sourceInitialISelection?{sourceInitialISelection:request.sourceInitialISelection}:{})};ingressKind='raw';
 }
 const old=cache.get(scope);if(old&&old.binding===binding&&old.ingress===ingress&&old.sourceContext===sourceContext&&same(old.request,request)&&(prior?.controller!==scope&&!intent||same(old.snapshot.contract.memory,memory)))return old.snapshot;
 let declared,inventory,preview;try{
  declared=immutable(request,refs);
  inventory=owner.getClassicalNahuatlDenominalVncOperationPathInventory(inventoryRequest);
  if(owner.isClassicalNahuatlDenominalVncOperationPathInventory?.(inventory)!==true)return null;
  if(binding){const path=inventory.pathChoices.find(p=>p.pathChoiceId===binding.selectedOwnerChoices?.['classical-denominal-vnc-operation-path']);if(!path||path.operationId!==binding.selectedOwnerChoices?.['classical-denominal-vnc-operation']||!same(path.operationPath,declared.operationPath)||!same(path.classChoices,declared.classChoices)||declared.classChoice&&path.finalClassChoice!==declared.classChoice||declared.operationId&&declared.operationId!==path.operationId)return null;}
  const selectedPath=inventory.pathChoices.find(path=>
   same(path.operationPath,declared.operationPath)&&(!declared.operationId||path.operationId===declared.operationId)
   &&(!declared.classChoice||path.finalClassChoice===declared.classChoice)
   &&Object.entries(declared.classChoices||{}).every(([key,value])=>path.classChoices?.[key]===value)
   &&['nounStem','nounRoot','sourceVerbStem','sourceKind','sourceState','sourceNounClass'].every(key=>!declared[key]||path.sourceRequest?.[key]===declared[key]));
  preview=selectedPath?owner.evaluateClassicalNahuatlDenominalVnc(declared):Object.freeze({authorizationStatus:'blocked',blockReason:'denominal-owner-offered-path-required'});
 }catch{return null;}
 if(binding&&preview.authorizationStatus==='authorized'&&preview.sourceFrame?.canonicalNncResult!==scope.source)return null;
 const retained=owner.isClassicalNahuatlDenominalVncResultFrame?.(preview)===true?owner.getClassicalNahuatlDenominalReloadInputs?.(preview):null;
 const ready=Boolean(retained&&preview.authorizationStatus==='authorized');
 if(ready){
  const seed={};for(const [i,value] of (retained.objectPeople||[]).entries())if(i<2)seed[`classical-denominal-vnc-result-object-${i+1}`]=value;
  if(retained.verbalStemPreparationFrame)seed['classical-denominal-vnc-stem-shape']=retained.verbalStemPreparationFrame.stemShape;
  memory=Object.freeze({...seed,...memory});
 }

 const c=Object.freeze({scope,memory,sourceContext,binding,ingressKind,inventory,request:retained||declared,preview,ready,blockReason:preview?.blockReason||(!retained?'owner-retained-request-required':''),captures:Object.freeze(captures)});
 contracts.add(c);const snapshot=protocol.issue(scope,{operationId:operation,routeId:declared.operationId||declared.operationPath?.at(-1)||''},scope.source,c,null,ingress);if(snapshot){snapshots.add(snapshot);cache.set(scope,{binding,ingress,sourceContext,request:declared,snapshot});}return snapshot;
}
export const isCurrentDenominalSnapshot=protocol.isCurrent;
export function captureDenominalChoiceFrame(snapshot){if(!protocol.isCurrent(snapshot))return null;const event=Object.freeze({});events.set(event,{snapshot,revision:snapshot.controller.session.position.revision});return event;}
export function projectDenominalExecution(snapshot){if(!snapshots.has(snapshot)||!current(snapshot.controller,snapshot.contract)||snapshot.controller.getIngress()!==snapshot.ingress||!snapshot.contract.ready)return null;if(snapshot.contract.ingressKind==='typed')return Object.freeze({kind:'typed',operation,source:snapshot.source,binding:snapshot.contract.binding,choices:snapshot.contract.binding.effectiveSelections});return Object.freeze({kind:'request',operation,source:snapshot.source,choices:snapshot.contract.request,request:Object.freeze({operationId:operation,args:Object.freeze([snapshot.contract.request])})});}

export function adoptDenominalCandidate(snapshot,binding,event){if(!protocol.isCurrent(snapshot,event))return null;return issueDenominalSnapshot(snapshot.controller,{ingress:snapshot.ingress,binding});}

const rememberedKeys=new Set(['classical-denominal-vnc-stem-shape','classical-denominal-vnc-result-object-1','classical-denominal-vnc-result-object-2']);
export function recordDenominalIntent(snapshot,key,value,event,offered=[]){
 if(!protocol.isCurrent(snapshot,event)||!rememberedKeys.has(key)||!offered.includes(value))return null;
 const intent=Object.freeze({snapshot,event,memory:Object.freeze({...snapshot.contract.memory,[key]:value})});intents.add(intent);return intent;
}
export function readDenominalIntent(snapshot,key,intent=null){
 if(!protocol.isCurrent(snapshot))return undefined;
 if(intent&&(!intents.has(intent)||intent.snapshot!==snapshot||!protocol.isCurrent(snapshot,intent.event)))return undefined;
 return (intent?.memory||snapshot.contract.memory)?.[key];
}
