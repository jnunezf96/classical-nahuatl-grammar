const spec = {
  "ownerId": "classical-supplement-information-question-formation",
  "prefix": "ClassicalSupplementInformationQuestionFormation",
  "operationId": "classical.supplement.information.question.formation.execute",
  "inputContract": "complete-typed-classical-supplement-information-question-formation-source",
  "domain": "classical-supplement-information-question-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1826",
    "claim-p1827",
    "claim-p1828"
  ],
  "coordinates": {
    "claim-p1826::p1826-information-questions-by-means-of-supplements": {
      "assertionId": "classical-supplement-information-question-formation:p1826-information-questions-by-means-of-supplements",
      "canonicalPath": "extractedFrames.question.interrogativeKind"
    },
    "claim-p1827::p1827-the-interrogative-nnc-must-be-placed-at-the-beginning": {
      "assertionId": "classical-supplement-information-question-formation:p1827-the-interrogative-nnc-must-be-placed-at-the-beginning",
      "canonicalPath": "extractedFrames.question.requiredPosition"
    },
    "claim-p1828::p1828-source-cuix-ipatiuh-zan-tepitzin-is-its-price-only": {
      "assertionId": "classical-supplement-information-question-formation:p1828-source-cuix-ipatiuh-zan-tepitzin-is-its-price-only",
      "canonicalPath": "informationQuestion.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1826": [],
    "claim-p1827": [],
    "claim-p1828": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1826": "authorized",
    "claim-p1827": "authorized",
    "claim-p1828": "authorized"
  }
};
export default Object.freeze(spec);
