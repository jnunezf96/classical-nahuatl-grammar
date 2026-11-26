import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save, replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode, decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime = async () => (await createRuntimeInstance({
  documentObject:{getElementById:()=>null,addEventListener(){}},
})).runtimeObject;

export function makeLexicalizedSentence(r) {
  function make(operationId, ...args) {
    const applied = r.executeClassicalGrammarApplicationRequest({operationId,args});
    assert.equal(applied.authorizationStatus,"authorized",applied.blockReason);
    return applied.canonicalResult;
  }
  const compound = make("vnc:derivational-operation",{
    sourceStem:"tōna",verbClass:"A",sourceValence:"intransitive",objectKind:"none",subject:"3sg",
    mood:"indicative",tense:"present",requestedDerivation:"direct",requestedVoice:"active",
    lateOperation:"compound",lateVariant:"connective-t",compoundMatrixStem:"ya-uh",compoundMatrixClass:"B",
    sourceObjectRequests:[],sentenceOptions:{outsidePrefixes:[]},
  });
  const parent = make("nnc:deverbal-construction",{
    constructionKind:"predicate-nominalization",nominalizationKind:"present-agentive",
    canonicalVncResult:compound,subject:"3sg",state:"absolutive",animacy:"animate",
  });
  const source = r.buildClassicalNahuatlLexicalizedPresentNncSourceFrame(parent);
  const navigator = r.getClassicalGrammarApplicationCapabilityNavigator(source);
  const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,"nnc:ordinary",{
    state:"absolutive",subject:"3sg",animacy:"animate",humanness:"nonhuman",
  });
  const receipt = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
  assert.equal(receipt?.authorizationStatus,"authorized",receipt?.blockReason);
  const noun = receipt.canonicalResult;
  const sentence = make("nnc:sentence-surface",noun.typedSlotFrame,{sentenceType:"assertion",polarity:"negative"});
  return {compound,parent,noun,sentence};
}

test("lexicalized present noun and negative sentence reopen with the complete earlier build", async () => {
  const r = await runtime();
  const original = makeLexicalizedSentence(r);
  const recipe = save(r,{result:original.sentence,noun:original.noun,parent:original.parent,compound:original.compound});
  assert.ok(recipe);
  const single = save(r,{result:original.sentence});
  assert.ok(single);
  const fresh = await runtime();
  const restored = replay(fresh, JSON.parse(JSON.stringify(recipe)));
  assert.ok(restored);
  assert.equal(restored.compound.surfaceRealization,original.compound.surfaceRealization);
  assert.equal(restored.compound.operationFrame.variant,"connective-t");
  assert.equal(restored.parent.sourceFrame.canonicalVncResult,restored.compound);
  const sourceParent = fresh.getClassicalNahuatlLexicalizedPresentNncSourceParent(restored.noun.sourceFrame);
  assert.equal(sourceParent.canonicalResult,restored.parent);
  const linkResult = replay(fresh,await decode(await encode(single)))?.result;
  assert.ok(linkResult);
  assert.equal(linkResult.sentenceSurface,original.sentence.sentenceSurface);
  assert.equal(linkResult.sentenceFormulaDisplay,original.sentence.sentenceFormulaDisplay);
  assert.equal(linkResult.sentenceSurface,"Ahtōnatiuh.");
  assert.equal(linkResult.sentenceFormulaDisplay,"ah#0-0(tōna-ti-uh-0)0-0#.");
  assert.equal(linkResult.polarity,"negative");
});
