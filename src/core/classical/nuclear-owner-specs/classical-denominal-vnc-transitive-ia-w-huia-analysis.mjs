const spec = {
  "ownerId": "classical-denominal-vnc-transitive-ia-w-huia-analysis",
  "prefix": "ClassicalDenominalVncTransitiveIaWHuiaAnalysis",
  "operationId": "classical.denominal.vnc.transitive.ia.w.huia.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-transitive-ia-w-huia-analysis-source",
  "domain": "classical-denominal-vnc-transitive-ia-w-huia-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5152",
    "claim-p5153"
  ],
  "coordinates": {
    "claim-p5152::p5152-note-1-when-the-nounstem-ends-in-w-it": {
      "assertionId": "classical-denominal-vnc-transitive-ia-w-huia-analysis:p5152-note-1-when-the-nounstem-ends-in-w-it",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    },
    "claim-p5153::p5153-when-the-nounstem-ends-in-w": {
      "assertionId": "classical-denominal-vnc-transitive-ia-w-huia-analysis:p5153-when-the-nounstem-ends-in-w",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5152": [
      "transitive-ia-w-huia-analysis",
      "transitive-i-a",
      "default"
    ],
    "claim-p5153": [
      "transitive-ia-w-huia-analysis",
      "transitive-i-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5152": "authorized",
    "claim-p5153": "authorized"
  }
};
export default Object.freeze(spec);
