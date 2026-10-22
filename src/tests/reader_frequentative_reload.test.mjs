import assert from 'node:assert/strict';
import test from 'node:test';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {exportClassicalResultReloadRecipe,replayClassicalResultReloadRecipe} from '../application/classical/result_reload.mjs';

test('reload reissues an ordinary frequentative from its underlying Source and voice',async()=>{
  const makeRuntime = async () => (await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
  const r=await makeRuntime();
  const result=r.requestClassicalLateVncOperation({sourceStem:'ca-h',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'future',requestedVoice:'impersonal',nonactiveOptionId:'tla-impersonal',lateOperation:'frequentative',lateVariant:'ordinary-short-glottal'});
  const sentence=r.requestClassicalVncSentenceResultFrame(result);
  const recipe=r.exportClassicalNahuatlVncApplicationRecipe(sentence);
  assert.ok(recipe,'the accepted frequentative sentence must have an input recipe');
  assert.deepEqual(recipe.steps.map(s=>s.operationId||'vnc:application'),['vnc:application','vnc:derivational-operation','vnc:sentence-result']);
  assert.equal(recipe.steps[0].request.sourceStem,'ca-h');
  assert.equal(recipe.steps[1].request.lateVariant,'ordinary-short-glottal');
  assert.equal(JSON.stringify(recipe).includes('tla-yeh-ye'),false,'written target is never replay authority');
  assert.equal(r.exportClassicalNahuatlVncApplicationRecipe({...result}),null);
  const mixed=exportClassicalResultReloadRecipe(r,{result:sentence});
  const fresh=await makeRuntime();
  const replayed=replayClassicalResultReloadRecipe(fresh,JSON.parse(JSON.stringify(mixed)));
  assert.ok(replayed);
  assert.equal(replayed.result.sentenceSurfaceDisplay,sentence.sentenceSurfaceDisplay);
  assert.equal(replayed.result.consumedNuclearSurface,'tlayehyez');
  assert.notEqual(replayed.result,sentence);
  assert.equal(fresh.isClassicalNahuatlClosureFrame(replayed.result.lateOperationClosureFrame),true);
  const forged=JSON.parse(JSON.stringify(mixed));
  forged.nodes[0].recipe.steps[1].request.targetStem='stored-answer';
  assert.equal(replayClassicalResultReloadRecipe(fresh,forged),null);
});
