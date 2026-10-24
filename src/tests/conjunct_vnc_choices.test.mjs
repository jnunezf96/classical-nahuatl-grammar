import test from 'node:test';
import * as vncEdit from '../ui/composition/vnc_choice_edit.mjs';
const {getVncChoiceEditContext,getVncVoiceEditSubject}=vncEdit;
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {projectResultForEditing,getResultEditTargets} from '../ui/composition/result_editing.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket,getConstructionLayerReadiness} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_conjunct_vnc_choices_20261023.json',import.meta.url)));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const initial=(extra={})=>{const a=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:f.stems[0],verbClass:'A',sourceValence:'intransitive',subject:'1sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active',...extra}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;};
function group(child){const s=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:f.stems[1]+'hua',sourceClass:'tl-1-a'}),o=r.buildClassicalNahuatlOrdinaryNncOperationFrame(s,{subject:'3sg',humanness:'human',state:'absolutive'}),sibling=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:ordinary',args:[s,o]}).canonicalResult;const a=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind:'conjunction',conjuncts:[child,sibling].map((x,i)=>r.buildClassicalNahuatlClauseCompositionSourceFrame(x,{referenceId:`verb-${i}`})),options:{relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'comma'}}]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
const part=root=>getResultEditTargets(r,root).find(t=>t.path.length===2&&t.path[1]===0);
function prepare(child,edits={}){const c=r.getClassicalNahuatlVncApplicationEditContext(child);assert(c,'exact made VNC must expose its original typed Source and current choices');const n=r.getClassicalGrammarApplicationCapabilityNavigator(c.sourceFrame),b=r.issueClassicalGrammarTypedSourceOperationBindingFrame(n,'vnc:application',{...c.selections,...edits});return {context:c,binding:b};}
function packet(root,prepared){const t=part(root);return {kind:'result-edit',operation:'vnc:application',edit:{action:'change',root,target:t.node,path:t.path},inner:{kind:'typed',operation:'vnc:application',source:prepared.context.sourceFrame,binding:prepared.binding}};}
test('same VNC conjunct repeatedly edits finite and derivation choices after Make through its original typed Source',()=>{
 let root=group(initial());const originalSource=prepare(part(root).node).context.sourceFrame,sibling=root.conjuncts[1];
 const session=createConstructionSession({isSource:x=>Boolean(projectResultForEditing(r,x)),isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});session.restore(root,null);
 for(const edits of [{subject:'2sg'},{tense:'imperfect'},{tense:'present',requestedDerivation:'causative'},{requestedDerivation:'direct',causativeObjectKind:'',derivationOptionId:'',requestedVoice:'active'}]){
  let prepared=prepare(part(root).node,edits);
  if(prepared.binding.requiredChoiceIds.includes('derivationOptionId')){const option=prepared.binding.choiceOptionProjection.derivationOptionId.find(x=>x.availabilityStatus==='available');prepared=prepare(part(root).node,{...edits,derivationOptionId:option.optionId});}
  assert.equal(prepared.binding.bindingStatus,'ready',prepared.binding.blockReason);assert.equal(prepared.context.sourceFrame,originalSource);
  const p=packet(root,prepared),history=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,p);assert(preview?.isCurrent(),JSON.stringify({edits,readiness:getConstructionLayerReadiness(r,p),inner:previewConstructionPacket(r,p.inner)?.surface,target:part(root).node.kind}));assert.equal(getConstructionLayerReadiness(r,p).ready,true);assert.equal(session.position.accepted.result,root);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);assert.equal(projectResultForEditing(r,preview.canonicalResult),null);
  session.stage({source:part(root).node,route:{operation:'vnc:application'},slots:[],choices:edits,legalMoves:[],ready:true,execution:p});assert.equal(session.position.accepted.result,root);assert.equal(session.make(),true);const next=session.position.accepted.result;assert.equal(next.surfaceRealization,preview.surface);assert.equal(next.conjuncts[1],sibling);assert.deepEqual(next.relationFrame,root.relationFrame);const context=prepare(part(next).node).context;assert.equal(context.sourceFrame,originalSource);for(const [key,value]of Object.entries(edits))if(value)assert.equal(context.selections[key],value,key);root=next;
 }
});
test('edit context rejects copied facades and preserves derivation instead of applying it again to its own output',()=>{
 const original=initial();assert.equal(r.getClassicalNahuatlVncApplicationEditContext({...original}),null);assert.equal(r.getClassicalNahuatlVncApplicationEditContext({...original.resultFrame}),null);
 const start=prepare(original),options=start.binding.choiceOptionProjection.requestedDerivation;assert(options.some(x=>x.optionId==='causative'&&x.availabilityStatus==='available'));
 let changed=prepare(original,{requestedDerivation:'causative'});if(changed.binding.requiredChoiceIds.includes('derivationOptionId'))changed=prepare(original,{requestedDerivation:'causative',derivationOptionId:changed.binding.choiceOptionProjection.derivationOptionId.find(x=>x.availabilityStatus==='available').optionId});
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(changed.binding);assert.equal(made.authorizationStatus,'authorized',made.blockReason);const again=prepare(made.canonicalResult);assert.equal(again.context.sourceFrame,start.context.sourceFrame);assert.equal(again.context.selections.requestedDerivation,'causative');assert.notEqual(again.context.sourceFrame,made.canonicalResult.resultFrame.selectedMachineryFrame);assert.equal(r.getClassicalNahuatlVncApplicationEditContext({...made.canonicalResult}),null);
});

