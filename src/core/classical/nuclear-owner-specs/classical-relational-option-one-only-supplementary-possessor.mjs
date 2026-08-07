const spec = {
  "ownerId": "classical-relational-option-one-only-supplementary-possessor",
  "prefix": "ClassicalRelationalOptionOneOnlySupplementaryPossessor",
  "operationId": "classical.relational.option.one.only.supplementary.possessor.execute",
  "inputContract": "complete-typed-classical-relational-option-one-only-supplementary-possessor-source",
  "domain": "classical-relational-option-one-only-supplementary-possessor",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4272",
    "claim-p4273"
  ],
  "coordinates": {
    "claim-p4272::p4272-the-four-following-relational-nounstems-occur-only-in-single": {
      "assertionId": "classical-relational-option-one-only-supplementary-possessor:p4272-the-four-following-relational-nounstems-occur-only-in-single",
      "canonicalPath": "cases.supplementaryPossessor.canonicalResult"
    },
    "claim-p4273::p4273-a-second-nnc-may-be-combined-with-one-of": {
      "assertionId": "classical-relational-option-one-only-supplementary-possessor:p4273-a-second-nnc-may-be-combined-with-one-of",
      "canonicalPath": "cases.supplementaryPossessor.contextualFacts.supplementaryPossessorRequired"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4272": [],
    "claim-p4273": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4272": "authorized",
    "claim-p4273": "authorized"
  }
};
export default Object.freeze(spec);
