import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import{readFileSync}from'node:fs';
import{createRuntimeInstance}from'../runtime/create_runtime.mjs';import{createCompoundChoiceMemory}from'../application/classical/compound_choice_coordination.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const text=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');const start=text.indexOf('    function getClassicalCompoundChoiceContext(kind) {'),end=text.indexOf('    function getClassicalCompoundNonactiveScopeValues',start);
function fixture(){
 const parent=r.evaluateClassicalNahuatlVncApplication({sourceStem:'miqui',verbClass:'B',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedVoice:'active'}).resultFrame;
 const selections={lateOperation:'compound',lateVariant:'connective-t',compoundMatrixStem:'ahci',compoundNonactiveScope:'embed',requestedVoice:'impersonal',nonactiveOptionId:'o-hua:mic-o-hua',subject:'3sg',mood:'indicative',tense:'present'};
 const owner=r.issueClassicalNahuatlVncContinuationBindingFrame('vnc:derivational-operation',parent,selections);assert.equal(owner.bindingStatus,'ready');
 const events=[],control={dataset:{},value:'embed',disabled:false,isConnected:true,addEventListener(type,fn){events.push(fn);}};
 const matrix={value:'ahci'},variant={value:'connective-t'};
 const target={...r,document:{getElementById:id=>id==='classical-rule-logic-compound-matrix'?matrix:id==='classical-rule-logic-late-variant'?variant:{value:''}}};
 const ctx=vm.createContext({targetObject:target,ActiveClassicalGrammarResultBinding:{operationId:'vnc:derivational-operation',exactResult:parent,ownerBindingFrame:owner,additionalResults:{}},ClassicalCompoundScopes:createCompoundChoiceMemory(),ClassicalCompoundPossessors:createCompoundChoiceMemory(),ClassicalCompoundAffinity:createCompoundChoiceMemory(),getClassicalVncContinuationBindingSelections:()=>({...selections,compoundNonactiveScope:control.value}),getActiveClassicalGrammarTypedSourceOperationBinding:()=>null});vm.runInContext(text.slice(start,end),ctx);
 return {ctx,control,selections,matrix,events,sync:(voice,options,active=true)=>ctx.coordinateClassicalCompoundControl(control,'scope',voice,options,active)};
}
test('actual renderer records and restores through real exact owner and never makes a Result',()=>{
 const f=fixture();f.sync('impersonal',['embed','matrix','both']);f.control.value='both';f.events[0]();f.selections.requestedVoice='active';f.control.value='none';f.sync('active',['none'],false);assert.equal(f.control.value,'none');f.selections.requestedVoice='impersonal';f.control.value='embed';f.sync('impersonal',['embed','matrix','both']);assert.equal(f.control.value,'both');
});
test('copied binding, detached control and changed matrix cannot carry scope intent',()=>{
 for(const failure of ['copy','detached','matrix']){const f=fixture();f.sync('impersonal',['embed','matrix','both']);f.control.value='both';if(failure==='copy')f.ctx.ActiveClassicalGrammarResultBinding.ownerBindingFrame={...f.ctx.ActiveClassicalGrammarResultBinding.ownerBindingFrame};if(failure==='detached')f.control.isConnected=false;f.events[0]();f.control.isConnected=true;if(failure==='matrix')f.matrix.value='mani';f.control.value='embed';f.sync('impersonal',['embed','matrix','both']);assert.equal(f.control.value,'embed',failure);}
});
function nominalFixture(){
 const nnc=stem=>{const s=r.issueCanonicalNncSourceFrame({stem,sourceClass:'zero'});return r.requestClassicalOrdinaryNncResult(s,r.issueCanonicalNncOperationFrame(s,{state:'absolutive',subject:'3common'}));};
 const embed=nnc('xōchi'),matrix=nnc('mox'),binding=r.issueClassicalNahuatlFormationResultBindingFrame('grammar:nominal-construction',embed);assert.equal(binding.authorizationStatus,'authorized');
 const request={constructionKind:'compound-nnc',structure:'integrated',embedRole:'association',possessorOrientation:'matrix',subject:'3sg',state:'possessive',possessor:'1sg',animacy:'animate',source:{embedStem:'xōchi',matrixStem:'mox',embedClass:'zero',matrixClass:'zero',embedConstituent:{kind:'ordinary-nnc',stem:'xōchi',resultFrame:embed},matrixConstituent:{kind:'ordinary-nnc',stem:'mox',resultFrame:matrix}}};
 const check=r.evaluateClassicalNahuatlNominalConstruction({...request,source:{...request.source,possessorOrientation:'matrix'}});assert.equal(check.authorizationStatus,'authorized',check.blockReason);assert.equal(r.isClassicalNahuatlNominalConstructionResult(check),true);assert(check.operationFrame.possessorOrientationOptions.includes('matrix'),JSON.stringify(check.operationFrame.possessorOrientationOptions));
 const events=[],control={dataset:{},value:'matrix',disabled:false,isConnected:true,addEventListener(type,fn){events.push(fn);}};
 let primitive=null;
 const target={...r,evaluateClassicalNahuatlNominalConstruction:q=>r.evaluateClassicalNahuatlNominalConstruction({...q,source:{...q.source}}),document:{getElementById:()=>({value:''})}};
 const ctx=vm.createContext({targetObject:target,ActiveClassicalGrammarResultBinding:{operationId:'grammar:nominal-construction',exactResult:embed,ownerBindingFrame:binding,selectedBindingId:'compound-nnc:embed-result',additionalResults:{'compound-matrix-constituent':matrix}},ClassicalCompoundScopes:createCompoundChoiceMemory(),ClassicalCompoundPossessors:createCompoundChoiceMemory(),ClassicalCompoundAffinity:createCompoundChoiceMemory(),buildClassicalNominalConstructionUiRequest:()=>({...request,possessorOrientation:control.value}),getClassicalPrimitiveMatrixSourceDeclaration:()=>primitive,getActiveClassicalGrammarTypedSourceOperationBinding:()=>null});vm.runInContext(text.slice(start,end),ctx);
 return{ctx,control,events,request,setPrimitive:x=>primitive=x,sync:(available,active=true)=>ctx.coordinateClassicalCompoundControl(control,'possessor','integrated',available,active)};
}
test('renderer preserves integrated possessor intent across obligatory linked embed, rechecked by actual nominal owner',()=>{
 const f=nominalFixture();f.sync(['matrix','embed']);f.control.value='matrix';assert(f.ctx.getClassicalCompoundChoiceContext('possessor'),'context');assert.equal(f.ctx.acceptsClassicalCompoundChoice('possessor','matrix',f.ctx.getClassicalCompoundChoiceContext('possessor')),true);f.events[0]();f.request.structure='linked-connective-t';f.control.value='embed';f.control.disabled=true;f.sync(['embed'],false);assert.equal(f.control.value,'embed');f.request.structure='integrated';f.control.disabled=false;f.sync(['matrix','embed']);assert.equal(f.control.value,'matrix');
});
test('nominal memory ends when primitive matrix declaration or selected operand role changes',()=>{
 for(const changed of ['primitive','role']){const f=nominalFixture();f.sync(['matrix','embed']);f.events[0]();f.control.value='embed';if(changed==='primitive')f.setPrimitive({stem:'cal',sourceClass:'tli'});else f.ctx.ActiveClassicalGrammarResultBinding.selectedBindingId='compound-nnc:matrix-result';f.sync(['matrix','embed']);assert.equal(f.control.value,'embed');}
});

