const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-source-analysis",
  "prefix": "ClassicalAdverbialAdjunctionConcessionSourceAnalysis",
  "operationId": "classical.adverbial.adjunction.concession.source.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-source-analysis-source",
  "domain": "classical-adverbial-adjunction-concession-source-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4782",
    "claim-p4783"
  ],
  "coordinates": {
    "claim-p4782::p4782-if-the-speaker-had-used-zan": {
      "assertionId": "classical-adverbial-adjunction-concession-source-analysis:p4782-if-the-speaker-had-used-zan",
      "canonicalPath": "analysis.reportedSourceJudgmentAuthorizesStructure"
    },
    "claim-p4783::p4783-comes-from-carochi-who-explains-that-if-the-speaker": {
      "assertionId": "classical-adverbial-adjunction-concession-source-analysis:p4783-comes-from-carochi-who-explains-that-if-the-speaker",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4782": [
      "concession-source-analysis"
    ],
    "claim-p4783": [
      "concession-source-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4782": "authorized",
    "claim-p4783": "authorized"
  }
};
export default Object.freeze(spec);
