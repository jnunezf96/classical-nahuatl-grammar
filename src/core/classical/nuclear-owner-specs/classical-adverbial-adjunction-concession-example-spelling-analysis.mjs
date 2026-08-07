const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-example-spelling-analysis",
  "prefix": "ClassicalAdverbialAdjunctionConcessionExampleSpellingAnalysis",
  "operationId": "classical.adverbial.adjunction.concession.example.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-example-spelling-analysis-source",
  "domain": "classical-adverbial-adjunction-concession-example-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4778"
  ],
  "coordinates": {
    "claim-p4778::p4778-spelling-of-the-collocation-huel-tlamahuizolli": {
      "assertionId": "classical-adverbial-adjunction-concession-example-spelling-analysis:p4778-spelling-of-the-collocation-huel-tlamahuizolli",
      "canonicalPath": "analysis.exampleSpellingAuthorizesStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4778": [
      "concession-example-spelling-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4778": "authorized"
  }
};
export default Object.freeze(spec);
