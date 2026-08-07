const spec = {
  "ownerId": "classical-denominal-vnc-destockal-class-b",
  "prefix": "ClassicalDenominalVncDestockalClassB",
  "operationId": "classical.denominal.vnc.destockal.class.b.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-destockal-class-b-source",
  "domain": "classical-denominal-vnc-destockal-class-b",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5013"
  ],
  "coordinates": {
    "claim-p5013::p5013-the-derived-ya-stems-belong-to-class-b-co": {
      "assertionId": "classical-denominal-vnc-destockal-class-b:p5013-the-derived-ya-stems-belong-to-class-b-co",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5013": [
      "destockal-class-b",
      "destockal-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5013": "authorized"
  }
};
export default Object.freeze(spec);
