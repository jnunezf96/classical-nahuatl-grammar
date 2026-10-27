import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {issueComparisonOperationSnapshot,transitionComparisonOperationSnapshot,readComparisonOperationSelections} from '../ui/composition/comparison_operation_transaction.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const noun=stem=>{const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
const parents={principal:noun('canāhuac'),adjoined:noun('tomāhuac'),dependent:noun('chicāhuac')};
const route='comparative-tachcauh-hualcah';
function setup(){const c=r.createClassicalClauseRelationController();for(const [role,p]of Object.entries(parents))c.captureCurrentResult(role,p);const ingress=Object.freeze({relation:'comparison',comparisonRoute:route});return{c,ingress,s:issueComparisonOperationSnapshot(c,ingress,parents.principal)};}
test('comparative contract preserves independent choices and obligatory point across negative-standard in',()=>{
 const {c,ingress,s}=setup();assert.ok(s,'new comparative route uses session contract');assert.equal(s.routeId,route);assert.equal(s.contract.currentChoiceFrame.decisions.some(x=>x.key==='icRelation'),false);
 let current=s;const step=intent=>{const t=transitionComparisonOperationSnapshot(current,intent,current.contract.currentChoiceFrame);assert.equal(t.authorizationStatus,'authorized');current=t.snapshot;assert.ok(current);return current;};
 for(const [key,value]of Object.entries({principalNnc:'hualcah',degreeMarker:'huel-oc-achi',copula:'yes',adjunctorIn:'no',negativeIntroducer:'in-ahmo-mach-iuh'}))step({type:'set-choice',key,value});
 const before=current;step({type:'set-choice',key:'negativeStandardIn',value:'no'});
 const madeOff=c.compose(current.selections).canonicalResult;assert.equal(madeOff.operationFrame.choices.negativeIntroducer.surface,'ahmō mach iuh');assert.equal(madeOff.operationFrame.choices.adjunctorIn,false);assert.match(madeOff.selectedResult,/īc/);
 assert.equal(transitionComparisonOperationSnapshot(before,{type:'set-choice',key:'copula',value:'no'},before.contract.currentChoiceFrame).authorizationStatus,'blocked');
 step({type:'set-choice',key:'negativeStandardIn',value:'yes'});assert.equal(c.compose(current.selections).canonicalResult.operationFrame.choices.negativeIntroducer.surface,'in ahmō mach iuh');
 for(const [key,value]of Object.entries({principalNnc:'hualcah',degreeMarker:'huel-oc-achi',copula:'yes',adjunctorIn:'no'}))assert.equal(current.selections[key],value);
 const copied=transitionComparisonOperationSnapshot(current,{type:'capture',role:'principal',result:{...parents.principal}},current.contract.currentChoiceFrame);assert.equal(copied.authorizationStatus,'blocked');
 step({type:'clear-capture',role:'principal'});assert.notEqual(current.contract.authorizationStatus,'authorized');assert.equal(c.preview(current.selections),null);
 step({type:'capture',role:'principal',result:parents.principal});assert.equal(current.contract.authorizationStatus,'authorized');assert.equal(current.selections.principalNnc,'hualcah');
 assert.equal(readComparisonOperationSelections(current,ingress,parents.principal),current.selections);
 const other={relation:'comparison',comparisonRoute:'equality-ihuan'};assert.equal(issueComparisonOperationSnapshot(c,other,parents.principal),null);assert.equal(readComparisonOperationSelections(current,other,parents.principal),other);
});
test('comparative Make consumes session request with exact point/standard/topic',()=>{
 const {c,s}=setup();assert.ok(s);const session=createConstructionSession({isSource:x=>Object.values(parents).includes(x),isResult:x=>r.isClassicalComparisonResultFrame(x),execute:packet=>c.compose(packet.selections),present:()=>true});
 const next=transitionComparisonOperationSnapshot(s,{type:'set-choice',key:'negativeStandardIn',value:'no'},s.contract.currentChoiceFrame).snapshot;
 session.stage({source:next.source,route:{operation:'clause:comparison'},slots:next.captures,choices:next.selections,operationContract:next,ready:next.contract.authorizationStatus==='authorized',execution:{selections:next.selections}});assert.equal(session.position.accepted.result,null);assert.equal(session.make(session.position.revision),true);const made=session.position.accepted.result;assert.equal(made.routeId,route);assert.equal(made.operationFrame.choices.negativeStandardIn,false);
 for(const [slot,role]of Object.entries({point:'principal',standard:'adjoined',topic:'dependent'}))assert.equal(r.getClassicalComparisonCanonicalSourceResult(made.operationFrame.sourceSlots[slot]),parents[role]);
});
