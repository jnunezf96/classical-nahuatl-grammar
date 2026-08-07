const spec = {
  "ownerId": "classical-relational-usage-option-two",
  "prefix": "ClassicalRelationalUsageOptionTwo",
  "operationId": "classical.relational.usage.option.two.execute",
  "inputContract": "complete-typed-classical-relational-usage-option-two-source",
  "domain": "classical-relational-usage-option-two",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4257",
    "claim-p4258",
    "claim-p4259"
  ],
  "coordinates": {
    "claim-p4257::p4257-a-relational-nounstem-may-occur-as-the-matrix-of": {
      "assertionId": "classical-relational-usage-option-two:p4257-a-relational-nounstem-may-occur-as-the-matrix-of",
      "canonicalPath": "cases.optionTwo.canonicalResult"
    },
    "claim-p4258::p4258-the-nnc-built-on-this-compound-stem-can-be": {
      "assertionId": "classical-relational-usage-option-two:p4258-the-nnc-built-on-this-compound-stem-can-be",
      "canonicalPath": "cases.optionTwo.option"
    },
    "claim-p4259::p4259-very-frequently-the-nnc-has-an-embed-orientation-see": {
      "assertionId": "classical-relational-usage-option-two:p4259-very-frequently-the-nnc-has-an-embed-orientation-see",
      "canonicalPath": "cases.optionTwo.sourceState"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4257": [],
    "claim-p4258": [],
    "claim-p4259": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4257": "authorized",
    "claim-p4258": "authorized",
    "claim-p4259": "authorized"
  }
};
export default Object.freeze(spec);
