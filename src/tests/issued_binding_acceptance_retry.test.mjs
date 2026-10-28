import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createClassicalGrammarWorkspaceHistory} from '../application/classical/grammar_workspace_history.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('real consumptive typed binding commits its authorized application on retry without executing twice',()=>{
 const initial=r.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 const source=initial.resultFrame.sourceMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});assert.equal(binding.bindingStatus,'ready');
 assert.ok(r.previewClassicalGrammarTypedSourceOperationBindingFrame(binding));
 let calls=0,fail=true,candidate=null;const history=createClassicalGrammarWorkspaceHistory(r);
 const session=createConstructionSession({isSource:x=>x===source,isResult:x=>r.isClassicalNahuatlVncApplicationFrame(x),execute(){calls++;candidate=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);return candidate;},present:()=>true,prepareCommit(app){if(fail)return null;const token=history.prepareRecord(app);return {commit:()=>history.commitRecord(token)};}});
 const previous=r.executeClassicalGrammarTypedSourceOperationBindingFrame(r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{...binding.callerSelections,subject:'1sg'})).canonicalResult;
 assert.equal(session.restore(previous),true);
 session.stage({source,route:{operation:'vnc:application'},ready:true,execution:{kind:'typed',binding}});
 const executedRevision=session.position.revision;
 assert.equal(session.make(),false);assert.ok(candidate?.canonicalResult);const exact=candidate.canonicalResult;assert.equal(session.position.accepted.result===previous,true);assert.equal(history.snapshot().nodeCount,0);fail=false;
 assert.equal(session.make(),true);assert.equal(calls,1);assert.equal(session.position.accepted.result,exact);assert.equal(history.snapshot().nodeCount,1);assert.equal(session.position.accepted.receipt.ownerExecutionRevision,executedRevision);assert.notEqual(session.position.accepted.receipt.executedRevision,executedRevision);
});

test('a failed authorized candidate is discarded on changed Source, choice, packet, or authentic snapshot',async()=>{
 const a=await import('../ui/composition/issued_binding_operation_transaction.mjs');
 for(const change of ['source','choice','packet','snapshot']){
  const result=r.evaluateClassicalNahuatlVncApplication({sourceStem:'chōca',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}).resultFrame;
  const source=result.sourceMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
  const choices={subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
  const issue=s=>r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',s),binding=issue(choices);
  let fail=true,calls=0;const history=createClassicalGrammarWorkspaceHistory(r);
  const session=createConstructionSession({isSource:x=>x===source||x===result,isResult:x=>r.isClassicalNahuatlVncApplicationFrame(x),execute(packet){calls++;return r.executeClassicalGrammarTypedSourceOperationBindingFrame(packet.binding);},present:()=>true,prepareCommit(app){if(fail)return null;const token=history.prepareRecord(app);return {commit:()=>history.commitRecord(token)};}});
  const scope=a.createIssuedBindingOperationScope({owner:r,source,operationId:'vnc:application',ingressKind:'typed',navigator:nav,session,getIngress:()=>nav,reissue:issue});
  const snapshot=a.issueIssuedBindingOperationSnapshot(scope,binding,nav),packet={binding};
  const proposal={source,route:{operation:'vnc:application'},choices,operationContract:snapshot,ready:true,execution:packet};session.stage(proposal);
  assert.equal(session.make(),false);assert.equal(calls,1);fail=false;
  const next={...proposal};
  if(change==='source')next.source=result;
  if(change==='choice')next.choices={...choices,subject:'1sg'};
  if(change==='packet')next.execution={binding};
  if(change==='snapshot')next.operationContract=a.issueIssuedBindingOperationSnapshot(scope,binding,nav);
  session.stage(next);
  assert.equal(session.make(),false,change);assert.equal(calls,2,change);assert.equal(history.snapshot().nodeCount,0,change);assert.equal(session.position.accepted.result,null,change);
 }
});

test('result validation exceptions do not escape the failure boundary or retain an unchecked candidate',()=>{
 const source={},result={},app={authorizationStatus:'authorized',canonicalResult:result};let calls=0;
 const session=createConstructionSession({isSource:x=>x===source,isResult(){throw Error('validation failed');},execute(){calls++;return app;}});
 session.stage({source,route:{operation:'test'},ready:true,execution:{}});
 assert.equal(session.make(),false);assert.equal(session.position.accepted.result,null);
 assert.equal(session.make(),false);assert.equal(calls,2);
});
