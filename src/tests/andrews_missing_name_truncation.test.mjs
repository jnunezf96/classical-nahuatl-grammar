import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const {runtimeObject:r}=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
function noun(selections={}){
  const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cipac',sourceClass:'tli'});
  return r.requestClassicalOrdinaryNncResult(source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive',humanness:'nonhuman',...selections}));
}
const parent=noun();
const make=(source,sourceFamily)=>r.executeClassicalGrammarApplicationRequest({operationId:'nnc:personal-name',args:[{canonicalSourceResult:source,sourceFamily,outerSubject:'2sg'}]});
test('exact nominal name keeps its inner first person distinct from outer second person',()=>{
 const innerFirst=noun({subject:'1sg'});
 for(const family of ['absolutive-state-nnc','absolutive-state-truncated-inner-number']){
  const made=make(innerFirst,family);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
  assert.equal(made.canonicalResult.typedSlotFrame.downgradedSource.clauses[0].slots.innerSubject.prefix,'ni');
  assert.equal(made.canonicalResult.outerSubject,'2sg');
 }
});
test('56.2 and 56.3.5 retain or truncate the same Cipactli inner number dyad without editing its predicate',()=>{
  const full=make(parent,'absolutive-state-nnc');const short=make(parent,'absolutive-state-truncated-inner-number');
  assert.equal(full.authorizationStatus,'authorized',full.blockReason);assert.equal(short.authorizationStatus,'authorized',short.blockReason);
  assert.equal(full.canonicalResult.surfaceRealization,'tiCipactli');assert.equal(short.canonicalResult.surfaceRealization,'tiCipac');
  const inner=x=>x.canonicalResult.typedSlotFrame.downgradedSource.clauses[0].slots;
  assert.deepEqual(inner(full).predicate,inner(short).predicate);
  assert.deepEqual(inner(full).innerSubject,inner(short).innerSubject);
  assert.equal(inner(full).innerNumber.prefix,'tli');assert.equal(inner(short).innerNumber.prefix,'Ø');
  for(const made of [full,short])assert.equal(made.canonicalResult.exactSourceResolution.canonicalSourceResult,parent);
  assert.equal(parent.wordSurface,'cipactli');
});
test('short name choice does not truncate possessive or plural inner numbers or authenticate copied parents',()=>{
  for(const invalid of [noun({state:'possessive',possessor:'1sg'}),noun({subject:'3pl'})]){
    assert.equal(make(invalid,'absolutive-state-truncated-inner-number').authorizationStatus,'blocked');
  }
  assert.throws(()=>make({...parent},'absolutive-state-truncated-inner-number'),/forbidden-authority/u);
});
