const spec = {
  "ownerId": "classical-adverbial-adjunction-interrogative-spelling-analysis",
  "prefix": "ClassicalAdverbialAdjunctionInterrogativeSpellingAnalysis",
  "operationId": "classical.adverbial.adjunction.interrogative.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-interrogative-spelling-analysis-source",
  "domain": "classical-adverbial-adjunction-interrogative-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4672"
  ],
  "coordinates": {
    "claim-p4672::p4672-traditionally-written-cannelpa": {
      "assertionId": "classical-adverbial-adjunction-interrogative-spelling-analysis:p4672-traditionally-written-cannelpa",
      "canonicalPath": "analysis.traditionalSpellingAuthorizesStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4672": [
      "interrogative-spelling-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4672": "authorized"
  }
};
export default Object.freeze(spec);
