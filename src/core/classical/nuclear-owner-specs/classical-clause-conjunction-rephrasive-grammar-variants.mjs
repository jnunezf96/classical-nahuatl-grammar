const spec = {
  "ownerId": "classical-clause-conjunction-rephrasive-grammar-variants",
  "prefix": "ClassicalClauseConjunctionRephrasiveGrammarVariants",
  "operationId": "classical.clause.conjunction.rephrasive.grammar.variants.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-rephrasive-grammar-variants-source",
  "domain": "classical-clause-conjunction-rephrasive-grammar-variants",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4911",
    "claim-p4912"
  ],
  "coordinates": {
    "claim-p4911::p4911-the-speaker-keeps-to-a-similar-or-synonymous-content": {
      "assertionId": "classical-clause-conjunction-rephrasive-grammar-variants:p4911-the-speaker-keeps-to-a-similar-or-synonymous-content",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4912::p4912-there-are-a-number-of-varieties-for-example-a": {
      "assertionId": "classical-clause-conjunction-rephrasive-grammar-variants:p4912-there-are-a-number-of-varieties-for-example-a",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4911": [
      "rephrasive-grammar-variants"
    ],
    "claim-p4912": [
      "rephrasive-grammar-variants"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4911": "authorized",
    "claim-p4912": "authorized"
  }
};
export default Object.freeze(spec);
