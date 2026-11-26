import assert from "node:assert/strict";
import test from "node:test";
import {createRuntimeInstance} from "../runtime/create_runtime.mjs";
import {exportClassicalResultReloadRecipe as save, replayClassicalResultReloadRecipe as replay} from "../application/classical/result_reload.mjs";
import {encodeCompactResultAddress as encode, decodeCompactResultAddress as decode} from "../application/classical/compact_result_link.mjs";

const runtime = async () => (await createRuntimeInstance({
  documentObject: {getElementById: () => null, addEventListener() {}},
})).runtimeObject;

test("typed relational replay keeps its exact Source and fixed choices inside a place adjunct", async () => {
  const r = await runtime();
  const s = r.buildClassicalNahuatlRelationalNncTypedSourceFrame({
    state:"possessive", possessorId:"1sg", subjectMode:"adverbialized", subjectId:"3common",
    nounstem:{kind:"classical-nahuatl-nnc-nounstem-request",stemId:"tloc-proximity",formation:"option-one",
      operation:"relational-nnc",sourceKind:"possessor",sourceFormation:"plain-nounstem",sourceVoice:"active",
      sourceMode:"whole-stem",sourceStem:"tloc",sourceMatrixStem:"tloc",affective:"none"},
  });
  const made = r.executeClassicalGrammarApplicationRequest({operationId:"nnc:relational",args:[s]});
  assert.equal(made.authorizationStatus,"authorized",made.blockReason);
  const adjunct = made.canonicalResult;
  const principal = r.requestClassicalVncApplicationResult({
    sourceStem:"cochi",verbClass:"B",sourceValence:"intransitive",subject:"3sg",mood:"indicative",tense:"present",
  });
  const controller = r.createClassicalClauseRelationController();
  assert.equal(controller.captureCurrentResult("principal",principal).authorizationStatus,"authorized");
  assert.equal(controller.captureCurrentResult("adjoined",adjunct).authorizationStatus,"authorized");
  const combined = controller.compose({relation:"place",degree:"first",order:"modifier-head",structureProfile:"modification"});
  assert.equal(combined.authorizationStatus,"authorized",combined.blockReason);
  const original = combined.canonicalResult;
  const recipe = save(r,{result:original});
  assert.ok(recipe);
  const fresh = await runtime();
  const result = replay(fresh,await decode(await encode(recipe)))?.result;
  assert.ok(result);
  assert.equal(result.surface,original.surface);
  assert.deepEqual(result.formulaRealizationRecord,original.formulaRealizationRecord);
  const restored = result.sourceContract.adjoined.issuedResult;
  assert.ok(fresh.isClassicalNahuatlRelationalNncTypedSourceFrame(restored.navigatorSourceFrame));
  assert.equal(restored.navigatorSourceFrame.sourceFrame,restored.sourceFrame);
  assert.deepEqual(restored.choiceOptionProjection,adjunct.choiceOptionProjection);
});
