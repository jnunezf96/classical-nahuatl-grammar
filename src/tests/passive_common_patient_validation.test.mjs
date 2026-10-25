import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
for(const [tense,surface] of [['distant-past','pōhuīhuaca'],['customary-present','pōhuīhuani']])test(`passive ${tense} retains the nonanimate patient's common number through validation`,()=>{
 const request={sourceStem:'pōhua',verbClass:'B',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3common',subject:'3sg',mood:'indicative',tense,requestedVoice:'passive',nonactiveOptionId:'hua:pōhuī-hua'};
 const application=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[request]});
 assert.equal(application.authorizationStatus,'authorized',application.blockReason);
 const result=application.canonicalResult;
 assert.equal(result.resultFrame.surfaceRealization,surface);
 assert.equal(result.resultFrame.participantProjection.targetSubject.category,'3common');
 assert.equal(result.resultFrame.participantProjection.targetSubject.morphologicalAgreement,'3sg');
 assert.equal(r.isClassicalNahuatlVncApplicationFrame(result),true);
 assert.equal(r.isClassicalNahuatlVncApplicationFrame({...result}),false);
});
