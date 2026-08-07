const spec = {
  "ownerId": "classical-relational-usage-option-one",
  "prefix": "ClassicalRelationalUsageOptionOne",
  "operationId": "classical.relational.usage.option.one.execute",
  "inputContract": "complete-typed-classical-relational-usage-option-one-source",
  "domain": "classical-relational-usage-option-one",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4256"
  ],
  "coordinates": {
    "claim-p4256::p4256-a-relational-nounstem-may-occur-in-a-simple-stemmed": {
      "assertionId": "classical-relational-usage-option-one:p4256-a-relational-nounstem-may-occur-in-a-simple-stemmed",
      "canonicalPath": "cases.optionOne.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4256": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4256": "authorized"
  }
};
export default Object.freeze(spec);
