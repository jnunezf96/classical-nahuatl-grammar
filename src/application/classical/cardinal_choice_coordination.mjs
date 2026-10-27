// Ephemeral explicit intent travels only between authentic bindings of the same
// issued numeric Source. Current owner offers and a fresh issue authorize reuse.
export function createCardinalChoiceCoordinator(owner) {
 const memories=new WeakMap();
 const fields=['numeralVariant','ordinaryNumberVariant','grossPossessorKind','grossPossessiveNumberVariant','conjunctionForm'];
 const valid=b=>owner.isClassicalGrammarTypedSourceOperationBindingFrame?.(b)===true
   &&b.operationId==='grammar:nominal-construction'
   &&b.exactSource?.kind==='classical-nahuatl-cardinal-numeric-source-frame'
   &&b.navigator?.exactSource===b.exactSource;
 const offered=(b,key,value)=>b.choiceOptionProjection?.[key]?.some(o=>o.optionId===value&&o.availabilityStatus==='available');
 function handoff(previous,next,{choiceId='',explicitValidated=false,issue}={}) {
  if(!valid(previous)||!valid(next)||previous.exactSource!==next.exactSource)return next;
  const saved=new Map(memories.get(previous)||[]);
  if(fields.includes(choiceId)&&explicitValidated){
   const value=next.callerSelections?.[choiceId];
   if(value&&offered(previous,choiceId,value)&&offered(next,choiceId,value))saved.set(choiceId,value);
   else saved.delete(choiceId);
  }
  let result=next;
  for(const key of fields){
   const value=saved.get(key);
   if(key===choiceId||!value||result.callerSelections?.[key]===value||!offered(result,key,value)||typeof issue!=='function')continue;
   const candidate=issue({...result.callerSelections,[key]:value});
   if(valid(candidate)&&candidate.exactSource===next.exactSource
      &&['ready','choices-required'].includes(candidate.bindingStatus)
      &&candidate.callerSelections?.[key]===value&&offered(candidate,key,value))result=candidate;
  }
  memories.set(result,saved);return result;
 }
 return Object.freeze({handoff});
}
