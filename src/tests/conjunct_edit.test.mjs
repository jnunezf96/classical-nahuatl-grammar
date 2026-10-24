import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {canRebuildResultEdit,rebuildResultEdit} from '../ui/composition/result_edit_rebuild.mjs';
import {projectResultForEditing,getResultEditTargets} from '../ui/composition/result_editing.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket,getConstructionLayerReadiness} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_conjunct_edit_20261023.json',import.meta.url)));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const project=exact=>projectResultForEditing(r,exact);
function nominal(stem,state='absolutive',possessor=''){
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'}),nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3sg',animacy:'animate',humanness:'human',state,predicateFormation:'source-stem',possessor});
 const packet={kind:'typed',operation:'nnc:ordinary',source,binding};return {packet,make:()=>executeConstructionPacket(r,packet)};
}
const originals=f.nnc.slice(0,3).map(stem=>{const a=nominal(stem).make();assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;});
const options={relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'comma'};
function group(children=originals.slice(0,2),opts=options,operationKind='conjunction'){
 const conjuncts=children.map((x,i)=>r.isClassicalNahuatlClauseConjunctionResultFrame(x)?x:r.buildClassicalNahuatlClauseCompositionSourceFrame(x,{referenceId:operationKind==='lexical-conjunction'?'same-referent':`conjunct-${i+1}`}));
 const app=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind,conjuncts,options:opts}]});assert.equal(app.authorizationStatus,'authorized',app.blockReason);return app.canonicalResult;
}
const editPacket=(root,target,path,inner)=>({kind:'result-edit',operation:inner.operation,edit:{action:'change',root,target,path},inner});
const childOf=node=>r.isClassicalNahuatlClauseCompositionSourceFrame(node)?r.getClassicalNahuatlSupplementationClauseSourceFrame(node.envelope):node;

