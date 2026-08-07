const spec = {
  "ownerId": "classical-clause-conjunction-standard-correlation",
  "prefix": "ClassicalClauseConjunctionStandardCorrelation",
  "operationId": "classical.clause.conjunction.standard.correlation.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-standard-correlation-source",
  "domain": "classical-clause-conjunction-standard-correlation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4884",
    "claim-p4885"
  ],
  "coordinates": {
    "claim-p4884::p4884-the-standard-type-of-correlation-is-expressed-by-paired": {
      "assertionId": "classical-clause-conjunction-standard-correlation:p4884-the-standard-type-of-correlation-is-expressed-by-paired",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4885::p4885-then-it-calls-to-him-either-when-it-is": {
      "assertionId": "classical-clause-conjunction-standard-correlation:p4885-then-it-calls-to-him-either-when-it-is",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4884": [
      "standard-correlation"
    ],
    "claim-p4885": [
      "standard-correlation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4884": "authorized",
    "claim-p4885": "authorized"
  }
};
export default Object.freeze(spec);
