const spec = {
  "ownerId": "classical-denominal-vnc-possession-ti-num1",
  "prefix": "ClassicalDenominalVncPossessionTiNum1",
  "operationId": "classical.denominal.vnc.possession.ti.num1.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-possession-ti-num1-source",
  "domain": "classical-denominal-vnc-possession-ti-num1",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5059"
  ],
  "coordinates": {
    "claim-p5059::p5059-in-certain-exceptional-instances-the-ti-of-possession-can": {
      "assertionId": "classical-denominal-vnc-possession-ti-num1:p5059-in-certain-exceptional-instances-the-ti-of-possession-can",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5059": [
      "possession-ti-num1",
      "possession-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5059": "authorized"
  }
};
export default Object.freeze(spec);
