const spec = {
  "ownerId": "classical-clause-comparison-question-how-much-more",
  "prefix": "ClassicalClauseComparisonQuestionHowMuchMore",
  "operationId": "classical.clause.comparison.question.how.much.more.execute",
  "inputContract": "complete-typed-classical-clause-comparison-question-how-much-more-source",
  "domain": "classical-clause-comparison-question-how-much-more",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4944"
  ],
  "coordinates": {
    "claim-p4944::p4944-53-6-the-question-how-much-more-a-comparison": {
      "assertionId": "classical-clause-comparison-question-how-much-more:p4944-53-6-the-question-how-much-more-a-comparison",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4944": [
      "question-how-much-more"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4944": "authorized"
  }
};
export default Object.freeze(spec);
