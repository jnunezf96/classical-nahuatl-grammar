const spec = {
  "ownerId": "classical-denominal-vnc-ya-class-choice",
  "prefix": "ClassicalDenominalVncYaClassChoice",
  "operationId": "classical.denominal.vnc.ya.class.choice.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-class-choice-source",
  "domain": "classical-denominal-vnc-ya-class-choice",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4991"
  ],
  "coordinates": {
    "claim-p4991::p4991-a-denominal-verbstem-ending-in-ya-belongs-to-class": {
      "assertionId": "classical-denominal-vnc-ya-class-choice:p4991-a-denominal-verbstem-ending-in-ya-belongs-to-class",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4991": [
      "ya-class-choice",
      "inceptive-root-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4991": "authorized"
  }
};
export default Object.freeze(spec);
