const spec = {
  "ownerId": "classical-relational-ic-noninitial-noninterrogative",
  "prefix": "ClassicalRelationalIcNoninitialNoninterrogative",
  "operationId": "classical.relational.ic.noninitial.noninterrogative.execute",
  "inputContract": "complete-typed-classical-relational-ic-noninitial-noninterrogative-source",
  "domain": "classical-relational-ic-noninitial-noninterrogative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4297",
    "claim-p4298",
    "claim-p4299",
    "claim-p4300"
  ],
  "coordinates": {
    "claim-p4297::p4297-when-an-adjunct-does-follow-the-i-c-and": {
      "assertionId": "classical-relational-ic-noninitial-noninterrogative:p4297-when-an-adjunct-does-follow-the-i-c-and",
      "canonicalPath": "cases.icNoninitial.canonicalResult"
    },
    "claim-p4298::p4298-when-an-adjunct-does-follow": {
      "assertionId": "classical-relational-ic-noninitial-noninterrogative:p4298-when-an-adjunct-does-follow",
      "canonicalPath": "cases.icNoninitial.contextualFacts.interrogativeForce"
    },
    "claim-p4299::p4299-like-all-interrogatives-when-i-c-does-not-occur": {
      "assertionId": "classical-relational-ic-noninitial-noninterrogative:p4299-like-all-interrogatives-when-i-c-does-not-occur",
      "canonicalPath": "cases.icSeparatedIn.canonicalResult"
    },
    "claim-p4300::p4300-when-i-c-does-not-occur-in-the-sentence": {
      "assertionId": "classical-relational-ic-noninitial-noninterrogative:p4300-when-i-c-does-not-occur-in-the-sentence",
      "canonicalPath": "cases.icNoninitial.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4297": [],
    "claim-p4298": [],
    "claim-p4299": [],
    "claim-p4300": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4297": "authorized",
    "claim-p4298": "authorized",
    "claim-p4299": "authorized",
    "claim-p4300": "authorized"
  }
};
export default Object.freeze(spec);
