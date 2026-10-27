import {installClauseSelectionReaders} from './helpers/clause_selection_reader_fixture.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createComparisonApi} from '../core/comparison/comparison.mjs';
import {resolveComparisonChoices} from '../application/classical/comparison_choices.mjs';
const owner=createComparisonApi();
test('every canonical comparison route has owner choice and input coordination',()=>{
 const routes=owner.getClassicalComparisonRouteInventory();assert.equal(routes.length,23);
 for(const route of routes){
  const contract=owner.getClassicalComparisonChoiceContract(route.id);
  assert(contract,route.id);assert.deepEqual(contract.requiredSlots,route.requiredSlots);
  for(const d of contract.decisions)assert(d.values.length||d.implementationSupport==='source-required',`${route.id}:${d.key}`);
  const resolved=resolveComparisonChoices(contract,{});assert(resolved,route.id);
  assert.equal(resolved.operationSelections.comparisonRoute,route.id);
 }
 assert.equal(owner.getClassicalComparisonChoiceContract('invented'),null);
});
test('route-specific degrees and independent negative adjunctor come from canonical domains',()=>{
 const negative=owner.getClassicalComparisonChoiceContract('comparative-negative-adverbial');
 assert.equal(negative.decisions.find(d=>d.key==='degreeMarker').values.length,12);
 assert.deepEqual(negative.decisions.find(d=>d.key==='negativeStandardIn').values,['yes','no']);
 assert(!negative.decisions.find(d=>d.key==='degreeMarker').values.includes('none'));
 const adversative=owner.getClassicalComparisonChoiceContract('comparative-adversative');
 assert(adversative.decisions.find(d=>d.key==='degreeMarker').values.every(v=>v.split('-').includes('cencah')));
 assert.equal(resolveComparisonChoices(adversative,{}).operationSelections.degreeMarker,'cencah');
 const bad=resolveComparisonChoices(negative,{degreeMarker:'none'});assert.equal(bad.operationSelections.degreeMarker,'');
});
test('source-dependent similarity never advertises an unresolved class as an arbitrary choice',()=>{
 const c=owner.getClassicalComparisonChoiceContract('similarity-reduplicative-prefix',{continuationFamily:'ti-agentive'});
 assert(c.diagnostics.length);assert.equal(c.decisions.find(d=>d.key==='tiClass').implementationSupport,'source-required');
 assert.equal(resolveComparisonChoices(c,{continuationFamily:'ti-agentive'}).operationSelections.tiClass,'');
});
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
test('all23 public controller contracts use current frames and keep missing parents explicit',()=>{
 const c=r.createClassicalClauseRelationController();
 for(const route of owner.getClassicalComparisonRouteInventory()){
  const selections={relation:'comparison',comparisonRoute:route.id};
  const contract=c.buildDecisionContract(selections);assert.equal(contract.currentChoiceFrame?.routeId,route.id);
  assert.equal(contract.authorizationStatus,'blocked',route.id);
  assert.equal(contract.currentChoiceFrame.outcome.readyToMake,false);
  const next=c.transitionComparisonChoice({selections,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key:'comparisonRoute',value:'size-ixquich'}});
  assert.equal(next.contract.currentChoiceFrame?.routeId,'size-ixquich');
 }
});
test('optional absent negative standard retains its choices without offering an inactive control',()=>{
 const c=r.createClassicalClauseRelationController();
 const s={relation:'comparison',comparisonRoute:'comparative-panahuia-unspecified',negativeIntroducer:'in-ahmo-mach-iuh',negativeStandardIn:'no'};
 const contract=c.buildDecisionContract(s);
 assert(!contract.decisions.some(d=>d.id==='negative-introducer'));
 const field=contract.currentChoiceFrame.decisions.find(d=>d.key==='negativeIntroducer');
 assert.equal(field.applicability,'inactive');assert.equal(field.selectedValue,s.negativeIntroducer);
 assert.equal(field.candidates[0].interaction,'unavailable');
});
function noun(stem,sourceClass){const sf=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass});const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[sf,r.buildClassicalNahuatlOrdinaryNncOperationFrame(sf,{subject:'3common',state:'absolutive'})]});assert.equal(receipt.authorizationStatus,'authorized');return receipt.canonicalResult;}
test('one ti class is a fact, multiple classes stay choices, and explicit conflicts block',()=>{
 const c=r.createClassicalClauseRelationController(),single=noun('cal','tli-1'),multiple=noun('coyō','tl');
 c.captureCurrentResult('principal',single);
 const s={relation:'comparison',comparisonRoute:'similarity-reduplicative-prefix',continuationFamily:'ti-agentive',reduplicationShape:'long-cv'};
 const one=c.buildDecisionContract(s);assert.equal(one.operationSelections.tiClass,'a');assert(!one.decisions.some(d=>d.id==='ti-class'));
 assert(one.currentChoiceFrame.facts.ownerFacts.some(f=>f.key==='tiClass'&&f.value==='a'));
 assert.equal(c.buildDecisionContract({...s,tiClass:'b'}).authorizationStatus,'blocked');
 const replaced=c.transitionComparisonChoice({selections:s,expectedFrame:one.currentChoiceFrame,intent:{type:'capture',role:'principal',result:multiple}});
 assert.equal(replaced.authorizationStatus,'authorized');assert.deepEqual(replaced.contract.decisions.find(d=>d.id==='ti-class').values,['a','b']);
 assert.equal(replaced.contract.operationSelections.tiClass,'');assert.equal(replaced.contract.authorizationStatus,'blocked');
 assert.equal(c.getCapturedCanonicalResult('principal'),multiple);
});
test('inactive invalid standard choice cannot block an otherwise valid panahuia; capture restores it visibly',()=>{
 const receipt=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:'cempanahuia',verbClass:'A',sourceValence:'projective-nonhuman',subject:'1sg',objectKind:'projective-nonhuman',requestedDerivation:'direct',requestedVoice:'active',mood:'indicative',tense:'present'}]});assert.equal(receipt.authorizationStatus,'authorized',receipt.blockReason);
 const c=r.createClassicalClauseRelationController(),point=noun('cal','tli-1');c.captureCurrentResult('principal',receipt.canonicalResult);c.captureCurrentResult('adjoined',point);
 const s={relation:'comparison',comparisonRoute:'comparative-panahuia-unspecified',negativeIntroducer:'invented'};
 const contract=c.buildDecisionContract(s);assert.equal(contract.authorizationStatus,'authorized',contract.blockReason);
 assert(!Object.hasOwn(contract.operationSelections,'negativeIntroducer'));assert(!Object.hasOwn(contract.operationSelections,'negativeStandardIn'));
 assert(c.preview(s)?.isCurrent());assert.equal(c.compose(s).authorizationStatus,'authorized');
 const added=c.transitionComparisonChoice({selections:s,expectedFrame:contract.currentChoiceFrame,intent:{type:'capture',role:'supplement',result:point}});
 assert.equal(added.contract.authorizationStatus,'blocked');assert(added.contract.decisions.some(d=>d.id==='negative-introducer'&&!d.resolved));assert.equal(added.selections.negativeIntroducer,'invented');
});
test('compatible explicit reduplication survives a verbal continuation change',()=>{
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',noun('coyō','tl'));
 const s={relation:'comparison',comparisonRoute:'similarity-reduplicative-prefix',continuationFamily:'ti-agentive',reduplicationShape:'long-cv',tiClass:'a'};
 const next=c.transitionComparisonChoice({selections:s,expectedFrame:c.buildDecisionContract(s).currentChoiceFrame,intent:{type:'set-choice',key:'continuationFamily',value:'oyotl-nehnemi'}});
 assert.equal(next.selections.reduplicationShape,'long-cv');assert.equal(next.contract.operationSelections.reduplicationShape,'long-cv');assert(!Object.hasOwn(next.contract.operationSelections,'tiClass'));
});
test('replacing a multi-class Source releases its incompatible inherited class into the new derived fact',()=>{
 const c=r.createClassicalClauseRelationController(),old=noun('coyō','tl'),replacement=noun('cal','tli-1');c.captureCurrentResult('principal',old);
 const s={relation:'comparison',comparisonRoute:'similarity-reduplicative-prefix',continuationFamily:'ti-agentive',reduplicationShape:'long-cv',tiClass:'b'};
 const before=c.buildDecisionContract(s);assert.equal(before.authorizationStatus,'authorized',before.blockReason);
 const moved=c.transitionComparisonChoice({selections:s,expectedFrame:before.currentChoiceFrame,intent:{type:'capture',role:'principal',result:replacement}});
 assert.equal(moved.contract.authorizationStatus,'blocked');assert.equal(moved.selections.tiClass,'b');assert.equal(moved.contract.operationSelections.tiClass,'a');
 const reset=c.transitionComparisonChoice({selections:moved.selections,expectedFrame:moved.contract.currentChoiceFrame,intent:{type:'set-choice',key:'tiClass',value:'a'}});
 const preview=c.preview(reset.selections);assert(preview?.isCurrent());const made=c.compose(reset.selections);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(r.getClassicalComparisonCanonicalSourceResult(made.canonicalResult.operationFrame.sourceSlots.source),replacement);
 assert.equal(c.buildDecisionContract({...moved.selections,tiClass:'b'}).authorizationStatus,'blocked');
});
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
test('saved picker admission and supply share Source-fact recovery after clearing',()=>{
 const c=r.createClassicalClauseRelationController(),old=noun('coyō','tl'),replacement=noun('cal','tli-1'),anchor=noun('mich','in');
 c.captureCurrentResult('principal',old);
 const s={relation:'comparison',comparisonRoute:'similarity-reduplicative-prefix',continuationFamily:'ti-agentive',reduplicationShape:'long-cv',tiClass:'b'};
 const cleared=c.transitionComparisonChoice({selections:s,expectedFrame:c.buildDecisionContract(s).currentChoiceFrame,intent:{type:'clear-capture',role:'principal'}});
 const ownerBindingFrame=r.issueClassicalClauseRelationBindingFrame('clause:comparison',anchor,['adjoined']);assert.equal(ownerBindingFrame.authorizationStatus,'authorized');
 const binding={family:'clause-relation',operationId:'clause:comparison',exactResult:anchor,ownerBindingFrame,selectedBindingId:'comparison:adjoined',requiredResultRoles:['principal']};
 const context={targetObject:{...r,document:{getElementById:()=>null}},ClassicalClauseRelationSelections:{...cleared.selections},ActiveClassicalGrammarResultBinding:binding,
 getClassicalClauseRelationControllerForRendering:()=>c,issueClassicalClauseRelationCurrentDiscourseSourceContextFrame:()=>null,
 ClassicalClauseRelationStatusMessage:'',enterClassicalGrammarResultBindingChoice(id,options){assert.equal(options.allowExecution,false);return true;},syncClassicalGrammarWorkspaceHistory(){},syncClassicalCapabilityApplyOperationState(){}};
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');vm.createContext(context);installClauseSelectionReaders(context);
 for(const name of ['canClassicalSavedResultFillBinding','supplyClassicalGrammarWorkspaceResultToBinding']) {const a=code.indexOf(`    function ${name}(`);vm.runInContext(code.slice(a,code.indexOf('\n    function ',a+20)),context);}
 assert.equal(context.canClassicalSavedResultFillBinding(binding,replacement),true);assert.equal(c.getCapturedCanonicalResult('principal'),null);
 assert.equal(context.canClassicalSavedResultFillBinding(binding,{...replacement}),false);
 assert.equal(context.supplyClassicalGrammarWorkspaceResultToBinding({canonicalResult:replacement}),true);
 assert.equal(context.ClassicalClauseRelationSelections.tiClass,'b');assert.equal(c.getCapturedCanonicalResult('principal'),replacement);
 assert.equal(c.buildDecisionContract(context.ClassicalClauseRelationSelections).authorizationStatus,'blocked');assert(c.buildDecisionContract(context.ClassicalClauseRelationSelections).decisions.some(d=>d.responsibility==='application-recovery'));
});
test('fixed-fact conflicts remain explicit through same-source capture and unrelated binding',()=>{
 const c=r.createClassicalClauseRelationController(),parent=noun('cal','tli-1');c.captureCurrentResult('principal',parent);
 const s={relation:'comparison',comparisonRoute:'similarity-reduplicative-prefix',continuationFamily:'ti-agentive',reduplicationShape:'long-cv',tiClass:'b'};
 const before=c.buildDecisionContract(s);
 const next=c.transitionComparisonChoice({selections:s,expectedFrame:before.currentChoiceFrame,intent:{type:'capture',role:'principal',result:parent}});
 assert.equal(next.contract.authorizationStatus,'blocked');assert.equal(next.selections.tiClass,'b');
 const recovery=next.contract.decisions.find(d=>d.key==='tiClass');assert(recovery);assert.equal(recovery.responsibility,'application-recovery');assert.deepEqual(recovery.values,['a']);assert.equal(recovery.resolved,false);
 const fixed=c.transitionComparisonChoice({selections:next.selections,expectedFrame:next.contract.currentChoiceFrame,intent:{type:'set-choice',key:'tiClass',value:'a'}});
 assert.equal(fixed.contract.authorizationStatus,'authorized');assert(!fixed.contract.decisions.some(d=>d.key==='tiClass'));
});
