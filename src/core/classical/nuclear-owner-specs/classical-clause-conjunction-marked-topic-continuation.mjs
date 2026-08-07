const spec = {
  "ownerId": "classical-clause-conjunction-marked-topic-continuation",
  "prefix": "ClassicalClauseConjunctionMarkedTopicContinuation",
  "operationId": "classical.clause.conjunction.marked.topic.continuation.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-marked-topic-continuation-source",
  "domain": "classical-clause-conjunction-marked-topic-continuation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4856"
  ],
  "coordinates": {
    "claim-p4856::p4856-piciyetl-is-the-sentence-topic-for-the-marked-structure": {
      "assertionId": "classical-clause-conjunction-marked-topic-continuation:p4856-piciyetl-is-the-sentence-topic-for-the-marked-structure",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4856": [
      "marked-topic-continuation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4856": "authorized"
  }
};
export default Object.freeze(spec);
