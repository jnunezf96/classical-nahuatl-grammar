// Stable proof addresses for atom-to-Result verification.
//
// A permanent opaque ID identifies the grammatical checkpoint. A readable
// semantic name describes it. The registry owns the checkpoint's current
// internal Result path, so values and object locations may change without
// renaming atoms, owners, operations, or proof identities.

const freeze = Object.freeze;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

export const CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS = freeze({
  NEMI_SELECTED_PERFECTIVE_STEM:
    "4d533cc8-d6c2-48fb-8bad-a85bb036f6b0",
  NEMI_DISTANT_PAST_AS_PAST_MAPPING:
    "1beb2397-a54b-474f-bad1-7329dbf18731",
  PRETERIT_AGENTIVE_AGENT_ROLE:
    "02f255e4-e2ef-4646-9e1c-4bbaf54d2420",
  PRETERIT_AGENTIVE_PRIMARY_KIND:
    "51a105d3-996a-4b3f-acf1-c05be39ebaa7",
  PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY:
    "f0ec1f09-868f-4385-ac92-fddd461cce32",
  PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND:
    "0caeef7a-8c5b-43c4-9c8b-c54219342caf",
  PRETERIT_AGENTIVE_RESTRICTED_STEM:
    "b49d598f-f4a4-4de1-80ad-9c1e901b7be6",
  PRETERIT_AGENTIVE_RESTRICTED_STATE_USE:
    "7724581c-0c59-4af1-9d29-29de1d3e603a",
  PRETERIT_AGENTIVE_DERIVATION_ORDER:
    "e7198f9f-9d2f-4c9e-973d-bede2076ff22",
  PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION:
    "49c10c73-b5ea-4ffa-9527-37f617c6f2b8",

  // Retired broad checkpoints remain permanently resolvable. New atoms must
  // use the exact replacement identities below rather than these aliases.
  LEGACY_NEMI_AUTHORIZATION_STATUS:
    "881b37c8-657d-5998-9333-d2c7ddba3420",
  LEGACY_PRETERIT_AGENTIVE_AUTHORIZATION_STATUS:
    "6bdfc603-8957-5eb5-aadf-b0ef9667a4c5",
  LEGACY_PRETERIT_AGENTIVE_CANONICAL_RESULT:
    "dd4a70b1-4474-5701-a0f0-ff04ea05a390",
  LEGACY_PRETERIT_AGENTIVE_GCD_SATISFIED:
    "58640559-f3ba-5d85-80c5-8b276b0f31a3",
  LEGACY_PRETERIT_AGENTIVE_LCM_COMPLETE:
    "c3b9fdf9-eacb-59b0-9b58-580b7cdb36ae",
});

