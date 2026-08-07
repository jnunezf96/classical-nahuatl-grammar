const spec = {
  "ownerId": "classical-clause-conjunction-markedness-system",
  "prefix": "ClassicalClauseConjunctionMarkednessSystem",
  "operationId": "classical.clause.conjunction.markedness.system.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-markedness-system-source",
  "domain": "classical-clause-conjunction-markedness-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4840"
  ],
  "coordinates": {
    "claim-p4840::p4840-any-of-these-may-be-either-marked-or-unmarked": {
      "assertionId": "classical-clause-conjunction-markedness-system:p4840-any-of-these-may-be-either-marked-or-unmarked",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4840": [
      "markedness-system"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4840": "authorized"
  }
};
export default Object.freeze(spec);
