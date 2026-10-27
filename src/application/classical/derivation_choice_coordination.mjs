// A draft formation is scoped to its issued Source and operation/voice. The
// canonical owner alone decides whether it is still offered and executable.
export function createDerivationChoiceCoordinator(owner) {
 const memories=new WeakMap();
 const describe=b=>owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(b)===true
   && b.operationId==='vnc:application' && b.navigator?.exactSource===b.exactSource
   ? {source:b.exactSource,kind:'typed'}
   : owner.isClassicalNahuatlVncContinuationBindingFrame?.(b)===true
     && b.operationId==='vnc:application' && b.ownerInputAcceptanceProven===true
     ? {source:b.exactInputResult,kind:'exact'}:null;
 const selections=b=>b.effectiveSelections||b.callerSelections||{};
 const coordinate=(b,key)=>JSON.stringify([key,selections(b).requestedDerivation||'direct',
   key==='nonactiveOptionId'?selections(b).requestedVoice||'active':'']);
 const offered=(b,key,value)=> {
  const projected=(b.choiceOptionProjection||b.ownerChoiceOptionProjection)?.[key];
  if(projected)return projected.some(o=>o.optionId===value&&o.availabilityStatus==='available');
  if(key==='nonactiveOptionId') {
   const inventory=b.ownerPreflightResult?.controlFrame?.nonactiveOptionInventory;
   return inventory?.authorizationStatus==='authorized'&&inventory.options.some(o=>o.optionId===value&&o.authorityStatus!=='blocked');
  }
  const inventory=b.ownerPreflightResult?.controlFrame?.derivationOptionInventory;
  return key==='derivationOptionId'&&owner.isClassicalNahuatlVncDerivationOptionInventory?.(inventory)===true
    &&inventory.options.some(o=>o.optionId===value&&o.authorityStatus!=='blocked');
 };
 function handoff(previous,next,{choiceId='',explicitValidated=false,issue}={}) {
  const before=describe(previous),after=describe(next);
  if(!before||!after||before.source!==after.source||before.kind!==after.kind)return next;
  const saved=new Map(memories.get(previous)||[]),fields=['derivationOptionId','nonactiveOptionId'];
  if(fields.includes(choiceId)&&explicitValidated) {
   const value=next.callerSelections?.[choiceId];
   if(value&&offered(previous,choiceId,value)&&offered(next,choiceId,value))saved.set(coordinate(next,choiceId),value);
   else if(!value)saved.delete(coordinate(next,choiceId));
  }
  let result=next;
  for(const key of fields) {
   const value=saved.get(coordinate(result,key));
   if(key===choiceId||!value||result.callerSelections?.[key]===value||!offered(result,key,value)||typeof issue!=='function')continue;
   const candidate=issue({...result.callerSelections,[key]:value}),info=describe(candidate);
   if(info?.source===after.source&&info.kind===after.kind&&['ready','choices-required'].includes(candidate.bindingStatus)
      &&coordinate(candidate,key)===coordinate(result,key)&&candidate.callerSelections?.[key]===value&&offered(candidate,key,value))result=candidate;
  }
  memories.set(result,saved);return result;
 }
 function carry(previous,next) {
  const a=describe(previous),b=describe(next);
  if(a&&b&&a.source===b.source&&a.kind===b.kind&&memories.has(previous))memories.set(next,memories.get(previous));
 }
 return Object.freeze({handoff,carry});
}
