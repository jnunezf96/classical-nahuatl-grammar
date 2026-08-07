const spec = {
  "ownerId": "classical-denominal-vnc-yo-hua-spelling-analysis",
  "prefix": "ClassicalDenominalVncYoHuaSpellingAnalysis",
  "operationId": "classical.denominal.vnc.yo.hua.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-yo-hua-spelling-analysis-source",
  "domain": "classical-denominal-vnc-yo-hua-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5025"
  ],
  "coordinates": {
    "claim-p5025::p5025-unfortunately-the-suffix-hua-is-almost-always-misspelled-a": {
      "assertionId": "classical-denominal-vnc-yo-hua-spelling-analysis:p5025-unfortunately-the-suffix-hua-is-almost-always-misspelled-a",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5025": [
      "yo-hua-spelling-analysis",
      "deverbal-yo-hua",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5025": "authorized"
  }
};
export default Object.freeze(spec);