test('original-operation reentry belongs to Change and cannot intercept Add or another capture',()=>{
 const exact=initial(),capture={canonicalResult:exact};
 assert.equal(getVncChoiceEditContext(r,{action:'change',intent:'add',target:exact},capture),null);
 assert.equal(getVncChoiceEditContext(r,{action:'change',target:exact},{canonicalResult:{...exact}}),null);
 const context=getVncChoiceEditContext(r,{action:'change',intent:'change',target:exact},capture);
 assert.equal(context.exactInput,exact);assert.equal(context.sourceFrame,exact.resultFrame.sourceMachineryFrame);
});

test('passive voice edits retain original active roles and reentry cannot invent a new promoted subject',()=>{
 const original=initial({sourceValence:'specific-projective',objectPerson:'2sg'});
 let prepared=prepare(original,{requestedVoice:'passive',subject:'2sg'});
 if(prepared.binding.requiredChoiceIds.includes('nonactiveOptionId'))prepared=prepare(original,{requestedVoice:'passive',subject:'2sg',nonactiveOptionId:prepared.binding.choiceOptionProjection.nonactiveOptionId.find(x=>x.availabilityStatus==='available').optionId});
 assert.equal(prepared.binding.bindingStatus,'ready',prepared.binding.blockReason);
 const root=group(original),p=packet(root,prepared);p.inner.sentenceOptions={sentenceType:'affirmative-assertion',negative:false};const preview=previewConstructionPacket(r,p);assert(preview?.isCurrent());const made=executeConstructionPacket(r,p);assert.equal(made.authorizationStatus,'authorized',made.blockReason);assert.equal(made.canonicalResult.surfaceRealization,preview.surface);assert.equal(made.canonicalResult.conjuncts[1],root.conjuncts[1]);
 const passive=part(made.canonicalResult).node,context=prepare(passive).context;
 assert.equal(context.sourceFrame,original.resultFrame.sourceMachineryFrame);assert.equal(context.sourceSubject,'1sg');assert.equal(context.selections.subject,'2sg');assert.equal(context.selections.requestedVoice,'passive');
 const wrong=prepare(passive,{subject:'3sg'});assert.equal(wrong.binding.bindingStatus,'ready');assert.equal(getVncVoiceEditSubject(r,wrong.binding).category,'2sg');const unchanged=executeConstructionPacket(r,packet(made.canonicalResult,wrong));assert.equal(unchanged.authorizationStatus,'authorized');assert.equal(prepare(part(unchanged.canonicalResult).node).context.selections.subject,'2sg');
 const active=prepare(passive,{requestedVoice:'active',nonactiveOptionId:'',subject:'1sg'});assert.equal(active.binding.bindingStatus,'ready',active.binding.blockReason);const restored=executeConstructionPacket(r,packet(made.canonicalResult,active));assert.equal(restored.authorizationStatus,'authorized');assert.equal(prepare(part(restored.canonicalResult).node).context.selections.requestedVoice,'active');
});
test('issued sentence reentry preserves the current envelope and rejects copied wrappers',()=>{
 const original=initial(),wrapped=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:sentence-result',args:[original,{sentenceType:'yes-no-question',questionMode:'cuix',negative:true}]});assert.equal(wrapped.authorizationStatus,'authorized',wrapped.blockReason);
 assert.equal(r.getClassicalNahuatlVncApplicationEditContext({...wrapped.canonicalResult}),null);
 const root=group(wrapped.canonicalResult),prepared=prepare(part(root).node,{tense:'imperfect'});assert.equal(prepared.context.selections.sentenceOptions.sentenceType,'yes-no-question');assert.equal(prepared.context.selections.sentenceOptions.negative,true);
 const p=packet(root,prepared),preview=previewConstructionPacket(r,p);assert(preview?.isCurrent());const made=executeConstructionPacket(r,p);assert.equal(made.authorizationStatus,'authorized');const after=prepare(part(made.canonicalResult).node).context;assert.equal(after.selections.sentenceOptions.sentenceType,'yes-no-question');assert.equal(after.selections.sentenceOptions.negative,true);assert.equal(made.canonicalResult.surfaceRealization,preview.surface);
});

