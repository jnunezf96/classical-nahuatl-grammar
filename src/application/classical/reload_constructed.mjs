// Owner-retained caller inputs only. Canonical operands become graph edges.
const families=['cardinal-numeral-nnc','calendar-date-nnc','adjectival-nnc','affective-nnc'];
const edges=new Set(['numeralResult','daySignResult','canonicalNncResult','canonicalVncResult','canonicalLexicalConjunctionResult','resultFrame','cobPreteritAgentiveResultFrame','cobConjunctionResultFrame','multiplierConjunctionResultFrame']);
const fields=text=>text.split(' ');
const common='constructionKind source subject state possessor animacy humanness';
const top={
 'calendar-date-nnc':fields(common+' calendarBoundary'),
 'adjectival-nnc':fields(common+' adjectivalOperation operationScope'),
 'cardinal-numeral-nnc':fields(common+' value classifier countKind grossPossessiveNumberVariant grossPossessorKind measureComposition modifier mood numeralOutputKind numeralVariant ordinaryNumberVariant reduplication tense voice'),
 'affective-nnc':fields(common+' affectRoute affectiveMatrix affectiveOutputKind affinityEmbedSelected defectAnalysis nonanimateReduplicationEvidence nonanimateReduplicationReading pilChildRoute pilGenderSpecification pilPossessorDistribution pluralConnector possessiveAffinityPlural reduplication semanticReading singularPossessiveConnector vocativeForm vocativeState'),
};
const sourceFields={
 'calendar-date-nnc':fields('numeralResult daySignResult'),
 'adjectival-nnc':fields('canonicalNncResult'),
 'cardinal-numeral-nnc':fields('matrixStem numeralVariant grossPossessorKind grossPossessiveNumberVariant conjunctionForm classifierSelectionExplicit matrixVerbClass matrixValence sourceObjectRequests measureStem measureClass measureMeaning measuredStem measuredClass possessorReferentPlural canonicalNncResult cobPreteritAgentiveResultFrame cobConjunctionResultFrame multiplierConjunctionResultFrame'),
 'affective-nnc':fields('embedStem embedClass embedSourceClass initialIAnalysis embedConstituent affectiveMatrix animacy affectiveLexicalAnalysis affectiveAffinityAnalysis flawedSubjectAnalysis'),
};
const nested={
 embedConstituent:fields('kind stem resultFrame'),
 affectiveLexicalAnalysis:fields('lexicalStatus embedStem matrixStem lexicalizedSpecialMeaning classException resultClass embedVariantStem variantKind irregularSilentNum1'),
 affectiveAffinityAnalysis:fields('lexicalStatus embedStem matrixStem embedAffinityRequirement embedAffinityTarget'),
 flawedSubjectAnalysis:fields('lexicalStatus sourceStem availability semanticDomain defectEntityAmbiguous neutralStemClass flawedStemClassStrategy lexicalReading usuallyRooster'),
 sourceObjectRequests:fields('objectId objectKind objectPerson governor derivationalLevel'),
};
const forbidden=/(?:surface|authorization|authority|machinery|typedSlot|preflight|bindingStatus|targetStem|__proto__|constructor|prototype)/i;
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).every(k=>keys.includes(k));
function inputs(v,edge,key='',depth=0,family=v?.constructionKind){
 if(depth>24)throw Error('deep constructed inputs');
 if(edges.has(key))return edge(v);
 if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
 if(typeof v==='string'){if(v.length>4096)throw Error('large input');return v;}
 if(Array.isArray(v)){if(v.length>64)throw Error('large array');return v.map(x=>inputs(x,edge,key,depth+1,family));}
 if(!v||typeof v!=='object'||Object.keys(v).length>128)throw Error('invalid constructed inputs');
 const allowed=key===''?top[family]:key==='source'?sourceFields[family]:nested[key];
 if(!allowed||Object.keys(v).some(k=>!allowed.includes(k)))throw Error(`unknown constructed input:${key}`);
 const out={};for(const [k,x]of Object.entries(v)){
  if(x===undefined)continue;
  if(forbidden.test(k)||['version','resultRef','bridgeFrame'].includes(k)||k==='kind'&&key!=='embedConstituent'||k.startsWith('canonical')&&!edges.has(k))throw Error(`derived input:${k}`);
  out[k]=inputs(x,edge,k,depth+1,family);
 }return out;
}
export function exportConstructedReloadNode(r,value,visit){
 if(!families.includes(value?.constructionKind))return null;
 const request=r.getClassicalNahuatlNominalConstructionReloadInputs?.(value);
 if(!request)return null;
 return {type:'nominal:constructed',request:inputs(request,parent=>({resultRef:visit(parent)}))};
}
export function replayConstructedReloadNode(r,node,prior){
 if(node?.type!=='nominal:constructed')return undefined;
 if(!exact(node,['type','request'])||!families.includes(node.request?.constructionKind))return null;
 const request=inputs(node.request,ref=>{if(!exact(ref,['resultRef']))throw Error('bad reference');const p=prior(ref.resultRef);if(!p)throw Error('missing parent');return p;});
 return r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[request]})?.canonicalResult||null;
}
