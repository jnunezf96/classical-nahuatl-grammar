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
  getCanonicalProofAddress,
  listCanonicalProofAddresses,
  resolveCanonicalProofAddress,
  retireCanonicalProofAddress,
} from "../grammar/canonical_proof_address_registry.mjs";
import {
  registerCanonicalOwnerSpecIdentity,
  resolveCanonicalIdentity,
} from "../grammar/canonical_identity_registry.mjs";
import {
  getCanonicalGrammarFamilyForOwner,
  getCanonicalGrammarFamilyMetrics,
  getRoutineSemanticFamilyForOwner,
  getRoutineSemanticFamilyMetrics,
  isCanonicalGrammarFamilyRecord,
  isRoutineSemanticFamilyRecord,
  listCanonicalGrammarFamilies,
  listRoutineSemanticFamilies,
  registerRoutineSemanticFamilyBinding,
} from "./routine_semantic_family_registry.mjs";
import {
  fingerprintClassicalCanvasGrammarFact,
  getClassicalCanvasGrammarFactRecord,
  isClassicalCanvasGrammarFactRecord,
  listClassicalCanvasGrammarFactRecords,
} from "./canvas_grammar_fact_registry.mjs?v=20260811-canvas-fact-browser-012";
import {
  getClassicalCanvasGrammarFactPresentationRoute,
  listClassicalCanvasGrammarFactPresentationRoutes,
} from "./canvas_grammar_fact_presentation_routes.mjs?v=20260811-canvas-fact-browser-012";

const freeze = Object.freeze;
const CLEAR_BROAD_PROOF_SUFFIXES = freeze([
  "authorizationstatus",
  "gcdsatisfied",
  "lcmcomplete",
  "ownerexecutioncompleted",
  "blocksinput",
  "formulaoutputallowed",
  "classificationstatus",
]);
const EFFECTIVE_PROOF_COORDINATES_BY_KEY = new Map();

function normalizeText(value = "") {
  return String(value == null ? "" : value).normalize("NFC").trim();
}

function semanticToken(value = "") {
  return normalizeText(value)
    .replace(/^classical-/u, "")
    .replace(/[^\p{L}\p{N}]+/gu, ".")
    .replace(/^\.+|\.+$/gu, "")
    .toLowerCase();
}

function broadCompletionLeaf(path = "") {
  const leaf = normalizeText(path).split(".").at(-1)?.toLowerCase() || "";
  return CLEAR_BROAD_PROOF_SUFFIXES.find(suffix => leaf.endsWith(suffix))
    || "";
}

function canonicalParentPath(path = "") {
  const segments = normalizeText(path).split(".").filter(Boolean);
  return segments.slice(0, -1).join(".");
}

function exactSemanticName(spec, coordinateKey, coordinate) {
  const facet = coordinateKey.split("::")[1] || coordinate.assertionId || coordinateKey;
  return [
    semanticToken(spec.ownerId),
    semanticToken(facet),
    "canonical.witness",
  ].filter(Boolean).join(".");
}

