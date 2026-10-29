import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
// Custody of existing nominal owner requests, never nominal grammatical authority.
const scopes=new WeakSet(),events=new WeakMap(),contracts=new WeakSet(),snapshots=new WeakSet();
const operationId='grammar:nominal-construction';
const kinds=new Set(['nominal-embed-vnc','compound-nnc','cardinal-numeral-nnc','calendar-date-nnc','affective-nnc','adjectival-nnc']);
function immutable(value,refs){
 if(!value||typeof value!=='object'||refs.has(value))return value;
 if(Array.isArray(value))return Object.freeze(value.map(x=>immutable(x,refs)));
 return Object.freeze(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,immutable(v,refs)])));
}
const roles=Object.freeze({
 'matrix-vnc-result':['matrixConstituent','capturedMatrixVncResult'],
 'nominal-matrix-vnc-result':['matrixConstituent','capturedMatrixVncResult'],
 'nominal-embed-constituent':['embedConstituent','capturedEmbedResult'],
 'nominal-embed-result':['embedConstituent','capturedEmbedResult'],
 'compound-embed-result':['embedConstituent','capturedEmbedResult'],
 'affective-embed-result':['embedConstituent','capturedEmbedResult'],
 'compound-embed-constituent':['embedConstituent','capturedEmbedResult'],
 'compound-matrix-result':['matrixConstituent','capturedMatrixNncResult'],
 'compound-matrix-constituent':['matrixConstituent','capturedMatrixNncResult'],
 'adjectival-source-result':['canonicalNncResult','capturedAdjectivalNncResult'],
 'lexical-conjunction-result':['canonicalLexicalConjunctionResult','capturedLexicalConjunctionResult'],
 'fixed-expression-result':['embedConstituent','capturedEmbedResult'],
 'calendar-numeral-result':['numeralResult','capturedNumeralResult'],
 'calendar-day-sign-result':['daySignResult','capturedDaySignResult']
});
function requestParent(request,role){const key=roles[role]?.[0],value=key&&request.source?.[key];return key?.endsWith('Constituent')?value?.resultFrame:value;}
function ownerParent(result,role){return result?.sourceAuthorizationFrame?.lexicalFacts?.[roles[role]?.[1]];}
function currentFrame(scope,contract){return scopes.has(scope)&&contracts.has(contract)&&contract.scope===scope&&(!contract.sourceContext||scope.getSourceContext?.()===contract.sourceContext);}
export function createNominalOperationScope({owner,source,session,getIngress,sourceContext=null,getSourceContext=null}){
 if(!owner||!source||!session||typeof getIngress!=='function')return null;
 const scope=Object.freeze({owner,source,session,getIngress,sourceContext,getSourceContext,operationId});scopes.add(scope);return scope;
}
const protocol=createOwnerOperationProtocol({
 kind:'nominal-operation-contract',select:s=>s?.operationId===operationId,
 routeId:s=>s.routeId,projectIntent:s=>Object.freeze({...s}),buildContract:()=>null,
 isCurrentFrame:currentFrame,projectCaptures:(_scope,c)=>c.captures,
 isCurrentSnapshot:(s,event)=>{const scope=s.controller,p=scope.session.position,e=event&&events.get(event);return p.operationContract===s&&!p.construction.sourcePending&&p.construction.source===s.source&&scope.getIngress()===s.ingress&&(!event||Boolean(e&&e.snapshot===s&&e.revision===p.revision));},
 transition:()=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'nominal-owner-reissue-required'}),
 equivalent:(a,b)=>a===b,staleReason:'nominal-choice-stale-frame'
});
function buildNominalOperationSnapshot(scope,{ingress,request,binding,selectedBindingId,additionalResults={},sourceContext=null}={}){
 if(!scopes.has(scope))return null;
 const owner=scope.owner;
 if(owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding)===true){
  if(binding.operationId!==operationId||binding.exactSource!==scope.source||binding.navigator!==ingress
   ||owner.isClassicalNahuatlNominalConstructionTypedSourceBindingFrame?.(binding.ownerBindingFrame)!==true)return null;
  const routeId=scope.source.kind==='classical-nahuatl-cardinal-numeric-source-frame'?'cardinal-numeral-nnc':'compound-nnc';
  const captures=Object.freeze([Object.freeze({role:'source',exact:scope.source})]);
  const contract=Object.freeze({scope,binding,request:null,captures,ready:binding.bindingStatus==='ready',blockReason:binding.blockReason,
   choices:binding.choiceOptionProjection,requiredChoiceIds:binding.requiredChoiceIds,requiredResultRoles:Object.freeze([]),intent:immutable(binding.callerSelections,new Set())});contracts.add(contract);
  const snapshot=protocol.issue(scope,{operationId,routeId},scope.source,contract,null,ingress);if(snapshot)snapshots.add(snapshot);return snapshot;
 }
 if(!kinds.has(request?.constructionKind))return null;
 if(!binding){
  if(!sourceContext||sourceContext!==scope.sourceContext||scope.getSourceContext?.()!==sourceContext
   ||sourceContext.source!==scope.source||sourceContext.ingress!==ingress||sourceContext.committed!==true)return null;
  const refs=new Set([scope.source]);
  const contextual=request.source?.contextualFlawedSubjectSourceFrame;
  if(contextual){if(owner.isClassicalNahuatlContextualFlawedSubjectSourceFrame?.(contextual)!==true)return null;refs.add(contextual);}
  let preview=null;try{preview=owner.evaluateClassicalNahuatlNominalConstruction(request);}catch{}
  const ownerRequest=owner.getClassicalNahuatlNominalConstructionReloadInputs?.(preview);
  const retained=ownerRequest||immutable(request,refs);
  const sourceAuthorization=preview?.sourceAuthorizationFrame;
  if(owner.isClassicalNahuatlNominalConstructionSourceAuthorization?.(sourceAuthorization)!==true)return null;
  const ready=Boolean(ownerRequest)&&owner.isClassicalNahuatlNominalConstructionResult?.(preview)===true&&preview.authorizationStatus==='authorized';
  const captures=Object.freeze([Object.freeze({role:'source',exact:scope.source})]);
  const contract=Object.freeze({scope,sourceContext,sourceAuthorization,binding:null,request:retained,preview,captures,ready,
   blockReason:ready?'':preview?.blockReason||'nominal-owner-request-rejected',requiredResultRoles:Object.freeze([])});contracts.add(contract);
  const routeId=request.constructionKind==='affective-nnc'?`${request.constructionKind}:${preview?.operationFrame?.affectRoute||request.affectRoute||''}`:request.constructionKind;
  const snapshot=protocol.issue(scope,{operationId,routeId},scope.source,contract,null,ingress);if(snapshot)snapshots.add(snapshot);return snapshot;
 }
 if(owner.isClassicalNahuatlFormationResultBindingFrame?.(binding)!==true||binding.operationId!==operationId||binding.exactResult!==scope.source)return null;
 const selected=binding.bindingChoices.find(x=>x.id===selectedBindingId);if(!selected)return null;
 const captures=[{role:selected.inputRole,exact:scope.source}],completions=[],requiredResultRoles=[];
 let missing=false,invalid=false;
 for(const role of selected.requiredResultRoles){
  const exact=additionalResults[role];if(!exact){missing=true;requiredResultRoles.push(role);continue;}
  const completion=owner.issueClassicalNahuatlFormationResultBindingCompletionFrame(binding,selectedBindingId,role,exact);
  if(owner.isClassicalNahuatlFormationResultBindingCompletionFrame?.(completion)!==true||completion.authorizationStatus!=='authorized'){invalid=true;continue;}
  captures.push({role,exact});completions.push(completion);
 }
 if(invalid)return null;
 if(!captures.every(c=>requestParent(request,c.role)===c.exact))return null;
 let preview=null;try{preview=owner.evaluateClassicalNahuatlNominalConstruction(request);}catch{}
 const ownerRequest=owner.getClassicalNahuatlNominalConstructionReloadInputs?.(preview);
 const retained=ownerRequest||immutable(request,new Set(captures.map(c=>c.exact)));
 const authorized=owner.isClassicalNahuatlNominalConstructionResult?.(preview)===true&&preview.authorizationStatus==='authorized';
 // Authorized owner output must retain the inputs it actually consumed.
 const custody=authorized&&captures.every(c=>ownerParent(preview,c.role)===c.exact);
 const contract=Object.freeze({scope,binding,selectedBindingId,requiredResultRoles:Object.freeze(requiredResultRoles),requiredChoiceIds:selected.requiredChoiceIds,request:retained,preview,captures:Object.freeze(captures.map(Object.freeze)),completions:Object.freeze(completions),ready:!missing&&custody&&Boolean(ownerRequest),
  blockReason:missing?'nominal-required-input-missing':!authorized?preview?.blockReason||'nominal-owner-request-rejected':!custody?'nominal-owner-input-custody-mismatch':''});contracts.add(contract);
 const routeId=request.constructionKind==='affective-nnc'?`${request.constructionKind}:${request.affectRoute||preview?.operationFrame?.affectRoute||''}`:request.constructionKind==='adjectival-nnc'?`${request.constructionKind}:${request.adjectivalOperation||''}`:request.constructionKind;
 const snapshot=protocol.issue(scope,{operationId,routeId},scope.source,contract,null,ingress);if(snapshot)snapshots.add(snapshot);return snapshot;
}
export const isCurrentNominalOperationSnapshot=protocol.isCurrent;
export function captureNominalOperationChoiceFrame(snapshot){if(!protocol.isCurrent(snapshot))return null;const event=Object.freeze({});events.set(event,{snapshot,revision:snapshot.controller.session.position.revision});return event;}

