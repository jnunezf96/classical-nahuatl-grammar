const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-spelling-analysis",
  "prefix": "ClassicalAdverbialAdjunctionConcessionSpellingAnalysis",
  "operationId": "classical.adverbial.adjunction.concession.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-spelling-analysis-source",
  "domain": "classical-adverbial-adjunction-concession-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4766"
  ],
  "coordinates": {
    "claim-p4766::p4766-traditionally-these-are-often-spelled-intlanelle-and-intlanele-respectively": {
      "assertionId": "classical-adverbial-adjunction-concession-spelling-analysis:p4766-traditionally-these-are-often-spelled-intlanelle-and-intlanele-respectively",
      "canonicalPath": "analysis.traditionalSpellingAuthorizesStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4766": [
      "concession-spelling-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4766": "authorized"
  }
};
export default Object.freeze(spec);
