import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';
import {createClassicalClauseRelationControllerGlobals} from '../application/classical/clause_relation_controller.mjs';
const {r}=await createPossessiveFixture('');
const ordinary=(sourceStem,verbClass)=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem,verbClass,sourceValence:'intransitive',objectKind:'none',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'}]}).canonicalResult;
const principal=ordinary('cochi','B'),ordinaryAdjunct=ordinary('cuīca','A');
const purposive=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:derivational-operation',args:[{sourceStem:'cuīca',sourceValence:'intransitive',verbClass:'A',subject:'3sg',mood:'indicative',tense:'present',derivationType:'direct',voice:'active',lateOperation:'purposive',lateVariant:'directional',purposiveSeries:'outbound-nonpast-indicative'}]}).canonicalResult;
const choices={relation:'purpose',degree:'nonadverbialized',relationProfile:'purposive-vnc',order:'modifier-head',structureProfile:'modification'};
const request=adjoinedUnit=>({principalClause:principal,adjoinedUnit,semanticRelation:'purpose',adverbializationDegree:'nonadverbialized',structureKind:'complex',adjoinedUnitType:'vnc',order:'modifier-head',recursion:'none',marking:'unmarked',purposeType:'purposive-vnc'});
test('explicit purposive VNC profile requires its authentic derived Source; ordinary purpose remains available',()=>{
 assert.equal(r.isClassicalNahuatlClosureFrame(purposive),true);
 assert.equal(r.evaluateAdverbialAdjunction(request(ordinaryAdjunct)).ok,false);
 const positive=r.evaluateAdverbialAdjunction(request(purposive));assert.equal(positive.ok,true,JSON.stringify(positive.diagnostics));assert.equal(positive.sourceContract.adjoined.issuedResult,purposive);
 assert.equal(r.evaluateAdverbialAdjunction(request({...purposive})).ok,false);
 for(const purposeType of ['unmarked','weak'])assert.equal(r.evaluateAdverbialAdjunction({...request(ordinaryAdjunct),purposeType}).ok,true);
});
test('event tuple readiness reflects same owner before Make and recaptures authentic compatible material',()=>{
 const target=Object.create(r);let calls=0;Object.defineProperty(target,'requestClassicalAdverbialAdjunctionResult',{value:(...a)=>{calls++;return r.requestClassicalAdverbialAdjunctionResult(...a);}});
 const c=createClassicalClauseRelationControllerGlobals(target).createClassicalClauseRelationController();c.captureCurrentResult('principal',principal);c.captureCurrentResult('adjoined',ordinaryAdjunct);
 const oldHistory=r.getClassicalGrammarWorkspaceHistorySnapshot();const blocked=c.buildDecisionContract(choices);assert.equal(blocked.authorizationStatus,'blocked');assert.match(blocked.blockReason,/purposive/);assert.equal(c.preview(choices),null);assert.equal(c.compose(choices).authorizationStatus,'blocked');assert.equal(calls,0);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),oldHistory);
 assert.equal(c.preserveAdjunctionCaptureChoices(choices,'adjoined'),true);assert.equal(c.preserveAdjunctionCaptureChoices({relation:'supplementation'},'adjoined'),false);c.clearCapture('adjoined');assert.equal(c.buildDecisionContract(choices).authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('principal'),principal);
 c.captureCurrentResult('adjoined',purposive);assert.equal(c.getCapturedCanonicalResult('principal'),principal);assert.equal(c.buildDecisionContract(choices).authorizationStatus,'authorized');assert(c.preview(choices)?.isCurrent());assert.equal(calls,0);const made=c.compose(choices);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(calls,1);assert.equal(c.captureCurrentResult('adjoined',{...purposive}).authorizationStatus,'blocked');
});

test('anchored adjunction replacement reissues genuine navigator and binding without changing captures or executing',()=>{
 const c=r.createClassicalClauseRelationController();
 const old=r.getClassicalGrammarApplicationCapabilityNavigator(ordinaryAdjunct).operations.find(o=>o.operationId==='clause:adverbial-adjunction').ownerBindingFrame;
 c.captureCurrentResult('principal',principal);const prepared=c.prepareAdjunctionAnchorReplacement(old,'purpose:adjoined','adjoined',purposive);
 assert(prepared,JSON.stringify({old:{operation:old.operationId,choices:old.bindingChoices.map(c=>c.id)},next:r.getClassicalGrammarApplicationCapabilityNavigator(purposive).operations.filter(o=>o.operationId==='clause:adverbial-adjunction').map(o=>({status:o.availabilityStatus,valid:o.ownerBindingFrameValidated,family:o.ownerBindingFamily,choices:o.ownerBindingIds,inputSame:o.ownerBindingInputResult===purposive}))}));assert.equal(prepared.navigator.exactResult,purposive);assert.equal(prepared.operation.ownerBindingFrame.exactResult,purposive);assert.equal(prepared.capture.canonicalResult,purposive);assert.equal(c.getCapturedCanonicalResult('adjoined'),null);assert.equal(c.getCapturedCanonicalResult('principal'),principal);
 assert.equal(c.prepareAdjunctionAnchorReplacement({...old},'purpose:adjoined','adjoined',purposive),null);assert.equal(c.prepareAdjunctionAnchorReplacement(old,'purpose:adjoined','adjoined',{...purposive}),null);assert.equal(c.prepareAdjunctionAnchorReplacement(old,'purpose:adjoined','principal',purposive),null);
 c.captureCurrentResult('adjoined',purposive);assert.equal(c.applyBindingFrame(prepared.operation.ownerBindingFrame,'purpose:adjoined').authorizationStatus,'authorized');assert.equal(c.getCapturedCanonicalResult('adjoined'),purposive);assert.equal(c.getCapturedCanonicalResult('principal'),principal);assert.equal(c.buildDecisionContract(choices).authorizationStatus,'authorized');
});
