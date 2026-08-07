const spec = {
  "ownerId": "classical-adverbial-adjunction-reason-translation-analysis",
  "prefix": "ClassicalAdverbialAdjunctionReasonTranslationAnalysis",
  "operationId": "classical.adverbial.adjunction.reason.translation.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-reason-translation-analysis-source",
  "domain": "classical-adverbial-adjunction-reason-translation-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4786",
    "claim-p4787"
  ],
  "coordinates": {
    "claim-p4786::p4786-in-his-dictionary-molina-is-incorrect-in-his-translation": {
      "assertionId": "classical-adverbial-adjunction-reason-translation-analysis:p4786-in-his-dictionary-molina-is-incorrect-in-his-translation",
      "canonicalPath": "analysis.dictionaryTranslationAuthorizesStructure"
    },
    "claim-p4787::p4787-not-only-is-the-translation-wrong-the-grammatical-explanation": {
      "assertionId": "classical-adverbial-adjunction-reason-translation-analysis:p4787-not-only-is-the-translation-wrong-the-grammatical-explanation",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4786": [
      "reason-translation-analysis"
    ],
    "claim-p4787": [
      "reason-translation-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4786": "authorized",
    "claim-p4787": "authorized"
  }
};
export default Object.freeze(spec);
