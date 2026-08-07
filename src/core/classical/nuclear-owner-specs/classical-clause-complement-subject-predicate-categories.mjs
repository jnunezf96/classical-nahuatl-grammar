const spec = {
  "ownerId": "classical-clause-complement-subject-predicate-categories",
  "prefix": "ClassicalClauseComplementSubjectPredicateCategories",
  "operationId": "classical.clause.complement.subject.predicate.categories.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-predicate-categories-source",
  "domain": "classical-clause-complement-subject-predicate-categories",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4803"
  ],
  "coordinates": {
    "claim-p4803::p4803-the-stem-of-the-subject-complement-nnc-may-be": {
      "assertionId": "classical-clause-complement-subject-predicate-categories:p4803-the-stem-of-the-subject-complement-nnc-may-be",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4803": [
      "subject-predicate-categories"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4803": "authorized"
  }
};
export default Object.freeze(spec);
