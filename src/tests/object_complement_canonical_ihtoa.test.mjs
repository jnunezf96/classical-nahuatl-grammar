import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('iht-o-ā');
const nounSource=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'peyo',sourceClass:'tl-1-a'});
const nounOperation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(nounSource,{state:'absolutive',subject:'3common'});
const nounApp=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[nounSource,nounOperation]});const noun=nounApp.canonicalResult;
function request(stem){const verb=r.evaluateClassicalNahuatlVncApplication({sourceStem:stem,verbClass:'C',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3common',subject:'3sg',mood:'indicative',tense:'present',voice:'active'});assert.equal(verb.authorizationStatus,'authorized');return{operationKind:'object-complement',principalClause:r.buildClassicalNahuatlClauseCompositionSourceFrame(verb,{referenceId:'actor',subjectReferenceId:'actor',objectReferenceId:'named'}),complementClause:r.buildClassicalNahuatlClauseCompositionSourceFrame(noun,{referenceId:'named',subjectReferenceId:'named'}),options:{semanticCategory:'designation',linkKind:'object-subject',designationStructure:'ordinary-object-complement',order:'complement-principal'}};}
test('canonical Andrews iht-o-ā retains designation eligibility; other predicates and copied sources do not',()=>{
 const q=request('iht-o-ā');const result=r.evaluateClassicalNahuatlClauseComplementation(q);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.relationFrame.referenceIdentityUnified,true);
 assert.equal(r.evaluateClassicalNahuatlClauseComplementation(request('tēm-o-ā')).authorizationStatus,'blocked');
 assert.equal(r.evaluateClassicalNahuatlClauseComplementation({...q,principalClause:{...q.principalClause}}).authorizationStatus,'blocked');
});
