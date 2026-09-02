import assert from "node:assert/strict";
import test from "node:test";

import { createClassicalPlaceGentilicValidationSemanticOperationsApi } from
  "../core/classical/place_gentilic_validation_semantic_operations.mjs";
import { createModuleRuntime } from "../node/runtime.mjs";

async function fixture() {
  const { context } = await createModuleRuntime({
    exposeModuleInspectionCapabilities: true,
  });
  const validation =
    createClassicalPlaceGentilicValidationSemanticOperationsApi(context);
  return { context, validation };
}

test("tlā-n and lā-n retain distinct Sources under one exact gentilic rule", async () => {
  const { validation } = await fixture();
  const frame = validation.buildClassicalPlaceGentilicValidationFrame();
  const pair = frame.constraints.tlanLanGentilicVariantPair;
  assert.equal(pair.authorizationStatus, "authorized");
  assert.deepEqual({
    sources: [
      pair.branches.tlan.sourcePlaceStem,
      pair.branches.lan.sourcePlaceStem,
    ],
    formulas: [pair.branches.tlan.formula, pair.branches.lan.formula],
    surfaces: [pair.branches.tlan.surface, pair.branches.lan.surface],
    distinctSources: pair.variantSourcesRemainDistinct,
    convergentResult: pair.canonicalResultConverges,
  }, {
    sources: ["Āz-tlā-n", "Āz-lā-n"],
    formulas: ["#n-0(Āz-tē-ca)tl-0#", "#n-0(Āz-tē-ca)tl-0#"],
    surfaces: ["nĀztēcatl", "nĀztēcatl"],
    distinctSources: true,
    convergentResult: true,
  });
});

test("missing, copied, or relabeled variants cannot satisfy the owner", async () => {
  const { validation } = await fixture();
  const frame = validation.buildClassicalPlaceGentilicValidationFrame();
  const cases = frame.cases;
  assert.equal(validation.buildClassicalTlanLanGentilicVariantPair({
    ...cases,
    lanGentilic: null,
  }).authorizationStatus, "blocked");
  assert.equal(validation.buildClassicalTlanLanGentilicVariantPair({
    ...cases,
    lanGentilic: cases.tlanGentilic,
  }).authorizationStatus, "blocked");
  assert.equal(validation.buildClassicalTlanLanGentilicVariantPair({
    ...cases,
    lanGentilic: {
      ...cases.lanGentilic,
      sourcePlaceStem: "Āz-tlā-n",
    },
  }).authorizationStatus, "blocked");
});

test("catalog execution observes the exact pair object, not a status flag", async () => {
  const { context } = await fixture();
  const request = {
    analysisDomain: "classical-tlan-lan-gentilic-variant-pair",
    selection: "claim-p4636",
    requestedFacet: "p4636-in-tla-n-and-its-variant-la-n-the",
    participantChoice:
      "claim-p4636:p4636-in-tla-n-and-its-variant-la-n-the",
  };
  const source = context.buildClassicalTlanLanGentilicVariantPairSource(
    request,
  );
  const result = context.evaluateClassicalTlanLanGentilicVariantPair(source);
  const evidence =
    context.getClassicalTlanLanGentilicVariantPairExecutionEvidence(result);
  assert.equal(result.authorizationStatus, "authorized");
  assert.equal(
    result.payload.proofObservationKind,
    "direct-canonical-result-observation",
  );
  assert.equal(
    result.payload.effectiveCanonicalPath,
    "constraints.tlanLanGentilicVariantPair",
  );
  assert.equal(
    context.isClassicalTlanLanGentilicVariantPairExecutionEvidence(
      evidence,
      result,
    ),
    true,
  );
  assert.equal(
    context.evaluateClassicalTlanLanGentilicVariantPair({ ...source })
      .authorizationStatus,
    "blocked",
  );
});
