const spec = {
  "ownerId": "classical-affective-affinity-absolutive",
  "prefix": "ClassicalAffectiveAffinityAbsolutive",
  "operationId": "classical.affective.affinity.absolutive.execute",
  "inputContract": "complete-typed-classical-affective-affinity-absolutive-source",
  "domain": "classical-affective-affinity-absolutive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3155",
    "claim-p3156",
    "claim-p3157",
    "claim-p3158",
    "claim-p3159"
  ],
  "coordinates": {
    "claim-p3155::p3155-compound-affective-nounsterns-have-a-special-affinity-shape-when": {
      "assertionId": "classical-affective-affinity-absolutive:p3155-compound-affective-nounsterns-have-a-special-affinity-shape-when",
      "canonicalPath": "cases.affinityAbsolutive.rules.affective/affinity-absolutive"
    },
    "claim-p3156::p3156-the-affective-matrix-stern-takes-a-reduplicated-prefix-without": {
      "assertionId": "classical-affective-affinity-absolutive:p3156-the-affective-matrix-stern-takes-a-reduplicated-prefix-without",
      "canonicalPath": "cases.affinityAbsolutive.authorizationStatus"
    },
    "claim-p3157::p3157-the-absolutive-state-nnc-built-on-an-affinity-shaped": {
      "assertionId": "classical-affective-affinity-absolutive:p3157-the-absolutive-state-nnc-built-on-an-affinity-shaped",
      "canonicalPath": "cases.affinityAbsolutive.gcdSatisfied"
    },
    "claim-p3158::p3158-the-sounded-variant-is-used-when-the-corresponding-singular": {
      "assertionId": "classical-affective-affinity-absolutive:p3158-the-sounded-variant-is-used-when-the-corresponding-singular",
      "canonicalPath": "cases.affinityAbsolutive.lcmComplete"
    },
    "claim-p3159::p3159-the-silent-variant-is-used-when-the-corresponding-singular": {
      "assertionId": "classical-affective-affinity-absolutive:p3159-the-silent-variant-is-used-when-the-corresponding-singular",
      "canonicalPath": "cases.affinityAbsolutive.rules.affective/affinity-absolutive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3155": [],
    "claim-p3156": [],
    "claim-p3157": [],
    "claim-p3158": [],
    "claim-p3159": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3155": "authorized",
    "claim-p3156": "authorized",
    "claim-p3157": "authorized",
    "claim-p3158": "authorized",
    "claim-p3159": "authorized"
  }
};
export default Object.freeze(spec);
