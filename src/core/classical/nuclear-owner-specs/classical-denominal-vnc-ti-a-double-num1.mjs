const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-double-num1",
  "prefix": "ClassicalDenominalVncTiADoubleNum1",
  "operationId": "classical.denominal.vnc.ti.a.double.num1.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-double-num1-source",
  "domain": "classical-denominal-vnc-ti-a-double-num1",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5092"
  ],
  "coordinates": {
    "claim-p5092::p5092-certain-double-object-type-one-causative-verbstems-reveal-their": {
      "assertionId": "classical-denominal-vnc-ti-a-double-num1:p5092-certain-double-object-type-one-causative-verbstems-reveal-their",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5092": [
      "ti-a-double-num1",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5092": "authorized"
  }
};
export default Object.freeze(spec);
