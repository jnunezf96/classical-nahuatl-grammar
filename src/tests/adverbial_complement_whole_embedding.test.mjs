import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
const {r}=await createPossessiveFixture('iht-o-ā');
const nounSource=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'peyo',sourceClass:'tl-1-a'});
const nounOperation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(nounSource,{state:'absolutive',subject:'3common'});
const nounApp=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[nounSource,nounOperation]});const noun=nounApp.canonicalResult;
function request(stem){const verb=r.evaluateClassicalNahuatlVncApplication({sourceStem:stem,verbClass:'C',sourceValence:'specific-projective',objectKind:'specific-projective',objectPerson:'3common',subject:'3sg',mood:'indicative',tense:'present',voice:'active'});assert.equal(verb.authorizationStatus,'authorized');return{operationKind:'object-complement',principalClause:r.buildClassicalNahuatlClauseCompositionSourceFrame(verb,{referenceId:'actor',subjectReferenceId:'actor',objectReferenceId:'named'}),complementClause:r.buildClassicalNahuatlClauseCompositionSourceFrame(noun,{referenceId:'named',subjectReferenceId:'named'}),options:{semanticCategory:'designation',linkKind:'object-subject',designationStructure:'ordinary-object-complement',order:'complement-principal'}};}
test('issued complement whole embeds its owner wording and keeps terminal punctuation at the outer sentence',()=>{
 const q=request('iht-o-ā');
 const app=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[q]});
 assert.equal(app.authorizationStatus,'authorized',app.blockReason);
 const parent=app.canonicalResult;
 const singer=r.evaluateClassicalNahuatlVncApplication({sourceStem:'cuīca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',voice:'active'});
 const singerApp=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'cuīca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',voice:'active'}]});
 assert.equal(singerApp.authorizationStatus,'authorized');
 const source=r.getCanonicalAdverbialAdjunctionSourceUnit(parent,'principal');
 assert.equal(source.surface,parent.embeddedSurface);
 assert.equal(source.features.sentencePunctuation,'.');
 const query={principalClause:parent,adjoinedUnit:singerApp.canonicalResult,semanticRelation:'time',timeProfile:'implicit',adverbializationDegree:'nonadverbialized',structureKind:'complex',adjoinedUnitType:'vnc',order:'head-modifier',recursion:'none',marking:'unmarked'};
 const result=r.evaluateAdverbialAdjunction(query);
 assert.equal(result.ok,true,JSON.stringify(result.diagnostics));
 assert.equal(result.sourceContract.principal.issuedResult,parent);
 assert.equal(result.surface,'Peyotl quihtoa cuīca.');
 assert.equal(result.embeddedSurface,'peyotl quihtoa cuīca');
 assert.equal(parent.surfaceRealization,'Peyotl quihtoa.');
 assert.notEqual(r.evaluateAdverbialAdjunction({...query,principalClause:{...parent}}).ok,true);
});
