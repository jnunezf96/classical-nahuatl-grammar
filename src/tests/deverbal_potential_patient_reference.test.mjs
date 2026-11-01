import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('potential-patient restores owned nominal reference choices after fixed active action',async()=>{
 const {r}=await createPossessiveFixture('mahui');
 const parent=r.requestClassicalVncApplicationResult({sourceStem:'mahui',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'future',requestedVoice:'active'});
 assert.equal(parent.authorizationStatus,'authorized',parent.blockReason);
 const request={constructionKind:'deverbal-action',actionKind:'potential-patient',actionSuffix:'z',canonicalVncResult:parent,state:'absolutive',subject:'3common',animacy:'nonanimate',humanness:'nonhuman'};
 const frame=r.evaluateClassicalNahuatlDeverbalNnc(request);
 assert.equal(frame.authorizationStatus,'authorized',frame.blockReason);
 assert.equal(frame.operationFrame.fixedTargetSubject,'');
 const humanChoice=frame.choiceOptionProjection.subject.options.find(option=>option.optionId==='2sg');
 assert(humanChoice);assert(humanChoice.writeRequestValues.some(write=>write.path[0]==='animacy'&&write.value==='animate'));
 const human={...request,subject:'2sg',animacy:'animate',humanness:'human'};
 const result=r.evaluateClassicalNahuatlDeverbalNnc(human);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.wordSurface,'timahuiztli');
 assert.equal(result.sourceFrame.canonicalVncResult,parent);
 const fixed=r.evaluateClassicalNahuatlDeverbalNnc({...request,actionKind:'active-action'});
 assert.deepEqual(fixed.choiceOptionProjection.animacy.options.map(option=>option.optionId),['nonanimate']);
 assert.equal(fixed.choiceOptionProjection.animacy.editable,false);
});
