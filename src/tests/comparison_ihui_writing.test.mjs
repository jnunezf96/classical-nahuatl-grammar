import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('topicless ihui comparison writes the exact issued VNC instead of symbolic formula slot names',()=>{
 const parent=r.requestClassicalVncApplicationResult({sourceStem:'ihui',sourceInitialISelection:'real',verbClass:'B',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(parent.authorizationStatus,'authorized');
 const principal=r.buildClassicalComparisonSourceUnit({sourceResult:parent});
 for(const sentenceType of ['none','declarative']){
  const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:'similarity-ihui-vnc',slots:{principal},choices:{sentenceType}}]});
  assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
  assert.equal(receipt.lesson2WritingPass.entered,true);
  assert.equal(receipt.canonicalResult.surface,sentenceType==='none'?'nihui':'Nihui.');
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(receipt.canonicalResult.operationFrame.sourceSlots.principal),parent);
 }
 assert.equal(r.buildClassicalComparisonSourceUnit({sourceResult:{...parent}}).authorizationStatus,'blocked');
 assert.throws(()=>r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:'similarity-ihui-vnc',slots:{principal:{...principal}},choices:{}}]}),/forbidden-authority/);
});
