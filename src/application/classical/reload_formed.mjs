// Narrow schemas for owner-retained place and denominal requests.
const fields=s=>s.split(' '),exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).every(k=>keys.includes(k));
const schemas={
 place:fields('affectiveMatrix analysisKind animacy canonicalNncResult canonicalNominalSourceFrame canonicalVncResult collectivityPossessiveVariant constructionKind embedStem extensionKind formation gentilicFormation gentilicStem headStem lexicalId matrixStem nounClass outputKind placeFormation placeGentilicKind placeMatrix placeStem pluralConnector possessor singularConnector source sourceStem sourceVoice state structure subject subjectMode subjectReference usage'),
 denominal:fields('canonicalNominalRankCorrectionFrame includedPossessorSourceAnalysis canonicalBoundNominalSourceFrame canonicalNncResult canonicalNncSourceFrame classChoice classChoices exclamatory includedPossessorFamily mood nounRoot nounStem numeralStem objectPeople objectPerson operationId operationPath outputScope possessor secondObjectPerson selectedOperationId semanticReading sentenceOptions sourceInitialIKind sourceInitialISelection sourceKind sourceNounClass sourceNounStem sourceState sourceStem sourceSubject sourceVerbStem subject subjectAnimacy subjectHumanness subjectNumber subjectPerson tense timeMatrix valence verbalStemPreparationFrame'),
};
const sentence=fields('sentenceType negative exclamatory punctuation punctuationMode introductoryParticle introductoryModifier prefaceParticle directionalPrefix antecessive sentenceAntecessive');
const edges=new Set(['canonicalNncResult','canonicalVncResult','canonicalNncSourceFrame']);
function transform(r,value,family,edge,replay=false){
 if(!exact(value,schemas[family]))throw Error('unknown formed input');
 const out={};
 const corrected=family==='denominal'&&value.canonicalNominalRankCorrectionFrame;
 if(corrected){
  if(replay){
   if(!exact(corrected,['enteredStem','valence']))throw Error('bad rank-corrected source');
   const frame=r.resolveClassicalNahuatlNominalRankCorrectedSourceFrame(corrected);
   const request=r.getClassicalNahuatlNominalRankCorrectedDenominalRequest(frame);
   if(!request)throw Error('rank correction rejected');Object.assign(out,request);
  }else{
   if(!r.isClassicalNahuatlNominalRankCorrectedSourceFrame(corrected))throw Error('unissued rank correction');
   out.canonicalNominalRankCorrectionFrame={enteredStem:corrected.sourceStem,valence:corrected.canonicalSourceStemRecord.defaultSourceValence};
  }
 }
 for(const [key,v]of Object.entries(value)){
  if(corrected&&['canonicalNominalRankCorrectionFrame','canonicalNncSourceFrame','verbalStemPreparationFrame'].includes(key))continue;
  if(v===undefined)continue;
  if(edges.has(key)){out[key]=edge(v);continue;}
  if(key==='classChoices'){
   const path=Array.isArray(value.operationPath)?value.operationPath:[];
   if(!exact(v,path)||Object.keys(v).length>32||!Object.values(v).every(x=>['','A','B','C','D'].includes(x)))throw Error('invalid denominal class map');
   out[key]={...v};continue;
  }
  if(key==='verbalStemPreparationFrame'){
   if(replay){if(!exact(v,['source','operationId','stemShape']))throw Error('bad preparation');out[key]=r.issueClassicalNahuatlDenominalVerbalStemPreparation(edge(v.source),{operationId:v.operationId,stemShape:v.stemShape});}
   else {if(!r.isClassicalNahuatlDenominalVerbalStemPreparation(v))throw Error('unissued preparation');out[key]={source:edge(v.canonicalNncSourceFrame),operationId:v.operationId,stemShape:v.stemShape};}continue;
  }
  if(key==='canonicalBoundNominalSourceFrame'){
   if(replay){if(!exact(v,['nounStem','sourceInitialISelection']))throw Error('bad bound source');out[key]=r.buildClassicalNahuatlBoundNominalSourceFrame(v);}
   else {if(!r.isClassicalNahuatlBoundNominalSourceFrame(v))throw Error('unissued bound source');out[key]={nounStem:v.nounStem,sourceInitialISelection:v.sourceInitialISelection};}continue;
  }
  if(key==='canonicalNominalSourceFrame'){
   if(replay){if(!exact(v,['embedStem','matrixStem']))throw Error('bad place source');out[key]=r.buildClassicalNahuatlPlaceNominalSourceFrame(v);}
   else {if(!r.isClassicalNahuatlPlaceNominalSourceFrame(v))throw Error('unissued place source');out[key]={embedStem:v.embedStem,matrixStem:v.matrixStem};}continue;
  }
  if(key==='source'||key==='sentenceOptions'||key==='includedPossessorSourceAnalysis'){
   const allowed=key==='source'?schemas.place.filter(k=>!k.startsWith('canonical')&&k!=='source'):key==='includedPossessorSourceAnalysis'?['sourceStem','meaningFamily','lexicalStatus']:sentence;
   if(!exact(v,allowed)||!Object.values(v).every(x=>['string','boolean','number'].includes(typeof x)))throw Error('invalid nested formed input');out[key]={...v};continue;
  }
  if(Array.isArray(v)){if(v.length>32||!v.every(x=>typeof x==='string'&&x.length<=4096))throw Error('invalid formed list');out[key]=[...v];continue;}
  if(v!==null&&!['string','boolean','number'].includes(typeof v)||typeof v==='string'&&v.length>4096||typeof v==='number'&&!Number.isFinite(v))throw Error('invalid formed value');out[key]=v;
 }return out;
}
export function exportFormedReloadNode(r,value,visit){
 for(const [family,getter]of [['place','getClassicalNahuatlPlaceReloadInputs'],['denominal','getClassicalNahuatlDenominalReloadInputs']]){
  const request=r[getter]?.(value);if(request)return {type:'formed:'+family,request:transform(r,request,family,p=>({resultRef:visit(p)}))};
 }return null;
}
export function replayFormedReloadNode(r,node,prior){
 const family=node?.type==='formed:place'?'place':node?.type==='formed:denominal'?'denominal':null;if(!family)return undefined;
 if(!exact(node,['type','request']))return null;
 const request=transform(r,node.request,family,ref=>{if(!exact(ref,['resultRef']))throw Error('bad edge');const p=prior(ref.resultRef);if(!p)throw Error('missing edge');return p;},true);
 return r.executeClassicalGrammarApplicationRequest({operationId:family==='place'?'nnc:place-gentilic':'vnc:denominal',args:[request]})?.canonicalResult||null;
}
