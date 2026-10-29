import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
// Shared session custody. Canonical formation owners retain all grammatical decisions.
const operations=new Set(['nnc:deverbal-construction','nnc:relational','nnc:adverbial']);
const scopes=new WeakSet(),contracts=new WeakSet(),snapshots=new WeakSet(),events=new WeakMap(),cache=new WeakMap();
export function isDerivedFormationOperation(operation){return operations.has(operation);}
export function createDerivedFormationScope({owner,source,operation,session,getIngress,getSourceContext=null}){
 if(!owner||!source||!operations.has(operation)||!session||typeof getIngress!=='function')return null;
 const scope=Object.freeze({owner,source,operation,session,getIngress,getSourceContext});scopes.add(scope);return scope;
}
function currentFrame(scope,contract){return scopes.has(scope)&&contracts.has(contract)&&contract.scope===scope&&(!contract.sourceContext||scope.getSourceContext?.()===contract.sourceContext);}
const protocol=createOwnerOperationProtocol({kind:'derived-formation-contract',select:s=>operations.has(s?.operationId),routeId:s=>s.routeId,projectIntent:s=>Object.freeze({...s}),buildContract:()=>null,isCurrentFrame:currentFrame,projectCaptures:(_s,c)=>c.captures,
 isCurrentSnapshot:(s,event)=>{const scope=s.controller,p=scope.session.position,e=event&&events.get(event);return p.operationContract===s&&!p.construction.sourcePending&&p.construction.source===s.source&&scope.getIngress()===s.ingress&&(!event||Boolean(e&&e.snapshot===s&&e.revision===p.revision));},
 transition:()=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'derived-owner-reissue-required'}),equivalent:(a,b)=>a===b,staleReason:'derived-choice-stale-frame'});
function buildDerivedFormationSnapshot(scope,{ingress,binding,request,sourceContext,selectedBindingId,additionalResults={}}={}){
 if(!scopes.has(scope)||scope.getIngress()!==ingress)return null;
 const owner=scope.owner;
 if(scope.operation==='nnc:relational'&&owner.isClassicalNahuatlFormationResultBindingFrame?.(binding)===true)return issueRelationalExact(scope,{ingress,binding,request,selectedBindingId});
 if(scope.operation==='nnc:adverbial')return issueAdverbial(scope,{ingress,binding,request,sourceContext});
 if(scope.operation==='nnc:deverbal-construction')return issueDeverbal(scope,{ingress,binding,request,sourceContext,selectedBindingId,additionalResults});
 if(owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)!==true||binding.operationId!==scope.operation||binding.exactSource!==scope.source||binding.navigator!==ingress)return null;
 // A relational typed Source already constitutes its owner choices. Do not add
 // a parallel free selection envelope or reinterpret its declaration here.
 if(scope.operation!=='nnc:relational'||owner.isClassicalNahuatlRelationalNncTypedSourceBindingFrame?.(binding.ownerBindingFrame)!==true||binding.ownerBindingFrame.exactSourceFrame!==scope.source)return null;
 const old=cache.get(scope);if(old?.binding===binding&&old.ingress===ingress)return old.snapshot;
 const routeId=scope.source.sourceFrame?.constructionKind;
 if(!['relational-nnc','compound-embed','associated-entity','pertinency'].includes(routeId))return null;
 const contract=Object.freeze({scope,binding,request:null,captures:Object.freeze([Object.freeze({role:'source',exact:scope.source})]),ready:binding.bindingStatus==='ready',blockReason:binding.blockReason,choices:binding.choiceOptionProjection,requiredChoiceIds:binding.requiredChoiceIds,requiredResultRoles:Object.freeze([])});contracts.add(contract);
 const snapshot=protocol.issue(scope,{operationId:scope.operation,routeId},scope.source,contract,null,ingress);if(snapshot){snapshots.add(snapshot);cache.set(scope,{binding,ingress,snapshot});}return snapshot;
}
export const isCurrentDerivedFormationSnapshot=protocol.isCurrent;
export function captureDerivedFormationChoiceFrame(snapshot){if(!protocol.isCurrent(snapshot))return null;const event=Object.freeze({});events.set(event,{snapshot,revision:snapshot.controller.session.position.revision});return event;}
export function projectDerivedFormationExecution(snapshot){if(!snapshots.has(snapshot)||!snapshot.contract.ready||!currentFrame(snapshot.controller,snapshot.contract)||snapshot.controller.getIngress()!==snapshot.ingress)return null;return snapshot.contract.request?Object.freeze({kind:'request',operation:snapshot.controller.operation,source:snapshot.source,choices:snapshot.contract.request,request:Object.freeze({operationId:snapshot.controller.operation,args:Object.freeze([snapshot.contract.request])})}):Object.freeze({kind:'typed',operation:snapshot.controller.operation,source:snapshot.source,binding:snapshot.contract.binding,choices:snapshot.contract.binding.effectiveSelections||Object.freeze({})});}

