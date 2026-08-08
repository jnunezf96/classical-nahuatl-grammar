import {
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS,
  getCanonicalProofPath,
} from "../../grammar/canonical_proof_address_registry.mjs";

const PRETERIT_AGENTIVE_AGENT_ROLE =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_AGENT_ROLE;
const PRETERIT_AGENTIVE_PRIMARY_KIND =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_PRIMARY_KIND;
const PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY;
const PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND;
const PRETERIT_AGENTIVE_RESTRICTED_STEM =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.PRETERIT_AGENTIVE_RESTRICTED_STEM;
const PRETERIT_AGENTIVE_RESTRICTED_STATE_USE =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_RESTRICTED_STATE_USE;
const PRETERIT_AGENTIVE_DERIVATION_ORDER =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_DERIVATION_ORDER;
const PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS
    .PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION;

const spec = {
  "ownerId": "classical-predicate-nominalization-preterit-agentive",
  "prefix": "ClassicalPredicateNominalizationPreteritAgentive",
  "operationId": "classical.predicate.nominalization.preterit.agentive.execute",
  "inputContract": "complete-typed-classical-predicate-nominalization-preterit-agentive-source",
  "domain": "classical-predicate-nominalization-preterit-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3361",
    "claim-p3362",
    "claim-p3363",
    "claim-p3364",
    "claim-p3365",
    "claim-p3366",
    "claim-p3367",
    "claim-p3368"
  ],
  "coordinates": {
    "claim-p3361::p3361-the-stem-of-any-kind-of-agentive-nnc-names": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3361-the-stem-of-any-kind-of-agentive-nnc-names",
      "proofAddressId": PRETERIT_AGENTIVE_AGENT_ROLE,
      "canonicalPath": getCanonicalProofPath(
        PRETERIT_AGENTIVE_AGENT_ROLE
      )
    },
    "claim-p3362::p3362-the-most-common-kind-of-agentive-nnc-is-the": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3362-the-most-common-kind-of-agentive-nnc-is-the",
      "proofAddressId": PRETERIT_AGENTIVE_PRIMARY_KIND,
      "canonicalPath": getCanonicalProofPath(
        PRETERIT_AGENTIVE_PRIMARY_KIND
      )
    },
    "claim-p3363::p3363-like-all-nounstems-a-preterit-agentive-nounstem-has-two": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3363-like-all-nounstems-a-preterit-agentive-nounstem-has-two",
      "proofAddressId": PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY,
      "canonicalPath": getCanonicalProofPath(
        PRETERIT_AGENTIVE_STEM_SHAPE_INVENTORY
      )
    },
    "claim-p3364::p3364-the-general-use-stem-is-a-compound-that-uses": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3364-the-general-use-stem-is-a-compound-that-uses",
      "proofAddressId": PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND,
      "canonicalPath": getCanonicalProofPath(
        PRETERIT_AGENTIVE_GENERAL_USE_COMPOUND
      )
    },
    "claim-p3365::p3365-the-restricted-use-stem-is-simply-the-predicate-of": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3365-the-restricted-use-stem-is-simply-the-predicate-of",
      "proofAddressId": PRETERIT_AGENTIVE_RESTRICTED_STEM,
      "canonicalPath": getCanonicalProofPath(PRETERIT_AGENTIVE_RESTRICTED_STEM)
    },
    "claim-p3366::p3366-the-restricted-use-stem-is-used-in-absolutive-state": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3366-the-restricted-use-stem-is-used-in-absolutive-state",
      "proofAddressId": PRETERIT_AGENTIVE_RESTRICTED_STATE_USE,
      "canonicalPath": getCanonicalProofPath(
        PRETERIT_AGENTIVE_RESTRICTED_STATE_USE
      )
    },
    "claim-p3367::p3367-the-restricted-use-stem-is-discussed-first": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3367-the-restricted-use-stem-is-discussed-first",
      "proofAddressId": PRETERIT_AGENTIVE_DERIVATION_ORDER,
      "canonicalPath": getCanonicalProofPath(
        PRETERIT_AGENTIVE_DERIVATION_ORDER
      )
    },
    "claim-p3368::p3368-the-general-use-stem-is-used-everywhere-else": {
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3368-the-general-use-stem-is-used-everywhere-else",
      "proofAddressId": PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION,
      "canonicalPath": getCanonicalProofPath(
        PRETERIT_AGENTIVE_GENERAL_USE_DISTRIBUTION
      )
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3361": [],
    "claim-p3362": [],
    "claim-p3363": [],
    "claim-p3364": [],
    "claim-p3365": [],
    "claim-p3366": [],
    "claim-p3367": [],
    "claim-p3368": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3361": "authorized",
    "claim-p3362": "authorized",
    "claim-p3363": "authorized",
    "claim-p3364": "authorized",
    "claim-p3365": "authorized",
    "claim-p3366": "authorized",
    "claim-p3367": "authorized",
    "claim-p3368": "authorized"
  }
};
export default Object.freeze(spec);
