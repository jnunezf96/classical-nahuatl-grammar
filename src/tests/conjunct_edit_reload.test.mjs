import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import * as reload from '../application/classical/result_reload.mjs';
import {getResultEditTargets,resolveResultEditTarget,projectResultForEditing} from '../ui/composition/result_editing.mjs';
import {executeConstructionPacket} from '../ui/composition/construction_packet.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const editReload=await import('../ui/composition/result_edit_reload.mjs').catch(()=>null);
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_conjunct_reload_20261023.json',import.meta.url)));
const saveFixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_interface_repairs_20261024.json',import.meta.url)));
const runtime=async()=>(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const r=await runtime(),fresh=await runtime();
const options={relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'none'};
function noun(r,stem){const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(s),b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3sg',state:'absolutive',animacy:'animate',humanness:'human',predicateFormation:'source-stem'});const a=r.executeClassicalGrammarTypedSourceOperationBindingFrame(b);assert.equal(a.authorizationStatus,'authorized');return a.canonicalResult;}
function verb(r,stem){const a=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:stem,verbClass:'A',sourceValence:'specific-projective',object:'3sg',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
function group(r,children){const a=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind:'conjunction',conjuncts:children.map((c,i)=>r.isClassicalNahuatlClauseConjunctionResultFrame(c)?c:r.buildClassicalNahuatlClauseCompositionSourceFrame(c,{referenceId:'reload-'+i,subjectReferenceId:'subject-'+i})),options}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
const noun1=noun(r,f.stems[2]),verb1=verb(r,f.stems[0]);
function roundtrip(root,source){const recipe=reload.exportClassicalResultReloadRecipe(r,{result:root,source});assert(recipe,'the whole conjunction needs an owner replay recipe');const roots=reload.replayClassicalResultReloadRecipe(fresh,JSON.parse(JSON.stringify(recipe)));assert(roots?.result);return {recipe,roots};}
test('reload reissues the whole mixed conjunction and exact selected occurrence from input recipes',()=>{
 const root=group(r,[noun1,verb1]),{roots,recipe}=roundtrip(root,verb1);
 assert.equal(fresh.isClassicalNahuatlClauseConjunctionResultFrame(roots.result),true);
 const selected=resolveResultEditTarget(fresh,roots.result,['children',1]);assert.equal(selected.node,roots.source);
 assert.equal(roots.result.conjuncts[0].referenceId,'reload-0');assert.equal(roots.result.conjuncts[1].subject.referenceId,'subject-1');
 assert.equal(roots.result.surfaceRealization,root.surfaceRealization);assert.deepEqual(roots.result.relationFrame,root.relationFrame);
 assert.notEqual(roots.result,root);assert.equal(reload.exportClassicalResultReloadRecipe(r,{result:{...root}}),null);
 const forged=structuredClone(recipe);forged.nodes.at(-1).options.surface='stored-answer';assert.equal(reload.replayClassicalResultReloadRecipe(fresh,forged),null);
});
test('reload keeps duplicate children aliased while the path selects only the second occurrence',()=>{
 const root=group(r,[verb1,verb1]),{roots}=roundtrip(root,verb1);
 const a=resolveResultEditTarget(fresh,roots.result,['children',0]),b=resolveResultEditTarget(fresh,roots.result,['children',1]);assert.equal(a.node,b.node);assert.equal(b.node,roots.source);
 const context=fresh.getClassicalNahuatlVncApplicationEditContext(b.node),nav=fresh.getClassicalGrammarApplicationCapabilityNavigator(context.sourceFrame);
 const binding=fresh.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{...context.selections,tense:'future'});
 const p={kind:'result-edit',operation:'vnc:application',edit:{action:'change',intent:'change',root:roots.result,target:b.node,path:b.path},inner:{kind:'typed',operation:'vnc:application',source:context.sourceFrame,binding}};
 const history=fresh.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(fresh,p);assert(preview?.isCurrent());assert.equal(projectResultForEditing(fresh,preview.canonicalResult),null);assert.deepEqual(fresh.getClassicalGrammarWorkspaceHistorySnapshot(),history);
 const session=createConstructionSession({isSource:x=>x===context.sourceFrame,isResult:x=>Boolean(projectResultForEditing(fresh,x)),execute:q=>executeConstructionPacket(fresh,q),present:()=>true});session.restore(roots.result,null);session.stage({source:context.sourceFrame,route:{operation:p.operation},slots:[],choices:{tense:'future'},ready:true,execution:p});assert.equal(session.position.accepted.result,roots.result);assert.equal(session.make(),true);
 assert.equal(session.position.accepted.result.conjuncts[0],roots.result.conjuncts[0]);assert.notEqual(session.position.accepted.result.conjuncts[1],roots.result.conjuncts[1]);assert.equal(session.position.accepted.result.surfaceRealization,preview.surface);
});
test('a changed NNC sentence survives as a constituent with its retained ordinary nucleus',()=>{
 const sentence=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[noun1.typedSlotFrame,{sentenceType:'yes-no-cuix',polarity:'negative',negativePrefix:'ah'}]}).canonicalResult;
 const root=group(r,[sentence,verb1]),{roots}=roundtrip(root,sentence),target=resolveResultEditTarget(fresh,roots.result,['children',0]).node;
 assert.equal(target,roots.source);assert.equal(target.requestedSentenceType,'yes-no-cuix');assert.equal(target.polarity,'negative');assert.equal(target.negativePrefix,'ah');
 assert.equal(fresh.getClassicalNahuatlOrdinaryNncReinflectionContext(target).sourceFrame.stem,f.stems[2]);
});
for (const [size,nounStem,verbStem] of [
 ['short',saveFixture.nounStems.short[0],saveFixture.verbStems.short[0]],
 ['medium',saveFixture.nounStems.medium[0],saveFixture.verbStems.medium[0]],
]) test(`the public save adapter persists the accepted whole separately from an active child (${size} invented Sources)`,()=>{
 const selected=verb(r,verbStem),root=group(r,[noun(r,nounStem),selected]);let saved;
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot();
 const doc={getElementById:()=>null,defaultView:{location:{href:'http://local/edit'},sessionStorage:{setItem(_k,v){saved=JSON.parse(v);},removeItem(){}}}};
 const context=vm.createContext({targetObject:{...r,document:doc},classicalVncReloadPersistenceReady:true,classicalUnsupportedResultReloadPending:false,
 exportClassicalGrammarWorkspaceHistoryReloadState:()=>null,getClassicalHistoryReloadSelection:()=>({}),
 getActiveClassicalCapabilityApplicationResult:()=>r.captureClassicalGrammarApplicationResult(selected,'reload-inputs').applicationResult,
 getClassicalSgrOwnerIssuedProjection:()=>null,ActiveClassicalRuleLogicSurfaceFrame:null,
 getClassicalVisibleAcceptedResult:()=>({canonicalResult:root}),ClassicalConstructionSession:{position:{accepted:{result:root}}},
 ActiveClassicalGrammarResultSourceCapture:{canonicalResult:selected},ActiveClassicalClauseRelationController:null,
 ActiveClassicalGrammarResultBinding:null, // This fixture has no active additional-Result binding.
 PendingClassicalResultEdit:{action:'change',intent:'change',root,target:selected,path:['children',1]},
 classicalVncAcceptedBasalReloadState:null,exportClassicalResultReloadRecipe:reload.exportClassicalResultReloadRecipe,
 snapshotResultEditReload:editReload?.snapshotResultEditReload,
 snapshotClassicalVncReloadSourceEditorState:()=>null,ClassicalClauseRelationSelections:{},
 snapshotClassicalVncReloadControls:()=>[],getClassicalMixedReloadControls:()=>[],getClassicalVncBasalReloadControls:()=>[],snapshotClassicalVncPendingTypedSourceSelections:()=>null,snapshotClassicalConjunctEditChoices:()=>null,
 snapshotClassicalVncPendingResultContinuation:()=>null,CLASSICAL_VNC_RELOAD_SESSION_KEY:'test',showClassicalHistoryReloadNotice(){},
 });
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function saveClassicalVncReloadSession()'),z=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,z),context);
 assert.equal(context.saveClassicalVncReloadSession(),true);
 assert.equal(context.ClassicalConstructionSession.position.accepted.result,root);
 assert.equal(context.PendingClassicalResultEdit.target,selected);
 assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before,'saving cannot Make or insert History');
 assert.equal(saved.version,2);assert.deepEqual(saved.bindingOperands,[]);assert.equal(saved.selectedBindingId,'');const roots=reload.replayClassicalResultReloadRecipe(fresh,saved.recipe);assert.equal(fresh.isClassicalNahuatlClauseConjunctionResultFrame(roots.result),true);assert.equal(resolveResultEditTarget(fresh,roots.result,['children',1]).node,roots.source);assert.deepEqual(saved.edit.path,['children',1]);
});