// Exact roles follow the existing formation binding's named input, never an
// arbitrary occurrence of a parent in a request's unused authored fields.
const deverbalRoles=Object.freeze({
 'preterit-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'predicate-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'future-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'passive-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'impersonal-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'reconstructed-nonactive-vnc-source':['canonicalVncResult','canonicalVncResult'],
 'perfective-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'imperfective-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'root-stock-vnc-result':['canonicalVncResult','canonicalVncResult'],
 'nnc-result':['canonicalNncResult','canonicalNncResult'],
 'ownerhood-nnc-source':['canonicalNncResult','canonicalNncResult'],
 'ownerhood-perfective-nnc-source':['canonicalOwnerhoodNncResult','canonicalNncResult'],
 'action-nnc-result':['canonicalNncResult',p=>p.operationFrame?.actionNncContinuationFrame?.canonicalActionNncResult],
 'instrumentive-nnc-result':['canonicalNncResult',p=>p.operationFrame?.predicateCitationBridgeFrame?.canonicalNncResult],
 'patientive-nnc-result':['canonicalPatientiveNncGrammarFrame',p=>(p.operationFrame?.patientiveMatrixCompoundFrame||p.operationFrame?.patientiveEmbedCompoundFrame)?.canonicalPatientiveNncGrammarFrame],
});
// Correspondence mirrors the existing exact-binding request builder. Owner
// evaluation still decides whether the selected formation itself is licensed.
function matchesDeverbalBinding(selected,request){
 const [family,variant]=selected.id.split(':');
 if(family==='predicate-nominalization')return request.constructionKind===family
  &&(variant==='preterit-source'||request.nominalizationKind===variant);
 if(selected.id==='ownerhood:nnc-source')return request.constructionKind==='ownerhood';
 if(selected.id==='deverbal-action:future-source')return request.constructionKind==='deverbal-action';
 if(family==='patientive')return request.constructionKind==='patientive'
  &&request.patientiveSourceFamily===({'passive-source':'passive-core','impersonal-source':'impersonal-core',
   'reconstructed-nonactive-source':'reconstructed-nonactive-core','perfective-source':'perfective-active-core',
   'imperfective-source':'imperfective-active-core','root-stock-source':'root-or-stock',
   'characteristic-property':'characteristic-property'})[variant];
 if(selected.id==='continuation:action-nnc')return ['nominal-continuation','verbal-continuation'].includes(request.constructionKind);
 if(selected.id==='continuation:instrumentive-citation')return request.constructionKind==='predicate-citation';
 if(selected.id==='continuation:patientive-nnc')return ['patientive-embed-continuation','patientive-matrix-continuation'].includes(request.constructionKind);
 return false;
}
function immutableIntent(value,refs){if(!value||typeof value!=='object'||refs.has(value))return value;return Array.isArray(value)?Object.freeze(value.map(x=>immutableIntent(x,refs))):Object.freeze(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,immutableIntent(v,refs)])));}
function issueDeverbal(scope,{ingress,binding,request,sourceContext,selectedBindingId,additionalResults}){
 const owner=scope.owner;if(!request||typeof request!=='object')return null;
 const captures=[],requiredResultRoles=[],completions=[];
 let selected=null;
 if(binding){
  if(owner.isClassicalNahuatlFormationResultBindingFrame?.(binding)!==true||binding.operationId!==scope.operation||binding.exactResult!==scope.source)return null;
  selected=binding.bindingChoices.find(x=>x.id===selectedBindingId);if(!selected||!matchesDeverbalBinding(selected,request))return null;
  const mapping=deverbalRoles[selected.inputRole];if(!mapping||request[mapping[0]]!==scope.source)return null;
  captures.push(Object.freeze({role:selected.inputRole,exact:scope.source}));
  for(const role of selected.requiredResultRoles||[]){
   const exact=additionalResults[role];if(!exact){requiredResultRoles.push(role);continue;}
   const completion=owner.issueClassicalNahuatlFormationResultBindingCompletionFrame?.(binding,selected.id,role,exact);
   if(owner.isClassicalNahuatlFormationResultBindingCompletionFrame?.(completion)!==true
    ||completion.authorizationStatus!=='authorized'||completion.bindingFrame!==binding
    ||completion.primaryExactResult!==scope.source||completion.additionalExactResult!==exact
    ||!Object.entries(completion.ownerRequestPatch).every(([key,value])=>request[key]===value))return null;
   captures.push(Object.freeze({role,exact}));completions.push(completion);
  }
 }else{
  if(!sourceContext||sourceContext.source!==scope.source||sourceContext.ingress!==ingress||sourceContext.committed!==true||scope.getSourceContext?.()!==sourceContext)return null;
  if(owner.isClassicalNahuatlSupplementationFrame?.(scope.source)===true
   &&(request.constructionKind!=='double-nucleus-ownerhood'||request.source?.canonicalSupplementationResult!==scope.source
    ||request.source.principalNncResult!==owner.getClassicalNahuatlSupplementationClauseSourceFrame(scope.source.principalClause)
    ||request.source.supplementNncResult!==owner.getClassicalNahuatlSupplementationClauseSourceFrame(scope.source.supplementClause)))return null;
  captures.push(Object.freeze({role:'source',exact:scope.source}));
 }
 let preview=null;try{preview=owner.evaluateClassicalNahuatlDeverbalNnc(request);}catch{}
 if(owner.isClassicalNahuatlDeverbalNncGrammarFrame?.(preview)!==true)return null;
 const retained=owner.getClassicalNahuatlDeverbalNncReloadInputs?.(preview);
 const authorized=preview.authorizationStatus==='authorized';
 if(!binding&&authorized){
  // These are named dependencies retained by the canonical owner, not objects
  // found recursively in caller-authored data. Derived relations remain facts.
  for(const key of ['canonicalVncResult','canonicalNncResult','canonicalNncSourceFrame','principalNncResult','supplementNncResult','canonicalSupplementationResult']){
   const exact=preview.sourceFrame?.[key];if(exact&&exact!==scope.source)captures.push(Object.freeze({role:key,exact}));
  }
  const pair=preview.operationFrame?.instrumentiveSourcePairFrame;
  for(const [role,exact]of [['instrumentive-absolutive',pair?.customaryImpersonal?.canonicalVncResult],['instrumentive-possessive',pair?.imperfectActive?.canonicalVncResult]])if(exact&&!captures.some(c=>c.exact===exact))captures.push(Object.freeze({role,exact}));
 }
 const projection=binding&&deverbalRoles[selected.inputRole][1];
 const custody=(!binding||(typeof projection==='function'?projection(preview):preview.sourceFrame?.[projection])===scope.source)
  &&completions.every(completion=>{
   const patch=completion.ownerRequestPatch;
   if(completion.requiredResultRole==='instrumentive-companion-vnc')return preview.operationFrame?.instrumentiveSourcePairFrame?.customaryImpersonal?.canonicalVncResult===patch.canonicalInstrumentiveAbsolutiveVncResult
    &&preview.operationFrame?.instrumentiveSourcePairFrame?.imperfectActive?.canonicalVncResult===patch.canonicalInstrumentivePossessiveVncResult;
   if(completion.requiredResultRole==='customary-agentive-preterit-supplement-vnc')return preview.operationFrame?.customaryAgentivePossessiveSupplementFrame?.preteritAgentiveFrame?.sourceFrame?.preteritVncCaptureFrame?.canonicalVncResult===completion.additionalExactResult;
   return false;
  });
 const ready=authorized&&Boolean(retained)&&custody&&!requiredResultRoles.length;
 const contract=Object.freeze({scope,sourceContext,binding,selectedBindingId,request:retained||immutableIntent(request,new Set(captures.map(c=>c.exact))),preview,captures:Object.freeze(captures),ready,blockReason:requiredResultRoles.length?'derived-required-input-missing':!custody?'derived-owner-input-custody-mismatch':preview.blockReason,requiredResultRoles:Object.freeze(requiredResultRoles),requiredChoiceIds:selected?.requiredChoiceIds||Object.freeze([])});contracts.add(contract);
 const snapshot=protocol.issue(scope,{operationId:scope.operation,routeId:request.constructionKind},scope.source,contract,null,ingress);if(snapshot)snapshots.add(snapshot);return snapshot;
}