const EXPLICIT_RECORDS_BY_ID = freeze({
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_SELECTED_PERFECTIVE_STEM]: freeze({
    proofAddressId:
      CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_SELECTED_PERFECTIVE_STEM,
    semanticName: "stem.perfective.selected",
    ownerId: "classical-nemi-irregular-paradigm",
    currentPath: "lesson11.selectedStem",
    addressScope: "result-path",
    addressSource: "explicit",
  }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_DISTANT_PAST_AS_PAST_MAPPING]:
    freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .NEMI_DISTANT_PAST_AS_PAST_MAPPING,
      semanticName: "nemi.tense.distant-past-as-past.mapping",
      ownerId: "classical-nemi-irregular-paradigm",
      currentPath: "lesson11.tenseMapping",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_AGENT_ROLE]:
    freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_AGENT_ROLE,
      semanticName: "preterit-agentive.semantic-role.agent",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.agentSemanticRole",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_PRIMARY_KIND]:
    freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_PRIMARY_KIND,
      semanticName: "preterit-agentive.taxonomy.most-common",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.agentiveTaxonomyStatus",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY,
      semanticName: "preterit-agentive.stem-shapes.inventory",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.stemShapeInventory",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND,
      semanticName: "preterit-agentive.general-use.compound",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.generalUseCompound",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_RESTRICTED_STEM]:
    freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_RESTRICTED_STEM,
      semanticName: "preterit-agentive.restricted-stem.selected",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.restrictedUseSourceRelation",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_RESTRICTED_STATE_USE]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_RESTRICTED_STATE_USE,
      semanticName: "preterit-agentive.state-use.absolutive",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.stateStemDistribution.absolutive",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_DERIVATION_ORDER]:
    freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_DERIVATION_ORDER,
      semanticName:
        "preterit-agentive.derivation-order.restricted-before-general",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.derivationOrder",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION,
      semanticName: "preterit-agentive.state-use.non-absolutive",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath:
        "cases.preteritAgentive.proofObservations.stateStemDistribution.nonAbsolutive",
      addressScope: "result-path",
      addressSource: "exact-semantic-observation",
    }),

  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.LEGACY_NEMI_AUTHORIZATION_STATUS]:
    freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .LEGACY_NEMI_AUTHORIZATION_STATUS,
      semanticName: "nemi.irregular.paradigm.authorizationstatus",
      ownerId: "classical-nemi-irregular-paradigm",
      currentPath: "authorizationStatus",
      legacyKey: "authorizationStatus",
      addressScope: "result-path",
      addressSource: "retired-broad-checkpoint",
      deprecated: true,
      replacementProofAddressIds: freeze([
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .NEMI_DISTANT_PAST_AS_PAST_MAPPING,
      ]),
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .LEGACY_PRETERIT_AGENTIVE_AUTHORIZATION_STATUS]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .LEGACY_PRETERIT_AGENTIVE_AUTHORIZATION_STATUS,
      semanticName:
        "predicate.nominalization.preterit.agentive.cases.preteritagentive.authorizationstatus",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath: "cases.preteritAgentive.authorizationStatus",
      legacyKey: "cases.preteritAgentive.authorizationStatus",
      addressScope: "result-path",
      addressSource: "retired-broad-checkpoint",
      deprecated: true,
      replacementProofAddressIds: freeze([
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_AGENT_ROLE,
      ]),
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .LEGACY_PRETERIT_AGENTIVE_CANONICAL_RESULT]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .LEGACY_PRETERIT_AGENTIVE_CANONICAL_RESULT,
      semanticName:
        "predicate.nominalization.preterit.agentive.cases.preteritagentive.canonicalresult",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath: "cases.preteritAgentive.canonicalResult",
      legacyKey: "cases.preteritAgentive.canonicalResult",
      addressScope: "result-path",
      addressSource: "retired-broad-checkpoint",
      deprecated: true,
      replacementProofAddressIds: freeze([
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_PRIMARY_KIND,
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_RESTRICTED_STATE_USE,
      ]),
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .LEGACY_PRETERIT_AGENTIVE_GCD_SATISFIED]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .LEGACY_PRETERIT_AGENTIVE_GCD_SATISFIED,
      semanticName:
        "predicate.nominalization.preterit.agentive.cases.preteritagentive.gcdsatisfied",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath: "cases.preteritAgentive.gcdSatisfied",
      legacyKey: "cases.preteritAgentive.gcdSatisfied",
      addressScope: "result-path",
      addressSource: "retired-broad-checkpoint",
      deprecated: true,
      replacementProofAddressIds: freeze([
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY,
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_DERIVATION_ORDER,
      ]),
    }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .LEGACY_PRETERIT_AGENTIVE_LCM_COMPLETE]: freeze({
      proofAddressId:
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .LEGACY_PRETERIT_AGENTIVE_LCM_COMPLETE,
      semanticName:
        "predicate.nominalization.preterit.agentive.cases.preteritagentive.lcmcomplete",
      ownerId: "classical-predicate-nominalization-preterit-agentive",
      currentPath: "cases.preteritAgentive.lcmComplete",
      legacyKey: "cases.preteritAgentive.lcmComplete",
      addressScope: "result-path",
      addressSource: "retired-broad-checkpoint",
      deprecated: true,
      replacementProofAddressIds: freeze([
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND,
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
          .PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION,
      ]),
    }),
});

// When an automatically migrated checkpoint moves inside its Result, add only
// its permanent ID here. Existing owner specs retain their old path as an
// identity key; no atom-by-atom rewrite is required. An empty override means
// that the checkpoint observes the whole Result rather than a nested field.
const CURRENT_PATH_OVERRIDES_BY_ID = freeze({});

const AUTOMATIC_RECORDS_BY_ID = new Map();
const REPLACEMENT_PROOF_ADDRESS_IDS_BY_ID = new Map();
const IDS_BY_SEMANTIC_NAME = new Map(
  Object.values(EXPLICIT_RECORDS_BY_ID).map(record => [
    record.semanticName,
    record.proofAddressId,
  ]),
);

function normalizeText(value = "") {
  return String(value || "").normalize("NFC").trim();
}

