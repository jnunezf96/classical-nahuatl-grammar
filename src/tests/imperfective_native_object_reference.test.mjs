import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import * as adapter from '../ui/composition/issued_binding_operation_transaction.mjs';
import {createVncBindingIntentCoordinator} from '../application/classical/vnc_binding_intent.mjs';
import {createFiniteConnectorCoordinator} from '../application/classical/finite_connector_choice_coordination.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const extract=name=>{const start=code.indexOf(`    function ${name}(`);assert.ok(start>=0,name);return code.slice(start,code.indexOf('\n    function ',start+20));};
test('native object edits retain the exact class-independent owner subject choices when direct is an effective default',()=>{
 for(const stem of ['ihtzoma','nēnehuilia']){
  const source=r.resolveClassicalNahuatlImperfectiveVncSourceFrame({enteredStem:stem,valence:'specific-projective'});
  assert.equal(r.isClassicalNahuatlImperfectiveVncSourceFrame(source),true);
  const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
  const choices={subject:'1sg',subjectAnimacy:'animate',subjectHumanness:'human',objectSelection:'specific-projective:3sg',mood:'indicative',tense:'present'};
  const bind=selections=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',selections);
  let active=bind(choices);assert.equal(active.bindingStatus,'ready',active.blockReason);
  assert.equal(active.callerSelections.requestedDerivation,undefined);assert.equal(active.effectiveSelections.requestedDerivation,'direct');
  assert.notEqual(active.ownerBindingFrame.subjectReferenceAuthoringAllowed,true);
  const prior=r.executeClassicalGrammarTypedSourceOperationBindingFrame(active);assert.equal(prior.authorizationStatus,'authorized');
  const accepted=prior.canonicalResult;active=bind(choices);let executions=0;
  const session=createConstructionSession({isSource:v=>v===source,isResult:v=>r.isClassicalNahuatlVncApplicationFrame(v),execute:p=>{executions++;return r.executeClassicalGrammarTypedSourceOperationBindingFrame(p.binding);},present:()=>true});
  session.restore(accepted);
  const scope=adapter.createIssuedBindingOperationScope({owner:r,source,operationId:'vnc:application',ingressKind:'typed',navigator:nav,session,getIngress:()=>nav,reissue:bind});
  let snapshot=adapter.issueIssuedBindingOperationSnapshot(scope,active,nav);session.stage({source,route:{operation:'vnc:application'},operationContract:snapshot});
  const control={id:'classical-rule-logic-object',value:'specific-projective:2sg',disabled:false,readOnly:false,hasAttribute:()=>false,closest:s=>s==='#classical-rule-logic-controls'?{}:null};
  const ctx={ClassicalVncBindingIntent:createVncBindingIntentCoordinator(r),ClassicalFiniteConnectorChoices:createFiniteConnectorCoordinator(r),ClassicalVncSentenceControlKeys:{},ClassicalTypedSourceBindingSelectionSignatures:new WeakMap(),getClassicalTypedSourceSelectionSignature:()=>null,projectClassicalVncIntentControls(){},syncClassicalGrammarTypedSourceOperationChoices(){},captureClassicalIssuedBindingEvent:binding=>binding===snapshot.contract.binding?{snapshot,event:adapter.captureIssuedBindingChoiceFrame(snapshot)}:null,retainClassicalIssuedBindingCandidate(context,binding){const next=adapter.adoptIssuedBindingOperationCandidate(context.snapshot,binding,context.event);if(!next)return false;snapshot=next;return true;},ActiveClassicalGrammarTypedSourceOperationBinding:active,targetObject:{...r,document:{getElementById:id=>id===control.id?control:null}},ActiveClassicalGrammarCapabilityNavigator:nav,ActiveClassicalGrammarResultBinding:null,HandledClassicalContinuationChoiceEvents:new WeakSet(),
   getActiveClassicalGrammarTypedSourceOperationBinding:()=>ctx.ActiveClassicalGrammarTypedSourceOperationBinding,
   stageClassicalGrammarTypedSourceOperationBinding:(op,selected)=>{active=bind(selected);return active;},
   syncClassicalCapabilityApplyOperationState:()=>{active=ctx.ActiveClassicalGrammarTypedSourceOperationBinding;return session.stage({source,operationContract:snapshot,route:{operation:'vnc:application'},slots:[{role:'source',exact:source}],choices:{...active.callerSelections},legalMoves:[],ready:active.bindingStatus==='ready',execution:{binding:active,signature:JSON.stringify(active.callerSelections)}});}};
  vm.createContext(ctx);
  const mapStart=code.indexOf('    const CLASSICAL_CAPABILITY_BINDING_CONTROL_IDS = Object.freeze({'),mapEnd=code.indexOf('\n    });',mapStart)+8;
  vm.runInContext(code.slice(mapStart,mapEnd),ctx);
  for(const name of ['getClassicalCapabilityBindingControl','getClassicalCapabilityBindingControlsForChoice','getClassicalVncContinuationBindingSelections'])vm.runInContext(extract(name),ctx);
  const start=code.indexOf('      const typedDerivationButtonChoice = typedSourceBinding?.operationId === "vnc:application"'),end=code.indexOf('\n      if (stageClassicalOrdinaryGrammarControlChange(control))',start);
  vm.runInContext('function editNative(control,event){const typedSourceBinding=getActiveClassicalGrammarTypedSourceOperationBinding();'+code.slice(start,end)+'return false;}',ctx);
  assert.equal(ctx.editNative(control,{}),true);
  assert.equal(active.bindingStatus,'ready',`${stem}: ${active.blockReason}`);
  assert.equal(active.callerSelections.subjectAnimacy,'animate');assert.equal(active.callerSelections.subjectHumanness,'human');
  assert.equal(active.callerSelections.objectSelection,'specific-projective:2sg');assert.equal(active.exactSource,source);
  assert.equal(session.position.accepted.result,accepted);assert.equal(executions,0);
  assert.equal(session.make(),true,session.position.failure?.blockReason);assert.equal(executions,1);
  const result=session.position.accepted.result;assert.notEqual(result,accepted);
  assert.equal(result.resultFrame.participantProjection.targetSubject.category,'1sg');
  assert.equal(result.resultFrame.participantProjection.targetObjects[0].category,'2sg');
  assert.equal(r.isClassicalNahuatlImperfectiveVncSourceFrame({...source}),false);
 }
});
