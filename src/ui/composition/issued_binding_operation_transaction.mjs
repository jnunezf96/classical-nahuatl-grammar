import {createOwnerOperationProtocol,readOwnerOperationChoiceIntent} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1';
import {prepareConstructionNncEnvelope,prepareConstructionVncEnvelope} from './construction_layers.mjs?ownerDecision=20261031-1';
const scopes=new WeakSet(),events=new WeakMap(),snapshots=new WeakSet(),preparations=new WeakMap();
const operations=new Set(['nnc:ordinary','vnc:application','vnc:ordered-voice-application','sentence:supplementation','nnc:attested-cell','nnc:attested-place','clause:attested-collocation','nnc:quantitative-predicate','nnc:pronominal']);
export const isFinalSourceOperation=id=>['nnc:attested-cell','nnc:attested-place','clause:attested-collocation','nnc:quantitative-predicate','nnc:pronominal'].includes(id);
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
 if(scope.operationId==='sentence:supplementation'&&(scope.ingressKind!=='typed'||scope.owner.isClassicalNahuatlLexicalizedNncSourceFrame?.(scope.source)!==true))return false;
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
function currentPreparation(scope,contract){
 if(contract.prepared&&scope.owner.isClassicalGrammarPreparedApplicationRequest?.(contract.prepared)!==true)return false;
 const envelope=contract.envelope;
 return !envelope||[envelope.prepared,...(envelope.layers?.decisions||[])].filter(Boolean).every(prepared=>scope.owner.isClassicalGrammarPreparedApplicationRequest?.(prepared)===true);
}
function contractFor(scope,binding,intentMemory=null,envelopeIntent={}){
 if(!validBinding(scope,binding))return null;
 let bySource=preparations.get(binding);if(!bySource){bySource=new WeakMap();preparations.set(binding,bySource);}
 let prepared=bySource.get(scope.source)||null;
 if(!prepared&&['nnc:ordinary','nnc:pronominal','vnc:application','vnc:ordered-voice-application'].includes(scope.operationId)&&binding.bindingStatus==='ready'){
  prepared=scope.owner.prepareClassicalGrammarApplicationRequest?.(scope.ingressKind==='typed'||scope.operationId.startsWith('vnc:')?binding:{operationId:scope.operationId,args:[scope.source,binding.callerSelections]});
  if(prepared)bySource.set(scope.source,prepared);
 }
 const retainedEnvelopeIntent=immutableIntent(envelopeIntent);
 const envelope=scope.operationId==='vnc:application'&&prepared?prepareConstructionVncEnvelope(scope.owner,prepared,retainedEnvelopeIntent.layers||{},binding.choiceOptionProjection||binding.ownerChoiceOptionProjection||{}):scope.operationId==='nnc:ordinary'&&prepared?prepareConstructionNncEnvelope(scope.owner,prepared,retainedEnvelopeIntent.sentence||{},retainedEnvelopeIntent.layers||{},prepared.canonicalResult.sentenceFrame?.choiceOptionProjection||{}):null;
 let choices=binding.choiceOptionProjection||binding.ownerChoiceOptionProjection||Object.freeze({});
 if(prepared&&['nnc:ordinary','nnc:pronominal'].includes(scope.operationId)){
  choices={...choices};
  for(const key of ['sentenceType','polarity']){
   const field=prepared.canonicalResult.sentenceFrame?.choiceOptionProjection?.[key];if(!field)continue;
   choices[key]=Object.freeze({...field,controlChoiceId:key,options:Object.freeze(field.options.map(option=>Object.freeze({...option,
    nextSelections:immutableIntent({...binding.callerSelections,[key]:option.optionId})})))});
  }
  if(envelope)for(const [key,field] of Object.entries(envelope.choices))if(!['sentenceType','polarity'].includes(key))choices[key]=field;
  choices=Object.freeze(choices);
 }
 if(scope.operationId==='vnc:application'&&envelope)choices=Object.freeze({...choices,...envelope.choices});
 const ready=binding.bindingStatus==='ready'&&(!['nnc:ordinary','nnc:pronominal','vnc:application','vnc:ordered-voice-application'].includes(scope.operationId)||Boolean(prepared))&&(!envelope||envelope.ready);
 return Object.freeze({binding,intentMemory,prepared,envelope,envelopeIntent:retainedEnvelopeIntent,ready,blockReason:binding.blockReason||envelope?.blockReason||(!ready&&binding.bindingStatus==='ready'?'owner-preparation-unavailable':''),currentChoiceFrame:binding,authorizationStatus:ready?'authorized':'blocked',
  choices,
  presentation:scope.presentation,authoredSelections:immutableIntent({...binding.callerSelections,...retainedEnvelopeIntent}),
  effectiveSelections:binding.effectiveSelections||Object.freeze({}),requiredChoiceIds:binding.requiredChoiceIds||Object.freeze([])});
}
export function createIssuedBindingOperationScope({owner,source,operationId,ingressKind,navigator=null,session,getIngress,reissue,presentation=null}){
 if(!operations.has(operationId)||!['typed','exact','nnc-exact'].includes(ingressKind)||!source||!session||typeof getIngress!=='function'||typeof reissue!=='function')return null;
 const scope=Object.freeze({owner,source,operationId,ingressKind,navigator,session,getIngress,reissue,presentation:presentation?immutableIntent(presentation):null});scopes.add(scope);return scope;
}
const protocol=createOwnerOperationProtocol({
 kind:'issued-binding-operation-contract',select:s=>operations.has(s?.operationId),
 routeId:s=>s.operationId==='vnc:application'?`${s.operationId}:${s.intent.requestedDerivation||'direct'}`:s.operationId,
 projectIntent:s=>Object.freeze({operationId:s.operationId,intent:immutableIntent(s.intent)}),
 buildContract:()=>null,
 isCurrentFrame:(scope,contract,selections,expected)=>validBinding(scope,contract?.binding)&&currentPreparation(scope,contract)&&scope.operationId===selections.operationId
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
  const field=e.snapshot.contract.choices[intent.key];
  const offers=Array.isArray(field)?field:field?.options||[];
  const selected=offers.find(x=>String(x.optionId)===String(intent.value)&&x.availabilityStatus==='available');
  if(!selected)return blocked('issued-binding-choice-not-offered');
  const authored=readOwnerOperationChoiceIntent(e.snapshot,e.snapshot.contract.authoredSelections,intent.key,intent.value,{current:true,event});
  if(!authored)return blocked('issued-binding-choice-not-offered');
  const {sentence,layers,...next}=authored;
  const envelopeIntent={...e.snapshot.contract.envelopeIntent,...(sentence?{sentence}:{}),...(layers?{layers}:{})};
  const binding=scope.reissue(next,{previousBinding:e.binding,choiceId:intent.key,explicitValidated:true});
  const contract=contractFor(scope,binding,null,envelopeIntent);if(!contract)return blocked('issued-binding-choice-reissue-failed');
  return Object.freeze({handled:true,authorizationStatus:'authorized',selections:{operationId:scope.operationId,intent:binding.callerSelections},contract});
 },
 equivalent:(a,b)=>a.controller===b.controller&&a.source===b.source&&a.ingress===b.ingress&&equal(a.selections,b.selections)
  &&equal(a.contract.effectiveSelections,b.contract.effectiveSelections)&&equal(a.contract.choices,b.contract.choices)
  &&a.contract.authorizationStatus===b.contract.authorizationStatus,
 staleReason:'issued-binding-choice-stale-frame'
});
export function issueIssuedBindingOperationSnapshot(scope,binding,ingress,intentMemory=null,envelopeIntent={}){
 const contract=contractFor(scope,binding,intentMemory,envelopeIntent);if(!contract)return null;
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
 if(['vnc:application','vnc:ordered-voice-application'].includes(scope.operationId)&&packet.prepared!==snapshot.contract.prepared)return false;
 if(['nnc:ordinary','vnc:application'].includes(scope.operationId)){const projected=scope.operationId==='vnc:application'?projectFiniteVncExecution(snapshot):projectOrdinaryNncExecution(snapshot);if(!projected||packet.prepared!==projected.prepared||packet.preparedSentence!==projected.preparedSentence||packet.preparedLayers!==projected.preparedLayers)return false;}
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

// The final source constructors execute exactly their current typed capability.
// Their lexical/grammatical coordinates belong to that binding, not DOM mirrors.
export function projectFinalSourceExecution(snapshot){
 if(!snapshots.has(snapshot)||!isFinalSourceOperation(snapshot.controller.operationId)
   ||snapshot.controller.ingressKind!=='typed'||snapshot.controller.getIngress()!==snapshot.ingress
   ||!validBinding(snapshot.controller,snapshot.contract.binding)||snapshot.contract.binding.bindingStatus!=='ready')return null;
 const binding=snapshot.contract.binding;
 return Object.freeze({kind:'typed',operation:snapshot.controller.operationId,source:snapshot.source,binding,
  choices:binding.effectiveSelections||binding.callerSelections||Object.freeze({}),prepared:snapshot.contract.prepared||undefined,layers:Object.freeze([]),sentenceOptions:null});
}

export function projectOrdinaryNncExecution(snapshot){
 if(!snapshots.has(snapshot)||snapshot.controller.operationId!=='nnc:ordinary'
   ||snapshot.controller.getIngress()!==snapshot.ingress||!validBinding(snapshot.controller,snapshot.contract.binding)
   ||!snapshot.contract.ready||!currentPreparation(snapshot.controller,snapshot.contract))return null;
 const {binding,prepared,envelope,envelopeIntent}=snapshot.contract;
 const usesEnvelope=Object.keys(envelopeIntent.sentence||{}).length>0||envelope?.layers.preparedLayers.length>0;
 return Object.freeze({kind:snapshot.controller.ingressKind==='typed'?'typed':'request',operation:'nnc:ordinary',source:snapshot.source,binding,
   request:prepared.request,prepared,choices:snapshot.controller.ingressKind==='typed'?binding.effectiveSelections||binding.callerSelections||Object.freeze({}):binding.callerSelections,
   ...(usesEnvelope?{preparedSentence:envelope.preparedSentence,preparedLayers:envelope.layers.preparedLayers}:{}),layers:Object.freeze([]),sentenceOptions:null});
}

export function projectOrderedVoiceExecution(snapshot) {
 if(!snapshots.has(snapshot)||snapshot.controller.operationId!=='vnc:ordered-voice-application'
  ||snapshot.controller.getIngress()!==snapshot.ingress||!validBinding(snapshot.controller,snapshot.contract.binding)
  ||!snapshot.contract.ready||!currentPreparation(snapshot.controller,snapshot.contract))return null;
 return Object.freeze({kind:'request',operation:snapshot.controller.operationId,source:snapshot.source,
  request:snapshot.contract.prepared.request,prepared:snapshot.contract.prepared,
  choices:snapshot.contract.binding.callerSelections,layers:Object.freeze([]),sentenceOptions:null});
}

export function projectFiniteVncExecution(snapshot) {
 if(!snapshots.has(snapshot)||snapshot.controller.operationId!=='vnc:application'
  ||snapshot.controller.getIngress()!==snapshot.ingress||!validBinding(snapshot.controller,snapshot.contract.binding)
  ||!snapshot.contract.ready||!currentPreparation(snapshot.controller,snapshot.contract))return null;
 const {binding,prepared,envelope}=snapshot.contract;
 return Object.freeze({kind:snapshot.controller.ingressKind==='typed'?'typed':'request',operation:'vnc:application',source:snapshot.source,binding,
  request:prepared.request,prepared,preparedSentence:envelope.preparedSentence,preparedLayers:envelope.layers.preparedLayers,
  choices:binding.effectiveSelections||binding.callerSelections||Object.freeze({}),layers:Object.freeze([]),sentenceOptions:null});
}