const requestCache=new WeakMap();
function sameIntent(a,b){if(a===b)return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||(typeof a.kind==='string'&&a.kind.startsWith('classical-')))return false;const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&sameIntent(a[k],b[k]));}
export function issueDerivedFormationSnapshot(scope,input={}){
 if(!scopes.has(scope)||scope.getIngress()!==input.ingress)return null;
 const prior=requestCache.get(scope),parents=input.additionalResults||{};
 if(prior&&prior.binding===input.binding&&prior.ingress===input.ingress&&prior.sourceContext===input.sourceContext&&prior.selectedBindingId===input.selectedBindingId&&currentFrame(scope,prior.snapshot.contract)&&sameIntent(prior.snapshot.contract.intent||prior.snapshot.contract.request,input.request||null)&&Object.keys(parents).length===Object.keys(prior.parents).length&&Object.keys(parents).every(k=>parents[k]===prior.parents[k]))return prior.snapshot;
 const snapshot=buildDerivedFormationSnapshot(scope,input);if(snapshot)requestCache.set(scope,{binding:input.binding,ingress:input.ingress,sourceContext:input.sourceContext,selectedBindingId:input.selectedBindingId,parents:{...parents},snapshot});return snapshot;
}
export function adoptDerivedFormationCandidate(snapshot,input,event){if(!protocol.isCurrent(snapshot,event)||events.get(event)?.snapshot!==snapshot)return null;return issueDerivedFormationSnapshot(snapshot.controller,{...input,ingress:snapshot.ingress});}

