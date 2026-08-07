const spec = {
  "ownerId": "classical-clause-conjunction-shared-possessor-reference",
  "prefix": "ClassicalClauseConjunctionSharedPossessorReference",
  "operationId": "classical.clause.conjunction.shared.possessor.reference.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-shared-possessor-reference-source",
  "domain": "classical-clause-conjunction-shared-possessor-reference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4857"
  ],
  "coordinates": {
    "claim-p4857::p4857-it-functions-as-the-supplementary-possessor-for-both-i": {
      "assertionId": "classical-clause-conjunction-shared-possessor-reference:p4857-it-functions-as-the-supplementary-possessor-for-both-i",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4857": [
      "shared-possessor-reference"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4857": "authorized"
  }
};
export default Object.freeze(spec);