test('changing one conjunct previews and Makes the whole with exact sibling and relation choices retained',()=>{
 const root=group(),child=originals[0],path=['children',0];assert.equal(canRebuildResultEdit(r,root,child,project,path),true);
 const changed=nominal(f.nnc[0],'possessive','1sg'),packet=editPacket(root,child,path,changed.packet);
 const session=createConstructionSession({isSource:x=>Boolean(project(x)),isResult:x=>Boolean(project(x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});session.restore(root,null);
 session.stage({source:child,route:{operation:'nnc:ordinary'},slots:[{role:'selected-constituent',exact:child}],choices:{state:'possessive',possessor:'1sg'},legalMoves:[],ready:true,execution:packet});
 const history=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,packet);assert(preview?.surface,'preview must contain the rebuilt whole');assert.equal(preview.isCurrent(),true);assert.equal(getConstructionLayerReadiness(r,packet).ready,true);assert.equal(session.position.accepted.result,root);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);assert.equal(project(preview.canonicalResult),null,'preview cannot become editable accepted Source');assert.equal(preview.canonicalResult.conjuncts[1],root.conjuncts[1]);assert.match(preview.surface,/auh/);assert.match(preview.surface,/oc/);
 assert.equal(session.make(),true);const next=session.position.accepted.result;assert.notEqual(next,root);assert.equal(next.conjuncts[1],root.conjuncts[1]);assert.deepEqual(next.relationFrame,root.relationFrame);assert.notEqual(childOf(next.conjuncts[0]),child);assert.equal(childOf(next.conjuncts[0]).operationFrame.possessor,'1sg');assert.equal(next.surfaceRealization,preview.surface);assert.equal(originals[0].operationFrame.state,'absolutive');assert.equal(getResultEditTargets(r,next).length,3,'new changed child remains a real editable Result');
});
test('an explicit occurrence changes only that conjunct when the exact same child occurs twice',()=>{
 const root=group([originals[0],originals[0]]),replacement=nominal(f.nnc[3]).make().canonicalResult;
 assert.equal(canRebuildResultEdit(r,root,originals[0],project),false,'ambiguous identity alone is insufficient');assert.equal(canRebuildResultEdit(r,root,originals[0],project,['children',1]),true);
 const next=rebuildResultEdit(r,root,originals[0],replacement,project,['children',1]);assert(next);assert.equal(next.canonicalResult.conjuncts[0],root.conjuncts[0]);assert.equal(childOf(next.canonicalResult.conjuncts[1]),replacement);assert.equal(rebuildResultEdit(r,root,originals[0],replacement,project,['children',9]),null);
});
test('a nested conjunct change rebuilds only its ancestors and retains all other exact siblings',()=>{
 const inner=group(),root=group([inner,originals[2]]),replacement=nominal(f.nnc[3]).make().canonicalResult;
 const next=rebuildResultEdit(r,root,originals[1],replacement,project,['children',0,'children',1]);assert(next);assert.equal(next.canonicalResult.conjuncts[1],root.conjuncts[1]);const newInner=next.canonicalResult.conjuncts[0];assert.equal(newInner.conjuncts[0],inner.conjuncts[0]);assert.equal(childOf(newInner.conjuncts[1]),replacement);assert.equal(root.conjuncts[0],inner);
});
test('copied roots, copied replacements, forged occurrence paths and mismatched targets are rejected in preview and Make',()=>{
 const root=group(),replacement=nominal(f.nnc[3]).make().canonicalResult;
 assert.equal(r.buildClassicalNahuatlConjunctReplacementRequest({...root},0,replacement),null);assert.equal(r.buildClassicalNahuatlConjunctReplacementRequest(root,0,{...replacement}),null);
 assert.equal(rebuildResultEdit(r,{...root},originals[0],replacement,project,['children',0]),null);assert.equal(rebuildResultEdit(r,root,originals[0],{...replacement},project,['children',0]),null);
 for(const [target,path] of [[originals[0],['children',1]],[originals[1],['conjuncts',1]]]){const packet=editPacket(root,target,path,nominal(f.nnc[3]).packet);assert.equal(previewConstructionPacket(r,packet),null);assert.equal(executeConstructionPacket(r,packet),null);}
});
test('incompatible lexical parent is blocked before Make consumes its one-use child binding',()=>{
 const root=group(originals.slice(0,2),{lexicalType:'lord-and-master',adjunctorDistribution:'none',stateRealization:'conjoined-stems'},'lexical-conjunction');
 const req={sourceStem:f.vnc,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[req]});const source=made.canonicalResult.resultFrame.selectedMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source),binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'2sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);const packet=editPacket(root,originals[0],['children',0],{kind:'typed',operation:'vnc:application',source,binding});const history=r.getClassicalGrammarWorkspaceHistorySnapshot();assert.equal(previewConstructionPacket(r,packet),null);assert.equal(getConstructionLayerReadiness(r,packet).ready,false,'Make readiness must include whole-parent compatibility');assert.equal(executeConstructionPacket(r,packet),null);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);assert.equal(r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.authorizationStatus,'authorized','blocked parent must leave the child binding unconsumed');
});

