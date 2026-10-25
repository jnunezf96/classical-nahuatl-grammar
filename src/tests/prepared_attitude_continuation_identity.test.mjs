import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('chōca');
const request={operationId:'vnc:derivational-operation',args:[{sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',sourceSubject:'3sg',sourceSubjectHumanness:'human',sourceSubjectAnimacy:'animate',mood:'indicative',tense:'present',voice:'active',lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'subject',honorificFormationAnalysis:'causative-only',honorificStemAlternative:'type-two-long'}]};
test('one prepared honorific publication retains its receipt and reverential continuation identity',()=>{
 const prepared=r.prepareClassicalGrammarApplicationRequest(request);
 assert.equal(prepared.authorizationStatus,'authorized');
 const first=r.executeClassicalGrammarApplicationRequest(prepared.request,prepared);
 const parent=first.canonicalResult;
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(parent);
 assert.equal(r.isClassicalGrammarApplicationCapabilityNavigator(nav),true);
 const again=r.executeClassicalGrammarApplicationRequest(prepared.request,prepared);
 assert.equal(again===first,true,'publishing the same prepared Result must not replace its producer');
 assert.equal(r.isClassicalGrammarApplicationCapabilityNavigator(nav),true);
 assert.equal(r.getClassicalGrammarApplicationCapabilityNavigator(parent),nav);
 const sourceProjection=nav.operations.find(o=>o.operationId==='vnc:derivational-operation').ownerBindingFrame.continuationSourceProjection;
 const parentOperation=parent.operationFrame;
 const binding=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent,{lateOperation:'reverential',lateVariant:''});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 assert.equal(binding.exactInputResult,parent);
 assert.equal(parent.operationFrame,parentOperation);
 const recaptured=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent,{});
 assert.deepEqual(recaptured.continuationSourceProjection.sourceObjectRequests,sourceProjection.sourceObjectRequests);
 assert.equal(recaptured.continuationSourceProjection.sourceSubject,sourceProjection.sourceSubject);
 assert.equal(r.isClassicalGrammarApplicationCapabilityNavigator(nav),true);
 assert.equal(r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:binding.executionArgs}).authorizationStatus,'authorized');
 for(const [req,prep] of [[{...prepared.request},prepared],[prepared.request,{...prepared}]]){
  assert.equal(r.executeClassicalGrammarApplicationRequest(req,prep).authorizationStatus,'blocked');
 }
 assert.equal(r.getClassicalGrammarApplicationCapabilityNavigator({...parent}),null);
 assert.equal(r.isClassicalGrammarApplicationCapabilityNavigator({...nav}),false);
});
test('complete exact honorific Participants remain retained across reverential preflight',()=>{
 const app=r.executeClassicalGrammarApplicationRequest({...request,args:[{...request.args[0],honorificStemAlternative:'default'}]});
 assert.equal(app.authorizationStatus,'authorized');
 const parent=app.canonicalResult;
 const before=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent,{});
 const objects=before.continuationSourceProjection.sourceObjectRequests;
 assert(objects.some(object=>object.participantFrame),'genuine exact-whole Participant must remain present');
 const ready=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent,{lateOperation:'reverential'});
 assert.equal(ready.bindingStatus,'ready',ready.blockReason);
 const after=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent,{});
 assert.deepEqual(after.continuationSourceProjection.sourceObjectRequests,objects);
 assert.equal(r.isClassicalNahuatlVncContinuationBindingFrame(before),true);
});
