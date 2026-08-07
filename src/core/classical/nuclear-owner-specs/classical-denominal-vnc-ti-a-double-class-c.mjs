const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-double-class-c",
  "prefix": "ClassicalDenominalVncTiADoubleClassC",
  "operationId": "classical.denominal.vnc.ti.a.double.class.c.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-double-class-c-source",
  "domain": "classical-denominal-vnc-ti-a-double-class-c",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5097"
  ],
  "coordinates": {
    "claim-p5097::p5097-double-object-type-one-causative-verbstems-formed-according-to": {
      "assertionId": "classical-denominal-vnc-ti-a-double-class-c:p5097-double-object-type-one-causative-verbstems-formed-according-to",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5097": [
      "ti-a-double-class-c",
      "ti-a-causative-double-possession",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5097": "authorized"
  }
};
export default Object.freeze(spec);
