const spec = {
  "ownerId": "classical-relational-ic-temporal-collocations",
  "prefix": "ClassicalRelationalIcTemporalCollocations",
  "operationId": "classical.relational.ic.temporal.collocations.execute",
  "inputContract": "complete-typed-classical-relational-ic-temporal-collocations-source",
  "domain": "classical-relational-ic-temporal-collocations",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4301",
    "claim-p4302"
  ],
  "coordinates": {
    "claim-p4301::p4301-the-collocation-niman-i-c-is-translated-immediately-thereupon": {
      "assertionId": "classical-relational-ic-temporal-collocations:p4301-the-collocation-niman-i-c-is-translated-immediately-thereupon",
      "canonicalPath": "cases.icTime.canonicalResult"
    },
    "claim-p4302::p4302-the-collocation-i-c-cen-means-at-a-time": {
      "assertionId": "classical-relational-ic-temporal-collocations:p4302-the-collocation-i-c-cen-means-at-a-time",
      "canonicalPath": "cases.icTime.stemId"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4301": [],
    "claim-p4302": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4301": "authorized",
    "claim-p4302": "authorized"
  }
};
export default Object.freeze(spec);
