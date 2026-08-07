const spec = {
  "ownerId": "classical-clause-complement-coverage-singular-animate",
  "prefix": "ClassicalClauseComplementCoverageSingularAnimate",
  "operationId": "classical.clause.complement.coverage.singular.animate.execute",
  "inputContract": "complete-typed-classical-clause-complement-coverage-singular-animate-source",
  "domain": "classical-clause-complement-coverage-singular-animate",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4821",
    "claim-p4822"
  ],
  "coordinates": {
    "claim-p4821::p4821-normally-the-nnc-acting-as-complement-has-a-singular": {
      "assertionId": "classical-clause-complement-coverage-singular-animate:p4821-normally-the-nnc-acting-as-complement-has-a-singular",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4822::p4822-when-built-on-an-animate-stem": {
      "assertionId": "classical-clause-complement-coverage-singular-animate:p4822-when-built-on-an-animate-stem",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4821": [
      "coverage-singular-animate"
    ],
    "claim-p4822": [
      "coverage-singular-animate"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4821": "authorized",
    "claim-p4822": "authorized"
  }
};
export default Object.freeze(spec);
