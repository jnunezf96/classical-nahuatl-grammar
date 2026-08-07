const spec = {
  "ownerId": "classical-clause-complement-coverage-moca",
  "prefix": "ClassicalClauseComplementCoverageMoca",
  "operationId": "classical.clause.complement.coverage.moca.execute",
  "inputContract": "complete-typed-classical-clause-complement-coverage-moca-source",
  "domain": "classical-clause-complement-coverage-moca",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4817"
  ],
  "coordinates": {
    "claim-p4817::p4817-as-a-complement-to-an-nnc-built-on-the": {
      "assertionId": "classical-clause-complement-coverage-moca:p4817-as-a-complement-to-an-nnc-built-on-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4817": [
      "coverage-moca"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4817": "authorized"
  }
};
export default Object.freeze(spec);
