// Persist choices and exact parent edges, never comparison wrappers or written output.
const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).every(k=>keys.includes(k));
const slots=['source','principal','comparand','standard','dimension','topic','adjoined','similarityClause','headClause','leftClause','rightClause','baseClause','superiorClause','point','degreeClause','predicate'];
function spec(r,id){return r.getClassicalComparisonRouteInventory?.().find(row=>row.id===id||row.routeId===id);}
function choices(r,id,input){
 const route=spec(r,id);if(!route||!exact(input,[...route.choiceFields,'sentenceType','negativeStandardIn']))throw Error('invalid comparison choices');
 if(!Object.values(input).every(v=>typeof v==='boolean'||typeof v==='string'&&v.length<=200))throw Error('invalid comparison choice value');
 return {...input};
}
export function exportComparisonReloadNode(r,value,visit){
 if(!r.isClassicalComparisonResultFrame?.(value))return null;
 if(value.authorizationStatus!=='authorized')throw Error('unauthorized comparison');
 const op=value.operationFrame;
 const inputs=Object.fromEntries(Object.entries(op.choices).map(([k,v])=>[k,v&&typeof v==='object'?v.id:v]));
 return {type:'clause:comparison',routeId:op.routeId,choices:choices(r,op.routeId,inputs),
  slots:Object.fromEntries(Object.entries(op.sourceSlots).map(([role,frame])=>{
   if(!slots.includes(role))throw Error('invalid comparison slot');
   const parent=r.getClassicalComparisonCanonicalSourceResult(frame);if(!parent)throw Error('missing comparison parent');return [role,visit(parent)];
  }))};
}
export function replayComparisonReloadNode(r,node,prior){
 if(node?.type!=='clause:comparison')return undefined;
 if(!exact(node,['type','routeId','choices','slots'])||!exact(node.slots,slots))return null;
 const input={routeId:node.routeId,choices:choices(r,node.routeId,node.choices),slots:{}};
 for(const [role,id] of Object.entries(node.slots)){
  const parent=prior(id);if(!parent)return null;
  const source=r.buildClassicalComparisonSourceUnit({sourceResult:parent});
  if(!r.isClassicalComparisonSourceUnit(source)||source.authorizationStatus!=='authorized')return null;
  input.slots[role]=source;
 }
 return r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[input]})?.canonicalResult||null;
}
