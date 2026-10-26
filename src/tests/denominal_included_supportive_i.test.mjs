import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('included possessor uses the selected nominal initial-i variant before finite realization',async()=>{
 const {r}=await createPossessiveFixture('icnōpil');
 const request={nounStem:'icnōpil',sourceNounClass:'tli',sourceKind:'possessive-nnc-predicate',sourceState:'possessive',sourceInitialISelection:'supportive',possessor:'1pl',includedPossessorFamily:'recompense',operationId:'included-possessor-ti',operationPath:['included-possessor-ti'],classChoice:'A',subject:'2sg',subjectPerson:'2',subjectAnimacy:'animate',subjectHumanness:'human',subjectNumber:'singular',mood:'indicative',tense:'future'};
 const made=r.evaluateClassicalNahuatlDenominalVnc(request);
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(made.surfaceRealization,'titocnōpiltiz');
 assert.equal(made.sourceFrame.sourceInitialISelection,'supportive');
 const boundary=made.operationFrame.includedPossessorBoundaryFrame;
 assert.equal(boundary.nominalSourceVariant.selectedUseStem,'cnōpil');
 assert.equal(boundary.writtenResult.source,boundary.writingSource);
 assert.equal(boundary.writtenResult.surface,'tocnōpilti');
 const retained=r.evaluateClassicalNahuatlDenominalVnc({...request,possessor:'3pl',subject:'3common',subjectPerson:'3',subjectAnimacy:'nonanimate',subjectHumanness:'nonhuman',subjectNumber:'common'});
 assert.equal(retained.authorizationStatus,'authorized',retained.blockReason);
 assert.equal(retained.surfaceRealization,'imicnōpiltiz');
 assert.equal(retained.operationFrame.includedPossessorBoundaryFrame.nominalSourceVariant.selectedUseStem,'icnōpil');
 // This comparison tests the selected analysis, not a second attested reading
 // of icnōpil. Real i must not be deleted merely because the spelling begins i.
 const real=r.evaluateClassicalNahuatlDenominalVnc({...request,sourceInitialISelection:'real'});
 assert.equal(real.surfaceRealization,'titoicnōpiltiz');
 assert.equal(real.operationFrame.includedPossessorBoundaryFrame.nominalSourceVariant,null);
 const app=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:denominal',args:[request]});
 assert.equal(app.authorizationStatus,'authorized',app.blockReason);
 assert.equal(app.canonicalResult.surfaceRealization,'titocnōpiltiz');
});
