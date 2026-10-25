import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=(stem,sourceClass,subject='3sg')=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject,state:'absolutive'})]}).canonicalResult;};
const standard=noun('tlāca','tl-1-a'),src=x=>r.buildClassicalComparisonSourceUnit({sourceResult:x});
test('53.1.6 resemblance uses the attested objective verb predicate without inventing a perfective class',()=>{
 for(const stem of ['nēnehuilia','nehuihuilia']){
  const source=r.resolveClassicalNahuatlImperfectiveVncSourceFrame({enteredStem:stem,valence:'specific-projective'});
  assert.equal(r.isClassicalNahuatlImperfectiveVncSourceFrame(source),true);
  assert.equal(source.perfectiveClassStatus,'unresolved');
  const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
  const choices={subject:'1sg',subjectAnimacy:'animate',subjectHumanness:'human',objectSelection:'specific-projective:3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
  const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',choices);
  assert.equal(binding.bindingStatus,'ready',binding.blockReason);
  const receipt=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
  assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
  const parent=receipt.canonicalResult,principal=src(parent);
  assert.equal(principal.baseUnitKind,'vnc');
  const result=r.executeClassicalGrammarApplicationRequest({operationId:'clause:comparison',args:[{routeId:'similarity-resemblance-verbstem-nnc',slots:{principal,standard:src(standard)},choices:{sentenceType:'none'}}]});
  assert.equal(result.authorizationStatus,'authorized',result.blockReason);
  assert.equal(result.canonicalResult.surface,`nic${stem} in tlācatl`);
  assert.equal(r.getClassicalComparisonCanonicalSourceResult(result.canonicalResult.operationFrame.sourceSlots.principal),parent);
  assert.notEqual(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{...choices,tense:'preterit'}).bindingStatus,'ready');
  const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',parent);c.captureCurrentResult('adjoined',standard);
  const clauseChoices={relation:'comparison',comparisonRoute:'similarity-resemblance-verbstem-nnc',sentenceType:'none'};
  assert.equal(c.buildDecisionContract(clauseChoices).authorizationStatus,'authorized');assert.equal(c.compose(clauseChoices).authorizationStatus,'authorized');
  assert.equal(src({...parent}).authorizationStatus,'blocked');
  if(stem==='nēnehuilia'){
   const common=r.executeClassicalGrammarTypedSourceOperationBindingFrame(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{...choices,objectSelection:'specific-projective:3common'})).canonicalResult;
   const house=noun('cal','tli-1','3common');
   const commonResult=r.requestClassicalComparisonResult({routeId:'similarity-resemblance-verbstem-nnc',slots:{principal:src(common),standard:src(house)},choices:{sentenceType:'none'}});
   assert.equal(commonResult.surface,'nicnēnehuilia in calli');
   assert.equal(commonResult.formula,'#ni-0+c-0(nēnehuilia)0+0-0# + in + #0-0(cal)li-0#');
  }
  const mismatched=r.executeClassicalGrammarTypedSourceOperationBindingFrame(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{...choices,objectSelection:'specific-projective:2sg'})).canonicalResult;
  c.captureCurrentResult('principal',mismatched);
  assert.equal(c.buildDecisionContract(clauseChoices).authorizationStatus,'blocked');assert.equal(c.compose(clauseChoices).authorizationStatus,'blocked');
  assert.equal(r.evaluateClassicalNahuatlComparison({routeId:'similarity-resemblance-verbstem-nnc',slots:{principal:src(mismatched),standard:src(standard)}}).authorizationStatus,'blocked');

 }
 const fakeNoun=noun('nēnehuilia','zero');
 assert.equal(r.evaluateClassicalNahuatlComparison({routeId:'similarity-resemblance-verbstem-nnc',slots:{principal:src(fakeNoun),standard:src(standard)}}).authorizationStatus,'blocked');
});
