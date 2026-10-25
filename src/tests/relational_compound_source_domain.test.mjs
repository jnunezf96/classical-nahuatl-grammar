import test from 'node:test';
import assert from 'node:assert/strict';
import {createClassicalNahuatlNncClosureApi} from '../core/classical/nnc_lessons45_47_closure.mjs';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
test('compound relational Source admission cannot offer the simple possessor source rejected by its owner',async()=>{
 const {r}=await createPossessiveFixture('cal');
 const api=createClassicalNahuatlNncClosureApi(r);
 for(const formation of ['option-two','option-three']){
  const request={stemId:'tlan-bottom',sourceEmbedStem:'cal',sourceFormation:'plain-nounstem',formation};
  const choices=api.issueClassicalNahuatlRelationalSourceAdmissionFrame(request);
  assert.equal(choices.authorizationStatus,'authorized');
  assert.ok(!choices.allowedSourceKinds.includes('possessor'));
  assert.ok(choices.allowedSourceKinds.includes('nounstem'));
  const rejected=api.issueClassicalNahuatlRelationalSourceAdmissionFrame({...request,requestedSourceKind:'possessor'});
  assert.equal(rejected.authorizationStatus,'blocked');
  const admitted=api.issueClassicalNahuatlRelationalSourceAdmissionFrame({...request,requestedSourceKind:'nounstem'});
  assert.equal(admitted.authorizationStatus,'authorized');assert.equal(admitted.selectedSourceKind,'nounstem');
 }
});
