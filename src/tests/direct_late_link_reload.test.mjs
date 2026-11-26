import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode,decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime = async () => (await createRuntimeInstance({
  documentObject:{getElementById:()=>null,addEventListener(){}},
})).runtimeObject;

export function makeDirectLateResults(r) {
  const defaults={sourceValence:"intransitive",verbClass:"A",subject:"3sg",mood:"indicative",tense:"present",voice:"active"};
  function make(args) {
    const applied=r.executeClassicalGrammarApplicationRequest({operationId:"vnc:derivational-operation",args:[{...defaults,...args}]});
    assert.equal(applied.authorizationStatus,"authorized",applied.blockReason);
    return applied.canonicalResult;
  }
  const purposive=make({sourceStem:"cuīca",derivationType:"direct",lateOperation:"purposive",lateVariant:"directional",
    purposiveSeries:"outbound-nonpast-indicative"});
  const honorific=make({sourceStem:"chōca",sourceSubject:"3sg",sourceSubjectHumanness:"human",sourceSubjectAnimacy:"animate",
    lateOperation:"honorific",lateVariant:"causative",honoredParticipant:"subject",
    honorificFormationAnalysis:"causative-only",honorificStemAlternative:"type-two-long"});
  const pejorative=make({sourceStem:"chōca",derivationType:"direct",lateOperation:"pejorative",
    lateVariant:"preterit-embed",honoredParticipant:"subject"});
  const principal=r.requestClassicalVncApplicationResult({sourceStem:"cochi",verbClass:"B",sourceValence:"intransitive",
    subject:"3sg",mood:"indicative",tense:"present",requestedVoice:"active"});
  const controller=r.createClassicalClauseRelationController();
  assert.equal(controller.captureCurrentResult("principal",principal).authorizationStatus,"authorized");
  assert.equal(controller.captureCurrentResult("adjoined",purposive).authorizationStatus,"authorized");
  const built=controller.compose({relation:"purpose",degree:"nonadverbialized",relationProfile:"purposive-vnc",
    order:"modifier-head",structureProfile:"modification"});
  assert.equal(built.authorizationStatus,"authorized",built.blockReason);
  return {purpose:built.canonicalResult,purposive,honorific,pejorative,pejorativeSentence:r.requestClassicalVncSentenceResultFrame(pejorative),sentence:r.requestClassicalVncSentenceResultFrame(honorific)};
}

test("purposive adjunct and attitude sentence links retain original choices and formulas",async()=>{
  const r=await runtime(),fresh=await runtime();
  const original=makeDirectLateResults(r);
  for(const [form,field] of [[original.purposive,"surfaceRealization"],[original.honorific,"surfaceRealization"],
    [original.purpose,"surface"],[original.sentence,"sentenceSurfaceDisplay"],
    [original.pejorative,"surfaceRealization"],[original.pejorativeSentence,"sentenceSurfaceDisplay"]]) {
    const recipe=save(r,{result:form});
    assert.ok(recipe,form.kind);
    const restored=replay(fresh,await decode(await encode(recipe)))?.result;
    assert.ok(restored,form.kind);
    assert.ok(form[field]);
    assert.equal(restored[field],form[field]);
    if(form===original.purpose) {
      assert.deepEqual(restored.formulaRealizationRecord,form.formulaRealizationRecord);
      assert.equal(restored.ruleProfile.purposeType,"purposive-vnc");
      assert.equal(restored.sourceContract.adjoined.issuedResult.formulaRealization,original.purposive.formulaRealization);
    } else if(form===original.sentence || form===original.pejorativeSentence) {
      assert.ok(form.sentenceFormulaDisplay);
      assert.equal(restored.sentenceFormulaDisplay,form.sentenceFormulaDisplay);
      assert.equal(restored.lateOperationClosureFrame.operationFrame.operation,form.lateOperationClosureFrame.operationFrame.operation);
    } else {
      assert.ok(form.formulaRealization);
      assert.equal(restored.formulaRealization,form.formulaRealization);
      assert.deepEqual(fresh.getClassicalNahuatlDirectLateReloadInputs(restored),r.getClassicalNahuatlDirectLateReloadInputs(form));
    }
  }
});

