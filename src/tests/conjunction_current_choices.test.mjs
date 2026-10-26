import test from 'node:test';
import assert from 'node:assert/strict';
import {createConjunctionClauseGlobals} from '../core/clause/conjunction/conjunction.mjs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const base={relation:'conjunction',coordinationRelation:'unmarked',coordinationType:'additive',clauseLevel:'principal',polarity:'positive',leftContext:'present',rightwardModifier:'none',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',adjoinedFunction:'none',boundaryPunctuation:'none'};
const owner=createConjunctionClauseGlobals(r);
const domain=(s,key)=>owner.getClassicalConjunctionChoiceContract(s).decisions.find(d=>d.key===key);
test('ordinary conjunction owner supplies complete domains and coupled availability',()=>{
 assert.equal(domain(base,'rightwardModifier').values.length,14);
 assert.deepEqual(domain({...base,coordinationType:' Additive '},'rightwardModifier').values,domain(base,'rightwardModifier').values);
 assert.equal(domain({...base,coordinationType:'alternative'},'rightwardModifier').values.length,9);
 assert.equal(domain({...base,coordinationType:'adversative'},'rightwardModifier').values.length,6);
 assert.equal(domain(base,'modifierAdjunctor').optionAvailability.find(o=>o.value==='in').status,'incompatible');
 assert.equal(domain({...base,coordinationType:'adversative',rightwardModifier:'yeh'},'modifierAdjunctor').optionAvailability.find(o=>o.value==='in').status,'available');
 assert.equal(domain({...base,coordinationRelation:'marked',clauseLevel:'adjoined'},'clauseLevel').optionAvailability.find(o=>o.value==='adjoined').status,'available');
 assert.equal(domain(base,'adjoinedFunction').optionAvailability.find(o=>o.value==='adjectival-modifier').status,'incompatible');
 assert.equal(domain({...base,clauseLevel:'adjoined'},'adjoinedFunction').optionAvailability.find(o=>o.value==='none').status,'incompatible');
});
test('ordinary conjunction current frame keeps incompatible requests, rejects stale or copied frames',()=>{
 const c=r.createClassicalClauseRelationController();
 const start=c.buildDecisionContract(base).currentChoiceFrame;
 assert.equal(start.familyId,'conjunction');assert.equal(start.executionAuthority,false);
 const next=c.transitionConjunctionChoice({selections:base,expectedFrame:start,intent:{type:'set-choice',key:'modifierAdjunctor',value:'in'}});
 assert.equal(next.selections.modifierAdjunctor,'in');assert.equal(next.contract.authorizationStatus,'blocked');
 assert.equal(next.contract.decisions.find(d=>d.id==='modifier-adjunctor').resolved,false);
 for(const frame of [start,{...next.contract.currentChoiceFrame}]) assert.equal(c.transitionConjunctionChoice({selections:next.selections,expectedFrame:frame,intent:{type:'set-choice',key:'modifierAdjunctor',value:'none'}}).authorizationStatus,'blocked');
 const fixed=c.transitionConjunctionChoice({selections:next.selections,expectedFrame:next.contract.currentChoiceFrame,intent:{type:'set-choice',key:'modifierAdjunctor',value:'none'}});
 assert.equal(fixed.contract.decisions.find(d=>d.id==='modifier-adjunctor').resolved,true);
});

