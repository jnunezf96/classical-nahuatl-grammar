const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).every(k=>keys.includes(k));
const scalar=(v,keys)=>exact(v,keys)&&Object.values(v).every(x=>typeof x==='string'&&x.length<=4096);
const sourceKeys=['sourceFamily','modificationAmbiguity','referentKind'];
const choices=['outerSubject','affectiveScope','affectiveMatrix'];
const pick=(v,keys)=>Object.fromEntries(keys.filter(k=>typeof v?.[k]==='string').map(k=>[k,v[k]]));
export function exportNameReloadNode(r,value,visit){
 if(r.isPersonalNameNncResult?.(value)!==true||value.authorizationStatus!=='authorized')return null;
 const source=value.typedSlotFrame?.downgradedSource;if(!source)return null;
 const node={type:'nnc:personal-name',choices:pick(value,choices),sourceOptions:pick(source,sourceKeys)};
 if(value.canonicalSourceResult&&r.isPersonalNameOpaqueQuotedInnerSourceFrame?.(value.canonicalSourceResult)!==true)node.parent=visit(value.canonicalSourceResult);
 else if(r.isPersonalNameOpaqueQuotedInnerSourceFrame?.(source))node.quoted=pick(source,['sourceFamily','quotedCitation','referenceKind','citationOuterSubject']);
 else {
  if(!r.isPersonalNameNncSourceFrame?.(source))throw Error('invalid name source');
  node.clauses=source.clauses.map(c=>{
   if(!r.isPersonalNameInnerClauseFrame(c))throw Error('invalid name clause');
   return {sourceFamily:c.sourceFamily,subjectPrefix:c.slots.innerSubject.prefix,subjectConnector:c.slots.innerSubject.connector,
    predicateMorphs:[...c.slots.predicate.morphs],numberPrefix:c.slots.innerNumber.prefix,numberSuffix:c.slots.innerNumber.suffix,
    subjectReference:c.slots.innerSubject.reference,semanticRoles:[...c.semanticRoles]};
  });
 }
 return node;
}
export function replayNameReloadNode(r,node,prior){
 if(node?.type!=='nnc:personal-name')return undefined;
 if(!exact(node,['type','choices','sourceOptions','parent','quoted','clauses'])||!scalar(node.choices,choices)||!scalar(node.sourceOptions,sourceKeys))return null;
 if(['parent','quoted','clauses'].filter(k=>Object.hasOwn(node,k)).length!==1)return null;
 let request={...node.choices};
 if(Object.hasOwn(node,'parent')){const p=prior(node.parent);if(!p)return null;request={...request,...node.sourceOptions,canonicalSourceResult:p};}
 else if(node.quoted){if(!scalar(node.quoted,['sourceFamily','quotedCitation','referenceKind','citationOuterSubject']))return null;const p=r.buildPersonalNameOpaqueQuotedInnerSourceFrame(node.quoted);if(!p)return null;request={...request,canonicalSourceResult:p};}
 else {
  if(!Array.isArray(node.clauses)||node.clauses.length>16)return null;
  const clauses=node.clauses.map(c=>{
   if(!exact(c,['sourceFamily','subjectPrefix','subjectConnector','predicateMorphs','numberPrefix','numberSuffix','subjectReference','semanticRoles']))return null;
   for(const [k,v]of Object.entries(c))if(['predicateMorphs','semanticRoles'].includes(k)?!Array.isArray(v)||v.length>64||!v.every(x=>typeof x==='string'&&x.length<=4096):typeof v!=='string'||v.length>4096)return null;
   return r.buildPersonalNameInnerClauseFrame(c);
  });if(clauses.some(c=>!c))return null;
  request.sourceFrame=r.buildPersonalNameNncSourceFrame({...node.sourceOptions,clauses});if(!request.sourceFrame)return null;
 }
 return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:personal-name',args:[request]})?.canonicalResult||null;
}
