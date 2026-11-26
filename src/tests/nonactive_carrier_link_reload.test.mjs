import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode,decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime=async()=>(await createRuntimeInstance({
  documentObject:{getElementById:()=>null,addEventListener(){}},
})).runtimeObject;

export function makePassive(r) {
  const source=r.resolveClassicalNahuatlNonactiveCarrierSourceFrame({enteredStem:"nec-ō",valence:"intransitive"});
  const choices={subject:"3common",subjectAnimacy:"nonanimate",subjectHumanness:"nonhuman",patientReferenceId:"desired-p",
    requestedVoice:"passive",requestedDerivation:"direct",mood:"indicative",tense:"future"};
  const navigator=r.getClassicalGrammarApplicationCapabilityNavigator(source);
  const binding=r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,"vnc:application",choices);
  assert.equal(binding.bindingStatus,"ready",binding.blockReason);
  const made=r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
  assert.equal(made.authorizationStatus,"authorized",made.blockReason);
  const app=made.canonicalResult;
  const sentence=r.requestClassicalVncSentenceResultFrame(app);
  assert.ok(r.isClassicalNahuatlVncSentenceResultFrame(sentence));
  return {source,app,sentence,choices};
}

test("passive sentence links retain the issued stem, finite form and patient",async()=>{
  const r=await runtime();
  const {source,app,sentence,choices}=makePassive(r);
  const recipe=save(r,{result:sentence});
  assert.ok(recipe);
  assert.deepEqual(recipe.nodes.map(node=>node.type),["vnc:nonactive-carrier","vnc:nonactive-carrier-sentence"]);
  const fresh=await runtime();
  const restored=replay(fresh,await decode(await encode(recipe)))?.result;
  assert.ok(restored);
  assert.equal(restored.sentenceSurfaceDisplay,sentence.sentenceSurfaceDisplay);
  assert.equal(restored.sentenceFormulaDisplay,sentence.sentenceFormulaDisplay);
  assert.match(restored.sentenceSurfaceDisplay,/necōz/i);
  const finite=restored.vncApplicationFrame.resultFrame;
  assert.equal(finite.sourceMachineryFrame,fresh.resolveClassicalNahuatlNonactiveCarrierSourceFrame({enteredStem:source.nonactiveStem,valence:"intransitive"}));
  assert.equal(finite.subjectParticipantFrame.referenceId,choices.patientReferenceId);
  assert.deepEqual(finite.subjectParticipantFrame,app.resultFrame.subjectParticipantFrame);
  assert.equal(finite.selectedVoice,"passive");
  const forged=structuredClone(recipe);
  forged.nodes[0].selections.patientReferenceId="";
  assert.equal(replay(fresh,forged),null);
});