export function projectNominalOperationExecution(snapshot){
 if(!snapshots.has(snapshot)||!snapshot.contract.ready||!currentFrame(snapshot.controller,snapshot.contract)||snapshot.controller.getIngress()!==snapshot.ingress)return null;
 const {binding,request,intent}=snapshot.contract;
 return request?Object.freeze({kind:'request',operation:operationId,source:snapshot.source,
  choices:request,request:Object.freeze({operationId,args:Object.freeze([request])})})
  :Object.freeze({kind:'typed',operation:operationId,source:snapshot.source,binding,
    choices:binding.effectiveSelections||intent});
}

const issuanceCache=new WeakMap();
function sameRequest(a,b){
 if(a===b)return true;
 if(!a||!b||typeof a!=='object'||typeof b!=='object')return false;
 if(typeof a.kind==='string'&&a.kind.startsWith('classical-'))return false;
 const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&sameRequest(a[k],b[k]));
}
export function issueNominalOperationSnapshot(scope,input={}){
 if(!scopes.has(scope))return null;
 const cached=issuanceCache.get(scope),parents=input.additionalResults||{};
 if(cached&&cached.input.ingress===input.ingress&&scope.getIngress()===input.ingress
  &&cached.input.binding===input.binding&&cached.input.selectedBindingId===input.selectedBindingId
  &&cached.input.sourceContext===input.sourceContext&&currentFrame(scope,cached.snapshot.contract)
  &&Object.keys(parents).length===Object.keys(cached.parents).length
  &&Object.keys(parents).every(k=>parents[k]===cached.parents[k])
  &&sameRequest(cached.snapshot.contract.request,input.request||null))return cached.snapshot;
 const snapshot=buildNominalOperationSnapshot(scope,input);
 if(snapshot)issuanceCache.set(scope,{input:{...input},parents:{...parents},snapshot});return snapshot;
}

export function adoptNominalOperationCandidate(snapshot,input,event){
 if(!protocol.isCurrent(snapshot,event)||events.get(event)?.snapshot!==snapshot)return null;
 return issueNominalOperationSnapshot(snapshot.controller,{...input,ingress:snapshot.ingress});
}
