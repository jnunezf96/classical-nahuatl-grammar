import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createClassicalClauseRelationControllerGlobals} from '../application/classical/clause_relation_controller.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=(subject,stem='oquich')=>{
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tli-1'});
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(r.getClassicalGrammarApplicationCapabilityNavigator(source),'nnc:ordinary',{subject,humanness:'human',state:'absolutive',predicateFormation:'source-stem',...(subject.endsWith('pl')?{pluralConnector:'t-in'}:{})});
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);assert.equal(made.authorizationStatus,'authorized',made.blockReason);return made.canonicalResult;
};
const verb=subject=>{
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'cuīca',verbClass:'A',sourceValence:'intransitive',subject,subjectAnimacy:'animate',subjectHumanness:'human',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]});
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);return made.canonicalResult;
};
const choices={relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'};
test('shared supplementation context readiness agrees with authenticated preview before Make and recapture invalidates it',()=>{
 const group=verb('3pl'),men=noun('1pl'),man=noun('3sg');
 const target=Object.create(r);let executions=0,previews=0;
 Object.defineProperties(target,{executeClassicalGrammarApplicationRequest:{value:(...args)=>{executions++;return r.executeClassicalGrammarApplicationRequest(...args);}},previewClassicalGrammarApplicationRequest:{value:(...args)=>{previews++;return r.previewClassicalGrammarApplicationRequest(...args);}}});
 const c=createClassicalClauseRelationControllerGlobals(target).createClassicalClauseRelationController();
 assert.equal(c.captureCurrentResult('principal',group).authorizationStatus,'authorized');
 const captureContext=context=>assert.equal(c.captureCurrentResult('adjoined',men,c.issueDiscourseSourceContextFrame(context)).authorizationStatus,'authorized');
 captureContext({speakerGender:'female',speakerGroupMembership:'member'});
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot();
  for(const context of [{speakerGender:'female',speakerGroupMembership:'member'},{speakerGender:'male',speakerGroupMembership:'nonmember'},{speakerGender:'unspecified',speakerGroupMembership:'unspecified'}]){
   captureContext(context);
   const contract=c.buildDecisionContract(choices);
   assert.equal(contract.authorizationStatus,'blocked',JSON.stringify(context));
   assert.equal(contract.blockReason,'classical-supplementation-canonical-result-blocked');
   assert.equal(c.preview(choices),null);assert.equal(c.compose(choices).authorizationStatus,'blocked');
  }
  assert.equal(executions,0,'invalid contexts cannot reach Make execution');
  captureContext({speakerGender:'male',speakerGroupMembership:'member'});
  assert.equal(c.buildDecisionContract(choices).authorizationStatus,'authorized');
  const count=previews;c.buildDecisionContract(choices);assert.equal(previews,count,'unchanged context/captures/options reuse exact preflight');
  assert.equal(executions,0);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
  const made=c.compose(choices);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(executions,1);
  assert.equal(made.canonicalResult.referenceFrame.agreementException.kind,'male-bonding');
  assert.equal(r.getClassicalNahuatlSupplementationClauseSourceFrame(made.canonicalResult.principalClause),group);
  assert.equal(r.getClassicalNahuatlSupplementationClauseSourceFrame(made.canonicalResult.supplementClause),men);
  assert.equal(c.captureCurrentResult('adjoined',man,c.issueDiscourseSourceContextFrame({namedPartnerKnownParticipant:'none'})).authorizationStatus,'authorized');
  assert.equal(c.buildDecisionContract(choices).authorizationStatus,'blocked','singular named party needs an actual context');
  c.captureCurrentResult('adjoined',man,c.issueDiscourseSourceContextFrame({namedPartnerKnownParticipant:'third-person'}));
  assert.equal(c.buildDecisionContract(choices).authorizationStatus,'authorized');
  const named=c.compose(choices);assert.equal(named.authorizationStatus,'authorized',named.blockReason);assert.equal(named.canonicalResult.referenceFrame.agreementException.kind,'named-partner');
  c.captureCurrentResult('principal',verb('3sg'));c.captureCurrentResult('adjoined',man);
  assert.equal(c.buildDecisionContract(choices).authorizationStatus,'authorized','ordinary matching contact needs no exception');
  assert.equal(c.captureCurrentResult('adjoined',{...men}).authorizationStatus,'blocked');
});
