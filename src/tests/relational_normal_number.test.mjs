import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {createClassicalNahuatlNncClosureApi} from '../core/classical/nnc_lessons45_47_closure.mjs';
test('normal possessive subjects use Lesson 13 number while adverbial number remains silent',async()=>{
 const {r}=await createPossessiveFixture('huān');const api=createClassicalNahuatlNncClosureApi(r);
 const request={nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'huan-company',operation:'compound-embed',formation:'option-four',downstreamTargetStem:'poh'},state:'possessive',possessorId:'1sg',subjectMode:'normal'};
 for(const subjectId of ['1pl','2pl','3pl']){
  const result=api.evaluateClassicalNahuatlRelationalNnc({...request,subjectId});
  assert.equal(result.authorizationStatus,'authorized',JSON.stringify(result.diagnostics));
  assert.match(result.surface,/nohuāmpohhuān$/u);
  assert.equal(result.operationFrame.normalNumberFrame.num1,'hu');
  assert.equal(result.operationFrame.normalNumberFrame.num2,'ān');
  assert.equal(result.formulaSlots.nounConnector,'hu');assert.equal(result.formulaSlots.numberConnector,'ān');
  const registered=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:relational',args:[{...request,subjectId}]});
  assert.equal(registered.authorizationStatus,'authorized',registered.blockReason);
  assert.equal(registered.canonicalResult.surface,result.surface);

 }
 const singular=api.evaluateClassicalNahuatlRelationalNnc({...request,subjectId:'3sg'});
 assert.equal(singular.surface,'nohuāmpoh');
 const adverb=api.evaluateClassicalNahuatlRelationalNnc({nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'huan-company',operation:'relational-nnc',formation:'option-one',sourceKind:'possessor'},state:'possessive',possessorId:'3pl',subjectMode:'adverbialized',subjectId:'3common'});
 assert.equal(adverb.surface,'īnhuān');assert.equal(adverb.formulaSlots.numberConnector,'');
 const lexical={nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'huan-company',operation:'compound-embed',formation:'option-four',sourceKind:'typed-relational-plus-nounstem-compound-source',sourceStem:'huān',downstreamTargetStem:'yōlqui'},state:'absolutive',possessorId:'1sg',subjectMode:'normal',subjectId:'2pl'};
 const lexicalResult=api.evaluateClassicalNahuatlRelationalNnc(lexical);
 assert.equal(lexicalResult.authorizationStatus,'authorized',JSON.stringify(lexicalResult.diagnostics));
 assert.equal(lexicalResult.surface,'annohuānyōltin');
 assert.equal(lexicalResult.sourceFrame.lesson12NumberFrame.num1,'t');
 const forged=api.evaluateClassicalNahuatlRelationalNnc({...lexical,numberConnector:'ān'});
 assert.equal(forged.authorizationStatus,'blocked');

});
test('associated entity normal plural uses absolutive zero-h, not its singular tl or possessive hu-an',async()=>{
 const {r}=await createPossessiveFixture('mīl');const api=createClassicalNahuatlNncClosureApi(r);
 const request={nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'pan-surface-time',operation:'associated-entity',formation:'option-two',sourceStem:'mīl-lah'},state:'absolutive',subjectMode:'normal',subjectId:'1pl'};
 const result=api.evaluateClassicalNahuatlRelationalNnc(request);
 assert.equal(result.authorizationStatus,'authorized',JSON.stringify(result.diagnostics));
 assert.equal(result.surface,'timīllahcah');
 assert.equal(result.operationFrame.normalNumberFrame.num1,'0');assert.equal(result.operationFrame.normalNumberFrame.num2,'h');
 const singular=api.evaluateClassicalNahuatlRelationalNnc({...request,subjectId:'3sg'});assert.equal(singular.surface,'mīllahcatl');
});
