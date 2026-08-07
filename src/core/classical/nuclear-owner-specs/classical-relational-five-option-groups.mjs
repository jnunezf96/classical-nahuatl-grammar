const spec = {
  "ownerId": "classical-relational-five-option-groups",
  "prefix": "ClassicalRelationalFiveOptionGroups",
  "operationId": "classical.relational.five.option.groups.execute",
  "inputContract": "complete-typed-classical-relational-five-option-groups-source",
  "domain": "classical-relational-five-option-groups",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4268",
    "claim-p4269"
  ],
  "coordinates": {
    "claim-p4268::p4268-the-presentation-of-the-relational-stemmed-nncs-that-follows": {
      "assertionId": "classical-relational-five-option-groups:p4268-the-presentation-of-the-relational-stemmed-nncs-that-follows",
      "canonicalPath": "catalog.stemCount"
    },
    "claim-p4269::p4269-the-relational-nounstems-in-the-first-group-permit-only": {
      "assertionId": "classical-relational-five-option-groups:p4269-the-relational-nounstems-in-the-first-group-permit-only",
      "canonicalPath": "catalog.optionGroups"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4268": [],
    "claim-p4269": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4268": "authorized",
    "claim-p4269": "authorized"
  }
};
export default Object.freeze(spec);
