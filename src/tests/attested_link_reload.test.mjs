import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save, replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode, decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime = async () => (await createRuntimeInstance({
  documentObject: {getElementById: () => null, addEventListener() {}},
})).runtimeObject;

test("attested Results reissue their owners and preserve choices inside a conditional", async () => {
  const r = await runtime();
  const fresh = await runtime();
  const cases = [
    ["nnc:attested-cell", "NncCell", "attested-cell", "icn-īuh", {possessor:"1sg"}],
    ["nnc:attested-cell", "NncCell", "attested-cell", "icn-īuh", {possessor:"2pl"}],
    ["nnc:attested-place", "Place", "attested-place", "Teticpac", {}],
    ["clause:attested-collocation", "PrincipalCollocation", "attested-collocation", "achi īc", {}],
  ];
  async function roundTrip(value) {
    const recipe = save(r,{result:value});
    assert.ok(recipe,value.kind);
    const result = replay(fresh,await decode(await encode(recipe)))?.result;
    assert.ok(result,value.kind);
    return result;
  }
  const issued = [];
  for (const [operationId,family,sourceUse,enteredStem,choices] of cases) {
    const source = r[`resolveClassicalNahuatlAttested${family}SourceFrame`]({enteredStem,sourceUse});
    const binding = r[`issueClassicalNahuatlAttested${family}BindingFrame`](source,choices);
    assert.equal(binding.bindingStatus,"ready");
    const value = r.executeClassicalGrammarApplicationRequest({operationId,args:binding.executionArgs}).canonicalResult;
    const restored = await roundTrip(value);
    assert.equal(restored.wordSurface,value.wordSurface);
    assert.equal(restored.formulaRealization,value.formulaRealization);
    assert.deepEqual(restored.possessorParticipantFrame,value.possessorParticipantFrame);
    assert.deepEqual(restored.writingQualification,value.writingQualification);
    issued.push(value);
  }
  const controller = r.createClassicalClauseRelationController();
  const verb = r.requestClassicalVncApplicationResult({
    sourceStem:"cochi",verbClass:"B",sourceValence:"intransitive",subject:"3sg",mood:"indicative",tense:"present",requestedVoice:"active",
  });
  assert.equal(controller.captureCurrentResult("principal",issued.at(-1)).authorizationStatus,"authorized");
  assert.equal(controller.captureCurrentResult("adjoined",verb).authorizationStatus,"authorized");
  assert.equal(controller.captureCurrentResult("marker",r.requestClassicalParticleResult("l3-in-tla")).authorizationStatus,"authorized");
  const made = controller.compose({relation:"condition",order:"modifier-head",relationProfile:"open"});
  assert.equal(made.authorizationStatus,"authorized",made.blockReason);
  const original = made.canonicalResult;
  const restored = await roundTrip(original);
  assert.equal(restored.surface,original.surface);
  assert.deepEqual(restored.formulaRealizationRecord,original.formulaRealizationRecord);
  assert.equal(restored.ruleProfile.relation,"condition");
  assert.ok(fresh.isClassicalNahuatlAttestedPrincipalCollocationResult(restored.sourceContract.principal.issuedResult));
});
