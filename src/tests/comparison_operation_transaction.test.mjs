import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {issueComparisonOperationSnapshot,transitionComparisonOperationSnapshot,readComparisonOperationSelections} from '../ui/composition/comparison_operation_transaction.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=stem=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
const parents={principal:noun('canāhuac'),adjoined:noun('tomāhuac'),dependent:noun('chicāhuac')};
const legacy=Object.freeze({relation:'comparison',comparisonRoute:'equality-iuhqui'});
function setup(){const c=r.createClassicalClauseRelationController();for(const [role,p]of Object.entries(parents))c.captureCurrentResult(role,p);return{c,s:issueComparisonOperationSnapshot(c,legacy,parents.principal)};}
test('one owner snapshot retains explicit intent, dependency, authentic captures and preview isolation',()=>{
 const {c,s}=setup();assert.equal(s.contract.currentChoiceFrame.decisions.find(d=>d.key==='icRelation').selectionOrigin,'application-default');
 const next=transitionComparisonOperationSnapshot(s,{type:'set-choice',key:'icRelation',value:'no'},s.contract.currentChoiceFrame);
 assert.equal(next.authorizationStatus,'authorized');const off=next.snapshot;
 assert.equal(off.contract.currentChoiceFrame.inputs.find(i=>i.slot==='dimension').contribution,'retained-not-included');
 assert.equal(off.captures.find(x=>x.role==='dependent').exact,parents.dependent);
 assert.equal(readComparisonOperationSelections(off,legacy,parents.principal),off.selections);
 const preview=c.preview(off.selections);assert.ok(preview?.isCurrent());
 const on=transitionComparisonOperationSnapshot(off,{type:'set-choice',key:'icRelation',value:'yes'},off.contract.currentChoiceFrame).snapshot;
 assert.equal(on.contract.currentChoiceFrame.inputs.find(i=>i.slot==='dimension').requirement,'required');
 assert.equal(preview.isCurrent(),false);
 assert.equal(transitionComparisonOperationSnapshot(s,{type:'set-choice',key:'icRelation',value:'no'},s.contract.currentChoiceFrame).authorizationStatus,'blocked');
 const copied=transitionComparisonOperationSnapshot(on,{type:'capture',role:'dependent',result:{...parents.dependent}},on.contract.currentChoiceFrame);
 assert.equal(copied.authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('dependent'),parents.dependent);
});
test('nonpilot and changed Source return original legacy object without inferred authority',()=>{
 const {s}=setup();const other={relation:'conjunction'};
 assert.equal(readComparisonOperationSelections(s,other,parents.principal),other);
 const restored={...legacy,icRelation:"yes"};assert.equal(readComparisonOperationSelections(s,restored,parents.principal),restored);
 assert.equal(readComparisonOperationSelections(s,legacy,parents.adjoined),legacy);
 assert.equal(issueComparisonOperationSnapshot(s.controller,other,parents.principal),null);
});

import {createConstructionSession} from '../ui/composition/construction_session.mjs';
test('session revision owns snapshot publication and explicit Make preserves exact parents',()=>{
 const {c,s}=setup();let shown=null;
 const session=createConstructionSession({isSource:x=>Object.values(parents).includes(x),isResult:x=>r.isClassicalComparisonResultFrame(x),execute:packet=>{const made=c.compose(packet.selections);return{...made,canonicalResult:made.canonicalResult};},present:x=>{shown=x.canonicalResult;return true;}});
 const proposal=snapshot=>({source:snapshot.source,route:{operation:'clause:comparison'},slots:snapshot.captures,choices:snapshot.selections,operationContract:snapshot,legalMoves:[{type:'choice',id:'icRelation',values:['yes','no']}],ready:snapshot.contract.authorizationStatus==='authorized',execution:{selections:snapshot.selections}});
 session.stage(proposal(s));assert.equal(session.position.operationContract,s);
 const initial=session.position.revision;
 assert.equal(session.dispatch({type:'choice',id:'icRelation',value:'no',revision:initial},()=>proposal(transitionComparisonOperationSnapshot(s,{type:'set-choice',key:'icRelation',value:'no'},s.contract.currentChoiceFrame).snapshot)),true);
 const current=session.position;assert.equal(current.accepted.result,null);assert.equal(current.operationContract.selections.icRelation,'no');assert.equal(current.revision,initial+1);
 assert.equal(session.dispatch({type:'choice',id:'icRelation',value:'yes',revision:initial},()=>{throw Error('stale reached resolver');}),false);
 assert.equal(session.make(current.revision),true);assert.equal(session.position.accepted.result,shown);
 const accepted=shown;const off=session.position.operationContract;
 const on=transitionComparisonOperationSnapshot(off,{type:'set-choice',key:'icRelation',value:'yes'},off.contract.currentChoiceFrame).snapshot;
 session.stage(proposal(on));const preview=c.preview(on.selections);assert.ok(preview);assert.equal(session.position.accepted.result,accepted);
 assert.equal(on.captures.find(x=>x.role==='principal').exact,parents.principal);
 assert.equal(session.position.operationContract,on);
});
test('explicit default changes provenance and revision; active Make forbids a pilot transition',()=>{
 const {c,s}=setup();let inside;
 const session=createConstructionSession({isSource:x=>Object.values(parents).includes(x),isResult:x=>r.isClassicalComparisonResultFrame(x),execute:()=>{inside=session.canTransition(session.position.revision);return c.compose(session.position.operationContract.selections);},present:()=>true});
 const p=snapshot=>({source:snapshot.source,route:{operation:'clause:comparison'},slots:snapshot.captures,choices:{icRelation:'yes'},operationContract:snapshot,ready:true,execution:{}});
 session.stage(p(s));const rev=session.position.revision;
 const explicit=transitionComparisonOperationSnapshot(s,{type:'set-choice',key:'icRelation',value:'yes'},s.contract.currentChoiceFrame).snapshot;
 session.stage(p(explicit));assert.equal(session.position.revision,rev+1);assert.equal(session.position.operationContract.contract.currentChoiceFrame.decisions.find(x=>x.key==='icRelation').selectionOrigin,'explicit-user');
 assert.equal(session.make(),true);assert.equal(inside,false);
});
test('partial pending-Source projection retains intent; explicit departure withdraws it',()=>{
 const {s}=setup();const off=transitionComparisonOperationSnapshot(s,{type:'set-choice',key:'icRelation',value:'no'},s.contract.currentChoiceFrame).snapshot;
 const session=createConstructionSession({isSource:x=>Object.values(parents).includes(x),isResult:()=>false});
 const base={source:parents.principal,route:{operation:'clause:comparison'},slots:off.captures,choices:off.selections,ready:false};
 session.stage({...base,operationContract:off});session.stage({...base,sourcePending:true});assert.equal(session.position.operationContract,off);
 session.stage(base);assert.equal(session.position.operationContract.selections.icRelation,'no');
 session.stage({...base,route:{operation:'nnc:ordinary'},operationContract:null});assert.equal(session.position.operationContract,null);
});
