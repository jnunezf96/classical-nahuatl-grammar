const spec = {
  "ownerId": "classical-huetzi-compound-matrix-formation",
  "prefix": "ClassicalHuetziCompoundMatrixFormation",
  "operationId": "classical.huetzi.compound.matrix.formation.execute",
  "inputContract": "complete-typed-classical-huetzi-compound-matrix-formation-source",
  "domain": "classical-huetzi-compound-matrix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2812",
    "claim-p2813"
  ],
  "coordinates": {
    "claim-p2812::p2812-tla-cui-ti-huetzi-to-snatch-s-th": {
      "assertionId": "classical-huetzi-compound-matrix-formation:p2812-tla-cui-ti-huetzi-to-snatch-s-th",
      "canonicalPath": "cases.intransitiveMatrices.huetzi.targetStem"
    },
    "claim-p2813::p2813-the-matrix-stem-huetzi-can-also-have-its-basic": {
      "assertionId": "classical-huetzi-compound-matrix-formation:p2813-the-matrix-stem-huetzi-can-also-have-its-basic",
      "canonicalPath": "cases.intransitiveMatrices.huetzi.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2812": [],
    "claim-p2813": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2812": "authorized",
    "claim-p2813": "authorized"
  }
};
export default Object.freeze(spec);
