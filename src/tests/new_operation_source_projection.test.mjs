import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
test('new unselected relation cannot display retained comparison captures as current Source',()=>{
 const start=code.indexOf('    function getClassicalComparisonSourceSummary()'),end=code.indexOf('\n    function ',start+20);
 const oldPrincipal={},newSource={},binding={family:'clause-relation',operationId:'clause:composition',selectedBindingId:'',ownerBindingFrame:{bindingChoices:[{id:'conjunction:principal',relation:'conjunction'}]}};
 const controller={capture:oldPrincipal};
 const ctx=vm.createContext({targetObject:{document:{getElementById:()=>({value:'clause:composition'})}},getActiveClassicalGrammarResultBinding:()=>binding,ClassicalClauseRelationSelections:{relation:'comparison'},getClassicalClauseRelationControllerForRendering:()=>controller,getClassicalOwnerIssuedResultProjection:x=>x,projectClauseStructure:()=>({sources:[{exact:oldPrincipal,surface:'old principal'},{exact:newSource,surface:'new Source'}]}),hasCurrentClauseProjection:()=>false});
 vm.runInContext(code.slice(start,end),ctx);assert.equal(ctx.getClassicalComparisonSourceSummary(),null);assert.equal(controller.capture,oldPrincipal,'retained draft must not be cleared');
});
test('actual owner role binds presentation; wrong, absent and withdrawn roles retain but hide draft',async()=>{
 const {createRuntimeInstance}=await import('../runtime/create_runtime.mjs');const {hasCurrentClauseProjection:current}=await import('../ui/composition/choice_guidance.mjs');
 const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tlāca',sourceClass:'tl-1-a'}),result=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[source,r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',state:'absolutive'})]}).canonicalResult;
 const op=r.getClassicalGrammarApplicationCapabilityNavigator(result).operations.find(x=>x.operationId==='clause:composition');
 const binding={family:'clause-relation',operationId:op.operationId,ownerBindingFrame:op.ownerBindingFrame,selectedBindingId:''};
 assert.equal(current(binding,op.operationId,'comparison'),false);assert.equal(current(binding,op.operationId,'conjunction'),false);
 binding.selectedBindingId='conjunction:principal';assert.equal(current(binding,op.operationId,'conjunction'),true);assert.equal(current(binding,op.operationId,'comparison'),false);assert.equal(current(binding,'sentence:supplementation','conjunction'),false);
 binding.selectedBindingId='';assert.equal(current(binding,op.operationId,'conjunction'),false);
 const fixed={family:'clause-relation',operationId:'fixed',ownerBindingFrame:{ownerChoicesRequired:false,relationIds:['fixed-relation'],bindingChoices:[]}};
 assert.equal(current(fixed,'fixed','fixed-relation'),true);assert.equal(current({...fixed,ownerBindingFrame:{...fixed.ownerBindingFrame,ownerChoicesRequired:true}},'fixed','fixed-relation'),false);
});
test('all retained composite presentation consumers require current binding before using old controller',()=>{
 for(const name of ['readClassicalConstructionProposal','getClassicalStructurePresentation','syncClassicalChoiceGuidance']){
  const a=code.indexOf(`    function ${name}(`),b=code.indexOf('\n    function ',a+20);assert(a>=0);assert.match(code.slice(a,b),/hasCurrentClauseProjection\(binding, operation, ClassicalClauseRelationSelections.relation\)/);
 }
});