test('loss of contextual silence eligibility preserves the request and exposes explicit recovery',()=>{
 const c=r.createClassicalClauseRelationController();
 const pending={...base,contextualSilentFirstPerson:'present'};
 const contract=c.buildDecisionContract(pending);
 assert.equal(contract.decisions.find(d=>d.id==='contextual-silent-first-person').resolved,false);
 const reset=c.transitionConjunctionChoice({selections:pending,expectedFrame:contract.currentChoiceFrame,intent:{type:'set-choice',key:'contextualSilentFirstPerson',value:'absent'}});
 assert.equal(reset.authorizationStatus,'authorized');assert.equal(reset.selections.contextualSilentFirstPerson,'absent');
 assert(!reset.contract.decisions.some(d=>d.id==='contextual-silent-first-person'));
 const absent=c.buildDecisionContract({...base,coordinationRelation:'marked',leftContext:'absent'}).currentChoiceFrame;
 assert.equal(absent.inputs.find(i=>i.role==='adjoined').applicability,'inactive');
});
test('captured parents survive optional suppression, invalid type changes and forged replacement',()=>{
 const noun=stem=>{const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'zero'});return r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]}).canonicalResult;};
 const a=noun('canāhuac'),b=noun('chicāhuac'),c=r.createClassicalClauseRelationController();
 c.captureCurrentResult('principal',a);c.captureCurrentResult('adjoined',b);
 const history=r.getClassicalGrammarWorkspaceHistorySnapshot();
 const start={...base,rightwardModifier:'ihuan'};
 const preview=c.preview(start);assert(preview?.isCurrent());
 const changed=c.transitionConjunctionChoice({selections:start,expectedFrame:c.buildDecisionContract(start).currentChoiceFrame,intent:{type:'set-choice',key:'coordinationType',value:'adversative'}});
 assert.equal(preview.isCurrent(),false);
 assert.equal(changed.selections.rightwardModifier,'ihuan');assert.equal(changed.contract.decisions.find(d=>d.id==='rightward-modifier').selectedValue,'');
 const absent={...base,coordinationRelation:'marked',leftContext:'absent'};
 const contract=c.buildDecisionContract(absent);assert.equal(contract.authorizationStatus,'authorized');
 assert.equal(c.getCapturedCanonicalResult('adjoined'),b);assert.equal(contract.currentChoiceFrame.inputs.find(i=>i.role==='adjoined').applicability,'inactive');
 const forged=c.transitionConjunctionChoice({selections:absent,expectedFrame:contract.currentChoiceFrame,intent:{type:'capture',role:'principal',result:{...a}}});
 assert.equal(forged.authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('principal'),a);
 assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);
 const made=c.compose(base);assert.equal(made.authorizationStatus,'authorized');assert.equal(made.canonicalResult.conjuncts.length,2);
});
test('eligible first-person silence can be cleared, explicitly reset and restored without losing exact parents',()=>{
 const v=stem=>r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,verbClass:stem==='mati'?'B':'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present'}]}).canonicalResult;
 const first=v('cuīca'),second=v('mati'),c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',first);c.captureCurrentResult('adjoined',second);
 const s={...base,contextualSilentFirstPerson:'present'},before=c.buildDecisionContract(s);
 assert.equal(before.authorizationStatus,'authorized');
 const cleared=c.transitionConjunctionChoice({selections:s,expectedFrame:before.currentChoiceFrame,intent:{type:'clear-capture',role:'adjoined'}});
 assert.equal(cleared.selections.contextualSilentFirstPerson,'present');assert.equal(cleared.contract.authorizationStatus,'blocked');
 const reset=c.transitionConjunctionChoice({selections:cleared.selections,expectedFrame:cleared.contract.currentChoiceFrame,intent:{type:'set-choice',key:'contextualSilentFirstPerson',value:'absent'}});
 assert.equal(reset.authorizationStatus,'authorized');
 const restored=c.transitionConjunctionChoice({selections:reset.selections,expectedFrame:reset.contract.currentChoiceFrame,intent:{type:'capture',role:'adjoined',result:second}});
 assert.equal(restored.contract.authorizationStatus,'authorized');assert.equal(c.getCapturedCanonicalResult('adjoined'),second);
 const stale=c.transitionConjunctionChoice({selections:{relation:'comparison',comparisonRoute:'equality-iuhqui'},expectedFrame:restored.contract.currentChoiceFrame,intent:{type:'clear-capture',role:'principal'}});
 assert.equal(stale.authorizationStatus,'blocked');assert.equal(c.getCapturedCanonicalResult('principal'),first);
});
test('conjunction refresh updates the required Result picker alongside bound choices',async()=>{
 const {readFileSync}=await import('node:fs'),vm=await import('node:vm');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),c=r.createClassicalClauseRelationController();let picker=0,displayed=null;
 const ctx={ClassicalClauseRelationSelections:base,ActiveClassicalClauseRelationResult:null,ActiveClassicalRuleLogicSurfaceFrame:{},ActiveClassicalGrammarResultBinding:{family:'clause-relation',ownerBindingFrame:{}},
 targetObject:{isClassicalClauseRelationBindingFrame:()=>true},getClassicalClauseRelationControllerForRendering:()=>c,
 syncClassicalClauseRelationCapabilityChoices(contract){displayed=contract.currentChoiceFrame;},syncClassicalRequiredResultChooser(){picker++;},syncClassicalDiscourseContextControls(){},normalizeClassicalBasalUnitForRendering:x=>x,
 getActiveClassicalCapabilityApplicationResult:()=>({}),renderClassicalCapabilityApplicationResultForReview:()=>true,syncClassicalCapabilityApplyOperationState(){}};
 const start=code.indexOf('    function refreshClassicalClauseRelationWorkflow(');vm.runInNewContext(code.slice(start,code.indexOf('\n    function ',start+20)),ctx);ctx.refreshClassicalClauseRelationWorkflow();
 assert.equal(picker,1);assert.equal(displayed.familyId,'conjunction');assert(ctx.ActiveClassicalGrammarResultBinding.requiredResultRoles.includes('adjoined'));
});
