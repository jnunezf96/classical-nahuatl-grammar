const spec = {
  "ownerId": "classical-clause-complement-subject-semantic-system",
  "prefix": "ClassicalClauseComplementSubjectSemanticSystem",
  "operationId": "classical.clause.complement.subject.semantic.system.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-semantic-system-source",
  "domain": "classical-clause-complement-subject-semantic-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4804"
  ],
  "coordinates": {
    "claim-p4804::p4804-there-are-several-meaning-categories-into-which-these-constructions": {
      "assertionId": "classical-clause-complement-subject-semantic-system:p4804-there-are-several-meaning-categories-into-which-these-constructions",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4804": [
      "subject-semantic-system"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4804": "authorized"
  }
};
export default Object.freeze(spec);