test('new offered pending intent supersedes an older ready selection',()=>{
 const f=fixture();f.sync('impersonal',['embed','matrix','both']);f.control.value='matrix';f.events[0]();
 f.selections.nonactiveOptionId='';f.control.value='both';f.events[0]();
 f.sync('impersonal',['embed','matrix','both']);assert.equal(f.control.value,'both');
 f.selections.nonactiveOptionId='o-hua:mic-o-hua';f.control.value='embed';
 f.sync('impersonal',['embed','matrix','both']);assert.equal(f.control.value,'both');
});
test('native applied compound session restores intent but a new Apply or operand ends it',()=>{
 for(const changed of ['none','apply','operand']){
 const f=nominalFixture();f.ctx.ActiveClassicalGrammarResultBinding=null;
 f.ctx.ClassicalNativeCompoundChoiceSession={grammarAuthority:false};
 delete f.request.source.embedConstituent;delete f.request.source.matrixConstituent;
 f.ctx.targetObject.ClassicalSourcePartsCommittedSignature=JSON.stringify({mode:'embed-matrix',sourceEmbedStem:'xōchi',sourceMatrixStem:'mox'});
 f.sync(['matrix','embed']);assert(f.ctx.getClassicalCompoundChoiceContext('possessor'));f.events[0]();
 f.request.structure='linked-connective-t';f.control.value='embed';f.control.disabled=true;f.sync(['embed'],false);
 f.request.structure='integrated';f.control.disabled=false;
 if(changed==='apply')f.ctx.ClassicalNativeCompoundChoiceSession={grammarAuthority:false};
 if(changed==='operand')f.request.source.matrixStem='cal';
 f.sync(['matrix','embed']);assert.equal(f.control.value,changed==='none'?'matrix':'embed',changed);
 }
});
