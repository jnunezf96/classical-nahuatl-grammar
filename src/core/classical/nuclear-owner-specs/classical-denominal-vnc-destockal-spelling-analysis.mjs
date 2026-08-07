const spec = {
  "ownerId": "classical-denominal-vnc-destockal-spelling-analysis",
  "prefix": "ClassicalDenominalVncDestockalSpellingAnalysis",
  "operationId": "classical.denominal.vnc.destockal.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-destockal-spelling-analysis-source",
  "domain": "classical-denominal-vnc-destockal-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5015"
  ],
  "coordinates": {
    "claim-p5015::p5015-in-traditional-spelling-no-distinction-is-made-between-hui": {
      "assertionId": "classical-denominal-vnc-destockal-spelling-analysis:p5015-in-traditional-spelling-no-distinction-is-made-between-hui",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5015": [
      "destockal-spelling-analysis",
      "destockal-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5015": "authorized"
  }
};
export default Object.freeze(spec);
