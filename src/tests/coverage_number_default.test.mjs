import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const source=r.resolveClassicalNahuatlImperfectiveVncSourceFrame({enteredStem:'mo-ca',valence:'intransitive'});
const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'1sg',subjectAnimacy:'animate',subjectHumanness:'human',mood:'indicative',tense:'present',requestedVoice:'active',requestedDerivation:'direct'});
const verb=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding).canonicalResult;
const principal=r.buildClassicalNahuatlClauseCompositionSourceFrame(verb,{referenceId:'covered'});
function request(subject){
 const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tecpin',sourceClass:'zero'});
 const n=r.getClassicalGrammarApplicationCapabilityNavigator(s);
 const b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(n,'nnc:ordinary',{subject,pluralConnector:'t-in',animacy:'animate',humanness:'nonhuman',state:'absolutive',predicateFormation:'source-stem'});
 assert.equal(b.bindingStatus,'ready',b.blockReason);
 const noun=r.executeClassicalGrammarTypedSourceOperationBindingFrame(b).canonicalResult;
 return {operationKind:'adverbial-complement',principalClause:principal,complementClause:r.buildClassicalNahuatlClauseCompositionSourceFrame(noun,{referenceId:'covering'}),options:{semanticCategory:'coverage',order:'principal-complement'}};
}
test('normally singular coverage is descriptive, not an absolute plural prohibition',()=>{
 for(const subject of ['3pl','3sg']){
  const q=request(subject),made=r.evaluateClassicalNahuatlClauseComplementation(q);
  assert.equal(made.authorizationStatus,'authorized',made.blockReason);
  assert.equal(made.relationFrame.complementNumberPattern,'normally-singular');
  assert.equal(r.evaluateClassicalNahuatlClauseComplementation({...q,complementClause:{...q.complementClause}}).authorizationStatus,'blocked');
 }
 assert.equal(r.evaluateClassicalNahuatlClauseComplementation({...request('3sg'),complementClause:principal}).authorizationStatus,'blocked');
});
