import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('cochi');
const make=tense=>r.requestClassicalVncApplicationResult({sourceStem:'cochi',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense,requestedVoice:'active'});
test('action capture extracts authenticated future core while retaining exact application parent',()=>{
 const parent=make('future');assert.equal(parent.authorizationStatus,'authorized');
 const capture=r.captureClassicalNahuatlVncResultForDeverbalAction(parent);
 assert.equal(capture.authorizationStatus,'authorized');assert.equal(capture.canonicalVncResult,parent);assert.equal(capture.canonicalNucleusResult,parent.resultFrame);
 assert.equal(capture.sourceStem,'cochi');assert.equal(capture.futureTenseCarrier,'z');assert.equal(capture.coreExcludesSubjectAndTense,true);
 for(const bad of [{...parent},JSON.parse(JSON.stringify(parent)),make('present')])assert.equal(r.captureClassicalNahuatlVncResultForDeverbalAction(bad).authorizationStatus,'blocked');
});

test('action execution accepts only the captured application custody',()=>{
 const parent=make('future');const req={constructionKind:'deverbal-action',canonicalVncResult:parent,actionKind:'active-action',actionSuffix:'liz',state:'absolutive',subject:'3common',animacy:'nonanimate',humanness:'nonhuman'};
 assert.equal(r.evaluateClassicalNahuatlDeverbalNnc(req).authorizationStatus,'authorized');
 for(const bad of [{...parent},make('present')])assert.equal(r.evaluateClassicalNahuatlDeverbalNnc({...req,canonicalVncResult:bad}).authorizationStatus,'blocked');
});
