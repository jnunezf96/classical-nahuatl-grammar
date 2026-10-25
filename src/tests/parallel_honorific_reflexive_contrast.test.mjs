import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('parallelism reads the genuine honorific reflexive voice and preserves exact parents',async()=>{
 const {r}=await createPossessiveFixture('chōca');
 const args={sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',sourceSubject:'3sg',sourceSubjectHumanness:'human',sourceSubjectAnimacy:'animate',mood:'indicative',tense:'present',requestedVoice:'active'};
 const plain=r.requestClassicalVncApplicationResult(args);
 const honorific=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:[{...args,voice:'active',lateOperation:'honorific',lateVariant:'causative',honoredParticipant:'subject',honorificFormationAnalysis:'causative-only',honorificStemAlternative:'type-two-long'}]}).canonicalResult;
 assert.equal(plain.authorizationStatus,'authorized');
 assert.equal(honorific.authorizationStatus,'authorized');
 assert.equal(honorific.surfaceRealization,'mochōquitia');
 const node=parent=>r.buildClassicalNahuatlClauseCompositionSourceFrame(parent,{referenceId:'crying-event',subjectReferenceId:'crying-person'});
 const conjuncts=[node(plain),node(honorific)];
 const request={conjuncts,parallelType:'rephrasive',rephraseAxis:'intransitive-reflexive-transitive'};
 const made=r.evaluateClassicalNahuatlClauseConjunction({operationKind:'parallel-structure',conjuncts,options:{parallelType:'rephrasive',rephraseAxis:request.rephraseAxis,appositiveType:'none'}});
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(r.getClassicalNahuatlSupplementationClauseSourceFrame(made.conjuncts[0].envelope),plain);
 assert.equal(r.getClassicalNahuatlSupplementationClauseSourceFrame(made.conjuncts[1].envelope),honorific);
 assert.notEqual(r.evaluateClassicalNahuatlClauseConjunction({operationKind:'parallel-structure',conjuncts:[node(plain),node({...honorific})],options:request}).authorizationStatus,'authorized');
 assert.notEqual(r.evaluateClassicalNahuatlClauseConjunction({operationKind:'parallel-structure',conjuncts:[node(plain),node(plain)],options:request}).authorizationStatus,'authorized');
 assert.equal(honorific.surfaceRealization,'mochōquitia');
});
