const spec = {
  "ownerId": "classical-affective-zol",
  "prefix": "ClassicalAffectiveZol",
  "operationId": "classical.affective.zol.execute",
  "inputContract": "complete-typed-classical-affective-zol-source",
  "domain": "classical-affective-zol",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3150",
    "claim-p3151"
  ],
  "coordinates": {
    "claim-p3150::p3150-one-affective-matrix-nounstem-always-forms-compound-affective-stems": {
      "assertionId": "classical-affective-zol:p3150-one-affective-matrix-nounstem-always-forms-compound-affective-stems",
      "canonicalPath": "cases.zol.rules.affective/zol"
    },
    "claim-p3151::p3151-the-compound-affective-stern-can-occur-as-an-embed": {
      "assertionId": "classical-affective-zol:p3151-the-compound-affective-stern-can-occur-as-an-embed",
      "canonicalPath": "cases.zol.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3150": [],
    "claim-p3151": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3150": "authorized",
    "claim-p3151": "authorized"
  }
};
export default Object.freeze(spec);
