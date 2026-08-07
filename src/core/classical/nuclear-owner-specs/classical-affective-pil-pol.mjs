const spec = {
  "ownerId": "classical-affective-pil-pol",
  "prefix": "ClassicalAffectivePilPol",
  "operationId": "classical.affective.pil.pol.execute",
  "inputContract": "complete-typed-classical-affective-pil-pol-source",
  "domain": "classical-affective-pil-pol",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3133",
    "claim-p3134",
    "claim-p3135"
  ],
  "coordinates": {
    "claim-p3133::p3133-two-affective-matrix-nounstems-always-form-compound-affective-stems": {
      "assertionId": "classical-affective-pil-pol:p3133-two-affective-matrix-nounstems-always-form-compound-affective-stems",
      "canonicalPath": "cases.pilPol.rules.affective/pil-pol"
    },
    "claim-p3134::p3134-the-matrix-nounstem-pil-expresses-smallness-with-affection": {
      "assertionId": "classical-affective-pil-pol:p3134-the-matrix-nounstem-pil-expresses-smallness-with-affection",
      "canonicalPath": "cases.pilPol.authorizationStatus"
    },
    "claim-p3135::p3135-the-nounstem-po-l-expresses-largeness-with-disparagement-or": {
      "assertionId": "classical-affective-pil-pol:p3135-the-nounstem-po-l-expresses-largeness-with-disparagement-or",
      "canonicalPath": "cases.pilPol.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3133": [],
    "claim-p3134": [],
    "claim-p3135": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3133": "authorized",
    "claim-p3134": "authorized",
    "claim-p3135": "authorized"
  }
};
export default Object.freeze(spec);