function hash32(value, seed) {
  let hash = seed >>> 0;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
    hash ^= hash >>> 13;
  }
  return hash >>> 0;
}

function hex32(value) {
  return (value >>> 0).toString(16).padStart(8, "0");
}

function opaqueUuid(identityKey) {
  const key = normalizeText(identityKey);
  const raw = [
    hash32(key, 0x811c9dc5),
    hash32(`${key}\u241f1`, 0x9e3779b9),
    hash32(`${key}\u241f2`, 0x85ebca6b),
    hash32(`${key}\u241f3`, 0xc2b2ae35),
  ].map(hex32).join("");
  const versioned = `${raw.slice(0, 12)}5${raw.slice(13)}`;
  const variant = ((Number.parseInt(versioned[16], 16) & 0x3) | 0x8)
    .toString(16);
  const normalized = `${versioned.slice(0, 16)}${variant}${versioned.slice(17)}`;
  return [
    normalized.slice(0, 8),
    normalized.slice(8, 12),
    normalized.slice(12, 16),
    normalized.slice(16, 20),
    normalized.slice(20, 32),
  ].join("-");
}

function semanticToken(value = "") {
  return normalizeText(value)
    .replace(/^classical-/u, "")
    .replace(/[^\p{L}\p{N}]+/gu, ".")
    .replace(/^\.+|\.+$/gu, "")
    .toLowerCase();
}

function automaticSemanticName(ownerId, legacyKey) {
  return [semanticToken(ownerId), semanticToken(legacyKey)]
    .filter(Boolean)
    .join(".");
}

function explicitRecord(proofAddressId) {
  return EXPLICIT_RECORDS_BY_ID[proofAddressId] || null;
}

function automaticRecord(proofAddressId) {
  return AUTOMATIC_RECORDS_BY_ID.get(proofAddressId) || null;
}

function rawRecordById(proofAddressId) {
  return explicitRecord(proofAddressId) || automaticRecord(proofAddressId);
}

function replacementIdsFor(proofAddressId) {
  return freeze([
    ...(REPLACEMENT_PROOF_ADDRESS_IDS_BY_ID.get(proofAddressId) || []),
  ]);
}

function decorateRecord(record = null) {
  if (!record) return null;
  const replacementProofAddressIds = replacementIdsFor(record.proofAddressId);
  if (!replacementProofAddressIds.length) return record;
  return freeze({
    ...record,
    deprecated: true,
    addressSource: record.addressSource === "explicit"
      ? "retired-explicit-checkpoint"
      : "retired-broad-checkpoint",
    replacementProofAddressIds,
  });
}

function recordById(proofAddressId) {
  return decorateRecord(rawRecordById(proofAddressId));
}

export function getCanonicalProofAddressIdForLegacyKey(
  ownerId = "",
  legacyKey = "",
) {
  const normalizedOwnerId = normalizeText(ownerId);
  const normalizedLegacyKey = normalizeText(legacyKey);
  if (!normalizedOwnerId || !normalizedLegacyKey) {
    throw new Error("canonical-proof-owner-and-legacy-key-required");
  }
  return opaqueUuid(
    `classical-canonical-proof-address:v1:${normalizedOwnerId}:${normalizedLegacyKey}`,
  );
}

