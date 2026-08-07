const spec = {
  "ownerId": "classical-relational-relational-ic-downward-bodypart-source",
  "prefix": "ClassicalRelationalRelationalIcDownwardBodypartSource",
  "operationId": "classical.relational.relational.ic.downward.bodypart.source.execute",
  "inputContract": "complete-typed-classical-relational-relational-ic-downward-bodypart-source-source",
  "domain": "classical-relational-relational-ic-downward-bodypart-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4475",
    "claim-p4476",
    "claim-p4477"
  ],
  "coordinates": {
    "claim-p4475::p4475-a-few-nounstems-referring-to-body-parts-can-be": {
      "assertionId": "classical-relational-relational-ic-downward-bodypart-source:p4475-a-few-nounstems-referring-to-body-parts-can-be",
      "canonicalPath": "cases.downward.canonicalResult"
    },
    "claim-p4476::p4476-the-resultant-compound-nounstem-can-occur-in-absolutive-state": {
      "assertionId": "classical-relational-relational-ic-downward-bodypart-source:p4476-the-resultant-compound-nounstem-can-occur-in-absolutive-state",
      "canonicalPath": "cases.downward.sourceKind"
    },
    "claim-p4477::p4477-the-following-examples-show-the-compound-stems-of-these": {
      "assertionId": "classical-relational-relational-ic-downward-bodypart-source:p4477-the-following-examples-show-the-compound-stems-of-these",
      "canonicalPath": "cases.downward.stemId"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4475": [],
    "claim-p4476": [],
    "claim-p4477": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4475": "authorized",
    "claim-p4476": "authorized",
    "claim-p4477": "authorized"
  }
};
export default Object.freeze(spec);
