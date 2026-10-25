import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=(stem,sourceClass,humanness)=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive',humanness})]}).canonicalResult;};
test('compared-manner retains the embedding owner source requirement and accepts established general-use analyses',()=>{
 const restricted=noun('coyō','tl','nonhuman'),known=noun('cihuā','tl-1-a','human');
 const src=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
 for(const [family,shape,surface] of [['oyotl-nehnemi','short-cv','cicihuānehnemi'],['cihuatl-tlahtoa','glottalized-cv','cihcihuātlahtoa']]){
  const request=x=>({routeId:'similarity-reduplicative-prefix',slots:{source:src(x)},choices:{continuationFamily:family,reduplicationShape:shape}});
  const blocked=r.requestClassicalComparisonResult(request(restricted));
  assert.equal(blocked.authorizationStatus,'blocked');
  assert.match(blocked.blockReason,/ordinary-nnc-predicate-embed-source-use-analysis-required/);
  const good=r.requestClassicalComparisonResult(request(known));assert.equal(good.authorizationStatus,'authorized',good.blockReason);assert.equal(good.surface,surface);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(good.operationFrame.sourceSlots.source),known);
  assert.equal(r.requestClassicalComparisonResult(request({...known})).authorizationStatus,'blocked');
 }
});
