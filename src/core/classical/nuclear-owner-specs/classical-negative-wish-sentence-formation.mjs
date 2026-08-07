const spec = {
  "ownerId": "classical-negative-wish-sentence-formation",
  "prefix": "ClassicalNegativeWishSentenceFormation",
  "operationId": "classical.negative.wish.sentence.formation.execute",
  "inputContract": "complete-typed-classical-negative-wish-sentence-formation-source",
  "domain": "classical-negative-wish-sentence-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-negative-wish-sentence-formation",
  "selections": [
    "claim-p1074",
    "claim-p1075",
    "claim-p1076"
  ],
  "coordinates": {
    "claim-p1074::p1074-a-negative-assertion-can-be-transformed-into-a-negative": {
      "assertionId": "classical-negative-wish-sentence-formation:p1074-a-negative-assertion-can-be-transformed-into-a-negative",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1075::p1075-the-ma-is-necessary-for-the-presence-of-the": {
      "assertionId": "classical-negative-wish-sentence-formation:p1075-the-ma-is-necessary-for-the-presence-of-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1076::p1076-the-ca-need-not-of-course-be-attached-to": {
      "assertionId": "classical-negative-wish-sentence-formation:p1076-the-ca-need-not-of-course-be-attached-to",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1074": [
      "negative-wish"
    ],
    "claim-p1075": [
      "negative-wish"
    ],
    "claim-p1076": [
      "negative-wish"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1074": "authorized",
    "claim-p1075": "authorized",
    "claim-p1076": "authorized"
  }
};
export default Object.freeze(spec);
