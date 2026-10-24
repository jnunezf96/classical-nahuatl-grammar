import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {getResultEditTargets,resolveResultEditTarget,projectResultForEditing} from '../ui/composition/result_editing.mjs';
import {canRebuildResultEdit} from '../ui/composition/result_edit_rebuild.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket,getConstructionLayerReadiness} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
import {restoreResultEditReload,snapshotResultEditReload} from '../ui/composition/result_edit_reload.mjs';
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as load} from '../application/classical/result_reload.mjs';
import {getDoubleNucleusEditChildren,buildDoubleNucleusEditRequest} from '../application/classical/double_nucleus_edit.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_two_nucleus_repeat_20261024.json',import.meta.url)));
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function noun(r,stem,choices={}) {
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:f.sourceClass});
 const operation=r.buildClassicalNahuatlOrdinaryNncOperationFrame(source,{subject:'3sg',humanness:'human',state:'absolutive',predicateFormation:'source-stem',...choices});
 const result=r.evaluateClassicalNahuatlOrdinaryNnc(source,operation);assert.equal(result.authorizationStatus,'authorized',result.blockReason);return result;
}
function whole(r,analysis='subject') {
 const principal=noun(r,f.principal,analysis==='possessor'?{state:'possessive',possessor:'2sg'}:{}),supplement=noun(r,f.supplement,analysis==='possessor'?{subject:'2sg'}:{});
 const request={constructionKind:'double-nucleus-ownerhood',source:{principalNncResult:principal,supplementNncResult:supplement,supplementationAnalysis:`fixed-order-${analysis}-supplementation`},subject:'1pl',state:'possessive',possessor:'3pl',animacy:'animate'};
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[request]});assert.equal(made.authorizationStatus,'authorized',made.blockReason);return made.canonicalResult;
}
const path=role=>['children',role==='supplement'?0:1];
const current=(r,root,role)=>resolveResultEditTarget(r,root,path(role))?.node;
const packet=(root,target,role,choices)=>({kind:'result-edit',operation:'nnc:ordinary',edit:{action:'change',intent:'change',root,target,path:path(role)},inner:{kind:'request',operation:'nnc:ordinary',source:target,request:{operationId:'nnc:ordinary',args:[target,choices]}}});
const session=(r,root)=>{const s=createConstructionSession({isSource:()=>true,isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});s.restore(root,null);return s;};

test('Part exposes genuine Source-issued supplement and principal before any independent inner Make',async()=>{
 const r=await runtime(),root=whole(r),inputs=r.getClassicalNahuatlDeverbalNncReloadInputs(root),targets=getResultEditTargets(r,root);
 assert.equal(targets.length,3,'whole ownerhood plus both inner nuclei');
 assert.equal(current(r,root,'supplement'),inputs.source.supplementNncResult);assert.equal(current(r,root,'principal'),inputs.source.principalNncResult);
 for(const role of ['supplement','principal']){const exact=current(r,root,role);assert(projectResultForEditing(r,exact));assert(canRebuildResultEdit(r,root,exact,undefined,path(role)));assert(snapshotResultEditReload(r,{action:'change',intent:'change',root,target:exact,path:path(role)},root,exact));}
 assert.equal(getResultEditTargets(r,{...root}).length,0);
});

test('both nuclei repeatedly change State and possessor after Make and owner replay without losing the whole',async()=>{
 let r=await runtime(),root=whole(r);
 for(const role of ['principal','supplement'])for(const choices of [{state:'possessive',possessor:'1sg'},{possessor:'2sg'},{state:'absolutive'},{state:'possessive',possessor:'3pl'}]){
  const target=current(r,root,role);assert(target,'selected nucleus remains available');
  const beforeInputs=r.getClassicalNahuatlDeverbalNncReloadInputs(root),peer=beforeInputs.source[role==='principal'?'supplementNncResult':'principalNncResult'],history=r.getClassicalGrammarWorkspaceHistorySnapshot(),p=packet(root,target,role,choices),preview=previewConstructionPacket(r,p);
  assert(preview?.isCurrent(),JSON.stringify({role,choices}));assert.notEqual(preview.surface,projectResultForEditing(r,root).surface);
  assert.equal(getConstructionLayerReadiness(r,p).ready,true);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);
  const s=session(r,root);s.stage({source:target,route:{operation:'nnc:ordinary'},choices,slots:[],ready:true,execution:p});assert.equal(s.position.accepted.result,root);assert(s.make());
  const next=s.position.accepted.result,inputs=r.getClassicalNahuatlDeverbalNncReloadInputs(next),changed=current(r,next,role);
  assert.equal(inputs.source[role==='principal'?'supplementNncResult':'principalNncResult'],peer);for(const key of ['subject','state','possessor','animacy'])assert.equal(inputs[key],beforeInputs[key]);
  for(const[key,value]of Object.entries(choices))assert.equal(changed.operationFrame[key],value);assert.equal(projectResultForEditing(r,next).surface,preview.surface);
  if(role==='supplement' && choices.state==='possessive' && choices.possessor==='1sg'){
   assert(next.sourceFrame.orderedInnerMorphs.supplement.includes('uh'),'underlying supplement Number is retained');
   const writing=projectResultForEditing(r,next).applicationResult.lesson2WrittenResult;
   assert(writing.boundaryActions.some(action=>action.ruleId==='2.4-w-pre-vowel-hu-writing' && action.sourceLeft==='uh' && action.sourceRight==='ī'),'the newly internal contact is realized by the existing writing owner');
  }
  const recipe=save(r,{result:next,source:changed});assert(recipe);r=await runtime();const restored=load(r,JSON.parse(JSON.stringify(recipe)));assert(restored);assert(restoreResultEditReload(r,restored,{version:1,path:path(role)}));root=restored.result;assert.equal(current(r,root,role),restored.source);
 }
});

