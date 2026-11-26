import assert from "node:assert/strict";
import test from "node:test";
import { createRuntimeInstance } from "../runtime/create_runtime.mjs";
import { exportClassicalResultReloadRecipe, replayClassicalResultReloadRecipe } from "../application/classical/result_reload.mjs";
import { decodeCompactResultAddress, encodeCompactResultAddress } from "../application/classical/compact_result_link.mjs";

const runtime = async () => (await createRuntimeInstance({
  documentObject: {getElementById: () => null, addEventListener() {}},
})).runtimeObject;

test("a quantitative predicate and its intensifier reopen with the same form and analysis", async () => {
  const r = await runtime();
  const fresh = await runtime();
  const source = r.buildClassicalNahuatlQuantitativePredicateSourceFrame({
    citation:"miyec", sourceUse:"quantitative-predicate", reference:"nonanimate-common",
  });
  const binding = r.issueClassicalNahuatlQuantitativePredicateBindingFrame(source);
  const quantity = r.executeClassicalGrammarApplicationRequest({
    operationId:"nnc:quantitative-predicate", args:binding.executionArgs,
  }).canonicalResult;
  const intensifier = r.requestClassicalAdverbialNncResult({
    adverbialPotentialFrame:r.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:"cencah"}),
  });
  const controller = r.createClassicalClauseRelationController();
  assert.equal(controller.captureCurrentResult("principal", quantity).authorizationStatus, "authorized");
  assert.equal(controller.captureCurrentResult("adjoined", intensifier).authorizationStatus, "authorized");
  const made = controller.compose({relation:"intensification"});
  assert.equal(made.authorizationStatus, "authorized", made.blockReason);
  const whole = made.canonicalResult;
  for (const accepted of [quantity, intensifier, whole]) {
    const recipe = exportClassicalResultReloadRecipe(r, {result:accepted});
    assert.ok(recipe, accepted.kind);
    const restored = replayClassicalResultReloadRecipe(fresh,
      await decodeCompactResultAddress(await encodeCompactResultAddress(recipe)))?.result;
    assert.ok(restored, JSON.stringify(recipe));
    if (accepted === whole) {
      assert.equal(restored.surface, whole.surface);
      assert.deepEqual(restored.formulaRealizationRecord, whole.formulaRealizationRecord);
      assert.equal(restored.ruleProfile.relation, "intensification");
      assert.ok(fresh.isClassicalNahuatlQuantitativePredicateResult(restored.quantitativePredicateParent));
      assert.equal(restored.intensityAdverbParent.lexicalEntryId, intensifier.lexicalEntryId);
    } else {
      assert.equal(restored.wordSurface, accepted.wordSurface);
      assert.equal(restored.formulaRealization, accepted.formulaRealization);
    }
  }
});
