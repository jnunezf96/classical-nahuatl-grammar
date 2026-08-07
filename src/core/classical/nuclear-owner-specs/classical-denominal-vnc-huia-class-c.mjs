const spec = {
  "ownerId": "classical-denominal-vnc-huia-class-c",
  "prefix": "ClassicalDenominalVncHuiaClassC",
  "operationId": "classical.denominal.vnc.huia.class.c.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huia-class-c-source",
  "domain": "classical-denominal-vnc-huia-class-c",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5123"
  ],
  "coordinates": {
    "claim-p5123::p5123-the-resultant-verbstem-belongs-to-class-c": {
      "assertionId": "classical-denominal-vnc-huia-class-c:p5123-the-resultant-verbstem-belongs-to-class-c",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5123": [
      "huia-class-c",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5123": "authorized"
  }
};
export default Object.freeze(spec);
