const spec = {
  "ownerId": "classical-personal-name-nnc-honorific-inner-number-shield",
  "prefix": "ClassicalPersonalNameNncHonorificInnerNumberShield",
  "operationId": "classical.personal.name.nnc.honorific.inner.number.shield.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-honorific-inner-number-shield-source",
  "domain": "classical-personal-name-nnc-honorific-inner-number-shield",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5173"
  ],
  "coordinates": {
    "claim-p5173::p5173-in-the-honorific-form-the-affective-matrix-stem-tzin": {
      "assertionId": "classical-personal-name-nnc-honorific-inner-number-shield:p5173-in-the-honorific-form-the-affective-matrix-stem-tzin",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5173": [
      "honorific-inner-number-shield",
      "preterit-agentive",
      "outer-affective",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5173": "authorized"
  }
};
export default Object.freeze(spec);
