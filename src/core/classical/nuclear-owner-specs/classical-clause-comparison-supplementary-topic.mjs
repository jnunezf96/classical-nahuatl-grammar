const spec = {
  "ownerId": "classical-clause-comparison-supplementary-topic",
  "prefix": "ClassicalClauseComparisonSupplementaryTopic",
  "operationId": "classical.clause.comparison.supplementary.topic.execute",
  "inputContract": "complete-typed-classical-clause-comparison-supplementary-topic-source",
  "domain": "classical-clause-comparison-supplementary-topic",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4924",
    "claim-p4925"
  ],
  "coordinates": {
    "claim-p4924::p4924-if-the-clause-adjoined-to-iuhqui-has-a-supplementary": {
      "assertionId": "classical-clause-comparison-supplementary-topic:p4924-if-the-clause-adjoined-to-iuhqui-has-a-supplementary",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4925::p4925-if-the-clause-adjoined-to-iuhqui-has-a-supplementary": {
      "assertionId": "classical-clause-comparison-supplementary-topic:p4925-if-the-clause-adjoined-to-iuhqui-has-a-supplementary",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4924": [
      "supplementary-topic"
    ],
    "claim-p4925": [
      "supplementary-topic"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4924": "authorized",
    "claim-p4925": "authorized"
  }
};
export default Object.freeze(spec);
