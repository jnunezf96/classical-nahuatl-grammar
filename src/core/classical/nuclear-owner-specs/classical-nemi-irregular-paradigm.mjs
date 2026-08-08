import {
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS,
  getCanonicalProofPath,
} from "../../grammar/canonical_proof_address_registry.mjs";

const NEMI_SELECTED_PERFECTIVE_STEM =
  CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS.NEMI_SELECTED_PERFECTIVE_STEM;

const spec = {
  "ownerId": "classical-nemi-irregular-paradigm",
  "prefix": "ClassicalNemiIrregularParadigm",
  "operationId": "classical.nemi.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-nemi-irregular-paradigm-source",
  "domain": "classical-nemi-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nemi-irregular-paradigm",
  "selections": [
    "claim-p1216",
    "claim-p1217"
  ],
  "coordinates": {
    "claim-p1216::p1216-nemi-nen-to-live-vncs-built-on-these-stems": {
      "assertionId": "classical-nemi-irregular-paradigm:p1216-nemi-nen-to-live-vncs-built-on-these-stems",
      "proofAddressId": NEMI_SELECTED_PERFECTIVE_STEM,
      "canonicalPath": getCanonicalProofPath(NEMI_SELECTED_PERFECTIVE_STEM)
    },
    "claim-p1217::p1217-finds-vncs-with-a-distant-past-tense-used-with": {
      "assertionId": "classical-nemi-irregular-paradigm:p1217-finds-vncs-with-a-distant-past-tense-used-with",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1216": [
      "nemi-past"
    ],
    "claim-p1217": [
      "nemi-past"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1216": "authorized",
    "claim-p1217": "authorized"
  }
};
export default Object.freeze(spec);