export function makePossessiveCompound(r) {
  const args={sourceStem:"ye",sourceValence:"intransitive",verbClass:"A",subject:"3sg",mood:"indicative",
    tense:"present",derivationType:"direct",voice:"active",lateOperation:"compound",lateVariant:"accompanying-possession",
    compoundMatrixStem:"nemi",compoundMatrixClass:"B",compoundPossessiveStem:"chīmal",compoundPossessor:"1sg"};
  const application=r.executeClassicalGrammarApplicationRequest({operationId:"vnc:derivational-operation",args:[args]});
  assert.equal(application.authorizationStatus,"authorized",application.blockReason);
  const parent=application.canonicalResult;
  assert.equal(parent.surfaceRealization,"nochīmal yetinemi");
  return {parent,result:r.requestClassicalVncSentenceResultFrame(parent)};
}

test("accompanying possession retains the possessive and verbal analysis",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {parent,result}=makePossessiveCompound(r);
  for(const frame of [parent,result]){
    const recipe=save(r,{result:frame});
    assert.ok(recipe,parent.surfaceRealization);
    const restored=replay(fresh,await decode(await encode(recipe)))?.result;
    assert.ok(restored);
    const closure=restored.lateOperationClosureFrame ?? restored;
    assert.equal(closure.surfaceRealization,parent.surfaceRealization);
    assert.equal(closure.formulaRealization,parent.formulaRealization);
    assert.equal(closure.operationFrame.variant,"accompanying-possession");
    if(frame===result){
      assert.equal(restored.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
      assert.equal(restored.sentenceSurfaceDisplay,result.sentenceSurfaceDisplay);
    }
  }
});

export function makeSelectedWish(r,negative) {
  const base=r.requestClassicalVncApplicationResult({sourceStem:"nemi",sourceValence:"intransitive",verbClass:"B",
    subject:"1sg",mood:"optative",tense:"nonpast",requestedDerivation:"direct",requestedVoice:"active"});
  const application=r.executeClassicalGrammarApplicationRequest({operationId:"vnc:sentence-result",
    args:[base,{sentenceType:"wish-sentence",introductoryParticle:"mā",negative}]});
  assert.equal(application.authorizationStatus,"authorized",application.blockReason);
  return {base,result:application.canonicalResult};
}

test("explicit positive and negative wish envelopes reopen with their original analysis",async()=>{
  const r=await runtime(),fresh=await runtime();
  for(const negative of [false,true]){
    const {base,result}=makeSelectedWish(r,negative);
    const recipe=save(r,{result,base});
    assert.ok(recipe);
    const roots=replay(fresh,recipe);
    assert.ok(roots);
    assert.ok(roots.result.canonicalSourceFrame===roots.base);
    const linked=replay(fresh,await decode(await encode(save(r,{result}))))?.result;
    assert.equal(linked?.sentenceSurfaceDisplay,result.sentenceSurfaceDisplay);
    assert.equal(linked?.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
  }
});

export function makeLayeredWish(r) {
  const host=makeSelectedWish(r,true).result;
  const application=r.executeClassicalGrammarApplicationRequest({operationId:"sentence:adverbial-adjunction",args:[{
    nuclearResultFrame:host,particleSourceFrame:r.buildClassicalNahuatlParticleSourceFrame("l3-no-adverbial"),
  }]});
  assert.equal(application.authorizationStatus,"authorized",application.blockReason);
  return {host,result:application.canonicalResult};
}

test("adverbial adjunction keeps the explicitly selected wish as its exact host",async()=>{
  const r=await runtime(),fresh=await runtime();
  const {host,result}=makeLayeredWish(r);
  const roots=replay(fresh,save(r,{result,host}));
  assert.ok(roots);
  assert.ok(roots.result.canonicalInputFrame===roots.host);
  assert.equal(roots.host.sentenceFormulaDisplay,host.sentenceFormulaDisplay);
  const linked=replay(fresh,await decode(await encode(save(r,{result}))))?.result;
  assert.equal(linked?.sentenceSurfaceDisplay,result.sentenceSurfaceDisplay);
  assert.equal(linked?.sentenceFormulaDisplay,result.sentenceFormulaDisplay);
});