test('principal Subject remains independent while incompatible linked Subject or State edits hold without acceptance',async()=>{
 let r=await runtime(),root=whole(r,'possessor');
 for(const subject of ['1sg','2sg','3pl']){
  const target=current(r,root,'principal');assert(target);const p=packet(root,target,'principal',{subject}),preview=previewConstructionPacket(r,p);assert(preview?.isCurrent());const s=session(r,root);s.stage({source:target,route:{operation:'nnc:ordinary'},choices:{subject},slots:[],ready:true,execution:p});assert(s.make());root=s.position.accepted.result;assert.equal(current(r,root,'principal').operationFrame.subject,subject);
  const recipe=save(r,{result:root,source:current(r,root,'principal')});r=await runtime();root=load(r,recipe).result;
 }
 for(const[role,choices]of [['supplement',{subject:'1sg'}],['principal',{state:'absolutive'}],['principal',{possessor:'1sg'}]]){
  const target=current(r,root,role),p=packet(root,target,role,choices),s=session(r,root),before=r.getClassicalGrammarWorkspaceHistorySnapshot();assert.equal(previewConstructionPacket(r,p),null);assert.equal(getConstructionLayerReadiness(r,p).ready,false);assert.equal(executeConstructionPacket(r,p),null);assert.equal(s.position.accepted.result,root);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 }
 const target=current(r,root,'supplement'),p=packet(root,target,'supplement',{state:'possessive',possessor:'1sg'});assert(previewConstructionPacket(r,p)?.isCurrent(),'valid correction after a held edit remains available');
});

test('copied parents, copied nuclei and stale occurrence targets cannot replace an accepted nucleus',async()=>{
 const r=await runtime(),root=whole(r),target=current(r,root,'principal');assert(target);
 const p=packet(root,target,'principal',{state:'possessive',possessor:'1sg'}),made=executeConstructionPacket(r,p);assert(made);const next=made.canonicalResult;
 for(const bad of [packet({...root},target,'principal',{possessor:'2sg'}),packet(root,{...target},'principal',{possessor:'2sg'}),packet(next,target,'principal',{possessor:'2sg'})]){assert.equal(previewConstructionPacket(r,bad),null);assert.equal(executeConstructionPacket(r,bad),null);}
 const source=current(r,next,'principal'),recipe=save(r,{result:next,source}),fresh=await runtime(),roots=load(fresh,recipe);assert(roots);assert.equal(restoreResultEditReload(fresh,{...roots,source:target},{version:1,path:path('principal')}),null);
});

test('a nucleus edit inside a conjunction retains the outer whole and both unaffected siblings',async()=>{
 const r=await runtime(),inner=whole(r),rawPeer=noun(r,f.sibling),peer=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[rawPeer.sourceFrame,rawPeer.operationFrame]}).canonicalResult,request={operationKind:'conjunction',conjuncts:[inner,peer].map((value,i)=>r.buildClassicalNahuatlClauseCompositionSourceFrame(value,{referenceId:`nucleus-wrapper-${i}`})),options:{relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'comma'}};
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[request]});assert.equal(made.authorizationStatus,'authorized',made.blockReason);const root=made.canonicalResult,nestedPath=['children',0,...path('principal')],target=resolveResultEditTarget(r,root,nestedPath)?.node;assert(target);
 const p=packet(root,target,'principal',{state:'possessive',possessor:'2sg'});p.edit.path=nestedPath;const preview=previewConstructionPacket(r,p);assert(preview?.isCurrent());const s=session(r,root);s.stage({source:target,route:{operation:'nnc:ordinary'},choices:{state:'possessive',possessor:'2sg'},slots:[],ready:true,execution:p});assert.equal(s.position.accepted.result,root);assert(s.make());const next=s.position.accepted.result;assert.equal(next.conjuncts[1],root.conjuncts[1]);
 const innerNext=r.getClassicalNahuatlSupplementationClauseSourceFrame(next.conjuncts[0].envelope);assert.equal(innerNext.sourceFrame.supplementNncResult,inner.sourceFrame.supplementNncResult);assert.equal(projectResultForEditing(r,next).surface,preview.surface);
 const nextTarget=resolveResultEditTarget(r,next,nestedPath).node,recipe=save(r,{result:next,source:nextTarget}),fresh=await runtime(),restored=load(fresh,recipe);assert(restored);assert(restoreResultEditReload(fresh,restored,{version:1,path:nestedPath}));
});

