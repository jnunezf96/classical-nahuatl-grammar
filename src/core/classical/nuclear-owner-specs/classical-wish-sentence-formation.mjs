const spec = {
  "ownerId": "classical-wish-sentence-formation",
  "prefix": "ClassicalWishSentenceFormation",
  "operationId": "classical.wish.sentence.formation.execute",
  "inputContract": "complete-typed-classical-wish-sentence-formation-source",
  "domain": "classical-wish-sentence-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-wish-sentence-formation",
  "selections": [
    "claim-p1063",
    "claim-p1064",
    "claim-p1065",
    "claim-p1066",
    "claim-p1067",
    "claim-p1068",
    "claim-p1069"
  ],
  "coordinates": {
    "claim-p1063::p1063-by-substituting-an-optative-vnc-for-an-indicative-one": {
      "assertionId": "classical-wish-sentence-formation:p1063-by-substituting-an-optative-vnc-for-an-indicative-one",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1064::p1064-the-introductory-particle-tla-if-the-case-is-such": {
      "assertionId": "classical-wish-sentence-formation:p1064-the-introductory-particle-tla-if-the-case-is-such",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1065::p1065-it-expresses-a-tone-of-deference-not-present-in": {
      "assertionId": "classical-wish-sentence-formation:p1065-it-expresses-a-tone-of-deference-not-present-in",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1066::p1066-a-nonpast-optative-vnc-is-used-to-express-an": {
      "assertionId": "classical-wish-sentence-formation:p1066-a-nonpast-optative-vnc-is-used-to-express-an",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1067::p1067-a-past-optative-vnc-can-express-a-wish-that": {
      "assertionId": "classical-wish-sentence-formation:p1067-a-past-optative-vnc-can-express-a-wish-that",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1068::p1068-if-the-antecessive-order-prefix-o-is-used": {
      "assertionId": "classical-wish-sentence-formation:p1068-if-the-antecessive-order-prefix-o-is-used",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1069::p1069-if-the-antecessive-order-prefix-o-is-used-the": {
      "assertionId": "classical-wish-sentence-formation:p1069-if-the-antecessive-order-prefix-o-is-used-the",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1063": [
      "wish-ma"
    ],
    "claim-p1064": [
      "wish-tla"
    ],
    "claim-p1065": [
      "wish-past"
    ],
    "claim-p1066": [
      "wish-antecessive"
    ],
    "claim-p1067": [
      "wish-ma"
    ],
    "claim-p1068": [
      "wish-tla"
    ],
    "claim-p1069": [
      "wish-past"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1063": "authorized",
    "claim-p1064": "authorized",
    "claim-p1065": "authorized",
    "claim-p1066": "authorized",
    "claim-p1067": "authorized",
    "claim-p1068": "authorized",
    "claim-p1069": "authorized"
  }
};
export default Object.freeze(spec);
