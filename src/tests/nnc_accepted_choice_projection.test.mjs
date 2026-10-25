import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
const runtime=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function fixture(){
 const source=runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'mich',sourceClass:'in'});
 const navigator=runtime.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'nnc:ordinary',{subject:'3sg',animacy:'animate',humanness:'nonhuman',state:'absolutive',predicateFormation:'source-stem'});
 const accepted=runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
 assert.equal(accepted.authorizationStatus,'authorized');
 const construction={value:'none'},operation={value:'nnc:ordinary'},sourceParts={dataset:{classicalSourceCommitState:'applied'}};
 const ctx=vm.createContext({targetObject:{...runtime,document:{getElementById:id=>id==='classical-capability-navigator-operation'?operation:id==='classical-source-parts'?sourceParts:id==='classical-construction-operation'?construction:null}},
  PendingClassicalResultEdit:null,ActiveClassicalGrammarResultSourceCapture:null,ActiveClassicalGrammarCapabilityNavigator:navigator,
  ClassicalOrdinaryGrammarApplicationBySentence:new WeakMap(),projectVncChoiceEditControls:()=>null,
  getClassicalNncReinflectionDraft:()=>null,getActiveClassicalGrammarTypedSourceOperationBinding:()=>null,
  getActiveClassicalCapabilityApplicationResult:()=>accepted,getClassicalCanonicalNncContractInspection:()=>({status:'valid'}),
  getClassicalRuleLogicSurfaceState:()=>({stem:'mich',subject:'3sg',nncAnimacy:'animate',nncHumanness:'nonhuman',nncState:'absolutive'}),
  getActiveClassicalRuleLogicSurfaceFrame:()=>accepted.canonicalResult});
 for(const name of ['getClassicalTypedNncBindingSurfaceState','getClassicalOrdinaryNncControlProjection','getClassicalCurrentGrammarControlSurfaceFrame']){
  const a=code.indexOf(`    function ${name}(`),b=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,b),ctx);
 }
 return {ctx,source,navigator,accepted,operation,sourceParts,construction,project:()=>ctx.getClassicalCurrentGrammarControlSurfaceFrame()};
}
test('settled ordinary Result retains its exact Source selection context without pending edits',()=>{
 const h=fixture(),p=h.project();assert.ok(p,'settled choices must have a projection');
 assert.equal(p.state.nncTypedSourceFrame,h.source);assert.equal(p.nncGrammarSurfaceContract,h.accepted.canonicalResult);
 const choices=runtime.getCanonicalNncOperationSelectionFrame(p.state.nncTypedSourceFrame,{subject:'3sg',animacy:'animate',humanness:'nonhuman',state:'absolutive'});
 assert.equal(choices.authorizationStatus,'authorized');
 assert.equal(h.project().nncGrammarSurfaceContract,h.accepted.canonicalResult);
});
test('settled projection never borrows an old Result for a changed, pending, or copied Source context',()=>{
 const h=fixture();h.sourceParts.dataset.classicalSourceCommitState='pending';assert.equal(h.project(),null);
 h.sourceParts.dataset.classicalSourceCommitState='applied';
 h.ctx.ActiveClassicalGrammarCapabilityNavigator={...h.navigator};assert.equal(h.project(),null);
 h.ctx.ActiveClassicalGrammarCapabilityNavigator=runtime.getClassicalGrammarApplicationCapabilityNavigator(runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'cal',sourceClass:'tli-1'}));assert.equal(h.project(),null);
 h.ctx.ActiveClassicalGrammarCapabilityNavigator=h.navigator;h.construction.value='calendar-date-nnc';assert.equal(h.project(),null);h.construction.value='none';h.operation.value='particle:result';assert.equal(h.project(),null);
});
