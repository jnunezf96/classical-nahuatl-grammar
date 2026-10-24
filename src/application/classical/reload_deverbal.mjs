// Persist only caller inputs and exact operand edges. Every object with
// grammatical identity is reissued by its own owner in the new runtime.
const operands = new Set(('canonicalVncResult canonicalNncResult canonicalPatientiveNncResult canonicalPatientiveNncGrammarFrame canonicalNncSourceFrame canonicalPatientiveCoreSourceFrame canonicalSupplementationResult canonicalInstrumentiveAbsolutiveVncResult canonicalInstrumentivePossessiveVncResult principalNncResult supplementNncResult').split(' '));
const realizationChoices=new Set(['finalIRealization','characteristicMatrixRealization','passiveHumanObjectRealization']);
const forbidden=/(?:surface|realization|authorization|authority|machinery|typedSlot|preflight|bindingStatus|targetStem|__proto__|constructor|prototype)/i;
const exact=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).every(key=>keys.includes(key));
function inputs(value,edge,key='',depth=0){
 if(depth>24)throw Error('deep deverbal inputs');
 if(operands.has(key)||key==='resultFrame')return edge(value);
 if(value===null||['string','boolean'].includes(typeof value)){
  if(typeof value==='string'&&value.length>4096)throw Error('large deverbal input');return value;
 }
 if(typeof value==='number'&&Number.isFinite(value))return value;
 if(Array.isArray(value)){if(value.length>64)throw Error('large deverbal inputs');return value.map(item=>inputs(item,edge,key,depth+1));}
 if(!value||typeof value!=='object'||Object.keys(value).length>128)throw Error('invalid deverbal input');
 const result={};
 for(const [name,item]of Object.entries(value)){
  if(item===undefined)continue;
  if(forbidden.test(name)&&!realizationChoices.has(name)||['kind','version','resultRef','bridgeFrame'].includes(name)||name.startsWith('canonical')&&!operands.has(name))throw Error(`derived deverbal input: ${key}.${name}`);
  result[name]=inputs(item,edge,name,depth+1);
 }
 return result;
}
const ownerInputs=(r,value)=>r.getClassicalNahuatlDeverbalNncReloadInputs?.(value)||null;
export const exportDeverbalRequestInputs=(request,visit)=>inputs(request,visit);
const nounChoices=('state subject metaphoricalUse possessor includedPossessor stemFormation predicateFormation animacy humanness singularConnector nonspecificHumanForm pluralConnector possessorReduplication sentenceType polarity').split(' ');
const bareNoun=(r,value)=>{
 if(r.isClassicalNahuatlOrdinaryNncResult?.(value)!==true)return false;
 const capture=r.captureClassicalGrammarApplicationResult?.(value,'reload-inputs');
 return r.isClassicalGrammarApplicationResultCapture?.(capture,'reload-inputs')!==true
  ||capture.applicationResult?.operationId!=='nnc:ordinary'||capture.applicationResult?.canonicalResult!==value;
};
export function isDeverbalReloadEvidence(r,value){
 return Boolean(r.getClassicalNahuatlPatientiveCoreSourceReloadInputs?.(value)||ownerInputs(r,value)||r.isClassicalNahuatlVncApplicationFrame?.(value)===true&&r.exportClassicalNahuatlVncApplicationRecipe?.(value)||r.getClassicalNahuatlDeverbalNncReloadParent?.(value)
  ||r.getClassicalNahuatlVncApplicationReloadParent?.(value)
  ||bareNoun(r,value));
}
export function exportDeverbalReloadNode(r,value,visit){
 const core=r.getClassicalNahuatlPatientiveCoreSourceReloadInputs?.(value);
 if(core)return{type:'deverbal:patientive-core-source',inputs:inputs(core,()=>{throw Error('unexpected Core operand');})};
 const request=ownerInputs(r,value);
 if(request)return{type:'deverbal:nnc',request:inputs(request,operand=>({resultRef:visit(operand)}))};
 const parent=r.getClassicalNahuatlDeverbalNncReloadParent?.(value);
 if(parent&&parent!==value){
  const projection=parent.canonicalResult===value?'canonical':parent.canonicalResult?.nncSlotFrame===value?'slots':'';
  if(projection)return{type:'deverbal:child',source:visit(parent),projection};
 }
 const application=r.getClassicalNahuatlVncApplicationReloadParent?.(value);
 if(application)return{type:'deverbal:vnc-nucleus',source:visit(application)};
 if(bareNoun(r,value)){
  const choices={...value.operationFrame,animacy:value.operationFrame.referentialAnimacy,humanness:value.operationFrame.referentialHumanness};
  return{type:'deverbal:ordinary-nnc',source:visit(value.sourceFrame),choices:Object.fromEntries(nounChoices.filter(key=>['string','boolean'].includes(typeof choices[key])).map(key=>[key,choices[key]]))};
 }
 return null;
}
export function replayDeverbalReloadNode(r,node,prior){
 if(node?.type==='deverbal:patientive-core-source'){
  if(!exact(node,['type','inputs'])||!exact(node.inputs,['sourceStem','verbClass','sourceStage','sourceValence','sourceObjectPattern','sourceVoice','nonactiveOptionId','impersonalDerivationPath'])||!Object.values(node.inputs).every(value=>typeof value==='string'))return null;
  const source=r.buildClassicalNahuatlPatientiveCoreSourceFrame(node.inputs);
  return r.isClassicalNahuatlPatientiveCoreSourceFrame(source)===true?source:null;
 }
 if(node?.type==='deverbal:nnc'){
  if(!exact(node,['type','request']))return null;
  const request=inputs(node.request,ref=>{
   if(!exact(ref,['resultRef'])||!prior(ref.resultRef))throw Error('invalid deverbal operand');return prior(ref.resultRef);
  });
  const result=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[request]});
  return result?.authorizationStatus==='authorized'?result.canonicalResult:null;
 }
 if(node?.type==='deverbal:child'){
  if(!exact(node,['type','source','projection'])||!ownerInputs(r,prior(node.source)))return null;
  return node.projection==='canonical'?prior(node.source).canonicalResult:node.projection==='slots'?prior(node.source).canonicalResult?.nncSlotFrame||null:null;
 }
 if(node?.type==='deverbal:vnc-nucleus'){
  const parent=prior(node.source);
  return exact(node,['type','source'])&&r.isClassicalNahuatlVncApplicationFrame?.(parent)===true&&r.getClassicalNahuatlVncApplicationReloadParent?.(parent.resultFrame)===parent?parent.resultFrame:null;
 }
 if(node?.type==='deverbal:ordinary-nnc'){
  const source=prior(node.source);
  if(!exact(node,['type','source','choices'])||!exact(node.choices,nounChoices)||!Object.values(node.choices).every(value=>['string','boolean'].includes(typeof value))
   ||r.isClassicalNahuatlOrdinaryNncSourceFrame?.(source)!==true)return null;
  const navigator=r.getClassicalGrammarApplicationCapabilityNavigator(source);
  const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',node.choices);
  return r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.canonicalResult||null;
 }
 return undefined;
}
