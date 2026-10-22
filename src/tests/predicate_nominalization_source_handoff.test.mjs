import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRuntimeInstance} from '../runtime/create_runtime.mjs';
import {createUiComposerRuntime} from '../ui/composer/composer.mjs';
const nonce=JSON.parse(readFileSync(new URL('./fixtures/nonce_predicate_nominalization.json',import.meta.url)));
function sourceDocument(stem='tlāza',valence='specific-projective',kind='preterit-patientive',option='') {
 const controls=new Map(Object.entries({'classical-construction-operation':'deverbal-nnc','classical-deverbal-nnc-family':'predicate-nominalization','classical-deverbal-nnc-nominalization-kind':kind,'classical-source-whole':stem,'classical-rule-logic-class':'B','classical-rule-logic-valence':valence,'classical-rule-logic-nnc-state':'absolutive','classical-rule-logic-nnc-subject-person':'3','classical-rule-logic-nnc-subject-number':'singular','classical-rule-logic-nnc-subject-animacy':'animate','classical-rule-logic-nnc-possessor':'3sg','classical-rule-logic-nonactive-family':option}).map(([id,value])=>[id,{id,value,dataset:{},getAttribute:()=>null,options:[],closest:()=>null}]));
 const documentObject={getElementById:id=>controls.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}};
 return{controls,documentObject};
}
const basic=async documentObject=>(await createRuntimeInstance({documentObject:documentObject||{getElementById:()=>null,addEventListener(){}}})).runtimeObject;
for(const kind of ['preterit-patientive','customary-patientive','passive-action','instrumentive','instrumentive-full'])test('native selected nonactive option reaches '+kind+' genuine Source and preview',async()=>{
 const valence=kind.startsWith('instrumentive')?'projective-nonhuman':'specific-projective';
 const f=sourceDocument('tlāza',valence,kind,'ō:tlāx-ō'),r=await basic(f.documentObject);
 r.getClassicalSourcePartControlState=()=>({mode:'whole',sourceWholeStem:'tlāza',sourceEmbedStem:'',sourceMatrixStem:''});
 const request=r.buildClassicalNominalConstructionUiRequest();
 assert(r.isClassicalNahuatlVncApplicationResultFrame(request?.canonicalVncResult),'an actual issued Source witness is required');
 assert.equal(request.canonicalVncResult.selectedNonactiveOptionId,'ō:tlāx-ō');
 const preview=r.previewClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[request]});
 assert.equal(r.isClassicalGrammarApplicationPreview(preview),true,preview?.blockReason);
 if(kind==='instrumentive'){
  assert(r.isClassicalNahuatlVncApplicationResultFrame(request.canonicalInstrumentiveAbsolutiveVncResult));
  assert(r.isClassicalNahuatlVncApplicationResultFrame(request.canonicalInstrumentivePossessiveVncResult));
 }
});
for(const kind of ['preterit-agentive','customary-agentive-reanalysis','customary-agentive-full','present-agentive','future-agentive','active-action'])test('genuine va ne survives native '+kind+' capture for a fresh synthetic Source',async()=>{
 const f=sourceDocument(nonce.stem,'shuntline-reflexive',kind),r=await basic(f.documentObject);
 r.getClassicalSourcePartControlState=()=>({mode:'whole',sourceWholeStem:nonce.stem,sourceEmbedStem:'',sourceMatrixStem:''});
 const request=r.buildClassicalNominalConstructionUiRequest();const exact=request.canonicalVncResult;
 const capture=kind==='preterit-agentive' ? r.captureClassicalNahuatlPreteritVncResultForNominalization(exact)
   : r.captureClassicalNahuatlVncResultForPredicateNominalization(exact,kind);
 assert.equal(capture.continuationProjection?.sourceValence,'shuntline-reflexive','collector must not substitute an intransitive Source');
 assert(exact.surfaceRealization.startsWith('ne'),exact.surfaceRealization);
 const result=r.evaluateClassicalNahuatlDeverbalNnc(request);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.sourceFrame.canonicalVncResult,exact);
 assert.equal(result.sourceFrame.sourceValence,'single-object');assert.equal(result.sourceFrame.sourceObjectPattern,'reflexive');
 assert(result.wordSurface.startsWith('ne'),result.wordSurface);
 const forged={...request,canonicalVncResult:{...exact}};
 assert.equal(r.evaluateClassicalNahuatlDeverbalNnc(forged).authorizationStatus,'blocked');
});
for(const kind of ['instrumentive','instrumentive-full'])for(const state of ['absolutive','possessive'])test(`fresh va ne ${kind} ${state} preserves authentic companion Sources`,async()=>{
 const f=sourceDocument(nonce.stem,'shuntline-reflexive',kind),r=await basic(f.documentObject);
 r.getClassicalSourcePartControlState=()=>({mode:'whole',sourceWholeStem:nonce.stem,sourceEmbedStem:'',sourceMatrixStem:''});
 f.controls.get('classical-rule-logic-nnc-state').value=state;
 f.controls.get('classical-rule-logic-nnc-possessor').value='1sg';
 const inventory=r.getClassicalNahuatlNonactiveStemOptions(nonce.stem,{verbClass:'B',sourceValence:'shuntline-reflexive'});
 const option=inventory.options.find(o=>o.suffixFamily==='ō')||inventory.options[0];
 assert(option?.optionId,'productive synthetic Source supplies its own formation');
 f.controls.get('classical-rule-logic-nonactive-family').value=option.optionId;
 const request=r.buildClassicalNominalConstructionUiRequest();
 const result=r.evaluateClassicalNahuatlDeverbalNnc(request);
 assert.equal(result.authorizationStatus,'authorized',result.blockReason);
 assert.equal(result.sourceFrame.sourceValence,'single-object');
 assert.equal(result.sourceFrame.sourceObjectPattern,'reflexive');
 assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[request]})),true);
 if(kind==='instrumentive'){
  for(const [key,voice] of [['canonicalInstrumentiveAbsolutiveVncResult','impersonal'],['canonicalInstrumentivePossessiveVncResult','active']]){
   assert(r.isClassicalNahuatlVncApplicationResultFrame(request[key]),key);
   const capture=r.captureClassicalNahuatlVncResultForPredicateNominalization(request[key],kind,voice==='active'?'possessive':'absolutive');
   assert.equal(capture.continuationProjection.sourceValence,'shuntline-reflexive');
   assert.equal(capture.continuationProjection.sourceVoice,voice);
   assert.equal(r.evaluateClassicalNahuatlDeverbalNnc({...request,[key]:{...request[key]}}).authorizationStatus,'blocked','copied companion rejected');
  }
 }
});
for(const [valence,kind]of [['specific-projective','instrumentive'],['specific-projective','instrumentive-full'],['projective-human','preterit-patientive'],['projective-nonhuman','passive-action'],['specific-projective','active-action']])test(`legitimate restriction remains ${valence} ${kind}`,async()=>{
 const f=sourceDocument(nonce.stem,valence,kind,'ō:tlāx-ō'),r=await basic(f.documentObject);
 r.getClassicalSourcePartControlState=()=>({mode:'whole',sourceWholeStem:nonce.stem,sourceEmbedStem:'',sourceMatrixStem:''});
 const request=r.buildClassicalNominalConstructionUiRequest();
 assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[request]})),false);
 assert.equal(r.evaluateClassicalNahuatlDeverbalNnc(request).authorizationStatus,'blocked');
});
test('an option belonging to another Source cannot authorize a nonactive nominalization',async()=>{
 const f=sourceDocument(nonce.stem,'projective-nonhuman','instrumentive','ō:tlāx-ō'),r=await basic(f.documentObject);
 r.getClassicalSourcePartControlState=()=>({mode:'whole',sourceWholeStem:nonce.stem,sourceEmbedStem:'',sourceMatrixStem:''});
 const request=r.buildClassicalNominalConstructionUiRequest();
 assert.equal(r.isClassicalNahuatlVncApplicationResultFrame(request.canonicalVncResult),false);
 assert.equal(r.isClassicalGrammarApplicationPreview(r.previewClassicalGrammarApplicationRequest({operationId:'nnc:deverbal-construction',args:[request]})),false);
});

test('visible formation-button change reaches the shared native refresh exactly once',async()=>{
 const f=sourceDocument('tlāza','specific-projective','preterit-patientive','ō:tlāx-ō');
 const listeners={};f.documentObject.addEventListener=(type,fn)=>(listeners[type]||=[]).push(fn);
 const runtime=await basic(f.documentObject),refreshes=[];
 const target=Object.create(runtime);
 Object.defineProperties(target,{document:{value:f.documentObject},renderClassicalRuleLogicSurfaceBlock:{value:overrides=>{refreshes.push(overrides);return overrides;}}});
 const r=createUiComposerRuntime(target);
 r.initClassicalNonactiveFormationControlEvents();
 const event={target:f.controls.get('classical-rule-logic-nonactive-family')};
 assert(listeners.change?.length,'mirrored buttons dispatch change');
 for(const fn of listeners.change)fn(event);
 r.handleClassicalNonactiveFormationControlChange(event);
 assert.equal(refreshes.length,1,'delegated and direct paths deduplicate the same event');
 assert.equal(refreshes[0].nonactiveOptionId,'ō:tlāx-ō');
});
