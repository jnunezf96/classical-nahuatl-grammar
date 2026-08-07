const spec = {
  "ownerId": "classical-denominal-vnc-ihui-class-b",
  "prefix": "ClassicalDenominalVncIhuiClassB",
  "operationId": "classical.denominal.vnc.ihui.class.b.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ihui-class-b-source",
  "domain": "classical-denominal-vnc-ihui-class-b",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5144"
  ],
  "coordinates": {
    "claim-p5144::p5144-an-i-hui-a-hui-verbstem-belongs-to-class": {
      "assertionId": "classical-denominal-vnc-ihui-class-b:p5144-an-i-hui-a-hui-verbstem-belongs-to-class",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5144": [
      "ihui-class-b",
      "denominal-i-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5144": "authorized"
  }
};
export default Object.freeze(spec);
