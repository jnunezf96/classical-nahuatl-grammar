const spec = {
  "ownerId": "classical-denominal-vnc-ti-ia-replacive-boundary",
  "prefix": "ClassicalDenominalVncTiIaReplaciveBoundary",
  "operationId": "classical.denominal.vnc.ti.ia.replacive.boundary.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-ia-replacive-boundary-source",
  "domain": "classical-denominal-vnc-ti-ia-replacive-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5107"
  ],
  "coordinates": {
    "claim-p5107::p5107-the-ia-suffix-is-attached-to-a-replacive-stem": {
      "assertionId": "classical-denominal-vnc-ti-ia-replacive-boundary:p5107-the-ia-suffix-is-attached-to-a-replacive-stem",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5107": [
      "ti-ia-replacive-boundary",
      "ti-ia-applicative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5107": "authorized"
  }
};
export default Object.freeze(spec);
