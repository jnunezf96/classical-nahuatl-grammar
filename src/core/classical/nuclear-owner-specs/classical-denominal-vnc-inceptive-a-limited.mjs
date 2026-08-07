const spec = {
  "ownerId": "classical-denominal-vnc-inceptive-a-limited",
  "prefix": "ClassicalDenominalVncInceptiveALimited",
  "operationId": "classical.denominal.vnc.inceptive.a.limited.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-inceptive-a-limited-source",
  "domain": "classical-denominal-vnc-inceptive-a-limited",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5016"
  ],
  "coordinates": {
    "claim-p5016::p5016-the-inceptive-stative-suffix-a-is-of-limited-use": {
      "assertionId": "classical-denominal-vnc-inceptive-a-limited:p5016-the-inceptive-stative-suffix-a-is-of-limited-use",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5016": [
      "inceptive-a-limited",
      "inceptive-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5016": "authorized"
  }
};
export default Object.freeze(spec);
