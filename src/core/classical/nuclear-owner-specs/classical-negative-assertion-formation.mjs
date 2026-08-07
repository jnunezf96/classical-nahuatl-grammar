const spec = {
  "ownerId": "classical-negative-assertion-formation",
  "prefix": "ClassicalNegativeAssertionFormation",
  "operationId": "classical.negative.assertion.form",
  "inputContract": "complete-typed-classical-negative-assertion-formation-source",
  "domain": "classical-negative-assertion-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-negative-assertion-formation",
  "selections": [
    "claim-p1027"
  ],
  "coordinates": {
    "claim-p1027::p1027-an-affirmative-assertion-can-be-converted-into-a-negative": {
      "assertionId": "classical-negative-assertion-formation:p1027-an-affirmative-assertion-can-be-converted-into-a-negative",
      "canonicalPath": "negativePrefix"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNegativeAssertionSystemFrame",
  "executionValidatorName": "isClassicalNahuatlNegativeAssertionSystemFrame",
  "executionArgsBySelection": {
    "claim-p1027": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1027": "authorized"
  }
};
export default Object.freeze(spec);
