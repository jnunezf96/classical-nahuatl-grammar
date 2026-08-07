const spec = {
  "ownerId": "classical-denominal-vnc-inceptive-a-spelling-analysis",
  "prefix": "ClassicalDenominalVncInceptiveASpellingAnalysis",
  "operationId": "classical.denominal.vnc.inceptive.a.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-inceptive-a-spelling-analysis-source",
  "domain": "classical-denominal-vnc-inceptive-a-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5018",
    "claim-p5019"
  ],
  "coordinates": {
    "claim-p5018::p5018-the-spelling-bu-a-traditional-spelling-of": {
      "assertionId": "classical-denominal-vnc-inceptive-a-spelling-analysis:p5018-the-spelling-bu-a-traditional-spelling-of",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    },
    "claim-p5019::p5019-w-which-in-standardized-spelling-is-hhu-see-appendix": {
      "assertionId": "classical-denominal-vnc-inceptive-a-spelling-analysis:p5019-w-which-in-standardized-spelling-is-hhu-see-appendix",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5018": [
      "inceptive-a-spelling-analysis",
      "inceptive-a",
      "default"
    ],
    "claim-p5019": [
      "inceptive-a-spelling-analysis",
      "inceptive-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5018": "authorized",
    "claim-p5019": "authorized"
  }
};
export default Object.freeze(spec);
