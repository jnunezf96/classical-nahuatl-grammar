const spec = {
  "ownerId": "classical-affective-nonanimate-affinity",
  "prefix": "ClassicalAffectiveNonanimateAffinity",
  "operationId": "classical.affective.nonanimate.affinity.execute",
  "inputContract": "complete-typed-classical-affective-nonanimate-affinity-source",
  "domain": "classical-affective-nonanimate-affinity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3189",
    "claim-p3190",
    "claim-p3191",
    "claim-p3192"
  ],
  "coordinates": {
    "claim-p3189::p3189-a-special-rather-strange-situation-arises-with-certain-compound": {
      "assertionId": "classical-affective-nonanimate-affinity:p3189-a-special-rather-strange-situation-arises-with-certain-compound",
      "canonicalPath": "cases.nonanimateAffinity.rules.affective/nonanimate-affinity"
    },
    "claim-p3190::p3190-when-given-an-affinity-shape-i-e-with-reduplication": {
      "assertionId": "classical-affective-nonanimate-affinity:p3190-when-given-an-affinity-shape-i-e-with-reduplication",
      "canonicalPath": "cases.nonanimateAffinity.authorizationStatus"
    },
    "claim-p3191::p3191-what-is-even-more-strange-is-that-these-ostensibly": {
      "assertionId": "classical-affective-nonanimate-affinity:p3191-what-is-even-more-strange-is-that-these-ostensibly",
      "canonicalPath": "cases.nonanimateAffinity.gcdSatisfied"
    },
    "claim-p3192::p3192-this-means-that-there-is-a-discrepancy-in-number": {
      "assertionId": "classical-affective-nonanimate-affinity:p3192-this-means-that-there-is-a-discrepancy-in-number",
      "canonicalPath": "cases.nonanimateAffinity.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3189": [],
    "claim-p3190": [],
    "claim-p3191": [],
    "claim-p3192": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3189": "authorized",
    "claim-p3190": "authorized",
    "claim-p3191": "authorized",
    "claim-p3192": "authorized"
  }
};
export default Object.freeze(spec);
