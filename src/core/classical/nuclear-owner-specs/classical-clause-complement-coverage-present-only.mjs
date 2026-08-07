const spec = {
  "ownerId": "classical-clause-complement-coverage-present-only",
  "prefix": "ClassicalClauseComplementCoveragePresentOnly",
  "operationId": "classical.clause.complement.coverage.present.only.execute",
  "inputContract": "complete-typed-classical-clause-complement-coverage-present-only-source",
  "domain": "classical-clause-complement-coverage-present-only",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4819"
  ],
  "coordinates": {
    "claim-p4819::p4819-the-verbstem-is-apparently-limited-to-present-tense-vncs": {
      "assertionId": "classical-clause-complement-coverage-present-only:p4819-the-verbstem-is-apparently-limited-to-present-tense-vncs",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4819": [
      "coverage-present-only"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4819": "authorized"
  }
};
export default Object.freeze(spec);
