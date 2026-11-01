import {createOwnerOperationProtocol} from './owner_operation_protocol.mjs?issuedBinding=20261028-1&ownerDecision=20261031-1';
const scopes=new WeakSet(),contracts=new WeakSet(),snapshots=new WeakSet(),events=new WeakMap(),cache=new WeakMap();
export const PARTICLE_OPERATIONS=Object.freeze(['particle:result','sentence:adverbial-adjunction','sentence:particle-adjunction','particle:negative-selection','particle:negative-attachment']);
export const isParticleOperation=id=>PARTICLE_OPERATIONS.includes(id);
const equal=(a,b)=>a===b||Boolean(a&&b&&typeof a==='object'&&typeof b==='object'&&!a.kind&&!b.kind&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>equal(a[k],b[k])));
function authored(x){if(!x||typeof x!=='object')return x;if(x.kind||![Object.prototype,null].includes(Object.getPrototypeOf(x))&&!Array.isArray(x))throw Error('particle-intent-is-not-authority');return Object.freeze(Array.isArray(x)?x.map(authored):Object.fromEntries(Object.entries(x).map(([k,v])=>[k,authored(v)])));}
export function createParticleOperationScope({owner,source,operationId,session,getIngress,presentation=null}){if(!owner||!source||!isParticleOperation(operationId)||!session||typeof getIngress!=='function')return null;const s=Object.freeze({owner,source,operationId,session,getIngress,presentation:authored(presentation)});scopes.add(s);return s;}
const current=(s,c)=>scopes.has(s)&&contracts.has(c)&&c.scope===s&&s.getIngress()===c.ingress&&(!c.typed||s.owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(c.typed)===true)&&(!c.prepared||s.owner.isClassicalGrammarPreparedApplicationRequest?.(c.prepared)===true);
const protocol=createOwnerOperationProtocol({kind:'particle-operation-contract',select:s=>isParticleOperation(s.operationId),routeId:s=>s.operationId,projectIntent:s=>Object.freeze({...s}),buildContract:()=>null,isCurrentFrame:current,projectCaptures:(_s,c)=>c.captures,isCurrentSnapshot:(s,e)=>{const p=s.controller.session.position,v=events.get(e);return p.operationContract===s&&p.construction.source===s.source&&!p.construction.sourcePending&&current(s.controller,s.contract)&&(!e||v?.snapshot===s&&v.revision===p.revision);},transition:()=>Object.freeze({handled:true,authorizationStatus:'blocked',blockReason:'particle-owner-reissue-required'}),equivalent:(a,b)=>a===b,staleReason:'particle-choice-stale'});
export function issueParticleOperationSnapshot(scope,{ingress,binding,hostBinding=null,particleBinding=null,typed=null,lexicalEdit=false,intent={}}={}){
 if(!scopes.has(scope)||scope.getIngress()!==ingress)return null;const o=scope.owner,id=scope.operationId;
 const valid=b=>o.isClassicalNahuatlParticleSentenceBindingFrame?.(b)===true&&b.operationId===id&&b.authorizationStatus==='authorized';
 if(id==='particle:result'){
  if(o.isClassicalGrammarTypedSourceOperationBindingFrame?.(typed)!==true||typed.operationId!==id||typed.exactNavigatorInput!==scope.source)return null;
 }else if(!valid(binding)||binding.exactResult!==scope.source||hostBinding&&!valid(hostBinding)||particleBinding&&!valid(particleBinding))return null;
 let selected;try{selected=authored(id==='particle:result'?(typed.effectiveSelections||typed.callerSelections||{}):intent);}catch{return null;}
 const prior=cache.get(scope);if(prior&&current(scope,prior.snapshot.contract)&&prior.ingress===ingress&&prior.binding===binding&&prior.hostBinding===hostBinding&&prior.particleBinding===particleBinding&&prior.typed===typed&&prior.lexicalEdit===lexicalEdit&&equal(prior.intent,selected))return prior.snapshot;
 let request=null,preview=null,prepared=null,ownerFrame=null,ready=false,blockReason='',choices={},captures=[{role:'source',exact:scope.source}];
 if(id==='particle:result'){
  const selectedSource=typed.ownerBindingFrame?.exactParticleSourceFrame;
  if(typed.bindingStatus==='ready'&&o.isClassicalNahuatlParticleSourceFrame?.(selectedSource)!==true)return null;
  if(lexicalEdit && typed.callerSelections?.contextUse!=='retained')return null;
  prepared=typed.bindingStatus==='ready'?o.prepareClassicalGrammarApplicationRequest?.(typed):null;
  request=prepared?.request || null;
  const preceding=request?.args?.[1]?.precedingParticleSourceFrame;
  if(preceding)captures.push({role:'preceding-particle-source',exact:preceding});
  if(selectedSource)captures.push({role:'selected-particle-source',exact:selectedSource});
  blockReason=typed.blockReason||'';choices=typed.choiceOptionProjection||{};

 }else{
  const host=hostBinding||(binding.exactHostClause?binding:null),particle=particleBinding||(binding.exactParticleResult?binding:null);let args;
  if(host?.exactHostClause)captures.push({role:'host-clause',exact:host.exactHostClause});
  if(particle?.exactParticleResult)captures.push({role:'particle',exact:particle.exactParticleResult});
  if(id==='particle:negative-selection'){
   args={polarity:'negative',sentenceKind:selected.sentenceKind||'statement',precedingParticleResultFrame:binding.exactParticleResult};
  }else if(id==='particle:negative-attachment')args={negativeSelectionFrame:host?.exactHostClause,followingParticleResultFrame:particle?.exactParticleResult};
  else{
   const hostArg=host?.inputRole==='consumed-sentence'?{consumedSentenceFrame:host.exactHostClause}:{nuclearResultFrame:host?.exactHostClause};
   const particleArg=particle?.exactParticleResult?{particleResultFrame:particle.exactParticleResult}:{particleSourceFrame:id==='sentence:adverbial-adjunction'&&selected.adverbialId?o.buildClassicalNahuatlParticleSourceFrame?.(selected.adverbialId):null};
   if(particleArg.particleSourceFrame)captures.push({role:'adverbial-source',exact:particleArg.particleSourceFrame});
   args={...hostArg,...particleArg,...(id==='sentence:particle-adjunction'?{honorificized:selected.honorificized===true,speakerGender:selected.speakerGender||'unspecified'}:{})};
  }
  request=Object.freeze({operationId:id,args:Object.freeze([Object.freeze(args)])});

 }
 if(request){
  try{prepared ||= o.prepareClassicalGrammarApplicationRequest?.(request);}catch{}
  if(prepared && o.isClassicalGrammarPreparedApplicationRequest?.(prepared)===true){
   request=prepared.request;ownerFrame=prepared.canonicalResult;
   preview=o.previewClassicalGrammarApplicationRequest?.(request,prepared);
   ready=o.isClassicalGrammarApplicationPreview?.(preview)===true && prepared.authorizationStatus==='authorized';
   blockReason=ready?'':prepared.blockReason||'particle-owner-inputs-required';
   if(id!=='particle:result')choices=ownerFrame?.choiceOptionProjection||{};
  }else blockReason='particle-owner-inputs-required';
 }
 const c=Object.freeze({scope,ingress,binding:typed||binding,hostBinding,particleBinding,typed,lexicalEdit,intent:selected,authoredSelections:selected,effectiveSelections:selected,request,prepared,ownerFrame,preview,ready,blockReason,choices:Object.freeze(choices),presentation:scope.presentation,captures:Object.freeze(captures.map(Object.freeze))});contracts.add(c);
 const s=protocol.issue(scope,{operationId:id},scope.source,c,null,ingress);if(s){snapshots.add(s);cache.set(scope,{ingress,binding,hostBinding,particleBinding,typed,lexicalEdit,intent:selected,snapshot:s});}return s;
}
export const isCurrentParticleOperationSnapshot=protocol.isCurrent;
export function captureParticleOperationChoiceFrame(s){if(!protocol.isCurrent(s))return null;const e=Object.freeze({});events.set(e,{snapshot:s,revision:s.controller.session.position.revision});return e;}
export function projectParticleOperationExecution(s){if(!snapshots.has(s)||!current(s.controller,s.contract)||!s.contract.ready)return null;return Object.freeze({operation:s.controller.operationId,source:s.source,choices:s.contract.intent,kind:'request',request:s.contract.request,prepared:s.contract.prepared});}

export function adoptParticleOperationCandidate(snapshot,typed,event){if(!protocol.isCurrent(snapshot,event)||snapshot.controller.operationId!=="particle:result")return null;return issueParticleOperationSnapshot(snapshot.controller,{ingress:snapshot.ingress,typed,lexicalEdit:snapshot.contract.lexicalEdit});}
