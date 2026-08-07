const spec = {
  "ownerId": "classical-denominal-vnc-transitive-ia-final-segments",
  "prefix": "ClassicalDenominalVncTransitiveIaFinalSegments",
  "operationId": "classical.denominal.vnc.transitive.ia.final.segments.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-transitive-ia-final-segments-source",
  "domain": "classical-denominal-vnc-transitive-ia-final-segments",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5150",
    "claim-p5151"
  ],
  "coordinates": {
    "claim-p5150::p5150-the-majority-of-the-nounstems-used-in-this-formation": {
      "assertionId": "classical-denominal-vnc-transitive-ia-final-segments:p5150-the-majority-of-the-nounstems-used-in-this-formation",
      "canonicalPath": "result.targetClass"
    },
    "claim-p5151::p5151-petla-tl-mat-remember-that-c-can-be-an": {
      "assertionId": "classical-denominal-vnc-transitive-ia-final-segments:p5151-petla-tl-mat-remember-that-c-can-be-an",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5150": [
      "transitive-ia-final-segments",
      "transitive-i-a",
      "default"
    ],
    "claim-p5151": [
      "transitive-ia-final-segments",
      "transitive-i-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5150": "authorized",
    "claim-p5151": "authorized"
  }
};
export default Object.freeze(spec);
