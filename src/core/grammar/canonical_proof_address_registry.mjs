// Stable semantic proof addresses for atom-to-Result verification.
//
// Atom/owner specs refer to the semantic ID. Only this registry knows the
// current internal Result path. Refactors may move the internal path without
// forcing atom IDs, owner IDs, or proof-address IDs to change.

const PROOF_PATH_BY_ID = Object.freeze({
  "stem.perfective.selected": "lesson11.selectedStem",
  "preterit-agentive.restricted-stem.selected":
    "cases.preteritAgentive.targetStems.restrictedUse",
});

export function hasCanonicalProofAddress(proofAddressId = "") {
  return Object.prototype.hasOwnProperty.call(PROOF_PATH_BY_ID, proofAddressId);
}

export function getCanonicalProofPath(proofAddressId = "") {
  if (!hasCanonicalProofAddress(proofAddressId)) {
    throw new Error(`unknown-canonical-proof-address:${proofAddressId}`);
  }
  return PROOF_PATH_BY_ID[proofAddressId];
}

export const CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS = Object.freeze(
  Object.keys(PROOF_PATH_BY_ID),
);