test('applicative reentry retains its added Object and permits changing that choice without another derivation layer',()=>{
 const original=initial();let p=prepare(original,{requestedDerivation:'applicative',applicativeObjectKind:'nonspecific-human'});
 if(p.binding.requiredChoiceIds.includes('derivationOptionId'))p=prepare(original,{requestedDerivation:'applicative',applicativeObjectKind:'nonspecific-human',derivationOptionId:p.binding.choiceOptionProjection.derivationOptionId.find(x=>x.availabilityStatus==='available').optionId});
 assert.equal(p.binding.bindingStatus,'ready',p.binding.blockReason);const root=group(original),made=executeConstructionPacket(r,packet(root,p));assert.equal(made.authorizationStatus,'authorized');const current=part(made.canonicalResult).node,c=prepare(current).context;assert.equal(c.sourceFrame,original.resultFrame.sourceMachineryFrame);assert.equal(c.selections.requestedDerivation,'applicative');assert.equal(c.selections.applicativeObjectKind,'nonspecific-human');
 const next=prepare(current,{applicativeObjectKind:'nonspecific-nonhuman'});assert.equal(next.binding.bindingStatus,'ready',next.binding.blockReason);const preview=previewConstructionPacket(r,packet(made.canonicalResult,next));assert(preview?.isCurrent());const after=executeConstructionPacket(r,packet(made.canonicalResult,next));assert.equal(after.authorizationStatus,'authorized');assert.equal(after.canonicalResult.surfaceRealization,preview.surface);assert.equal(prepare(part(after.canonicalResult).node).context.selections.applicativeObjectKind,'nonspecific-nonhuman');assert.equal(after.canonicalResult.conjuncts[1],root.conjuncts[1]);
});

test('an NNC editor repaint cannot replace the selected VNC operation or its owner-projected controls',()=>{
 const exact=initial(),p=prepare(exact,{subject:'2sg',tense:'imperfect'}),edit={action:'change',target:exact},capture={canonicalResult:exact};
 const projected=vncEdit.projectVncChoiceEditControls(r,edit,capture,p.binding,{basalUnit:'nnc',state:{stem:'unrelated-editor',subject:'3sg'}});
 assert.equal(projected.basalUnit,'vnc');assert.equal(projected.state.stem,f.stems[0]);assert.equal(projected.state.subject,'2sg');assert.equal(projected.state.tense,'imperfect');assert.equal(projected.state.vncApplicationFrame.resultFrame.sourceMachineryFrame,p.context.sourceFrame);
 assert.equal(vncEdit.projectVncChoiceEditControls(r,{...edit,intent:'add'},capture,p.binding,{}),null);
});
