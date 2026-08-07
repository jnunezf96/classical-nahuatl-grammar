const spec = {
  "ownerId": "classical-clause-conjunction-unmarked-asyndeton",
  "prefix": "ClassicalClauseConjunctionUnmarkedAsyndeton",
  "operationId": "classical.clause.conjunction.unmarked.asyndeton.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-unmarked-asyndeton-source",
  "domain": "classical-clause-conjunction-unmarked-asyndeton",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4841",
    "claim-p4842"
  ],
  "coordinates": {
    "claim-p4841::p4841-in-unmarked-conjunction-the-linkage-is-merely-implicit-technically": {
      "assertionId": "classical-clause-conjunction-unmarked-asyndeton:p4841-in-unmarked-conjunction-the-linkage-is-merely-implicit-technically",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4842::p4842-since-unmarked-conjunction-is-achieved-by-simply-juxtaposing-two": {
      "assertionId": "classical-clause-conjunction-unmarked-asyndeton:p4842-since-unmarked-conjunction-is-achieved-by-simply-juxtaposing-two",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4841": [
      "unmarked-asyndeton"
    ],
    "claim-p4842": [
      "unmarked-asyndeton"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4841": "authorized",
    "claim-p4842": "authorized"
  }
};
export default Object.freeze(spec);