function issueAdverbial(scope,{ingress,binding,request,sourceContext}){
 const owner=scope.owner;if(!request||typeof request!=='object')return null;
 const refs=new Set(),captures=[];
 if(binding){
  if(owner.isClassicalGrammarFormationResultBindingFrame?.(binding)!==true||binding.operationId!==scope.operation||binding.exactResult!==scope.source||request.canonicalSourceResult!==scope.source)return null;
  refs.add(scope.source);captures.push(Object.freeze({role:'adverbial-source',exact:scope.source}));
  if(request.canonicalMatrixResult){if(binding.canonicalMatrixResult!==request.canonicalMatrixResult)return null;refs.add(request.canonicalMatrixResult);captures.push(Object.freeze({role:'adverbial-matrix-vnc-result',exact:request.canonicalMatrixResult}));}
 }else{
  if(!sourceContext||sourceContext.source!==scope.source||sourceContext.ingress!==ingress||sourceContext.committed!==true||scope.getSourceContext?.()!==sourceContext)return null;
  const potential=request.adverbialPotentialFrame;
  if(owner.isClassicalNahuatlAdverbialPotentialFrame?.(potential)!==true||![potential.lexicalNncSourceFrame,potential.lexicalVncSourceFrame,potential.primitiveAdverbialSourceFrame].includes(scope.source))return null;
  refs.add(potential);captures.push(Object.freeze({role:'source',exact:scope.source}));
  if(request.canonicalMatrixResult){
   if(owner.isClassicalNahuatlVncApplicationFrame?.(request.canonicalMatrixResult)!==true&&owner.isClassicalNahuatlVncApplicationResultFrame?.(request.canonicalMatrixResult)!==true)return null;
   refs.add(request.canonicalMatrixResult);captures.push(Object.freeze({role:'adverbial-matrix-vnc-result',exact:request.canonicalMatrixResult}));
  }
 }
 const retained=immutableIntent(request,refs);let preview=null;try{preview=owner.evaluateClassicalNahuatlAdverbialNuclear(retained);}catch{}
 const authorized=owner.isClassicalNahuatlAdverbialNuclearResult?.(preview)===true&&preview.authorizationStatus==='authorized';
 const custody=authorized&&(binding?preview.canonicalSourceResult===scope.source:preview.adverbialPotentialFrame===request.adverbialPotentialFrame)&&(!request.canonicalMatrixResult||preview.canonicalMatrixResult===request.canonicalMatrixResult);
 const contract=Object.freeze({scope,sourceContext,binding,request:retained,preview,captures:Object.freeze(captures),ready:custody,blockReason:preview?.blockReason||(!custody?'adverbial-owner-input-custody-mismatch':''),requiredResultRoles:binding?.requiredResultRoles||Object.freeze([]),requiredChoiceIds:binding?.requiredChoiceIds||Object.freeze([])});contracts.add(contract);
 const snapshot=protocol.issue(scope,{operationId:scope.operation,routeId:'adverbialize-nuclear-clause'},scope.source,contract,null,ingress);if(snapshot)snapshots.add(snapshot);return snapshot;
}

