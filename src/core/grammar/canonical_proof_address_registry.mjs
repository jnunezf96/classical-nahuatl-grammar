// Stable proof addresses for atom-to-Result verification.
//
// A random immutable ID is the permanent identity. A readable semantic name
// explains the checkpoint. Only this registry knows the current internal
// Result path, so a Result refactor changes one mapping rather than every atom.

const freeze = Object.freeze;

export const CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS = freeze({
  NEMI_SELECTED_PERFECTIVE_STEM:
    "4d533cc8-d6c2-48fb-8bad-a85bb036f6b0",
  PRETERIT_AGENTIVE_RESTRICTED_STEM:
    "b49d598f-f4a4-4de1-80ad-9c1e901b7be6",
});

const RECORDS_BY_ID = freeze({
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_SELECTED_PERFECTIVE_STEM]: freeze({
    proofAddressId:
      CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_SELECTED_PERFECTIVE_STEM,
    semanticName: "stem.perfective.selected",
    ownerId: "classical-nemi-irregular-paradigm",
    currentPath: "lesson11.selectedStem",
  }),
  [CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_RESTRICTED_STEM]: freeze({
    proofAddressId:
      CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_RESTRICTED_STEM,
    semanticName: "preterit-agentive.restricted-stem.selected",
    ownerId: "classical-predicate-nominalization-preterit-agentive",
    currentPath: "cases.preteritAgentive.targetStems.restrictedUse",
  }),
});

const IDS_BY_SEMANTIC_NAME = freeze(Object.fromEntries(
  Object.values(RECORDS_BY_ID).map(record => [
    record.semanticName,
    record.proofAddressId,
  ]),
));

export function hasCanonicalProofAddress(proofAddressId = "") {
  return Object.prototype.hasOwnProperty.call(RECORDS_BY_ID, proofAddressId);
}

export function getCanonicalProofAddress(proofAddressId = "") {
  if (!hasCanonicalProofAddress(proofAddressId)) {
    throw new Error(`unknown-canonical-proof-address:${proofAddressId}`);
  }
  return RECORDS_BY_ID[proofAddressId];
}

export function getCanonicalProofPath(proofAddressId = "") {
  return getCanonicalProofAddress(proofAddressId).currentPath;
}

export function getCanonicalProofAddressId(semanticName = "") {
  const proofAddressId = IDS_BY_SEMANTIC_NAME[semanticName];
  if (!proofAddressId) {
    throw new Error(`unknown-canonical-proof-semantic-name:${semanticName}`);
  }
  return proofAddressId;
}

export const CLASSICAL_CANONICAL_PROOF_ADDRESSES = freeze(
  Object.values(RECORDS_BY_ID),
);
