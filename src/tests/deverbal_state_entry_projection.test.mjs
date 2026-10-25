import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('pōhua');
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const start=code.indexOf('    function syncClassicalDeverbalNncStateOptions(');
const end=code.indexOf('\n    function ',start+1);
const parent=r.requestClassicalVncApplicationResult({sourceStem:'pōhua',verbClass:'A',sourceValence:'specific-projective',objectPerson:'3sg',subject:'3sg',mood:'indicative',tense:'customary-present',requestedVoice:'passive',nonactiveOptionId:'hua:pōhuī-hua'});
const request={constructionKind:'predicate-nominalization',nominalizationKind:'customary-patientive',canonicalVncResult:parent,state:'possessive',subject:'3sg',animacy:'animate',humanness:'human'};
function setup(req=request){
 const writes=[],calls=[];
 const ctx=vm.createContext({targetObject:{...r,evaluateClassicalNahuatlDeverbalNnc(q){calls.push(q);return r.evaluateClassicalNahuatlDeverbalNnc(q)}},getActiveClassicalGrammarResultBinding:()=>({exactResult:parent}),getClassicalNominalConstructionControlValue:()=>'',buildClassicalNominalConstructionUiRequest:()=>req,getClassicalDeverbalEditablePossessorValues:()=>[],applyClassicalRuleLogicSelectOptionAvailability:(...args)=>writes.push(args)});
 vm.runInContext(code.slice(start,end),ctx);return {ctx,writes,calls};
}
test('invalid inherited state is projected through the same exact source owner before Make',()=>{
 const blocked=r.evaluateClassicalNahuatlDeverbalNnc(request);assert.match(blocked.blockReason,/possessive-state-not-licensed$/);
 const {ctx,writes,calls}=setup();const projected=ctx.syncClassicalDeverbalNncStateOptions(blocked);
 assert.equal(projected?.authorizationStatus,'authorized');assert.equal(projected.canonicalResult.state,'absolutive');
 assert.equal(calls.length,1);assert.equal(calls[0].canonicalVncResult,parent);assert.equal(calls[0].state,'absolutive');assert.equal(request.state,'possessive');
 assert.deepEqual(Array.from(writes[0][1]),['absolutive']);assert.equal(writes[0][2],'absolutive');
 assert.equal(parent.normalizedRequest.requestedVoice,'passive');assert.equal(parent.normalizedRequest.tense,'customary-present');
 const made=r.evaluateClassicalNahuatlDeverbalNnc({...request,state:'absolutive',subject:'3pl'});assert.equal(made.authorizationStatus,'authorized');assert.equal(made.wordSurface,'pōhuīhuanimeh');
});
test('unrelated source failures and copied parents never acquire a domain by state rescue',()=>{
 const bad={...request,canonicalVncResult:{...parent}};const blocked=r.evaluateClassicalNahuatlDeverbalNnc(bad);assert.equal(blocked.authorizationStatus,'blocked');assert.doesNotMatch(blocked.blockReason,/state-not-licensed$/);
 const {ctx,calls,writes}=setup(bad);ctx.syncClassicalDeverbalNncStateOptions(blocked);assert.equal(calls.length,0);assert.equal(writes.length,0);
});
test('a possessive-only owner variant withdraws inherited absolutive without changing its exact parent',()=>{
 const yah=r.requestClassicalVncApplicationResult({sourceStem:'yauh',verbClass:'D',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'preterit',requestedVoice:'active'});
 assert.equal(yah.authorizationStatus,'authorized');
 const req={constructionKind:'predicate-nominalization',nominalizationKind:'preterit-agentive',preteritAgentiveVariant:'yauh-ti-owner',canonicalVncResult:yah,state:'absolutive',subject:'3sg',possessor:'3sg',animacy:'animate',humanness:'human'};
 const blocked=r.evaluateClassicalNahuatlDeverbalNnc(req);assert.match(blocked.blockReason,/absolutive-state-not-licensed$/);
 const {ctx,writes,calls}=setup(req);const projected=ctx.syncClassicalDeverbalNncStateOptions(blocked);
 assert.equal(projected?.authorizationStatus,'authorized');assert.equal(projected.canonicalResult.state,'possessive');
 assert.equal(calls.length,1);assert.equal(calls[0].canonicalVncResult,yah);assert.equal(calls[0].state,'possessive');assert.equal(req.state,'absolutive');
 assert.deepEqual(Array.from(writes[0][1]),['possessive']);assert.equal(writes[0][2],'possessive');
 assert.equal(projected.operationFrame.secondaryPossessiveStemFrame.innerPossessor.realizedPrefix,'ti');
});
