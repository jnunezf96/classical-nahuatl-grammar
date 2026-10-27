import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {issueComparisonOperationSnapshot,transitionComparisonOperationSnapshot,readComparisonOperationSelections} from '../ui/composition/comparison_operation_transaction.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=stem=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
const parents={principal:noun('canāhuac'),adjoined:noun('tomāhuac'),dependent:noun('chicāhuac')};
const route='similarity-iuhqui-principal';
function setup(){const c=r.createClassicalClauseRelationController();for(const [role,p]of Object.entries(parents))c.captureCurrentResult(role,p);const ingress=Object.freeze({relation:'comparison',comparisonRoute:route});return{c,ingress,s:issueComparisonOperationSnapshot(c,ingress,parents.principal)};}
test('similarity transaction retains independent choices through dependency loss and authentic recovery',()=>{
 const {c,ingress,s}=setup();assert.ok(s,'new route must use existing session contract');assert.equal(s.routeId,route);
 let current=s;const step=intent=>{const t=transitionComparisonOperationSnapshot(current,intent,current.contract.currentChoiceFrame);assert.equal(t.authorizationStatus,'authorized');current=t.snapshot;assert.ok(current);return current;};
 step({type:'set-choice',key:'iuhquiModifier',value:'ca-zan'});step({type:'set-choice',key:'adjunctorIn',value:'no'});step({type:'set-choice',key:'icRelation',value:'no'});
 assert.equal(current.contract.currentChoiceFrame.inputs.find(i=>i.slot==='dimension').contribution,'retained-not-included');
 const prior=current;step({type:'set-choice',key:'icRelation',value:'yes'});
 assert.equal(current.selections.iuhquiModifier,'ca-zan');assert.equal(current.selections.adjunctorIn,'no');
 assert.equal(transitionComparisonOperationSnapshot(prior,{type:'set-choice',key:'icRelation',value:'no'},prior.contract.currentChoiceFrame).authorizationStatus,'blocked');
 const copied=transitionComparisonOperationSnapshot(current,{type:'capture',role:'principal',result:{...parents.principal}},current.contract.currentChoiceFrame);assert.equal(copied.authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('principal'),parents.principal);
 step({type:'clear-capture',role:'principal'});assert.notEqual(current.contract.authorizationStatus,'authorized');assert.equal(c.preview(current.selections),null);
 step({type:'capture',role:'principal',result:parents.principal});assert.equal(current.contract.authorizationStatus,'authorized');assert.equal(current.selections.adjunctorIn,'no');
 assert.equal(readComparisonOperationSelections(current,ingress,parents.principal),current.selections);
 const other={relation:'comparison',comparisonRoute:'equality-ihuan'};assert.equal(issueComparisonOperationSnapshot(c,other,parents.principal),null);assert.equal(readComparisonOperationSelections(current,other,parents.principal),other);
 const newIngress={...current.selections};assert.equal(readComparisonOperationSelections(current,newIngress,parents.principal),newIngress);const reentered=issueComparisonOperationSnapshot(c,newIngress,parents.principal);assert.equal(reentered.routeId,route);assert.equal(reentered.selections.iuhquiModifier,'ca-zan');
});
test('similarity session publishes current request and Make preserves exact adjoined/topic/dimension',()=>{
 const {c,s}=setup();assert.ok(s);const session=createConstructionSession({isSource:x=>Object.values(parents).includes(x),isResult:x=>r.isClassicalComparisonResultFrame(x),execute:packet=>c.compose(packet.selections),present:()=>true});
 const proposal=snapshot=>({source:snapshot.source,route:{operation:'clause:comparison'},slots:snapshot.captures,choices:snapshot.selections,operationContract:snapshot,ready:snapshot.contract.authorizationStatus==='authorized',execution:{selections:snapshot.selections}});
 session.stage(proposal(s));const next=transitionComparisonOperationSnapshot(s,{type:'set-choice',key:'adjunctorIn',value:'no'},s.contract.currentChoiceFrame).snapshot;session.stage(proposal(next));assert.equal(session.position.operationContract,next);assert.equal(session.position.accepted.result,null);
 assert.equal(session.make(session.position.revision),true);const made=session.position.accepted.result;assert.equal(made.routeId,route);assert.equal(made.operationFrame.choices.adjunctorIn,false);
 for(const [slot,role]of Object.entries({topic:'adjoined',adjoined:'principal',dimension:'dependent'}))assert.equal(r.getClassicalComparisonCanonicalSourceResult(made.operationFrame.sourceSlots[slot]),parents[role]);
});
