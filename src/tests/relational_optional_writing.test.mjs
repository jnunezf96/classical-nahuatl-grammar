import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('ītech');
test('typed relational parts retain unselected low-frequency writing while required assimilation remains',()=>{
 const request={nounstem:{kind:'classical-nahuatl-nnc-nounstem-request',stemId:'pa-direction',operation:'relational-nnc',formation:'option-two',sourceKind:'relational-compound',sourceFormation:'plain-nounstem',sourceMode:'embed-matrix',sourceStem:'ītech',sourceEmbedStem:'ītech',sourceMatrixStem:'pa'},state:'absolutive',subjectMode:'adverbialized',subjectId:'3common'};
 const app=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:relational',args:[request]});
 assert.equal(app.authorizationStatus,'authorized',app.blockReason);
 assert.equal(app.canonicalResult.surface,'ītechpa');
 const source=r.issueClassicalNahuatlLesson2WritingSource({parts:[{role:'embed',value:'on'},{role:'matrix',value:'pa'}],boundaryKind:'typed-relational-nnc-slots'});
 const written=r.writeClassicalNahuatlLesson2Result(source);
 assert.equal(written.authorizationStatus,'authorized');
 assert.equal(written.surface,'ompa');
 assert.notEqual(r.writeClassicalNahuatlLesson2Result({...source}).authorizationStatus,'authorized');
});
