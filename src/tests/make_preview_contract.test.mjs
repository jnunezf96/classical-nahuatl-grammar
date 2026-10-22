import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
const fixture=JSON.parse(readFileSync(new URL('./fixtures/nonce_make_preview.json',import.meta.url)));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
const request=subject=>({operationId:'vnc:application',args:[{sourceStem:fixture.stem,verbClass:'A',sourceValence:'intransitive',subject,mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]});
test('pending preview uses the canonical owner without issuing an application or History step',()=>{
 assert.equal(typeof r.previewClassicalGrammarApplicationRequest,'function');
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot();
 const preview=r.previewClassicalGrammarApplicationRequest(request('1sg'));
 assert.equal(r.isClassicalGrammarApplicationPreview(preview),true);
 assert.equal(preview.authorizationStatus,'authorized',preview.blockReason);
 assert(preview.surface.includes(fixture.stem));
 assert.equal(r.captureClassicalGrammarApplicationResult(preview.canonicalResult,'preview-cannot-continue').authorizationStatus,'blocked');
 assert.equal(r.isClassicalGrammarApplicationResult(preview),false);
 assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 const made=r.executeClassicalGrammarApplicationRequest(request('1sg'));
 assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 const exact=made.canonicalResult;const nested=exact.resultFrame||{};
 assert([exact.sentenceSurfaceDisplay,exact.surfaceRealization,exact.surface,nested.sentenceSurfaceDisplay,nested.surfaceRealization,nested.surface].includes(preview.surface));
});
test('Writing preview keeps the original sounds and cannot grant copied preview authority',()=>{
 assert.equal(typeof r.previewClassicalGrammarApplicationRequest,'function');
 const source=r.issueClassicalTranscriptionSourceFrame([{segments:fixture.writingSegments}]);
 const binding=r.issueClassicalNahuatlTranscriptionBindingFrame(source,{writingVariant:'ordinary'});
 const req={operationId:'orthography:transcription',args:[...binding.executionArgs]};
 const preview=r.previewClassicalGrammarApplicationRequest(req);
 assert.equal(r.isClassicalGrammarApplicationPreview(preview),true);
 assert.equal(preview.canonicalResult.sourceFrame,source);
 assert.equal(r.isClassicalGrammarApplicationPreview({...preview}),false);
 assert.equal(r.captureClassicalGrammarApplicationResult(preview.canonicalResult,'preview-copy').authorizationStatus,'blocked');
 const made=r.executeClassicalGrammarApplicationRequest(req);
 assert.equal(preview.surface,made.canonicalResult.surface);
});
test('preview validity follows live owner validation rather than only its producing function',()=>{
 assert.equal(typeof r.previewClassicalGrammarApplicationRequest,'function');
 const preview=r.previewClassicalGrammarApplicationRequest(request('2sg'));
 assert.equal(r.isClassicalGrammarApplicationPreview(preview),true);
 const original=r.isClassicalNahuatlVncApplicationFrame;
 try {r.isClassicalNahuatlVncApplicationFrame=()=>false;assert.equal(r.isClassicalGrammarApplicationPreview(preview),false);}
 finally {r.isClassicalNahuatlVncApplicationFrame=original;}
 assert.equal(r.isClassicalGrammarApplicationPreview(preview),true);
});
test('full pending packet includes the sentence particle without granting continuation authority',async()=>{
 const {previewConstructionPacket}=await import('../ui/composition/construction_preview.mjs');
 const {executeConstructionPacket}=await import('../ui/composition/construction_packet.mjs');
 const packet={kind:'request',operation:'vnc:application',source:null,request:request('3sg'),choices:{},sentenceOptions:{sentenceType:'affirmative-assertion',punctuationMode:'statement'},layers:[{operationId:'sentence:adverbial-adjunction',particleId:'l3-oc'}]};
 const preview=previewConstructionPacket(r,packet);
 assert(preview?.surface,'full pending sentence preview required');assert.equal(preview.isCurrent(),true);
 assert.equal(r.captureClassicalGrammarApplicationResult(preview.canonicalResult,'pending-layer').authorizationStatus,'blocked');
 const made=executeConstructionPacket(r,packet);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(preview.surface,made.canonicalResult.surface||made.canonicalResult.sentenceSurfaceDisplay||made.canonicalResult.surfaceRealization);
});
test('preview cannot consume the actual one-shot typed Source binding needed by Make',()=>{
 const sourceApplication=r.executeClassicalGrammarApplicationRequest(request('3sg'));
 const source=sourceApplication.canonicalResult.resultFrame.selectedMachineryFrame;
 const navigator=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,'vnc:application',{subject:'2sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'});
 assert.equal(binding.bindingStatus,'ready',binding.blockReason);
 const validator=r.isClassicalNahuatlVncApplicationFrame;try{r.isClassicalNahuatlVncApplicationFrame=()=>false;assert.equal(r.previewClassicalGrammarTypedSourceOperationBindingFrame(binding),null);}finally{r.isClassicalNahuatlVncApplicationFrame=validator;}
 assert.equal(r.isClassicalGrammarTypedSourceOperationBindingFrame(binding),true,'failed preview leaves active Make binding valid');
 const preview=r.previewClassicalGrammarTypedSourceOperationBindingFrame(binding);
 assert.equal(r.isClassicalGrammarApplicationPreview(preview),true);
 assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarTypedSourceOperationBindingFrame(binding)),true,'repeated previews keep Make usable');
 assert.equal(r.previewClassicalGrammarTypedSourceOperationBindingFrame({...binding}),null,'copied bindings cannot preview');
 assert.equal(r.captureClassicalGrammarApplicationResult(preview.canonicalResult,'typed-preview').authorizationStatus,'blocked');
 const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
 assert.equal(made?.authorizationStatus,'authorized',made?.blockReason);
 assert.equal(r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding),null,'Make retains its one-shot boundary');
});
test('captured clause preview preserves parents and History, matches explicit compose, and expires when a parent changes',()=>{
 const issue=subject=>{
  const nominal=r.buildClassicalNahuatlClassGovernedNncFrame(fixture.stem,{state:'absolutive',subject,nounClass:'zero',classSelectionAuthority:'user-selection'});
  const application=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[nominal.nncSlotFrame,{sentenceType:'assertion',polarity:'positive'}]});
  assert.equal(application.authorizationStatus,'authorized',application.blockReason);return application.canonicalResult;
 };
 const controller=r.createClassicalClauseRelationController(),left=issue('1sg'),right=issue('2sg');
 assert.equal(controller.captureCurrentResult('principal',left).authorizationStatus,'authorized');
 assert.equal(controller.captureCurrentResult('adjoined',right).authorizationStatus,'authorized');
 const choices={relation:'conjunction',coordinationRelation:'unmarked',coordinationType:'additive',clauseLevel:'principal',polarity:'positive',leftContext:'present',rightwardModifier:'none',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',adjoinedFunction:'none'};
 const before=r.getClassicalGrammarWorkspaceHistorySnapshot();
 const preview=controller.preview(choices);
 assert(preview?.surface,'genuine conjunction must preview');assert.equal(preview.isCurrent(),true);
 assert.equal(controller.getCapturedCanonicalResult('principal'),left);assert.equal(controller.getCapturedCanonicalResult('adjoined'),right);
 assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),before);
 assert.equal(r.captureClassicalGrammarApplicationResult(preview.canonicalResult,'preview-clause').authorizationStatus,'blocked');
 const made=controller.compose(choices);assert.equal(made.authorizationStatus,'authorized',made.blockReason);
 assert.equal(preview.surface,made.presentation.surface);
 controller.captureCurrentResult('adjoined',issue('3sg'));assert.equal(preview.isCurrent(),false);
});