function issueRelationalExact(scope,{ingress,binding,request,selectedBindingId}){
 const owner=scope.owner,selected=binding.bindingChoices.find(x=>x.id===selectedBindingId);
 if(binding.operationId!==scope.operation||binding.exactResult!==scope.source||!selected||request?.nounstem?.upstreamResult!==scope.source)return null;
 const [family,formation,stem]=selected.id.split(':');
 const associated=selected.id==='relational-source:associated-entity:pertinency';
 if(family!=='relational-source'||request.nounstem.operation!==(associated?'pertinency':'relational-nnc')
  ||request.nounstem.sourceFormation!==(associated?'plain-nounstem':formation)
  ||request.nounstem.stemId!==(associated?scope.source.stemId:stem)
  ||associated&&request.nounstem.pertinencySourceKind!=='associated-entity')return null;
 const declared=immutableIntent(request,new Set([scope.source]));
 const typedSource=owner.buildClassicalNahuatlRelationalNncTypedSourceFrame?.(declared);
 const sourceAuthorized=owner.isClassicalNahuatlRelationalNncTypedSourceFrame?.(typedSource)===true;
 let preview=null;try{preview=owner.evaluateClassicalNahuatlRelationalNnc(sourceAuthorized?typedSource:declared);}catch{}
 const custody=sourceAuthorized&&owner.isClassicalNahuatlRelationalResult?.(preview)===true&&preview.authorizationStatus==='authorized'&&preview.navigatorSourceFrame===typedSource&&preview.sourceFrame.upstreamSourceCarrier?.ownerResult===scope.source;
 const contract=Object.freeze({scope,binding,selectedBindingId,request:sourceAuthorized?typedSource:declared,intent:declared,preview,captures:Object.freeze([Object.freeze({role:selected.inputRole,exact:scope.source})]),ready:custody,blockReason:preview?.blockReason||(!custody?'relational-owner-input-custody-mismatch':''),requiredResultRoles:selected.requiredResultRoles,requiredChoiceIds:selected.requiredChoiceIds});contracts.add(contract);
 const snapshot=protocol.issue(scope,{operationId:scope.operation,routeId:request.nounstem.operation},scope.source,contract,null,ingress);if(snapshot)snapshots.add(snapshot);return snapshot;
}
