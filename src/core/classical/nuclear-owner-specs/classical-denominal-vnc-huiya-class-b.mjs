const spec = {
  "ownerId": "classical-denominal-vnc-huiya-class-b",
  "prefix": "ClassicalDenominalVncHuiyaClassB",
  "operationId": "classical.denominal.vnc.huiya.class.b.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huiya-class-b-source",
  "domain": "classical-denominal-vnc-huiya-class-b",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5008"
  ],
  "coordinates": {
    "claim-p5008::p5008-a-deverbal-verbstem-ending-in-hui-ya-belongs-to": {
      "assertionId": "classical-denominal-vnc-huiya-class-b:p5008-a-deverbal-verbstem-ending-in-hui-ya-belongs-to",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5008": [
      "huiya-class-b",
      "inceptive-hui-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5008": "authorized"
  }
};
export default Object.freeze(spec);
