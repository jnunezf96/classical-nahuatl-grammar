// Permanent proof-address adapter for routine semantic owners.
//
// The legacy mechanics remains the canonical Source/Result executor. This
// adapter assigns every owner checkpoint a stable opaque proof identity,
// resolves its current Result path centrally, and returns identity-bound
// Results/Evidence carrying that proof identity.

import {
  createRoutineSemanticOwnerMechanicsApi as createLegacyRoutineSemanticOwnerMechanicsApi,
} from "./transcription_owner_mechanics_legacy.mjs";
import {
  resolveCanonicalProofAddress,
} from "../grammar/canonical_proof_address_registry.mjs";

const freeze = Object.freeze;

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return freeze(value);
}

function prepareCoordinate(spec, coordinateKey, coordinate = {}) {
  const currentPath = String(coordinate.canonicalPath || "");
  const proofAddress = resolveCanonicalProofAddress({
    proofAddressId: coordinate.proofAddressId || "",
    ownerId: spec.ownerId,
    semanticName: coordinate.proofSemanticName || "",
    currentPath,
    legacyKey: coordinate.proofAddressKey
      || currentPath
      || coordinate.assertionId
      || coordinateKey,
    assertionId: coordinate.assertionId || "",
  });
  return deepFreeze({
    ...coordinate,
    proofAddressId: proofAddress.proofAddressId,
    proofSemanticName: proofAddress.semanticName,
    canonicalPath: proofAddress.currentPath,
  });
}

function prepareSpec(spec = {}) {
  const coordinates = Object.fromEntries(
    Object.entries(spec.coordinates || {}).map(([coordinateKey, coordinate]) => [
      coordinateKey,
      prepareCoordinate(spec, coordinateKey, coordinate),
    ]),
  );
  return deepFreeze({
    ...spec,
    coordinates: deepFreeze(coordinates),
  });
}

function publicNames(prefix) {
  return freeze({
    build: `build${prefix}Source`,
    isSource: `is${prefix}Source`,
    evaluate: `evaluate${prefix}`,
    isResult: `is${prefix}Result`,
    getEvidence: `get${prefix}ExecutionEvidence`,
    isEvidence: `is${prefix}ExecutionEvidence`,
  });
}

function coordinateForSource(spec, source) {
  if (!source || typeof source !== "object") return null;
  return spec.coordinates?.[
    `${String(source.selection || "")}::${String(source.requestedFacet || "")}`
  ] || null;
}

function wrapOwnerApi(legacyApi, spec) {
  const names = publicNames(spec.prefix);
  const legacyBuild = legacyApi[names.build];
  const legacyIsSource = legacyApi[names.isSource];
  const legacyEvaluate = legacyApi[names.evaluate];
  const legacyIsResult = legacyApi[names.isResult];
  const legacyGetEvidence = legacyApi[names.getEvidence];
  const legacyIsEvidence = legacyApi[names.isEvidence];
  const issuedResults = new WeakSet();
  const legacyResultsByResult = new WeakMap();
  const evidenceByResult = new WeakMap();
  const legacyEvidenceByEvidence = new WeakMap();

  function evaluate(source = null) {
    const legacyResult = legacyEvaluate(source);
    const coordinate = coordinateForSource(spec, source);
    const proofAddressId = coordinate?.proofAddressId || "";
    const proofSemanticName = coordinate?.proofSemanticName || "";
    const result = deepFreeze({
      ...legacyResult,
      payload: {
        ...(legacyResult?.payload || {}),
        proofAddressId,
        proofSemanticName,
      },
    });
    const legacyEvidence = legacyGetEvidence(legacyResult);
    const evidence = legacyEvidence
      ? deepFreeze({
        ...legacyEvidence,
        proofAddressId,
        proofSemanticName,
      })
      : null;
    issuedResults.add(result);
    legacyResultsByResult.set(result, legacyResult);
    evidenceByResult.set(result, evidence);
    if (evidence && legacyEvidence) {
      legacyEvidenceByEvidence.set(evidence, legacyEvidence);
    }
    return result;
  }

  function isResult(result = null) {
    const legacyResult = legacyResultsByResult.get(result) || null;
    return Boolean(
      result
      && issuedResults.has(result)
      && legacyResult
      && legacyIsResult(legacyResult) === true
      && result.semanticOwnerId === spec.ownerId
      && result.operationId === spec.operationId
      && Object.isFrozen(result)
    );
  }

  function getEvidence(result = null) {
    return evidenceByResult.get(result) || null;
  }

  function isEvidence(evidence = null, result = null) {
    const legacyResult = legacyResultsByResult.get(result) || null;
    const legacyEvidence = legacyEvidenceByEvidence.get(evidence) || null;
    return Boolean(
      evidence
      && legacyResult
      && legacyEvidence
      && evidenceByResult.get(result) === evidence
      && legacyIsEvidence(legacyEvidence, legacyResult) === true
      && evidence.proofAddressId === result?.payload?.proofAddressId
      && evidence.proofSemanticName === result?.payload?.proofSemanticName
      && Object.isFrozen(evidence)
    );
  }

  return freeze({
    [names.build]: legacyBuild,
    [names.isSource]: legacyIsSource,
    [names.evaluate]: evaluate,
    [names.isResult]: isResult,
    [names.getEvidence]: getEvidence,
    [names.isEvidence]: isEvidence,
  });
}

export function createRoutineSemanticOwnerMechanicsApi(
  targetObject = globalThis,
  ownerSpecs = [],
) {
  const preparedSpecs = ownerSpecs.map(prepareSpec);
  const legacyApi = createLegacyRoutineSemanticOwnerMechanicsApi(
    targetObject,
    preparedSpecs,
  );
  const api = Object.create(null);
  for (const spec of preparedSpecs) {
    Object.assign(api, wrapOwnerApi(legacyApi, spec));
  }
  return freeze(api);
}

export const createClassicalTranscriptionOwnerMechanicsApi =
  createRoutineSemanticOwnerMechanicsApi;
