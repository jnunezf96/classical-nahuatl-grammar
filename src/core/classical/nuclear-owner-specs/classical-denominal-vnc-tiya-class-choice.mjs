const spec = {
  "ownerId": "classical-denominal-vnc-tiya-class-choice",
  "prefix": "ClassicalDenominalVncTiyaClassChoice",
  "operationId": "classical.denominal.vnc.tiya.class.choice.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-class-choice-source",
  "domain": "classical-denominal-vnc-tiya-class-choice",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5002"
  ],
  "coordinates": {
    "claim-p5002::p5002-a-deverbal-verbstem-ending-in-ti-ya-belongs-to": {
      "assertionId": "classical-denominal-vnc-tiya-class-choice:p5002-a-deverbal-verbstem-ending-in-ti-ya-belongs-to",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5002": [
      "tiya-class-choice",
      "inceptive-ti-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5002": "authorized"
  }
};
export default Object.freeze(spec);
