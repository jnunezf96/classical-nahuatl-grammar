import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save,replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode,decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime = async () => (await createRuntimeInstance({
  documentObject:{getElementById:()=>null,addEventListener(){}},
})).runtimeObject;
const coordinates = {subject:"3sg",subjectAnimacy:"animate",subjectHumanness:"human",mood:"indicative",tense:"present"};

export function makeSpecializedSentences(r) {
  return [
    ["RestrictedContaining","itz",{sourceLexemeId:"cn-vnc-itz-motion-matrix"},{embedStem:"hui"},"Huītz."],
    ["Analytical","chich-ī-ni",{},{requestedDerivation:"causative",objectSelection:"specific-projective:2sg"},"Mitzchichīna."],
    ["Preformed","cah-ca-h",{},{},"Cahcah."],
  ].map(([family,enteredStem,sourceChoices,choices,expected])=>{
    const source = r[`resolveClassicalNahuatl${family}VncSourceFrame`]({enteredStem,valence:"intransitive",...sourceChoices});
    const navigator = r.getClassicalGrammarApplicationCapabilityNavigator(source);
    const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,"vnc:application",{...coordinates,...choices});
    assert.equal(binding.bindingStatus,"ready",binding.blockReason);
    const application = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.canonicalResult;
    assert.ok(application);
    const sentence = r.requestClassicalVncSentenceResultFrame(application);
    assert.equal(sentence?.sentenceSurfaceDisplay,expected);
    return {family,source,application,sentence};
  });
}

test("three specialized verb families reopen with their exact source and sentence formula",async()=>{
  const r = await runtime(), fresh = await runtime();
  for(const original of makeSpecializedSentences(r)) {
    const recipe = save(r,{result:original.sentence});
    assert.ok(recipe,original.family);
    const result = replay(fresh,await decode(await encode(recipe)))?.result;
    assert.ok(result,original.family);
    assert.equal(result.sentenceSurfaceDisplay,original.sentence.sentenceSurfaceDisplay);
    assert.ok(result.sentenceFormulaDisplay);
    assert.equal(result.sentenceFormulaDisplay,original.sentence.sentenceFormulaDisplay);
    const saved = fresh.getClassicalNahuatlSpecializedFiniteReloadInputs(result.vncApplicationFrame);
    const inputs = r.getClassicalNahuatlSpecializedFiniteReloadInputs(original.application);
    assert.deepEqual(saved,inputs);
    assert.equal(result.vncApplicationFrame.resultFrame.sourceMachineryFrame,
      fresh[`resolveClassicalNahuatl${original.family}VncSourceFrame`](inputs.source));
    const forged = structuredClone(recipe);
    forged.nodes[0].source.enteredStem = "nemi";
    assert.equal(replay(fresh,forged),null);
  }
});
