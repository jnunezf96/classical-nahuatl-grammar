// Input-only recipes. Exact operands are backward graph edges and are reissued
// by their existing owners; serialized grammar frames are never admitted.
const top = new Set(('constructionKind relation route subject mood tense voice structure state possessor animacy humanness embedRole possessorOrientation bracketing reduplication reduplicationTarget matrixFormation matrixExpansion matrixInitialIVariant embedReduplication matrixReduplication embedIntensification embedShapeVariant embedBoundarySpelling operationScope outputKind outputScope orientation singularPossessiveConnector pluralConnector ordinaryNumberVariant possessiveAffinityPlural nonanimateReduplicationReading nonanimateReduplicationEvidence semanticReading embedLexicalRule adverbRole complementTargetReferenceId embedPossessorCorefersWithSubject supplementObjectId complementKind similarityReduplicationShape possessorReferenceId directionalPrefix nonactiveOptionId source').split(' '));
const source = new Set(('embedStem embedClass embedSourceClass embedConstituent matrixStem matrixClass matrixSourceClass matrixConstituent matrixValence matrixVerbClass sourceValence sourceObjectPattern sourceObjectRequests matrixDerivationType matrixInitialIAnalysis initialIAnalysis compoundEmbedAnalysis yoEmbedAnalysis sexEmbedAnalysis affinityScopeAnalysis distributiveVarietalAnalysis uniqueCompoundNounstemAnalyses uniqueCompoundNounstemAnalysis uniqueEmbedAnalysis embedState embedPossessor embedPossessorPerson embedInitialISelection embedShapeVariant embedRole relation route semanticReading subjectReferenceId objectReferenceIds possessorReferenceId embedSubjectReferenceId embedPossessorReferenceId embedPossessorCorefersWithSubject incorporatedObjectId supplementObjectId adverbRole complementKind complementRole complementTargetReferenceId incorporatedObjectCandidateIds objectPerson possessorReferenceCandidates possessionKind').split(' '));
const forbidden = /(?:surface|realization|authorization|canonical|machinery|typedSlot|authority|bindingStatus|preflight|__proto__|constructor|prototype)/i;
const exact = (v,keys)=>v && typeof v==='object' && !Array.isArray(v) && Object.keys(v).every(k=>keys.includes(k));
function inputs(value,edge,path='',depth=0){
  if(depth>24)throw Error('deep compound inputs');
  if(value===null || ['string','number','boolean'].includes(typeof value))return value;
  if(Array.isArray(value)){if(value.length>64)throw Error('large compound inputs');return value.map(v=>inputs(v,edge,path,depth+1));}
  if(!value || typeof value!=='object')throw Error('invalid compound inputs');
  if(path.endsWith('.resultFrame'))return edge(value);
  const output={};
  for(const [key,v] of Object.entries(value)){
    if(v===undefined)continue;
    if(forbidden.test(key) || key==='bridgeFrame' || key==='resultRef'
      || !path && !top.has(key) || path==='source' && !source.has(key))throw Error(`unsupported compound input: ${path}.${key}`);
    if(path.endsWith('Constituent') && !['kind','stem','resultFrame'].includes(key))throw Error('invalid compound constituent');
    output[key]=inputs(v,edge,path?`${path}.${key}`:key,depth+1);
  }
  return output;
}
function nominal(r,value){return r.getClassicalNahuatlNominalCompoundReloadInputs?.(value)||null;}
export function supportsNominalCompoundResultReload(r,value,seen=new Set()){
  if(!value || seen.has(value) || seen.size>32)return false;seen.add(value);
  if(nominal(r,value))return true;
  const edge=r.getClassicalNahuatlVncContinuationReloadInputs?.(value);
  if(edge)return supportsNominalCompoundResultReload(r,edge.parent,seen);
  if(r.isClassicalNahuatlClosureFrame?.(value)===true)
    return supportsNominalCompoundResultReload(r,value.baseApplicationFrame,seen);
  return false;
}
export function exportNominalCompoundReloadNode(r,value,visit){
  const request=nominal(r,value);
  if(request)return {type:'nominal:compound',request:inputs(request,child=>({resultRef:visit(child)}))};
  if(!supportsNominalCompoundResultReload(r,value))return null;
  const edge=r.getClassicalNahuatlVncContinuationReloadInputs?.(value);
  if(edge)return {type:'nominal:vnc',source:visit(edge.parent),step:edge.step};
  const step=r.exportClassicalNahuatlVncApplicationRecipe?.(value)?.steps?.at(-1);
  if(step?.operationId==='vnc:derivational-operation')return {
    type:'nominal:late',source:visit(value.baseApplicationFrame),step:{operationId:step.operationId,request:Object.fromEntries(Object.entries(step.request).filter(([key])=>['subject','mood','tense','sentenceOptions','lateOperation','lateVariant','frequentativeRepetitions','frequentativeScope','frequentativeInitialITreatment','frequentativeTarget','compoundMatrixStem'].includes(key)))},
  };
  throw Error('unsupported nominal continuation');
}
export function replayNominalCompoundReloadNode(r,node,prior){
  if(node?.type==='nominal:compound'){
    if(!exact(node,['type','request']))return null;
    const request=inputs(node.request,ref=>{
      if(!exact(ref,['resultRef']) || !prior(ref.resultRef))throw Error('invalid nominal input edge');
      return prior(ref.resultRef);
    });
    if(!['compound-nnc','nominal-embed-vnc'].includes(request.constructionKind))return null;
    return r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[request]})?.canonicalResult || null;
  }
  if(!['nominal:vnc','nominal:late'].includes(node?.type))return undefined;
  if(!exact(node,['type','source','step']) || !prior(node.source) || !supportsNominalCompoundResultReload(r,prior(node.source)))return null;
  const parent=prior(node.source),step=node.step;
  if(!exact(step,['operationId','request']))return null;
  let request;
  if(node.type==='nominal:late'){
    if(step.operationId!=='vnc:derivational-operation')return null;
    const binding=r.issueClassicalNahuatlVncContinuationBindingFrame(step.operationId,parent,step.request);
    if(binding?.bindingStatus!=='ready' || binding.exactInputResult!==parent)return null;
    request={operationId:binding.operationId,args:binding.executionArgs};
  }else if(step.operationId==='vnc:sentence-result' && !Object.hasOwn(step,'request'))request={operationId:step.operationId,args:[parent]};
  else if(!step.operationId && step.request)request={operationId:'vnc:application',args:[step.request,parent]};
  else return null;
  const a=r.executeClassicalGrammarApplicationRequest(request); return a?.authorizationStatus==='authorized'?a.canonicalResult:null;
}