export function resolveCanonicalProofAddress({
  proofAddressId = "",
  ownerId = "",
  semanticName = "",
  currentPath = "",
  legacyKey = "",
  assertionId = "",
  addressSource = "",
  metadata = {},
} = {}) {
  const normalizedOwnerId = normalizeText(ownerId);
  if (!normalizedOwnerId) {
    throw new Error("canonical-proof-owner-id-required");
  }

  const requestedId = normalizeText(proofAddressId);
  if (requestedId) {
    if (!UUID_PATTERN.test(requestedId)) {
      throw new Error(`invalid-canonical-proof-address-id:${requestedId}`);
    }
    const record = recordById(requestedId);
    if (!record) {
      throw new Error(`unknown-canonical-proof-address:${requestedId}`);
    }
    if (record.ownerId !== normalizedOwnerId) {
      throw new Error(
        `canonical-proof-address-owner-mismatch:${requestedId}:${normalizedOwnerId}`,
      );
    }
    return record;
  }

  const normalizedCurrentPath = normalizeText(currentPath);
  const normalizedLegacyKey = normalizeText(
    legacyKey || normalizedCurrentPath || assertionId,
  );
  if (!normalizedLegacyKey) {
    throw new Error(`canonical-proof-legacy-key-required:${normalizedOwnerId}`);
  }

  const generatedId = getCanonicalProofAddressIdForLegacyKey(
    normalizedOwnerId,
    normalizedLegacyKey,
  );
  const existing = automaticRecord(generatedId);
  if (existing) {
    if (
      existing.ownerId !== normalizedOwnerId
      || existing.legacyKey !== normalizedLegacyKey
    ) {
      throw new Error(`canonical-proof-address-id-collision:${generatedId}`);
    }
    return existing;
  }

  const hasPathOverride = Object.prototype.hasOwnProperty.call(
    CURRENT_PATH_OVERRIDES_BY_ID,
    generatedId,
  );
  const resolvedPath = normalizeText(
    hasPathOverride
      ? CURRENT_PATH_OVERRIDES_BY_ID[generatedId]
      : normalizedCurrentPath,
  );
  const resolvedSemanticName = normalizeText(semanticName)
    || automaticSemanticName(normalizedOwnerId, normalizedLegacyKey);
  const record = freeze({
    proofAddressId: generatedId,
    semanticName: resolvedSemanticName,
    ownerId: normalizedOwnerId,
    currentPath: resolvedPath,
    legacyKey: normalizedLegacyKey,
    addressScope: resolvedPath ? "result-path" : "whole-result",
    addressSource: normalizeText(addressSource) || "automatic-migration",
    metadata: freeze({ ...(metadata || {}) }),
  });
  AUTOMATIC_RECORDS_BY_ID.set(generatedId, record);
  if (!IDS_BY_SEMANTIC_NAME.has(resolvedSemanticName)) {
    IDS_BY_SEMANTIC_NAME.set(resolvedSemanticName, generatedId);
  }
  return record;
}

export function retireCanonicalProofAddress({
  proofAddressId = "",
  replacementProofAddressId = "",
} = {}) {
  const legacyId = normalizeText(proofAddressId);
  const replacementId = normalizeText(replacementProofAddressId);
  const legacyRecord = rawRecordById(legacyId);
  const replacementRecord = rawRecordById(replacementId);
  if (!legacyRecord) {
    throw new Error(`unknown-canonical-proof-address:${legacyId}`);
  }
  if (!replacementRecord) {
    throw new Error(`unknown-canonical-proof-address:${replacementId}`);
  }
  if (legacyRecord.ownerId !== replacementRecord.ownerId) {
    throw new Error(
      `canonical-proof-address-replacement-owner-mismatch:${legacyId}:${replacementId}`,
    );
  }
  if (legacyId === replacementId) return decorateRecord(legacyRecord);
  const replacements = REPLACEMENT_PROOF_ADDRESS_IDS_BY_ID.get(legacyId)
    || new Set();
  replacements.add(replacementId);
  REPLACEMENT_PROOF_ADDRESS_IDS_BY_ID.set(legacyId, replacements);
  return decorateRecord(legacyRecord);
}

export function hasCanonicalProofAddress(proofAddressId = "") {
  return Boolean(recordById(normalizeText(proofAddressId)));
}

export function getCanonicalProofAddress(proofAddressId = "") {
  const normalizedId = normalizeText(proofAddressId);
  const record = recordById(normalizedId);
  if (!record) {
    throw new Error(`unknown-canonical-proof-address:${normalizedId}`);
  }
  return record;
}

export function getCanonicalProofPath(proofAddressId = "") {
  return getCanonicalProofAddress(proofAddressId).currentPath;
}

export function getCanonicalProofAddressId(semanticName = "") {
  const normalizedSemanticName = normalizeText(semanticName);
  const proofAddressId = IDS_BY_SEMANTIC_NAME.get(normalizedSemanticName);
  if (!proofAddressId) {
    throw new Error(
      `unknown-canonical-proof-semantic-name:${normalizedSemanticName}`,
    );
  }
  return proofAddressId;
}

export function listCanonicalProofAddresses() {
  return freeze([
    ...Object.values(EXPLICIT_RECORDS_BY_ID),
    ...AUTOMATIC_RECORDS_BY_ID.values(),
  ].map(decorateRecord));
}

// Backward-compatible explicit snapshot. Use listCanonicalProofAddresses() for
// the complete registry after owner catalogs have installed their coordinates.
export const CLASSICAL_CANONICAL_PROOF_ADDRESSES = freeze(
  Object.values(EXPLICIT_RECORDS_BY_ID),
);
