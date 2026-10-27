import test from 'node:test';
import assert from 'node:assert/strict';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {inactiveAffectiveReloadControl,prepareNativeReloadSourceContext,reconcileAcceptedQuotedSourceBaseline} from '../ui/composition/native_reload_source.mjs';
test('only authentic owner-inapplicable lexical reading can be ignored for unchanged Source',async()=>{
 const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 const make=source=>r.executeClassicalGrammarApplicationRequest({operationId:'grammar:nominal-construction',args:[{constructionKind:'affective-nnc',source,affectRoute:'compound',affectiveMatrix:'tzin',semanticReading:'special-regard',subject:'3sg',state:'absolutive',animacy:'animate'}]}).canonicalResult;
 const result=make({embedStem:'xō',embedClass:'tl'});assert(result);
 const signature=JSON.stringify({mode:'whole-stem',sourceWholeStem:'xō',sourceNncClass:'tl',affectiveFlawedLexicalReading:'chicken'}),saved={committedSignature:signature,draftSignature:signature};
 assert.equal(inactiveAffectiveReloadControl(r,result,saved)?.id,'classical-affective-flawed-lexical-reading');
 assert.equal(inactiveAffectiveReloadControl(r,{...result},saved),null);
 assert.equal(inactiveAffectiveReloadControl(r,result,{...saved,draftSignature:signature.replace('xō','cuā-naca')}),null);
 const active=make({embedStem:'cuā-naca',embedClass:'tl'});assert(active);
 const activeSignature=signature.replace('xō','cuā-naca');
 assert.equal(inactiveAffectiveReloadControl(r,active,{committedSignature:activeSignature,draftSignature:activeSignature}),null);
});
test('native quoted context is set before signature validation but unavailable family is refused',()=>{
 const operation={value:'none',options:[{value:'personal-name-nnc',disabled:false}]};
 const family={id:'classical-personal-name-source-family',value:'preterit-agentive',options:[{value:'opaque-quoted-inner',disabled:false},{value:'bad',disabled:true}]};
 const doc={getElementById:id=>id==='classical-construction-operation'?operation:family};
 assert.equal(prepareNativeReloadSourceContext(doc,'personal-name-nnc',[{id:family.id,value:'bad'}]),false);assert.equal(operation.value,'none');
 assert.equal(prepareNativeReloadSourceContext(doc,'personal-name-nnc',[{id:family.id,value:'opaque-quoted-inner'}]),true);assert.equal(operation.value,'personal-name-nnc');assert.equal(family.value,'opaque-quoted-inner');
});
test('editor replay ignores only the proven inactive coordinate and refuses active invalid selection',async()=>{
 const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
 const {normalizeSourceEditorSignature}=await import('../ui/composition/source_editor_signature.mjs');
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function restoreClassicalVncReloadSourceEditorState('),z=code.indexOf('\n    function ',a+20);
 for(const inactive of [false,true]){
  const input={id:'classical-source-whole',tagName:'INPUT',value:'xō'},reading={id:'classical-affective-flawed-lexical-reading',tagName:'SELECT',value:'',options:[],disabled:true,closest:()=>true},root={dataset:{}};let pending;
  const signature=()=>JSON.stringify({mode:'whole-stem',sourceWholeStem:input.value,sourceNncClass:'tl',affectiveFlawedLexicalReading:reading.value});
  const target={document:{getElementById:id=>id==='classical-source-parts'?root:null},getClassicalSourcePartsEvaluationSignature:signature,setClassicalSourcePartsMode(){},getClassicalSourcePartControlState:()=>({mode:'whole-stem'}),setClassicalSourcePartsPendingState:v=>pending=v,syncClassicalSourceCommitPresentation(){}};
  const ctx=vm.createContext({targetObject:target,ActiveClassicalGrammarResultSourceCapture:null,normalizeSourceEditorSignature,getClassicalVncReloadSourceEditorControls:()=>[input,reading],snapshotClassicalVncReloadControls:es=>es.map(e=>({id:e.id,value:e.value})),syncClassicalSourceObjectRows(){}});vm.runInContext(code.slice(a,z),ctx);
  const legacy=JSON.stringify({mode:'whole-stem',sourceWholeStem:'xō',sourceNncClass:'tl',affectiveFlawedLexicalReading:'chicken'});
  const saved={version:1,mode:'whole-stem',committedSignature:legacy,draftSignature:legacy,controls:[{id:input.id,value:'xō'},{id:reading.id,value:'chicken'}]};
  assert.equal(ctx.restoreClassicalVncReloadSourceEditorState(saved,inactive?{id:reading.id,field:'affectiveFlawedLexicalReading'}:null),inactive);
  if(inactive){assert.equal(pending,false);assert.equal(reading.value,'');assert.equal(target.ClassicalSourcePartsCommittedSignature,signature());}
 }
});

test('accepted opaque name repairs only absent legacy family baseline, not changed raw source',async()=>{
 const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
 const source=r.buildPersonalNameOpaqueQuotedInnerSourceFrame({sourceFamily:'opaque-quoted-inner',quotedCitation:'Mōtēuczōma',referenceKind:'human',citationOuterSubject:'3sg'});
 const result=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:personal-name',args:[{canonicalSourceResult:source,outerSubject:'3sg'}]}).canonicalResult;assert(r.isPersonalNameNncResult(result));
 const fields={mode:'whole-stem',sourceWholeStem:'mōtēuczōma',sourceNncClass:'zero'},saved={committedSignature:JSON.stringify(fields),draftSignature:JSON.stringify({mode:fields.mode,sourcePersonalNameFamily:'opaque-quoted-inner',sourceWholeStem:fields.sourceWholeStem,sourceNncClass:fields.sourceNncClass})};
 assert.equal(reconcileAcceptedQuotedSourceBaseline(r,result,saved).committedSignature,saved.draftSignature);
 assert.equal(reconcileAcceptedQuotedSourceBaseline(r,{...result},saved),saved);
 for(const changes of [{sourceWholeStem:'other'},{sourcePersonalNameFamily:'opaque-quoted-designation'},{sourceNncClass:'tl'}]){const altered={...saved,draftSignature:JSON.stringify({...fields,sourcePersonalNameFamily:'opaque-quoted-inner',...changes})};assert.equal(reconcileAcceptedQuotedSourceBaseline(r,result,altered),altered);}
});

test('inactive coordinate skip stays inside native restoration, not deverbal restoration',async()=>{
 const {readFileSync}=await import('node:fs');const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const begin=code.indexOf('    function restoreClassicalDeverbalBuildChoices('),end=code.indexOf('    function restoreClassicalNativeBuildChoices(');
 assert(begin>=0&&end>begin);assert.doesNotMatch(code.slice(begin,end),/inactiveSourceControl/);
 const native=code.slice(end,code.indexOf('    function restoreClassicalAcceptedBuildChoices(',end));assert.match(native,/if \(choice.id === inactiveSourceControl\?\.id\) continue/);
});
