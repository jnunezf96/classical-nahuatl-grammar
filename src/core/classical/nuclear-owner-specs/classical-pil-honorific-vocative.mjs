const spec = {
  "ownerId": "classical-pil-honorific-vocative",
  "prefix": "ClassicalPilHonorificVocative",
  "operationId": "classical.pil.honorific.vocative.execute",
  "inputContract": "complete-typed-classical-pil-honorific-vocative-source",
  "domain": "classical-pil-honorific-vocative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3188"
  ],
  "coordinates": {
    "claim-p3188::p3188-a-very-strange-honorific-nnc-with-a-singular-number": {
      "assertionId": "classical-pil-honorific-vocative:p3188-a-very-strange-honorific-nnc-with-a-singular-number",
      "canonicalPath": "cases.pilHonorificVocative.rules.pil/honorific-vocative"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3188": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3188": "authorized"
  }
};
export default Object.freeze(spec);