test('existing supplementation edits and mixed ancestor paths offer a checked whole Change',()=>{
 const c=r.createClassicalClauseRelationController();c.captureCurrentResult('principal',originals[0]);c.captureCurrentResult('adjoined',originals[1]);
 const made=c.compose({relation:'supplementation',supplementationReferenceMode:'shared',supplementationHeadRole:'subject',supplementationContactRole:'subject',supplementationOrder:'principal-first'});assert.equal(made.authorizationStatus,'authorized',made.blockReason);const supplement=made.canonicalResult;
 assert.equal(canRebuildResultEdit(r,supplement,originals[0],project,['children',0]),true,'existing standalone supplementation boundary remains available');
 const root=group([supplement,originals[2]]);assert.equal(canRebuildResultEdit(r,root,supplement,project,['children',0]),true,'the whole first conjunct can change');
 const path=['children',0,'children',0];assert.equal(canRebuildResultEdit(r,root,originals[0],project,path),true,'mixed ancestors have a canonical whole-preview contract');
 const change=nominal(f.nnc[3]),packet=editPacket(root,originals[0],path,change.packet);assert(previewConstructionPacket(r,packet)?.isCurrent());assert.equal(executeConstructionPacket(r,packet)?.authorizationStatus,'authorized');
});
test('shared supplement and uncommon marked-adjoined rank remain exact when a conjunct changes',()=>{
 const conjuncts=originals.slice(0,2).map((source,i)=>r.buildClassicalNahuatlClauseCompositionSourceFrame(source,{referenceId:`paired-${i}`}));
 const sharedSupplement=r.buildClassicalNahuatlClauseCompositionSourceFrame(originals[2],{referenceId:'shared-supplement'});
 const opts={...options,level:'adjoined',markedAdjoinedException:true,adjoinedFunction:'supplementary-subject'};
 const made=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind:'conjunction',conjuncts,sharedSupplement,options:opts}]});assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 const changed=nominal(f.nnc[3]).make().canonicalResult,next=rebuildResultEdit(r,made.canonicalResult,originals[1],changed,project,['children',1]);assert(next);assert.equal(next.canonicalResult.sharedSupplement,sharedSupplement);assert.equal(next.canonicalResult.conjuncts[0],conjuncts[0]);assert.deepEqual(next.canonicalResult.relationFrame,made.canonicalResult.relationFrame);
});

test('a delayed Change click cannot drift to another occurrence of the same exact conjunct',async()=>{
 const {Element}=await import('./helpers/organization_dom.mjs'),{createResultActions}=await import('../ui/composition/result_actions.mjs'),{createResultEditSelection}=await import('../ui/composition/result_editing.mjs');
 class Node extends Element{get parentNode(){return this.parentElement;}removeAttribute(key){delete this.attributes[key];}}
 for(const switchPart of [false,true]){
  const root=group([originals[0],originals[0]]),selection=createResultEditSelection(r);selection.accept(root);selection.select(['children',0]);
  const dom=new Node();dom.id='classical-workbench';const card=new Node('section');dom.append(card);const frames=[],timers=[],position={};let calls=0;
  const doc={dispatchEvent(){},createElement:tag=>new Node(tag),getElementById:id=>dom.querySelector(`#${id}`)|| (id===dom.id?dom:null),defaultView:{...r,getClassicalConstructionPosition:()=>position,requestAnimationFrame:fn=>frames.push(fn),setTimeout:fn=>timers.push(fn)}};
  const refresh=createResultActions(doc,{selection,onAction:()=>calls++});refresh(card,{exact:root});const change=doc.getElementById('classical-result-action-change');assert.equal(change.disabled,false);change.listeners.click[0]();if(switchPart)selection.select(['children',1]);frames.shift()();timers.shift()();assert.equal(calls,switchPart?0:1,'selection path is part of delayed action custody');
 }
});

test('a VNC conjunct changes its subject through preview and Make without changing its NNC sibling',()=>{
 const args={sourceStem:f.vnc,verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'};
 const original=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[args]}).canonicalResult,root=group([original,originals[0]]);
 const source=original.resultFrame.selectedMachineryFrame,nav=r.getClassicalGrammarApplicationCapabilityNavigator(source),binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'vnc:application',{subject:'2sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 const packet=editPacket(root,original,['children',0],{kind:'typed',operation:'vnc:application',source,binding}),preview=previewConstructionPacket(r,packet);assert(preview?.surface);assert.equal(project(preview.canonicalResult),null);assert.equal(preview.canonicalResult.conjuncts[0].subject.category,'2sg');assert.equal(preview.canonicalResult.conjuncts[1],root.conjuncts[1]);
 const made=executeConstructionPacket(r,packet);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.canonicalResult.surfaceRealization,preview.surface);assert.equal(made.canonicalResult.conjuncts[0].subject.category,'2sg');assert.equal(made.canonicalResult.conjuncts[1],root.conjuncts[1]);assert.equal(root.conjuncts[0].subject.category,'3sg');
});
