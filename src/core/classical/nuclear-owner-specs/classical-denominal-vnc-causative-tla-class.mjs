const spec = {
  "ownerId": "classical-denominal-vnc-causative-tla-class",
  "prefix": "ClassicalDenominalVncCausativeTlaClass",
  "operationId": "classical.denominal.vnc.causative.tla.class.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-causative-tla-class-source",
  "domain": "classical-denominal-vnc-causative-tla-class",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5113"
  ],
  "coordinates": {
    "claim-p5113::p5113-the-derived-verbstem-belongs-to-class-a": {
      "assertionId": "classical-denominal-vnc-causative-tla-class:p5113-the-derived-verbstem-belongs-to-class-a",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5113": [
      "causative-tla-class",
      "denominal-causative-tla",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5113": "authorized"
  }
};
export default Object.freeze(spec);