function registerEffectiveProofCoordinate(record) {
  const key = `${record.ownerId}\u241f${record.coordinateKey}`;
  const existing = EFFECTIVE_PROOF_COORDINATES_BY_KEY.get(key) || null;
  if (existing) {
    if (
      existing.proofAddressId !== record.proofAddressId
      || existing.effectiveCanonicalPath !== record.effectiveCanonicalPath
    ) {
      throw new Error(`effective-proof-coordinate-drift:${key}`);
    }
    return existing;
  }
  const frozen = deepFreeze(record);
  EFFECTIVE_PROOF_COORDINATES_BY_KEY.set(key, frozen);
  return frozen;
}

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
  const sourceCanonicalPath = normalizeText(coordinate.canonicalPath);
  const legacyProofAddress = resolveCanonicalProofAddress({
    proofAddressId: coordinate.proofAddressId || "",
    ownerId: spec.ownerId,
    semanticName: coordinate.proofSemanticName || "",
    currentPath: sourceCanonicalPath,
    legacyKey: coordinate.proofAddressKey
      || sourceCanonicalPath
      || coordinate.assertionId
      || coordinateKey,
    assertionId: coordinate.assertionId || "",
  });
  const broadLeaf = broadCompletionLeaf(sourceCanonicalPath);
  if (!broadLeaf) {
    const prepared = deepFreeze({
      ...coordinate,
      proofAddressId: legacyProofAddress.proofAddressId,
      proofSemanticName: legacyProofAddress.semanticName,
      canonicalPath: legacyProofAddress.currentPath,
      proofObservationKind: "direct-canonical-result-observation",
      sourceCanonicalPath,
      legacyProofAddressId: "",
      broadCompletionProxyRetired: false,
    });
    registerEffectiveProofCoordinate({
      kind: "effective-routine-semantic-proof-coordinate",
      ownerId: spec.ownerId,
      coordinateKey,
      assertionId: coordinate.assertionId || "",
      proofAddressId: prepared.proofAddressId,
      proofSemanticName: prepared.proofSemanticName,
      sourceCanonicalPath,
      effectiveCanonicalPath: prepared.canonicalPath,
      observationScope: prepared.canonicalPath ? "result-path" : "whole-result",
      migratedFromBroadCompletion: false,
      legacyProofAddressId: "",
      legacyProofSemanticName: "",
      broadCompletionLeaf: "",
      grammarAuthority: false,
    });
    return prepared;
  }

  const ownerIdentity = resolveCanonicalIdentity({
    namespace: "owner",
    semanticName: spec.ownerId,
    stableKey: spec.ownerId,
    currentLocation: "ownerId",
  });
  const assertionIdentity = resolveCanonicalIdentity({
    namespace: "assertion",
    semanticName: coordinate.assertionId || coordinateKey,
    stableKey: coordinateKey,
    scopeKey: ownerIdentity.identityId,
    currentLocation: `coordinates.${coordinateKey}.assertionId`,
  });
  const effectiveCanonicalPath = canonicalParentPath(sourceCanonicalPath);
  const proofAddress = resolveCanonicalProofAddress({
    ownerId: spec.ownerId,
    semanticName: exactSemanticName(spec, coordinateKey, coordinate),
    currentPath: effectiveCanonicalPath,
    legacyKey:
      `canonical-semantic-witness:${assertionIdentity.identityId}`,
    assertionId: coordinate.assertionId || "",
    addressSource: "automatic-exact-semantic-observation",
    metadata: {
      assertionIdentityId: assertionIdentity.identityId,
      legacyProofAddressId: legacyProofAddress.proofAddressId,
      legacyCanonicalPath: sourceCanonicalPath,
      broadCompletionLeaf: broadLeaf,
    },
  });
  const retiredLegacy = retireCanonicalProofAddress({
    proofAddressId: legacyProofAddress.proofAddressId,
    replacementProofAddressId: proofAddress.proofAddressId,
  });
  const prepared = deepFreeze({
    ...coordinate,
    proofAddressId: proofAddress.proofAddressId,
    proofSemanticName: proofAddress.semanticName,
    canonicalPath: proofAddress.currentPath,
    proofObservationKind: "selection-specific-canonical-result-witness",
    sourceCanonicalPath,
    legacyCanonicalPath: sourceCanonicalPath,
    legacyProofAddressId: retiredLegacy.proofAddressId,
    legacyProofSemanticName: retiredLegacy.semanticName,
    broadCompletionLeaf: broadLeaf,
    broadCompletionProxyRetired: true,
  });
  registerEffectiveProofCoordinate({
    kind: "effective-routine-semantic-proof-coordinate",
    ownerId: spec.ownerId,
    coordinateKey,
    assertionId: coordinate.assertionId || "",
    assertionIdentityId: assertionIdentity.identityId,
    proofAddressId: prepared.proofAddressId,
    proofSemanticName: prepared.proofSemanticName,
    sourceCanonicalPath,
    effectiveCanonicalPath: prepared.canonicalPath,
    observationScope: prepared.canonicalPath ? "result-path" : "whole-result",
    migratedFromBroadCompletion: true,
    legacyProofAddressId: prepared.legacyProofAddressId,
    legacyProofSemanticName: prepared.legacyProofSemanticName,
    broadCompletionLeaf: broadLeaf,
    grammarAuthority: false,
  });
  return prepared;
}

function prepareSpec(spec = {}) {
  const coordinates = Object.fromEntries(
    Object.entries(spec.coordinates || {}).map(([coordinateKey, coordinate]) => [
      coordinateKey,
      prepareCoordinate(spec, coordinateKey, coordinate),
    ]),
  );
  const routineFamily = registerRoutineSemanticFamilyBinding(spec);
  const prepared = deepFreeze({
    ...spec,
    coordinates: deepFreeze(coordinates),
    routineFamily,
  });
  registerCanonicalOwnerSpecIdentity(prepared);
  return prepared;
}

