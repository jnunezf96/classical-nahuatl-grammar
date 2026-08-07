const spec = {
  "ownerId": "classical-denominal-vnc-destockal-a-causative",
  "prefix": "ClassicalDenominalVncDestockalACausative",
  "operationId": "classical.denominal.vnc.destockal.a.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-destockal-a-causative-source",
  "domain": "classical-denominal-vnc-destockal-a-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5014"
  ],
  "coordinates": {
    "claim-p5014::p5014-it-is-created-by-adding-the-type-one-causative": {
      "assertionId": "classical-denominal-vnc-destockal-a-causative:p5014-it-is-created-by-adding-the-type-one-causative",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5014": [
      "destockal-a-causative",
      "destockal-a-causative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5014": "authorized"
  }
};
export default Object.freeze(spec);
