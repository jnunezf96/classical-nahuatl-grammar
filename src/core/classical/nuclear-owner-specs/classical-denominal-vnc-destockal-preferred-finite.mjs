const spec = {
  "ownerId": "classical-denominal-vnc-destockal-preferred-finite",
  "prefix": "ClassicalDenominalVncDestockalPreferredFinite",
  "operationId": "classical.denominal.vnc.destockal.preferred.finite.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-destockal-preferred-finite-source",
  "domain": "classical-denominal-vnc-destockal-preferred-finite",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5012"
  ],
  "coordinates": {
    "claim-p5012::p5012-aya-verbstem-derived-from-a-destockal-hui-or-ni": {
      "assertionId": "classical-denominal-vnc-destockal-preferred-finite:p5012-aya-verbstem-derived-from-a-destockal-hui-or-ni",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5012": [
      "destockal-preferred-finite",
      "destockal-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5012": "authorized"
  }
};
export default Object.freeze(spec);