function publicNames(prefix) {
  return freeze({
    build: `build${prefix}Source`,
    isSource: `is${prefix}Source`,
    evaluate: `evaluate${prefix}`,
    isResult: `is${prefix}Result`,
    getEvidence: `get${prefix}ExecutionEvidence`,
    isEvidence: `is${prefix}ExecutionEvidence`,
    presentGrammarFact: `present${prefix}GrammarFact`,
    isGrammarFactProjection: `is${prefix}GrammarFactProjection`,
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
  const issuedGrammarFactProjections = new WeakSet();

  function evaluate(source = null) {
    const legacyResult = legacyEvaluate(source);
    const coordinate = coordinateForSource(spec, source);
    const authorized = legacyResult?.authorizationStatus === "authorized";
    const proofAddressId = authorized ? coordinate?.proofAddressId || "" : "";
    const proofSemanticName = authorized
      ? coordinate?.proofSemanticName || ""
      : "";
    const proofObservationStatus = authorized
      ? legacyResult?.payload?.proofObservationStatus || ""
      : "";
    const result = deepFreeze({
      ...legacyResult,
      payload: authorized
        ? {
          ...(legacyResult?.payload || {}),
          proofAddressId,
          proofSemanticName,
        }
        : legacyResult?.payload || {},
    });
    const legacyEvidence = legacyGetEvidence(legacyResult);
    const evidence = legacyEvidence && authorized
      ? deepFreeze({
        ...legacyEvidence,
        proofAddressId,
        proofSemanticName,
        proofObservationStatus,
        proofObservationKind:
          legacyResult?.payload?.proofObservationKind || "",
        effectiveCanonicalPath:
          legacyResult?.payload?.effectiveCanonicalPath || "",
        legacyProofAddressId:
          legacyResult?.payload?.legacyProofAddressId || "",
        broadCompletionProxyRetired:
          legacyResult?.payload?.broadCompletionProxyRetired === true,
      })
      : legacyEvidence;
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
      && evidence.proofObservationStatus
        === result?.payload?.proofObservationStatus
      && Object.isFrozen(evidence)
    );
  }

  function presentGrammarFact(result = null, atomId = "") {
    const record = getClassicalCanvasGrammarFactRecord(atomId);
    const reason = !isResult(result)
      ? "owner-issued-authorized-result-required"
      : result.authorizationStatus !== "authorized"
        ? "authorized-owner-result-required"
        : !record
          ? "registered-canvas-grammar-fact-required"
          : !isClassicalCanvasGrammarFactRecord(record)
            ? "intact-canvas-grammar-fact-required"
            : record.semanticOwnerId !== spec.ownerId
              ? "matching-semantic-owner-required"
              : "";
    const projection = deepFreeze({
      kind: "classical-canvas-grammar-fact-projection",
      authorizationStatus: reason ? "blocked" : "authorized",
      blockReason: reason,
      atomId: reason ? "" : record.atomId,
      semanticOwnerId: reason ? "" : record.semanticOwnerId,
      canvasSection: reason ? "" : record.canvasSection,
      canvasSpan: reason ? "" : record.canvasSpan,
      statement: reason ? "" : record.statement,
      projectRole: reason ? "" : record.projectRole,
      contentFingerprint: reason ? "" : record.contentFingerprint,
      grammarAuthority: false,
      generationAuthority: false,
      evidencePolicy: deepFreeze({
        evidenceAuthorizesGrammar: false,
        evidenceAbsenceBlocksResult: false,
        examplesWhitelistRealization: false,
        explanationAuthorizesGeneration: false,
      }),
    });
    if (!reason) issuedGrammarFactProjections.add(projection);
    return projection;
  }

  function isGrammarFactProjection(projection = null) {
    return Boolean(
      projection
      && issuedGrammarFactProjections.has(projection)
      && projection.kind === "classical-canvas-grammar-fact-projection"
      && projection.authorizationStatus === "authorized"
      && projection.semanticOwnerId === spec.ownerId
      && projection.grammarAuthority === false
      && projection.generationAuthority === false
      && Object.isFrozen(projection)
    );
  }

  return freeze({
    [names.build]: legacyBuild,
    [names.isSource]: legacyIsSource,
    [names.evaluate]: evaluate,
    [names.isResult]: isResult,
    [names.getEvidence]: getEvidence,
    [names.isEvidence]: isEvidence,
    [names.presentGrammarFact]: presentGrammarFact,
    [names.isGrammarFactProjection]: isGrammarFactProjection,
  });
}

export function listRoutineSemanticEffectiveProofCoordinates() {
  return freeze([
    ...EFFECTIVE_PROOF_COORDINATES_BY_KEY.values(),
  ].sort((left, right) => (
    left.ownerId.localeCompare(right.ownerId)
    || left.coordinateKey.localeCompare(right.coordinateKey)
  )));
}

export function getRoutineSemanticEffectiveProofCoordinate(
  ownerId = "",
  coordinateKey = "",
) {
  return EFFECTIVE_PROOF_COORDINATES_BY_KEY.get(
    `${normalizeText(ownerId)}\u241f${normalizeText(coordinateKey)}`,
  ) || null;
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
  function blockedPreparedGrammarFactProjection(reason = "prepared-canvas-grammar-fact-route-required") {
    return deepFreeze({
      kind: "classical-canvas-grammar-fact-projection",
      authorizationStatus: "blocked",
      blockReason: reason,
      atomId: "",
      semanticOwnerId: "",
      canvasSection: "",
      canvasSpan: "",
      statement: "",
      projectRole: "",
      contentFingerprint: "",
      grammarAuthority: false,
      generationAuthority: false,
    });
  }
  function presentPreparedClassicalCanvasGrammarFact(atomId = "") {
    const route = getClassicalCanvasGrammarFactPresentationRoute(atomId);
    if (!route) return blockedPreparedGrammarFactProjection();
    const names = publicNames(route.prefix);
    const ownerApi = [api, targetObject, targetObject?.window]
      .find((candidate) => typeof candidate?.[names.build] === "function")
      || null;
    if (
      typeof ownerApi?.[names.build] !== "function"
      || typeof ownerApi?.[names.evaluate] !== "function"
      || typeof ownerApi?.[names.presentGrammarFact] !== "function"
      || typeof ownerApi?.[names.isGrammarFactProjection] !== "function"
    ) return blockedPreparedGrammarFactProjection("prepared-canvas-grammar-fact-owner-api-required");
    const source = ownerApi[names.build]({
      analysisDomain: route.semanticOwnerId,
      selection: route.selection,
      requestedFacet: route.requestedFacet,
      participantChoice: `${route.selection}:${route.requestedFacet}`,
    });
    const result = ownerApi[names.evaluate](source);
    const projection = ownerApi[names.presentGrammarFact](result, route.atomId);
    return ownerApi[names.isGrammarFactProjection](projection)
      ? projection
      : blockedPreparedGrammarFactProjection("authorized-canvas-grammar-fact-projection-required");
  }
  function isPreparedClassicalCanvasGrammarFactProjection(projection = null) {
    const route = getClassicalCanvasGrammarFactPresentationRoute(projection?.atomId || "");
    if (!route) return false;
    const names = publicNames(route.prefix);
    const ownerApi = [api, targetObject, targetObject?.window]
      .find((candidate) => typeof candidate?.[names.isGrammarFactProjection] === "function")
      || null;
    return ownerApi?.[names.isGrammarFactProjection]?.(projection) === true;
  }
  function listPreparedClassicalCanvasGrammarFacts() {
    return freeze(listClassicalCanvasGrammarFactPresentationRoutes()
      .map((route) => getClassicalCanvasGrammarFactRecord(route.atomId))
      .filter(isClassicalCanvasGrammarFactRecord));
  }
  Object.assign(api, {
    getCanonicalGrammarFamilyForOwner,
    getCanonicalGrammarFamilyMetrics,
    getRoutineSemanticFamilyForOwner,
    getRoutineSemanticFamilyMetrics,
    isCanonicalGrammarFamilyRecord,
    isRoutineSemanticFamilyRecord,
    listCanonicalGrammarFamilies,
    listRoutineSemanticFamilies,
    fingerprintClassicalCanvasGrammarFact,
    getClassicalCanvasGrammarFactRecord,
    isClassicalCanvasGrammarFactRecord,
    listClassicalCanvasGrammarFactRecords,
    getClassicalCanvasGrammarFactPresentationRoute,
    listClassicalCanvasGrammarFactPresentationRoutes,
    listPreparedClassicalCanvasGrammarFacts,
    presentPreparedClassicalCanvasGrammarFact,
    isPreparedClassicalCanvasGrammarFactProjection,
    getCanonicalProofAddress,
    listCanonicalProofAddresses,
    getRoutineSemanticEffectiveProofCoordinate,
    listRoutineSemanticEffectiveProofCoordinates,
  });
  return freeze(api);
}

export const createClassicalTranscriptionOwnerMechanicsApi =
  createRoutineSemanticOwnerMechanicsApi;
