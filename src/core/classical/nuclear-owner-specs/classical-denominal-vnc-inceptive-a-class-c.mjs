const spec = {
  "ownerId": "classical-denominal-vnc-inceptive-a-class-c",
  "prefix": "ClassicalDenominalVncInceptiveAClassC",
  "operationId": "classical.denominal.vnc.inceptive.a.class.c.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-inceptive-a-class-c-source",
  "domain": "classical-denominal-vnc-inceptive-a-class-c",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5017"
  ],
  "coordinates": {
    "claim-p5017::p5017-the-verbstem-it-creates-belongs-to-class-c-and": {
      "assertionId": "classical-denominal-vnc-inceptive-a-class-c:p5017-the-verbstem-it-creates-belongs-to-class-c-and",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5017": [
      "inceptive-a-class-c",
      "inceptive-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5017": "authorized"
  }
};
export default Object.freeze(spec);
