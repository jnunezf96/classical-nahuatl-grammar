const spec = {
  "ownerId": "classical-affective-nonanimate-reduplication",
  "prefix": "ClassicalAffectiveNonanimateReduplication",
  "operationId": "classical.affective.nonanimate.reduplication.execute",
  "inputContract": "complete-typed-classical-affective-nonanimate-reduplication-source",
  "domain": "classical-affective-nonanimate-reduplication",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3193",
    "claim-p3194"
  ],
  "coordinates": {
    "claim-p3193::p3193-more-frequently-an-nnc-formed-on-an-affective-stem": {
      "assertionId": "classical-affective-nonanimate-reduplication:p3193-more-frequently-an-nnc-formed-on-an-affective-stem",
      "canonicalPath": "cases.nonanimateReduplication.rules.affective/nonanimate-reduplication"
    },
    "claim-p3194::p3194-while-the-reduplicative-prefix-has-an-affinity-meaning-when": {
      "assertionId": "classical-affective-nonanimate-reduplication:p3194-while-the-reduplicative-prefix-has-an-affinity-meaning-when",
      "canonicalPath": "cases.nonanimateReduplication.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3193": [],
    "claim-p3194": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3193": "authorized",
    "claim-p3194": "authorized"
  }
};
export default Object.freeze(spec);
