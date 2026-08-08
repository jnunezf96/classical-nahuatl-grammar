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
  PRETERIT_AGENTIVE_RESTRICTED_STEM:
    "b49d598f-f4a4-4de1-80ad-9c1e901b7be6",
});

const EXPLICIT_RECORDS_BY_ID = freeze({
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_SELECTED_PERFECTIVE_STEM]: freeze({
    proofAddressId:
      CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_SELECTED_PERFECTIVE_STEM,
    semanticName: "stem.perfective.selected",
    ownerId: "classical-nemi-irregular-paradigm",
    currentPath: "lesson11.selectedStem",
    addressSource: "explicit",
  }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_RESTRICTED_STEM]: freeze({
    proofAddressId:
      CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_RESTRICTED_STEM,
    semanticName: "preterit-agentive.restricted-stem.selected",
    ownerId: "classical-predicate-nominalization-preterit-agentive",
    currentPath: "cases.preteritAgentive.targetStems.restrictedUse",
    addressSource: "explicit",
  }),
});

// When an automatically migrated checkpoint moves inside its Result, add only
// its permanent ID here. Existing owner specs retain their old path as an
// identity key; no atom-by-atom rewrite is required.
const CURRENT_PATH_OVERRIDES_BY_ID = freeze({});

const AUTOMATIC_RECORDS_BY_ID = new Map();
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

function recordById(proofAddressId) {
  return explicitRecord(proofAddressId) || automaticRecord(proofAddressId);
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

  const resolvedPath = normalizeText(
    CURRENT_PATH_OVERRIDES_BY_ID[generatedId] || normalizedCurrentPath,
  );
  if (!resolvedPath) {
    throw new Error(`canonical-proof-current-path-required:${generatedId}`);
  }
  const resolvedSemanticName = normalizeText(semanticName)
    || automaticSemanticName(normalizedOwnerId, normalizedLegacyKey);
  const record = freeze({
    proofAddressId: generatedId,
    semanticName: resolvedSemanticName,
    ownerId: normalizedOwnerId,
    currentPath: resolvedPath,
    legacyKey: normalizedLegacyKey,
    addressSource: "automatic-migration",
  });
  AUTOMATIC_RECORDS_BY_ID.set(generatedId, record);
  if (!IDS_BY_SEMANTIC_NAME.has(resolvedSemanticName)) {
    IDS_BY_SEMANTIC_NAME.set(resolvedSemanticName, generatedId);
  }
  return record;
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
  ]);
}

// Backward-compatible explicit snapshot. Use listCanonicalProofAddresses() for
// the complete registry after owner catalogs have installed their coordinates.
export const CLASSICAL_CANONICAL_PROOF_ADDRESSES = freeze(
  Object.values(EXPLICIT_RECORDS_BY_ID),
);
