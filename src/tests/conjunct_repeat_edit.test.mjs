import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {projectResultForEditing,getResultEditTargets} from '../ui/composition/result_editing.mjs';
import {previewConstructionPacket} from '../ui/composition/construction_preview.mjs';
import {executeConstructionPacket,getConstructionLayerReadiness} from '../ui/composition/construction_packet.mjs';
import {createConstructionSession} from '../ui/composition/construction_session.mjs';
const f=JSON.parse(readFileSync(new URL('./fixtures/nonce_conjunct_repeat_edit_20261023.json',import.meta.url)));
const r=(await createRuntimeInstance({documentObject:{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
function nominal(stem){
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem,sourceClass:'tl-1-a'});
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(source);
 const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(nav,'nnc:ordinary',{subject:'3sg',animacy:'animate',humanness:'human',state:'absolutive',predicateFormation:'source-stem'});
 return executeConstructionPacket(r,{kind:'typed',operation:'nnc:ordinary',source,binding}).canonicalResult;
}
function sentence(slot,options){const a=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[slot,options]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;}
const left=nominal(f.nnc[0]),right=nominal(f.nnc[1]);
function group(){
 const conjuncts=[left,right].map((x,i)=>r.buildClassicalNahuatlClauseCompositionSourceFrame(x,{referenceId:`repeat-${i}`}));
 const a=r.executeClassicalGrammarApplicationRequest({operationId:'clause:composition',args:[{operationKind:'conjunction',conjuncts,options:{relation:'marked',coordinationType:'additive',level:'principal',polarity:'positive',rightwardModifier:'oc',modifierAdjunctor:'none',sharedModifierScope:'none',sharedModifier:'none',leftContextAbsent:false,adjoinedFunction:'none',identicalAdjoinedClauseEllipsis:'none',boundaryPunctuation:'none'}}]});
 assert.equal(a.authorizationStatus,'authorized',a.blockReason);return a.canonicalResult;
}
test('the same conjunct offers sentence changes after each Make; only Make replaces the retained whole',()=>{
 let root=group();
 const session=createConstructionSession({isSource:x=>Boolean(projectResultForEditing(r,x)),isResult:x=>Boolean(projectResultForEditing(r,x)),execute:p=>executeConstructionPacket(r,p),present:()=>true});session.restore(root,null);
 const originalSibling=root.conjuncts[0],originalSlot=right.typedSlotFrame;
 for(const [sentenceType,polarity,prefix,punctuation] of [['assertion','negative','ah','.'],['assertion','positive','','.'],['yes-no-cuix','negative','ah','?'],['wish','negative','ca','.']]){
  const target=getResultEditTargets(r,root).find(x=>x.path.length===2&&x.path[1]===1);
  const nav=r.getClassicalGrammarApplicationCapabilityNavigator(target.node);
  assert.equal(r.isClassicalGrammarApplicationCapabilityNavigator(nav),true);
  const route=nav.operations.find(x=>x.operationId==='nnc:sentence-surface');
  assert.equal(route?.availabilityStatus,'available','same conjunct must retain sentence choices after Make');
  const source=route.ownerProbeInputResult;
  const inner={kind:'request',operation:'nnc:sentence-surface',source,request:{operationId:'nnc:sentence-surface',args:[source,{sentenceType,polarity}]}};
  const packet={kind:'result-edit',operation:inner.operation,edit:{action:'change',root,target:target.node,path:target.path},inner};
  const history=r.getClassicalGrammarWorkspaceHistorySnapshot(),preview=previewConstructionPacket(r,packet);
  assert(preview?.isCurrent());assert.equal(getConstructionLayerReadiness(r,packet).ready,true);
  assert.equal(preview.canonicalResult.conjuncts[0],originalSibling);
  assert.equal(projectResultForEditing(r,preview.canonicalResult),null);
  assert.equal(session.position.accepted.result,root);assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);
  session.stage({source:target.node,route:{operation:inner.operation},slots:[{role:'selected-constituent',exact:target.node}],choices:{sentenceType,polarity},legalMoves:[],ready:true,execution:packet});
  assert.equal(session.position.accepted.result,root);assert.equal(session.make(),true);
  const next=session.position.accepted.result;assert.notEqual(next,root);assert.equal(next.conjuncts[0],originalSibling);assert.equal(next.surfaceRealization,preview.surface);
  const changed=getResultEditTargets(r,next).find(x=>x.path.length===2&&x.path[1]===1).node;
  assert.equal(changed.sourceNncSlotFrame,originalSlot);assert.equal(changed.polarity,polarity);assert.equal(changed.negativePrefix,prefix);assert.equal(changed.finalPunctuation,punctuation);
  assert.equal((changed.embeddedSentenceSurface.match(/auh/gu)||[]).length,0,'whole never becomes the changed nucleus');
  assert.deepEqual(next.relationFrame,root.relationFrame);root=next;
 }
});
test('exact sentence reentry keeps owned context, rejects copies, and preserves preview exclusion',()=>{
 const current=sentence(left.typedSlotFrame,{sentenceType:'assertion',polarity:'negative',negativePrefix:'ah',predicateKind:'equative'});
 const history=r.getClassicalGrammarWorkspaceHistorySnapshot();
 const nav=r.getClassicalGrammarApplicationCapabilityNavigator(current),route=nav.operations.find(x=>x.operationId==='nnc:sentence-surface');
 assert.equal(route.availabilityStatus,'available');assert.equal(route.ownerProbeInputResult,current);
 assert.equal(r.getClassicalGrammarApplicationCapabilityNavigator({...current}),null);
 const copied=r.buildClassicalNahuatlNncSentenceSurfaceFrame({...current},{polarity:'positive'});assert.equal(copied.authorizationStatus,'blocked');
 const retained=r.buildClassicalNahuatlNncSentenceSurfaceFrame(current);assert.equal(retained.sourceNncSlotFrame,current.sourceNncSlotFrame);assert.equal(retained.negativePrefix,'ah');
 const preview=r.previewClassicalGrammarApplicationRequest({operationId:'nnc:sentence-surface',args:[current,{polarity:'positive'}]});
 assert.equal(preview.authorizationStatus,'authorized',preview.blockReason);assert.equal(preview.canonicalResult.negativePrefix,'');assert.equal(preview.canonicalResult.sourceNncSlotFrame,left.typedSlotFrame);
 assert.equal(r.captureClassicalGrammarApplicationResult(preview.canonicalResult,'repeat-preview').authorizationStatus,'blocked');assert.deepEqual(r.getClassicalGrammarWorkspaceHistorySnapshot(),history);
 const vnc=r.executeClassicalGrammarApplicationRequest({operationId:'vnc:application',args:[{sourceStem:f.nnc[2]+'za',verbClass:'A',sourceValence:'intransitive',subject:'3sg',mood:'indicative',tense:'present',requestedDerivation:'direct',requestedVoice:'active'}]}).canonicalResult;
 assert.notEqual(r.getClassicalGrammarApplicationCapabilityNavigator(vnc).operations.find(x=>x.operationId==='nnc:sentence-surface').availabilityStatus,'available','clause type compatibility cannot authorize a VNC as an NNC');
});
test('reentry preserves exact nuclear writing and a licensed prefix across equivalent sentence aliases',()=>{
 const noun=nominal('ē'+f.nnc[2]);
 const writingSource=r.issueClassicalNahuatlLesson2WritingSource({parts:[{role:'stem',value:'ē'+f.nnc[2]},{role:'number',value:'tl'}],boundaryKind:'typed-nnc-slots'});
 const written=r.writeClassicalNahuatlLesson2Result(writingSource);assert.equal(r.isClassicalNahuatlLesson2WrittenResult(written),true);
 const current=r.buildClassicalNahuatlNncSentenceSurfaceFrame(noun.typedSlotFrame,{sentenceType:'assertion',polarity:'negative',negativePrefix:'ay',canonicalNuclearWrittenResult:written});assert.equal(current.authorizationStatus,'authorized',current.blockReason);
 const alias=r.buildClassicalNahuatlNncSentenceSurfaceFrame(current,{sentenceType:' Statement ',polarity:'Negative'});
 assert.equal(alias.authorizationStatus,'authorized',alias.blockReason);assert.equal(alias.negativePrefix,'ay');assert.equal(alias.canonicalNuclearWrittenResult,written);assert.equal(alias.sourceNncSlotFrame,noun.typedSlotFrame);
 const positive=r.buildClassicalNahuatlNncSentenceSurfaceFrame(alias,{polarity:'positive'});assert.equal(positive.authorizationStatus,'authorized',positive.blockReason);assert.equal(positive.negativePrefix,'');assert.equal(positive.canonicalNuclearWrittenResult,written);assert.equal(positive.canonicalNuclearSurface,'ē'+f.nnc[2]+'tl');
 const forged=r.buildClassicalNahuatlNncSentenceSurfaceFrame(current,{canonicalNuclearWrittenResult:{...written}});assert.equal(forged.authorizationStatus,'blocked');
});
test('reentry retains intrinsic interrogative discourse instead of interpreting the previous surface',()=>{
 const source=r.buildClassicalNahuatlPronominalNncSourceFrame({stem:'tl-eh',embedStem:'tl',matrixStem:'eh'});
 const op=r.buildClassicalNahuatlPronominalNncOperationFrame(source,{subject:'3sg',clausePosition:'initial',adjunctorInMode:'none',sentenceType:'statement',polarity:'positive'});
 const a=r.executeClassicalGrammarApplicationRequest({operationId:'nnc:pronominal',args:[source,op]});assert.equal(a.authorizationStatus,'authorized',a.blockReason);
 const initial=a.canonicalResult.sentenceFrame,current=sentence(initial.sourceNncSlotFrame,{sentenceType:'statement',polarity:'positive',discourseFrame:initial.discourseFrame});
 const negative=sentence(current,{polarity:'negative'}),positive=sentence(negative,{polarity:'positive'});
 assert.equal(negative.discourseFrame,current.discourseFrame);assert.equal(positive.discourseFrame,current.discourseFrame);assert.equal(positive.sourceNncSlotFrame,current.sourceNncSlotFrame);
 assert.equal(positive.sentenceType,'information-question');assert.equal(positive.sentenceSurface,'Tleh?');assert.equal(negative.sentenceSurface,'Ahtleh.');
});
test('repeat sentence changes do not bypass the contextual flawed-subject required-negative restriction',()=>{
 // This boundary is genuinely lexical. A nonce would not instantiate it.
 const source=r.buildClassicalNahuatlOrdinaryNncSourceFrame({stem:'hueli',sourceClass:'tl'});
 const negative=r.executeClassicalGrammarApplicationRequest({operationId:'particle:negative-selection',args:[{polarity:'negative',sentenceKind:'statement'}]}).canonicalResult;
 const context=r.issueClassicalNahuatlContextualFlawedSubjectSourceFrame(source,negative);assert.equal(context.authorizationStatus,'authorized',context.blockReason);
 const nominal=r.evaluateClassicalNahuatlNominalConstruction({constructionKind:'affective-nnc',affectRoute:'flawed-subject',subject:'3common',state:'absolutive',animacy:'unspecified',source:{embedStem:'hueli',embedClass:'tl',embedSourceClass:'tl',canonicalNncSourceFrame:source,contextualFlawedSubjectSourceFrame:context}});
 assert.equal(nominal.authorizationStatus,'authorized',nominal.blockReason);
 const current=r.buildClassicalNahuatlNncSentenceSurfaceFrame(nominal.canonicalResult.nncSlotFrame,{polarity:'negative'});assert.equal(current.sentenceSurface,'Ahhueli.');
 const retained=r.buildClassicalNahuatlNncSentenceSurfaceFrame(current);assert.equal(retained.authorizationStatus,'authorized');assert.equal(retained.contextualFlawedSubjectSourceFrame,context);
 for(const change of [{polarity:'positive'},{sentenceType:'question'}]){
  const result=r.buildClassicalNahuatlNncSentenceSurfaceFrame(current,change);assert.equal(result.authorizationStatus,'blocked');assert.equal(result.blockReason,'contextual-flawed-subject-negative-assertion-required');
 }
});
