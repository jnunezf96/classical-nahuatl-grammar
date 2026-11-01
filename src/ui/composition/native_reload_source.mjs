// Restore presentation coordinates only from the accepted owner's Source facts.
function affectiveReloadSource(runtime, result) {
 let request=runtime.getClassicalNahuatlNominalConstructionReloadInputs?.(result);
 let sourceClass=result?.sourceAuthorizationFrame?.lexicalFacts?.embedSourceClassFrame;
 if(request?.constructionKind!=='affective-nnc'){
  const denominal=runtime.getClassicalNahuatlDenominalReloadInputs?.(result),source=denominal?.canonicalNncSourceFrame;
  if(runtime.isClassicalNahuatlOrdinaryNncSourceFrame?.(source)!==true)return null;
  request={constructionKind:'affective-nnc',affectiveMatrix:'tzin',source:{embedStem:source.stem,embedClass:source.nounClass}};
  sourceClass=source;
 }
 const facts=runtime.getClassicalNahuatlFlawedSubjectSourceFacts?.(request);
 if(facts?.authorizationStatus!=='authorized'||facts.availableLexicalReadings?.length!==0)return null;
 return {request,sourceClass};
}
// A blank historical class may become the deterministic lexical owner's class;
// an authored class, an open stem, or another changed Source field stays pending.
export function reconcileAcceptedAffectiveSourceBaseline(runtime,result,saved) {
 const context=affectiveReloadSource(runtime,result);if(!context)return saved;
 const {request,sourceClass}=context;
 const inferred=runtime.buildClassicalNahuatlOrdinaryNncSourceFrame?.({stem:request.source.embedStem});
 if(runtime.isClassicalNahuatlOrdinaryNncSourceFrame?.(inferred)!==true
   ||inferred.openStemSource!==false||!inferred.sourceClass
   ||sourceClass?.authorizationStatus!=='authorized'
   ||inferred.sourceClass!==sourceClass.sourceClass||inferred.nounClass!==sourceClass.nounClass)return saved;
 try {
  const committed=JSON.parse(saved.committedSignature),draft=JSON.parse(saved.draftSignature);
  if(committed.mode!=='whole-stem'||draft.mode!=='whole-stem'
    ||committed.sourceWholeStem!==inferred.stem||draft.sourceWholeStem!==inferred.stem
    ||committed.sourceNncClass!==''||draft.sourceNncClass!==inferred.sourceClass)return saved;
  const normalized={...committed,sourceNncClass:inferred.sourceClass,
    affectiveFlawedLexicalReading:draft.affectiveFlawedLexicalReading};
  if(JSON.stringify(normalized)!==JSON.stringify(draft))return saved;
  return {...saved,committedSignature:JSON.stringify({...committed,sourceNncClass:inferred.sourceClass})};
 }catch{return saved;}
}
// Only owner-inapplicable legacy source coordinates may be ignored at reload.
export function inactiveAffectiveReloadControl(runtime, result, saved) {
 const context=affectiveReloadSource(runtime,result);if(!context)return null;
 const {request,sourceClass}=context;
 const admittedClasses=new Set([request.source?.embedClass]);
 if(sourceClass?.authorizationStatus==='authorized'&&sourceClass.nounClass===request.source?.embedClass)
  admittedClasses.add(sourceClass.sourceClass);
 try {
  for(const signature of [saved?.committedSignature,saved?.draftSignature]) {
   const fields=JSON.parse(signature);
   if(fields.mode!=='whole-stem'||fields.sourceWholeStem!==request.source?.embedStem
     ||!admittedClasses.has(fields.sourceNncClass))return null;
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
