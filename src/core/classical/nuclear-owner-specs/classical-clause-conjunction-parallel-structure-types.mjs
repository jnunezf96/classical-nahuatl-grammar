const spec = {
  "ownerId": "classical-clause-conjunction-parallel-structure-types",
  "prefix": "ClassicalClauseConjunctionParallelStructureTypes",
  "operationId": "classical.clause.conjunction.parallel.structure.types.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-parallel-structure-types-source",
  "domain": "classical-clause-conjunction-parallel-structure-types",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4909"
  ],
  "coordinates": {
    "claim-p4909::p4909-there-are-many-varieties-of-parallel-structure-but-they": {
      "assertionId": "classical-clause-conjunction-parallel-structure-types:p4909-there-are-many-varieties-of-parallel-structure-but-they",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4909": [
      "parallel-structure-types"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4909": "authorized"
  }
};
export default Object.freeze(spec);
