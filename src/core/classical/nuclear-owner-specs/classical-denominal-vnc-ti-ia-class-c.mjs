const spec = {
  "ownerId": "classical-denominal-vnc-ti-ia-class-c",
  "prefix": "ClassicalDenominalVncTiIaClassC",
  "operationId": "classical.denominal.vnc.ti.ia.class.c.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-ia-class-c-source",
  "domain": "classical-denominal-vnc-ti-ia-class-c",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5108"
  ],
  "coordinates": {
    "claim-p5108::p5108-this-applicative-stem-belongs-to-class-c-te-cuica": {
      "assertionId": "classical-denominal-vnc-ti-ia-class-c:p5108-this-applicative-stem-belongs-to-class-c-te-cuica",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5108": [
      "ti-ia-class-c",
      "ti-ia-applicative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5108": "authorized"
  }
};
export default Object.freeze(spec);