test('saved edit addresses an exact replayed occurrence and rejects stale or forged coordinates',()=>{
 assert(editReload,'install exact edit reload addressing');
 const root=group(r,[noun1,verb1]),edit={action:'change',intent:'change',root,target:verb1,path:['children',1]};
 const descriptor=editReload.snapshotResultEditReload(r,edit,root,verb1);assert.deepEqual(descriptor,{version:1,path:['children',1]});
 const {roots}=roundtrip(root,verb1),restored=editReload.restoreResultEditReload(fresh,roots,descriptor);assert.equal(restored.root,roots.result);assert.equal(restored.target,roots.source);assert.deepEqual(restored.path,['children',1]);
 for(const invalid of [{...descriptor,path:['children',0]},{...descriptor,path:['conjuncts',1]},{...descriptor,path:['children',10]},{...descriptor,root:{}}])assert.equal(editReload.restoreResultEditReload(fresh,roots,invalid),null);
 assert.equal(editReload.snapshotResultEditReload(r,{...edit,target:{...verb1}},root,verb1),null);
 assert.equal(editReload.restoreResultEditReload(fresh,{...roots,source:noun(fresh,f.stems[3])},descriptor),null);
});
test('public restore reconnects the same pending occurrence without accepting its draft or auto-selecting Operation',()=>{
 const root=group(r,[noun1,verb1]),{roots}=roundtrip(root,verb1);
 const session=createConstructionSession({isSource:()=>true,isResult:x=>Boolean(projectResultForEditing(fresh,x)),execute(){throw Error('reload cannot Make');},present:()=>true});
 const control={value:'stale',options:[{value:'vnc:application'}]};let capture=null,prepared=0;
 const ctx=vm.createContext({targetObject:{...fresh,document:{getElementById:()=>control}},
 restoreResultEditReload:editReload.restoreResultEditReload,PendingClassicalResultEdit:null,ClassicalConstructionSession:session,
 classicalRestoredEditRoot:null,ActiveClassicalGrammarResultSourceCapture:null,ActiveClassicalGrammarResultBinding:null,
 renderClassicalCapabilityApplicationResultForReview:()=>true,
 activateClassicalGrammarWorkspaceCapture(c){capture=c;ctx.ActiveClassicalGrammarResultSourceCapture=c;return true;},
 enterClassicalVncChoiceEdit(options){prepared++;control.value=options?.selectOperation?'vnc:application':'';return true;},
 getClassicalVncChoiceEditContext:()=>null,getVncChoiceEditContext:fresh.getClassicalNahuatlVncApplicationEditContext,
 getClassicalMixedReloadControls:()=>[],getClassicalVncBasalReloadControls:()=>[],getClassicalTypedSourceSelectionSignature:()=>null,
 updateClassicalCapabilityNavigatorSelection(){throw Error('placeholder must not select');},
 clearClassicalGrammarTypedSourceOperationBinding(){},syncClassicalCapabilityApplyOperationState(){},
 setClassicalWholeCanvasActionStatus(){},
 });
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function restoreClassicalConjunctEditReload(');assert(a>=0,'reload must reconnect an exact occurrence');const z=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,z),ctx);
 const validatorStart=code.indexOf('    function validateClassicalVncReloadApplicationSelections('),validatorEnd=code.indexOf('\n    function ',validatorStart+1);vm.runInContext(code.slice(validatorStart,validatorEnd),ctx);
 const receipt=fresh.captureClassicalGrammarApplicationResult(roots.result,'reload-inputs');
 assert.equal(ctx.restoreClassicalConjunctEditReload(roots,{edit:{version:1,path:['children',1]},operationId:''},receipt),true);
 assert.equal(session.position.accepted.result,roots.result);assert.equal(ctx.classicalRestoredEditRoot,roots.result);assert.equal(ctx.PendingClassicalResultEdit.root,roots.result);assert.equal(ctx.PendingClassicalResultEdit.target,roots.source);assert.equal(capture.canonicalResult,roots.source);assert.equal(control.value,'');assert.equal(prepared,1);
 assert.equal(ctx.restoreClassicalConjunctEditReload(roots,{edit:{version:1,path:['children',9]},operationId:'vnc:application'},receipt),true);
 assert.equal(ctx.PendingClassicalResultEdit,null);assert.equal(session.position.accepted.result,roots.result);assert.equal(control.value,'');
 assert.equal(ctx.restoreClassicalConjunctEditReload(roots,{edit:{version:1,path:['children',1]},operationId:'vnc:application',pendingTypedSourceSelections:{storedAnswer:'forged'}},receipt),true);
 assert.equal(control.value,'','an invalid saved draft cannot become a different ready default');assert.equal(session.position.accepted.result,roots.result);
});
test('restoring History selection cannot replace an already restored pending conjunct edit',()=>{
 let captures=0;const select={value:'',dispatchEvent(){captures++;}},ctx=vm.createContext({
 targetObject:{document:{getElementById:()=>select},getClassicalGrammarWorkspaceHistorySnapshot:()=>({nodes:[{nodeId:'one'}]}),Event:class{}},
 restoreClassicalGrammarWorkspaceHistoryReloadState:()=>true,showClassicalHistoryReloadNotice(){},
 });
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8'),a=code.indexOf('    function restoreClassicalHistoryReloadState('),z=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,z),ctx);
 assert.equal(ctx.restoreClassicalHistoryReloadState({edit:{version:1,path:['children',1]},history:{status:'supported'},historySelection:{selectedNodeId:'one',comparedNodeId:''}}),true);assert.equal(captures,0,'restoring selection must not run History recovery over the active edit');
});
test('conjunct draft snapshot retains structured VNC sentence choices and the separate NNC reinflection draft',()=>{
 const code=readFileSync(new URL('../ui/rendering/rendering.mjs',import.meta.url),'utf8');
 const ctx=vm.createContext({Object,targetObject:r,getClassicalNncReinflectionDraft:()=>null,getActiveClassicalGrammarTypedSourceOperationBinding:()=>null});
 for(const name of ['validateClassicalVncReloadApplicationSelections','getClassicalTypedSourceSelectionSignature','snapshotClassicalConjunctEditChoices']){
 const a=code.indexOf('    function '+name+'(');assert(a>=0,name);const z=code.indexOf('\n    function ',a+1);vm.runInContext(code.slice(a,z),ctx);
 }
 const v=r.getClassicalNahuatlVncApplicationEditContext(verb1),vb=r.issueClassicalGrammarTypedSourceOperationBindingFrame(r.getClassicalGrammarApplicationCapabilityNavigator(v.sourceFrame),'vnc:application',{...v.selections,mood:'optative',tense:'nonpast',sentenceOptions:{sentenceType:'wish-sentence',negative:true,questionMode:'',directionalIttaContraction:'',defectiveANegativeVariant:'',lesson9PrefaceParticle:'',requestedNegativePrefix:'',negativePrefix:'',construction:'',lexicalReading:'',predicateReferentKind:'',irregularStemChoice:''}});
 ctx.getActiveClassicalGrammarTypedSourceOperationBinding=()=>vb;
 assert.equal(ctx.snapshotClassicalConjunctEditChoices().sentenceOptions.sentenceType,'wish-sentence');assert.equal(ctx.snapshotClassicalConjunctEditChoices().sentenceOptions.negative,true);
 const n=r.getClassicalNahuatlOrdinaryNncReinflectionContext(noun1),nb=r.issueClassicalGrammarTypedSourceOperationBindingFrame(r.getClassicalGrammarApplicationCapabilityNavigator(n.sourceFrame),'nnc:ordinary',{...n.selections,state:'possessive',possessor:'2sg'});
 ctx.getClassicalNncReinflectionDraft=()=>({binding:nb,choices:nb.callerSelections});
 assert.equal(ctx.snapshotClassicalConjunctEditChoices().state,'possessive');assert.equal(ctx.snapshotClassicalConjunctEditChoices().possessor,'2sg');
});
test('the restored occurrence address is available to the public Part picker',async()=>{
 const {attachRuntimeBindings}=await import('../runtime/create_runtime.mjs');
 const instance=await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}});
 const publicUi={};attachRuntimeBindings(publicUi,instance);
 assert.equal(typeof publicUi.getClassicalPendingResultEditPath,'function','the UI bridge must expose the read-only occurrence projection');
 assert.equal(publicUi.getClassicalPendingResultEditPath(),null);
});
