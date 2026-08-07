const spec = {
  "ownerId": "classical-affective-base",
  "prefix": "ClassicalAffectiveBase",
  "operationId": "classical.affective.base.execute",
  "inputContract": "complete-typed-classical-affective-base-source",
  "domain": "classical-affective-base",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3128",
    "claim-p3129",
    "claim-p3130",
    "claim-p3131",
    "claim-p3132"
  ],
  "coordinates": {
    "claim-p3128::p3128-a-speaker-of-nahuatl-can-express-a-valuing-or": {
      "assertionId": "classical-affective-base:p3128-a-speaker-of-nahuatl-can-express-a-valuing-or",
      "canonicalPath": "cases.base.rules.affective/base"
    },
    "claim-p3129::p3129-the-first-method-uses-a-compound-affective-nounstem-the": {
      "assertionId": "classical-affective-base:p3129-the-first-method-uses-a-compound-affective-nounstem-the",
      "canonicalPath": "cases.base.authorizationStatus"
    },
    "claim-p3130::p3130-a-compound-affective-nounstem-has-its-matrix-subposition-filled": {
      "assertionId": "classical-affective-base:p3130-a-compound-affective-nounstem-has-its-matrix-subposition-filled",
      "canonicalPath": "cases.base.gcdSatisfied"
    },
    "claim-p3131::p3131-like-the-nounstems-mentioned-in-31-6-ca-tl": {
      "assertionId": "classical-affective-base:p3131-like-the-nounstems-mentioned-in-31-6-ca-tl",
      "canonicalPath": "cases.base.lcmComplete"
    },
    "claim-p3132::p3132-affective-matrix-nounstems-may-be-divided-into-three-groups": {
      "assertionId": "classical-affective-base:p3132-affective-matrix-nounstems-may-be-divided-into-three-groups",
      "canonicalPath": "cases.base.rules.affective/base"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3128": [],
    "claim-p3129": [],
    "claim-p3130": [],
    "claim-p3131": [],
    "claim-p3132": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3128": "authorized",
    "claim-p3129": "authorized",
    "claim-p3130": "authorized",
    "claim-p3131": "authorized",
    "claim-p3132": "authorized"
  }
};
export default Object.freeze(spec);
