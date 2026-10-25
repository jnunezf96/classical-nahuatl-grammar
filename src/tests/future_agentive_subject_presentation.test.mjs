import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
test('future agentive presents the exact verbal source agreement, including genuine plural',async()=>{
 const {r}=await createPossessiveFixture('');
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const start=source.indexOf('    function syncClassicalFutureAgentiveSubjectControls(');
 const end=source.indexOf('    function syncClassicalDeverbalNncControls(',start);
 assert.ok(start>0&&end>start,'future source agreement projection exists');
 for(const subject of ['1sg','3sg','3pl']){
  const parent=r.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject,mood:'indicative',tense:'future',requestedVoice:'active'});
  assert.equal(parent.authorizationStatus,'authorized');
  const frame=r.evaluateClassicalNahuatlDeverbalNnc({constructionKind:'predicate-nominalization',nominalizationKind:'future-agentive',canonicalVncResult:parent,state:'absolutive',subject:'3pl',animacy:'animate'});
  assert.equal(frame.authorizationStatus,'authorized',frame.blockReason);
  const calls=[];const env={targetObject:r,getClassicalNominalConstructionControlValue:()=>subject.endsWith('pl')?'singular':'plural',applyClassicalRuleLogicSelectOptionAvailability:(...args)=>calls.push(args),frame};
  vm.runInNewContext(source.slice(start,end)+'\nsyncClassicalFutureAgentiveSubjectControls(frame);',env);
  assert.equal(calls[0][2],subject[0]);
  assert.deepEqual(Array.from(calls[1][1]),subject.endsWith('pl')?['plural']:subject==='3sg'?['singular','common']:['singular']);
  assert.equal(calls[1][2],subject.endsWith('pl')?'plural':'singular');
  assert.equal(frame.wordSurface,subject==='1sg'?'nicochizqui':subject==='3pl'?'cochizqueh':'cochizqui');
  calls.length=0;env.frame={...frame};vm.runInNewContext('syncClassicalFutureAgentiveSubjectControls(frame);',env);assert.equal(calls.length,0,'copied frame cannot supply source facts');
 }
});
