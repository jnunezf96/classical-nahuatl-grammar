import test from 'node:test';
import assert from 'node:assert/strict';
import {createComparisonApi} from '../core/comparison/comparison.mjs';
const owner=createComparisonApi();
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const routes=['equality-iuhqui','equality-ihuan','similarity-iuhqui-principal'];
const noun=stem=>{const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
const parents={principal:noun('canāhuac'),adjoined:noun('tomāhuac'),dependent:noun('chicāhuac')};
function setup(route,dimension=true){const c=r.createClassicalClauseRelationController();for(const [role,parent] of Object.entries(parents))if(dimension||role!=='dependent')assert.equal(c.captureCurrentResult(role,parent).authorizationStatus,'authorized');return {c,s:{relation:'comparison',comparisonRoute:route}};}
for(const route of routes){
 test(`${route}: owner domains distinguish optional relation from its required input`,()=>{
  const yes=owner.getClassicalComparisonChoiceContract(route,{icRelation:'yes'}),no=owner.getClassicalComparisonChoiceContract(route,{icRelation:'no'});
  assert.deepEqual(yes.decisions.find(d=>d.key==='icRelation').values,['yes','no']);
  assert(yes.requiredSlots.includes('dimension'));assert(!no.requiredSlots.includes('dimension'));
  assert.equal(no.inputs.find(i=>i.slot==='dimension').contribution,'retained-not-included');
  assert.equal(yes.decisions.some(d=>d.key==='adjunctorIn'),route==='similarity-iuhqui-principal');
  assert(Object.isFrozen(yes.decisions));assert.equal(owner.getClassicalComparisonChoiceContract('size-ixquich',{}),null);
 });
 test(`${route}: shared frame explains default, prerequisite and explicit choice without changing parent`,()=>{
  const {c,s}=setup(route,false);let contract=c.buildDecisionContract(s),frame=contract.currentChoiceFrame;
  assert(frame);assert.equal(frame.decisions.find(d=>d.key==='icRelation').selectionOrigin,'application-default');
  assert.equal(frame.inputs.find(i=>i.slot==='dimension').requirement,'required');assert.equal(frame.outcome.readyToMake,false);
  contract=c.buildDecisionContract({...s,icRelation:'no'});frame=contract.currentChoiceFrame;
  assert.equal(frame.decisions.find(d=>d.key==='icRelation').selectionOrigin,'explicit-user');assert.equal(frame.outcome.readyToMake,true);
  assert.equal(c.getCapturedCanonicalResult('principal'),parents.principal);
  const invalid=c.buildDecisionContract({...s,icRelation:'invented'});
  assert.equal(invalid.authorizationStatus,'blocked');assert.equal(invalid.currentChoiceFrame.decisions.find(d=>d.key==='icRelation').selectedValue,'');
  assert.equal(invalid.currentChoiceFrame.decisions.find(d=>d.key==='icRelation').requestedValue,'invented');
 });
}
test('public explicit Yes policy does not replace owner omitted-value semantics',()=>{
 const slots={comparand:r.buildClassicalComparisonSourceUnit({sourceResult:parents.principal}),standard:r.buildClassicalComparisonSourceUnit({sourceResult:parents.adjoined})};
 const op=r.evaluateClassicalNahuatlComparison({routeId:'equality-iuhqui',slots});assert.equal(op.authorizationStatus,'authorized');assert(!op.selectedResult.includes('īc'));
 const {c,s}=setup('equality-iuhqui',false);assert.equal(c.buildDecisionContract(s).authorizationStatus,'blocked');
});
for(const route of routes)test(`${route}: transition authority preserves choices and rejects stale/copy inputs`,()=>{
 const {c,s}=setup(route);let selections={...s,icRelation:'yes'};
 const frame=c.buildDecisionContract(selections).currentChoiceFrame;
 const clear=c.transitionComparisonChoice({selections,expectedFrame:frame,intent:{type:'clear-capture',role:'dependent'}});
 assert.equal(clear.authorizationStatus,'authorized');assert.equal(clear.selections.comparisonRoute,route);assert.equal(clear.selections.icRelation,'yes');
 assert.equal(clear.contract.currentChoiceFrame.outcome.readyToMake,false);
 const stale=c.transitionComparisonChoice({selections,expectedFrame:frame,intent:{type:'set-choice',key:'icRelation',value:'no'}});assert.equal(stale.authorizationStatus,'blocked');
 selections=clear.selections;const current=clear.contract.currentChoiceFrame;
 const copied=c.transitionComparisonChoice({selections,expectedFrame:{...current},intent:{type:'set-choice',key:'icRelation',value:'no'}});assert.equal(copied.authorizationStatus,'blocked');
 const off=c.transitionComparisonChoice({selections,expectedFrame:current,intent:{type:'set-choice',key:'icRelation',value:'no'}});
 assert.equal(off.contract.currentChoiceFrame.outcome.readyToMake,true);selections=off.selections;
 const fake=c.transitionComparisonChoice({selections,expectedFrame:off.contract.currentChoiceFrame,intent:{type:'capture',role:'dependent',result:{...parents.dependent}}});assert.equal(fake.authorizationStatus,'blocked');
 const capture=c.transitionComparisonChoice({selections,expectedFrame:off.contract.currentChoiceFrame,intent:{type:'capture',role:'dependent',result:parents.dependent}});
 assert.equal(capture.authorizationStatus,'authorized');assert.equal(capture.contract.currentChoiceFrame.inputs.find(i=>i.slot==='dimension').contribution,'retained-not-included');assert.equal(c.getCapturedCanonicalResult('dependent'),parents.dependent);
 const invalid=c.transitionComparisonChoice({selections:capture.selections,expectedFrame:capture.contract.currentChoiceFrame,intent:{type:'set-choice',key:'icRelation',value:'invalid'}});assert.equal(invalid.contract.authorizationStatus,'blocked');assert.equal(invalid.selections.icRelation,'invalid');
});
test('pilot route changes invalidate old intents and delegate nonpilot contract without creating a second grammar',()=>{
 const {c,s}=setup('equality-iuhqui');const start=c.buildDecisionContract(s).currentChoiceFrame;
 const next=c.transitionComparisonChoice({selections:s,expectedFrame:start,intent:{type:'set-choice',key:'comparisonRoute',value:'equality-ihuan'}});
 assert.equal(next.contract.derived.comparisonRoute,'equality-ihuan');
 const stale=c.transitionComparisonChoice({selections:next.selections,expectedFrame:start,intent:{type:'clear-capture',role:'principal'}});assert.equal(stale.authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('principal'),parents.principal);
 const out=c.transitionComparisonChoice({selections:next.selections,expectedFrame:next.contract.currentChoiceFrame,intent:{type:'set-choice',key:'comparisonRoute',value:'size-ixquich'}});assert.equal(out.contract.currentChoiceFrame,undefined);assert.equal(out.contract.derived.comparisonRoute,'size-ixquich');
 const reenter=c.transitionComparisonChoice({selections:out.selections,intent:{type:'set-choice',key:'comparisonRoute',value:'equality-iuhqui'}});assert.equal(reenter.contract.currentChoiceFrame.routeId,'equality-iuhqui');
});
import {comparisonCapturePresentation} from '../ui/composition/structure_design.mjs';
test('capture presentation consumes issued description instead of reconstructing choice conditions',()=>{
 const {c,s}=setup('equality-iuhqui');const contract=c.buildDecisionContract({...s,icRelation:'no'});
 const display={...contract,operationSelections:{icRelation:'yes'}};
 assert.deepEqual(comparisonCapturePresentation(display,'dependent'),{required:false,retainedOnly:true});
});
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {Element} from './helpers/organization_dom.mjs';
test('capability choice surface forwards the same rendered frame to each control',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const start=code.indexOf('    function syncClassicalClauseRelationCapabilityChoices(');const end=code.indexOf('\n    function ',start+10);
 const {c,s}=setup('equality-iuhqui');const contract=c.buildDecisionContract(s);const seen=[];const host=new Element();
 const ctx={targetObject:{document:{getElementById:()=>host}},clearOwnerChoicePortals(){},createClassicalClauseRelationDecisionControl(decision,frame){seen.push(frame);return new Element();}};
 vm.runInNewContext(code.slice(start,end),ctx);ctx.syncClassicalClauseRelationCapabilityChoices(contract,[]);
 assert(seen.length>0);assert(seen.every(frame=>frame===contract.currentChoiceFrame));
});
test('a preview becomes stale when choices change even though captured parents do not',()=>{
 const {c,s}=setup('equality-iuhqui');const preview=c.preview({...s,icRelation:'yes'});assert(preview?.isCurrent());
 const selections={...s,icRelation:'yes'},frame=c.buildDecisionContract(selections).currentChoiceFrame;
 c.transitionComparisonChoice({selections,expectedFrame:frame,intent:{type:'set-choice',key:'icRelation',value:'no'}});
 assert.equal(preview.isCurrent(),false);
});
test('leaving the pilot rejects its old callbacks instead of delegating them to legacy mutation',()=>{
 const {c,s}=setup('equality-iuhqui');const frame=c.buildDecisionContract(s).currentChoiceFrame;
 const out=c.transitionComparisonChoice({selections:s,expectedFrame:frame,intent:{type:'set-choice',key:'comparisonRoute',value:'size-ixquich'}});
 for(const selections of [out.selections,{relation:'conjunction'}])for(const intent of [{type:'clear-capture',role:'principal'},{type:'capture',role:'principal',result:parents.adjoined},{type:'set-choice',key:'icRelation',value:'no'}]){
  const stale=c.transitionComparisonChoice({selections,expectedFrame:frame,intent});assert.equal(stale.handled,true);assert.equal(stale.authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('principal'),parents.principal);
 }
 assert.equal(c.transitionComparisonChoice({selections:out.selections,intent:{type:'set-choice',key:'adjunctorIn',value:'no'}}).handled,false);
});
test('bound capability controls receive a fresh frame after each consecutive choice',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const {c,s}=setup('equality-iuhqui');let displayed=c.buildDecisionContract(s).currentChoiceFrame;
 const ctx={ClassicalClauseRelationSelections:s,ActiveClassicalClauseRelationResult:null,ClassicalClauseRelationStatusMessage:'',ActiveClassicalRuleLogicSurfaceFrame:{},ActiveClassicalGrammarResultBinding:{family:'clause-relation',ownerBindingFrame:{}},
  targetObject:{isClassicalClauseRelationBindingFrame:()=>true},getClassicalClauseRelationControllerForRendering:()=>c,
  syncClassicalClauseRelationCapabilityChoices(contract){displayed=contract.currentChoiceFrame;},syncClassicalDiscourseContextControls(){},normalizeClassicalBasalUnitForRendering:x=>x,
  getActiveClassicalCapabilityApplicationResult:()=>({}),renderClassicalCapabilityApplicationResultForReview:()=>true,syncClassicalCapabilityApplyOperationState(){},formatClassicalClauseRelationValue:x=>x};
 vm.createContext(ctx);for(const name of ['applyClassicalComparisonChoiceIntent','refreshClassicalClauseRelationWorkflow']){const start=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);}
 const before=displayed;ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key:'icRelation',value:'no'},displayed);
 assert.notEqual(displayed,before);assert.equal(ctx.ClassicalClauseRelationSelections.icRelation,'no');
 ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key:'icRelation',value:'yes'},displayed);
 assert.equal(ctx.ClassicalClauseRelationSelections.icRelation,'yes');assert(c.isCurrentChoiceFrame(displayed,ctx.ClassicalClauseRelationSelections));
 ctx.applyClassicalComparisonChoiceIntent(c,{type:'set-choice',key:'comparisonRoute',value:'size-ixquich'},displayed);
 assert.equal(displayed,undefined);assert.equal(ctx.ActiveClassicalGrammarResultBinding.clauseRelationDecisionContract.derived.comparisonRoute,'size-ixquich');
});
