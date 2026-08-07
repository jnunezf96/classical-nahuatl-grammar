const spec = {
  "ownerId": "classical-clause-complement-object-predicate-categories",
  "prefix": "ClassicalClauseComplementObjectPredicateCategories",
  "operationId": "classical.clause.complement.object.predicate.categories.execute",
  "inputContract": "complete-typed-classical-clause-complement-object-predicate-categories-source",
  "domain": "classical-clause-complement-object-predicate-categories",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4794",
    "claim-p4795"
  ],
  "coordinates": {
    "claim-p4794::p4794-this-function-can-also-be-performed-by-adjectival-nncs": {
      "assertionId": "classical-clause-complement-object-predicate-categories:p4794-this-function-can-also-be-performed-by-adjectival-nncs",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4795::p4795-the-preceding-examples-show-substantival-nncs-in-the-complement": {
      "assertionId": "classical-clause-complement-object-predicate-categories:p4795-the-preceding-examples-show-substantival-nncs-in-the-complement",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4794": [
      "object-predicate-categories"
    ],
    "claim-p4795": [
      "object-predicate-categories"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4794": "authorized",
    "claim-p4795": "authorized"
  }
};
export default Object.freeze(spec);
