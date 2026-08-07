const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-historical-subject-analysis",
  "prefix": "ClassicalDenominalVncTiAHistoricalSubjectAnalysis",
  "operationId": "classical.denominal.vnc.ti.a.historical.subject.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-historical-subject-analysis-source",
  "domain": "classical-denominal-vnc-ti-a-historical-subject-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5093"
  ],
  "coordinates": {
    "claim-p5093::p5093-it-is-possible-that-the-possessive-state-nnc-that": {
      "assertionId": "classical-denominal-vnc-ti-a-historical-subject-analysis:p5093-it-is-possible-that-the-possessive-state-nnc-that",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5093": [
      "ti-a-historical-subject-analysis",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5093": "authorized"
  }
};
export default Object.freeze(spec);