test('Change on a genuine nucleus enters the existing noun-clause editor without Make or History',async()=>{
 const r=await runtime(),root=whole(r),record=resolveResultEditTarget(r,root,path('supplement')),select={value:'',options:[{value:'nnc:ordinary',disabled:false,hidden:false}]};assert(record);
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=source.indexOf('    function enterClassicalDoubleNucleusChoiceEdit('),end=source.indexOf('\n    function ',start+1);let draft=null,cleared=0,hidden=0,mirrored=0;
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot(),context=vm.createContext({targetObject:{...r,document:{getElementById:()=>select}},getDoubleNucleusEditChildren,ActiveClassicalGrammarResultSourceCapture:r.captureClassicalGrammarApplicationResult(record.node,'nucleus-editor-test'),restoreClassicalOrdinaryNncCaptureSourceMirror:(capture,options)=>{assert.equal(capture.canonicalResult,record.node);assert.equal(options.replacePendingEditor,true);mirrored++;},
  reconcileClassicalCompositionOperationControls:(id,options)=>{assert.equal(options.clearAll,true);cleared++;},syncClassicalNominalConstructionControlVisibility:value=>{assert.equal(value,'none');hidden++;},
  updateClassicalCapabilityNavigatorSelection:(control,options)=>{assert.equal(options.navigate,true);assert.equal(options.execute,false);assert.equal(control.value,'nnc:ordinary');const ref=r.getClassicalNahuatlOrdinaryNncReinflectionContext(record.node);assert(ref);draft={exact:record.node,context:ref};},getClassicalNncReinflectionDraft:()=>draft});
 vm.runInContext(source.slice(start,end),context);assert.equal(context.enterClassicalDoubleNucleusChoiceEdit(record),true);assert.equal(draft.exact,record.node);assert.equal(cleared,1);assert.equal(hidden,1);assert.equal(mirrored,1);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 assert.equal(context.enterClassicalDoubleNucleusChoiceEdit({...record,node:{...record.node}}),false);assert.equal(cleared,1);
});

test('reload presentation retains the accepted whole while activating an inner nucleus editor',async()=>{
 const r=await runtime(),root=whole(r),child=current(r,root,'principal'),application=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[child,{}]});assert.equal(application.authorizationStatus,'authorized');
 const source=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),start=source.indexOf('    function getClassicalVisibleAcceptedResult('),end=source.indexOf('\n    function ',start+1);
 const context=vm.createContext({ClassicalConstructionSession:{position:{accepted:{result:root}}},ClassicalPositionRestoring:true,ClassicalPositionExecuting:false,ClassicalPositionCleared:false,classicalRestoredEditRoot:root,
  getClassicalOwnerIssuedResultProjection:exact=>projectResultForEditing(r,exact),getActiveClassicalCapabilityApplicationResult:()=>application});
 vm.runInContext(source.slice(start,end),context);assert.equal(context.getClassicalVisibleAcceptedResult().canonicalResult,root,'editor activation during replay cannot substitute the child for the accepted whole');
 context.ClassicalPositionRestoring=false;let repainted=0;context.renderClassicalCapabilityApplicationResultForReview=app=>{assert.equal(app.canonicalResult,root);assert.equal(context.ClassicalConstructionSession.position.accepted.result,root);repainted++;return true;};
 const finishStart=source.indexOf('    function finishClassicalResultEditReloadPresentation('),finishEnd=source.indexOf('\n    function ',finishStart+1);vm.runInContext(source.slice(finishStart,finishEnd),context);assert.equal(context.finishClassicalResultEditReloadPresentation(),true);assert.equal(repainted,1);assert.equal(context.classicalRestoredEditRoot,null);assert.equal(context.finishClassicalResultEditReloadPresentation(),false);
});
