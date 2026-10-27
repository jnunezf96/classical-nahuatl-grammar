import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const code=readFileSync(new URL('../ui/composer/composer.mjs',import.meta.url),'utf8');
const extract=name=>{const a=code.indexOf(`    function ${name}(`);assert(a>=0);return code.slice(a,code.indexOf('\n    function ',a+20));};
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function harness(){
 const root={dataset:{classicalSourcePartsInitialized:'true'}},wholeInput={value:'ye'},embedInput={value:'old'},matrixInput={value:'old-matrix'};let mode='whole-stem',pending=true;
 const accepted=Object.freeze({retained:true});const h={accepted};
 const ctx=vm.createContext({Object,JSON,String,CLASSICAL_BASAL_UNIT:{vnc:"vnc",nnc:"nnc"},targetObject:{...r,window:{location:{hash:'#unrelated'}},document:{getElementById:()=>null}},ClassicalSourcePartsCommittedSignature:'old',getClassicalSourcePartControlElements:()=>({root,wholeInput,embedInput,matrixInput}),getClassicalBasalUnitFromRuntime:()=> 'vnc',stripClassicalSourceDisplayWrapping:s=>s.replace(/^\((.*)\)$/u,'$1'),getClassicalNncSourceGuideElements:()=>({select:null}),findClassicalNncSourceExampleOptionByParts:()=>null,isCanonicalDirectNncSourceFrame:()=>false,setClassicalSourcePartsMode:value=>mode=value,syncClassicalBuiltSourceToVerbInput:()=>{h.mirror=wholeInput.value;h.source=r.resolveClassicalNahuatlNonactiveCarrierSourceFrame({enteredStem:wholeInput.value,valence:'intransitive'});},applyClassicalNncEntradaUrlStateToControls(){},getClassicalSourcePartsEvaluationSignature:()=>JSON.stringify([mode,wholeInput.value,embedInput.value,matrixInput.value]),setClassicalSourcePartsPendingState:v=>pending=v});
 for(const name of ['normalizeClassicalFuenteSourcePartStem','getClassicalEntradaUrlSourcePartsFromLocation','syncClassicalSourcePartControlsFromRuntime'])vm.runInContext(extract(name),ctx);
 return{h,ctx,root,wholeInput,embedInput,matrixInput,get pending(){return pending;},get mode(){return mode;}};
}
test('explicit URL Source replaces initialized editor, clears stale parts and reconstructs current carrier',()=>{
 const x=harness(),accepted=x.h.accepted;
 x.ctx.syncClassicalSourcePartControlsFromRuntime({force:true,restoredSnapshot:{input:'(nec-ō)',slots:{a:{embed:'',stem:''}},classicalNnc:{active:false}}});
 assert.equal(x.wholeInput.value,'nec-ō');assert.equal(x.embedInput.value,'');assert.equal(x.matrixInput.value,'');assert.equal(x.h.mirror,'nec-ō');assert.equal(r.isClassicalNahuatlNonactiveCarrierSourceFrame(x.h.source),true);assert.equal(x.h.accepted,accepted);assert.equal(x.pending,false);assert.match(x.ctx.ClassicalSourcePartsCommittedSignature,/nec-ō/);
 x.ctx.syncClassicalSourcePartControlsFromRuntime({force:true,restoredSnapshot:{input:'',slots:{a:{embed:'',stem:''}},classicalNnc:{active:false}}});assert.equal(x.wholeInput.value,'');assert.equal(x.embedInput.value,'');assert.equal(x.matrixInput.value,'');
});
test('ordinary synchronization preserves pending edits; explicit compound snapshot is not inferred from location',()=>{
 const x=harness();x.wholeInput.value='pending-edit';x.ctx.syncClassicalSourcePartControlsFromRuntime();assert.equal(x.wholeInput.value,'pending-edit');assert.equal(x.pending,true);assert.equal(x.ctx.ClassicalSourcePartsCommittedSignature,'old');
 x.ctx.syncClassicalSourcePartControlsFromRuntime({force:true,restoredSnapshot:{input:'(xōchi-cal)',slots:{a:{embed:'xōchi',stem:'cal'}},classicalNnc:{active:true}}});assert.equal(x.wholeInput.value,'');assert.equal(x.embedInput.value,'xōchi');assert.equal(x.matrixInput.value,'cal');assert.equal(x.mode,'embed-matrix');
});
test('force hydration belongs only to explicit accepted URL transaction before final render',()=>{
 const body=extract('applyEntradaUrlStateSnapshot');assert.match(body,/if \(hasEntradaUrlExplicitField\(normalized, "input"\)\) \{\s*syncClassicalSourcePartControlsFromRuntime\(\{ restoredSnapshot: normalized, force: true \}\);/u);
 assert(body.indexOf('syncClassicalSourcePartControlsFromRuntime')>body.indexOf('if (!sourceLexemeRestorationApplied)'));
});
