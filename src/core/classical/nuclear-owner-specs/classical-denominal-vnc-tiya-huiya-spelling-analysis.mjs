const spec = {
  "ownerId": "classical-denominal-vnc-tiya-huiya-spelling-analysis",
  "prefix": "ClassicalDenominalVncTiyaHuiyaSpellingAnalysis",
  "operationId": "classical.denominal.vnc.tiya.huiya.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-huiya-spelling-analysis-source",
  "domain": "classical-denominal-vnc-tiya-huiya-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4953",
    "claim-p4954"
  ],
  "coordinates": {
    "claim-p4953::p4953-whenever-the-latter-are-spelled-traditionally-i": {
      "assertionId": "classical-denominal-vnc-tiya-huiya-spelling-analysis:p4953-whenever-the-latter-are-spelled-traditionally-i",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    },
    "claim-p4954::p4954-the-combinations-ti-ya-and-hui-ya-are-traditionally": {
      "assertionId": "classical-denominal-vnc-tiya-huiya-spelling-analysis:p4954-the-combinations-ti-ya-and-hui-ya-are-traditionally",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4953": [
      "tiya-huiya-spelling-analysis",
      "inceptive-ti-ya",
      "default"
    ],
    "claim-p4954": [
      "tiya-huiya-spelling-analysis",
      "inceptive-ti-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4953": "authorized",
    "claim-p4954": "authorized"
  }
};
export default Object.freeze(spec);
