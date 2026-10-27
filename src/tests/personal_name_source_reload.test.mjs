import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {normalizeSourceEditorSignature} from '../ui/composition/source_editor_signature.mjs';
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'tlāca',sourceClass:'tl-1-a'});
const b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(r.getClassicalGrammarApplicationCapabilityNavigator(source),'nnc:ordinary',{subject:'3sg',state:'absolutive',animacy:'animate',humanness:'human',predicateFormation:'source-stem'});
const preview=r.previewClassicalGrammarTypedSourceOperationBindingFrame(b);assert(r.isClassicalGrammarApplicationPreview(preview));
const fixture=r.executeClassicalGrammarTypedSourceOperationBindingFrame(b);assert.equal(fixture.authorizationStatus,'authorized');
const capture=r.captureClassicalGrammarApplicationResult(fixture.canonicalResult,'test-exact-name');assert(r.isClassicalGrammarApplicationResultCapture(capture));
const committed=JSON.stringify({unit:'nnc',sourceWholeStem:'tlāca'}),draft=JSON.stringify({unit:'nnc',sourceWholeStem:'tlāca',sourcePersonalNameFamily:'absolutive-state-nnc'});
test('exact-name route family is not a raw Source edit; raw family and real source text remain significant',()=>{
 assert.equal(normalizeSourceEditorSignature(r,draft,capture,'nnc:personal-name'),committed);
 assert.equal(normalizeSourceEditorSignature(r,draft,null,'nnc:personal-name'),draft);
 assert.equal(normalizeSourceEditorSignature(r,draft,{canonicalResult:{...preview.canonicalResult}},'nnc:personal-name'),draft);
 assert.equal(normalizeSourceEditorSignature(r,draft,capture,'nnc:ordinary'),draft);
 assert.notEqual(normalizeSourceEditorSignature(r,JSON.stringify({unit:'nnc',sourceWholeStem:'cal',sourcePersonalNameFamily:'absolutive-state-nnc'}),capture,'nnc:personal-name'),committed);
});
test('legacy editor packet restores exact-name pending Build without false pending Source, while real raw edits stay pending',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function restoreClassicalVncReloadSourceEditorState('),z=code.indexOf('\n    function ',a+20);
 for(const [exact,text,expected] of [[true,'tlāca',false],[false,'tlāca',true],[true,'cal',true]]){
  let pending;const input={id:'classical-source-whole',value:'tlāca',tagName:'INPUT'},root={dataset:{}},mirror={value:'(tlāca)',dataset:{}},op={value:'nnc:personal-name'};
  const current=()=>JSON.stringify({unit:'nnc',sourceWholeStem:input.value,sourcePersonalNameFamily:'absolutive-state-nnc'});
  const target={...r,document:{getElementById:id=>id==='classical-source-parts'?root:id==='verb'?mirror:id==='classical-capability-navigator-operation'?op:null},getClassicalSourcePartsEvaluationSignature:current,setClassicalSourcePartsMode(){},getClassicalSourcePartControlState:()=>({mode:'whole-stem'}),setClassicalSourcePartsPendingState:v=>pending=v,syncClassicalSourceCommitPresentation(){}};
  const ctx=vm.createContext({targetObject:target,ActiveClassicalGrammarResultSourceCapture:exact?capture:null,normalizeSourceEditorSignature,getClassicalVncReloadSourceEditorControls:()=>[input],snapshotClassicalVncReloadControls:es=>es.map(e=>({id:e.id,value:e.value})),syncClassicalSourceObjectRows(){}});vm.runInContext(code.slice(a,z),ctx);
  const saved={version:1,mode:'whole-stem',committedSignature:committed,draftSignature:JSON.stringify({unit:'nnc',sourceWholeStem:text,sourcePersonalNameFamily:'absolutive-state-nnc'}),committedMirror:'(tlāca)',controls:[{id:input.id,value:text}]};
  assert.equal(ctx.restoreClassicalVncReloadSourceEditorState(saved),true);assert.equal(pending,expected);assert.equal(input.value,text);assert.equal(root.dataset.classicalSourceEditorReloadStatus,'restored');
 }
});
