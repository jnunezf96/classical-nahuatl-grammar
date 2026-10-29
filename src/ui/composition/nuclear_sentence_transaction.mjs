import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261029-12';
const scopes=new WeakSet(),contracts=new WeakSet(),snapshots=new WeakSet(),events=new WeakMap(),cache=new WeakMap();
export const isNuclearSentenceOperation=id=>id==='vnc:sentence-result'||id==='nnc:sentence-surface';
const same=(a,b)=>a===b||Boolean(a&&b&&typeof a==='object'&&typeof b==='object'&&!a.kind&&!b.kind&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>same(a[k],b[k])));
function authored(x){if(typeof x==='function'||typeof x==='symbol')throw Error('sentence-intent-is-not-data');if(!x||typeof x!=='object')return x;const proto=Object.getPrototypeOf(x);if(x.kind||!Array.isArray(x)&&proto!==null&&Object.getPrototypeOf(proto)!==null)throw Error('sentence-intent-is-not-authority');return Object.freeze(Array.isArray(x)?x.map(authored):Object.fromEntries(Object.entries(x).map(([k,v])=>[k,authored(v)])));}
export function createNuclearSentenceScope({owner,source,operationId,session,getIngress}){if(!owner||!source||!session||!isNuclearSentenceOperation(operationId)||typeof getIngress!=='function')return null;const s=Object.freeze({owner,source,operationId,session,getIngress});scopes.add(s);return s;}
const current=(s,c)=>scopes.has(s)&&contracts.has(c)&&c.scope===s&&s.getIngress()===c.ingress;
const protocol=createOwnerOperationProtocol({kind:'nuclear-sentence-operation-contract',select:s=>isNuclearSentenceOperation(s.operationId),routeId:s=>s.operationId,projectIntent:s=>Object.freeze({...s}),buildContract:()=>null,isCurrentFrame:current,projectCaptures:(_s,c)=>c.captures,isCurrentSnapshot:(s,e)=>{const p=s.controller.session.position,v=events.get(e);return p.operationContract===s&&p.construction.source===s.source&&!p.construction.sourcePending&&current(s.controller,s.contract)&&(!e||v?.snapshot===s&&v.revision===p.revision);},transition:()=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'sentence-owner-reissue-required'}),equivalent:(a,b)=>a===b,staleReason:'sentence-choice-stale'});
export function issueNuclearSentenceSnapshot(scope,{ingress,binding=null,navigator=null,operation=null,context=null,options={},layers=[],controls={}}={}){
 if(!scopes.has(scope)||scope.getIngress()!==ingress)return null;
 const o=scope.owner,id=scope.operationId;let intent,layerRecipe,controlState,request,signatureArgs,captures=[{role:'source',exact:scope.source}];
 try{intent=authored(binding?(binding.effectiveSelections||binding.callerSelections||{}):options);layerRecipe=authored(layers);controlState=authored(controls);}catch{return null;}
 if(id==='vnc:sentence-result'){
  if(o.isClassicalNahuatlVncContinuationBindingFrame?.(binding)!==true||binding.operationId!==id||binding.exactInputResult!==scope.source)return null;
  captures.push({role:'sentence-binding',exact:binding});
  request=binding.bindingStatus==='ready'?Object.freeze({operationId:id,args:binding.executionArgs}):null;
  signatureArgs=binding.ownerPreflightAuthorized===true&&binding.ownerRequest&&request?.args?.length===1&&request.args[0]===binding.ownerPreflightResult?Object.freeze([Object.freeze({exactSentenceSource:scope.source,ownerRequest:binding.ownerRequest})]):request?.args;
 }else{
  if(o.isClassicalGrammarApplicationCapabilityNavigator?.(navigator)!==true||navigator.exactResult!==scope.source||!navigator.operations.includes(operation)||operation.operationId!==id||!operation.directOwnerProbeInstalled||!operation.ownerProbeResultValidated)return null;
  const input=operation.ownerProbeInputResult;
  if(!input)return null;
  if(context&&(o.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(context)!==true||context!==scope.source&&context!==scope.source.sentenceFrame||context!==input&&context.sourceNncSlotFrame!==input))return null;
  captures.push({role:'sentence-input',exact:input});if(context)captures.push({role:'sentence-context',exact:context});
  request=Object.freeze({operationId:id,args:Object.freeze([input,intent])});signatureArgs=request.args;
 }
 const prior=cache.get(scope);if(prior&&prior.ingress===ingress&&prior.binding===binding&&prior.navigator===navigator&&prior.operation===operation&&prior.context===context&&same(prior.intent,intent)&&same(prior.layers,layerRecipe)&&same(prior.controls,controlState))return prior.snapshot;
 let preview=null,previewError='';try{preview=request?o.previewClassicalGrammarApplicationRequest?.(request):null;}catch(error){previewError=String(error?.message||'sentence-owner-inputs-required');}
 const ready=Boolean(request&&o.isClassicalGrammarApplicationPreview?.(preview)===true&&preview.authorizationStatus==='authorized');
 const c=Object.freeze({scope,ingress,binding,navigator,operation,context,intent,layers:layerRecipe,controls:controlState,request,signatureArgs,preview,ready,blockReason:preview?.blockReason||previewError||binding?.blockReason||(!ready?'sentence-owner-inputs-required':''),captures:Object.freeze(captures.map(Object.freeze))});contracts.add(c);
 const s=protocol.issue(scope,{operationId:id},scope.source,c,null,ingress);if(s){snapshots.add(s);cache.set(scope,{...c,snapshot:s});}return s;
}
export const isCurrentNuclearSentenceSnapshot=protocol.isCurrent;
export function captureNuclearSentenceChoiceFrame(s){if(!protocol.isCurrent(s))return null;const e=Object.freeze({});events.set(e,{snapshot:s,revision:s.controller.session.position.revision});return e;}
export function projectNuclearSentenceExecution(s){if(!snapshots.has(s)||!current(s.controller,s.contract)||!s.contract.ready)return null;return Object.freeze({operation:s.controller.operationId,source:s.source,choices:s.contract.intent,kind:'request',request:s.contract.request,layers:s.contract.layers});}
export function retainNuclearSentenceBinding(snapshot,candidate,event){
 if(!protocol.isCurrent(snapshot,event)||snapshot.controller.operationId!=='vnc:sentence-result')return null;
 const o=snapshot.controller.owner,prior=snapshot.contract.binding;
 if(o.isClassicalNahuatlVncContinuationBindingFrame?.(candidate)!==true||candidate.operationId!==prior.operationId||candidate.exactInputResult!==snapshot.source)return null;
 // Owner-normalized request and effective decisions define unchanged input;
 // private preflight/recapture witnesses do not constitute a new user choice.
 return candidate.bindingStatus===prior.bindingStatus&&candidate.blockReason===prior.blockReason
   &&same(candidate.ownerRequest,prior.ownerRequest)&&same(candidate.effectiveSelections,prior.effectiveSelections)
   &&same(candidate.callerSelections,prior.callerSelections)?prior:candidate;
}
