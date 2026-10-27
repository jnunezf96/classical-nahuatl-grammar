// Only owner-inapplicable legacy source coordinates may be ignored at reload.
export function inactiveAffectiveReloadControl(runtime, result, saved) {
 let request=runtime.getClassicalNahuatlNominalConstructionReloadInputs?.(result);
 if(request?.constructionKind!=='affective-nnc'){
  const denominal=runtime.getClassicalNahuatlDenominalReloadInputs?.(result),source=denominal?.canonicalNncSourceFrame;
  if(runtime.isClassicalNahuatlOrdinaryNncSourceFrame?.(source)!==true)return null;
  request={constructionKind:'affective-nnc',affectiveMatrix:'tzin',source:{embedStem:source.stem,embedClass:source.nounClass}};
 }
 const facts=runtime.getClassicalNahuatlFlawedSubjectSourceFacts?.(request);
 if(facts?.authorizationStatus!=='authorized'||facts.availableLexicalReadings?.length!==0)return null;
 try {
  for(const signature of [saved?.committedSignature,saved?.draftSignature]) {
   const fields=JSON.parse(signature);
   if(fields.mode!=='whole-stem'||fields.sourceWholeStem!==request.source?.embedStem
     ||fields.sourceNncClass!==request.source?.embedClass)return null;
  }
 }catch{return null;}
 return {id:'classical-affective-flawed-lexical-reading',field:'affectiveFlawedLexicalReading'};
}
export function prepareNativeReloadSourceContext(document, construction, choices) {
 const operation=document.getElementById('classical-construction-operation');
 if(!operation||![...operation.options].some(o=>o.value===construction&&!o.disabled))return false;
 const family=document.getElementById('classical-personal-name-source-family');
 const value=choices?.find(c=>c.id===family?.id)?.value;
 if(construction==='personal-name-nnc'&&(!family||typeof value!=='string'
   ||![...family.options].some(o=>o.value===value&&!o.disabled)))return false;
 operation.value=construction;
 if(construction==='personal-name-nnc')family.value=value;
 return true;
}
export function reconcileAcceptedQuotedSourceBaseline(runtime,result,saved) {
 if(runtime.isPersonalNameNncResult?.(result)!==true)return saved;
 const source=result.canonicalSourceResult;
 if(source?.sourceFamily!=='opaque-quoted-inner'||typeof source.quotedCitation!=='string')return saved;
 try {
  const committed=JSON.parse(saved.committedSignature),draft=JSON.parse(saved.draftSignature);
  if(Object.hasOwn(committed,'sourcePersonalNameFamily')||draft.sourcePersonalNameFamily!==source.sourceFamily
    ||draft.mode!=='whole-stem'||typeof draft.sourceWholeStem!=='string'
    ||draft.sourceWholeStem.normalize('NFC').toLowerCase()!==source.quotedCitation.normalize('NFC').toLowerCase())return saved;
  const withoutFamily={...draft};delete withoutFamily.sourcePersonalNameFamily;
  if(JSON.stringify(withoutFamily)!==JSON.stringify(committed))return saved;
  return {...saved,committedSignature:saved.draftSignature};
 }catch{return saved;}
}
