const spec = {
  "ownerId": "classical-clause-conjunction-loose-correlation",
  "prefix": "ClassicalClauseConjunctionLooseCorrelation",
  "operationId": "classical.clause.conjunction.loose.correlation.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-loose-correlation-source",
  "domain": "classical-clause-conjunction-loose-correlation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4886"
  ],
  "coordinates": {
    "claim-p4886::p4886-a-looser-kind-of-correlation-is-expressed-by-the": {
      "assertionId": "classical-clause-conjunction-loose-correlation:p4886-a-looser-kind-of-correlation-is-expressed-by-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4886": [
      "loose-correlation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4886": "authorized"
  }
};
export default Object.freeze(spec);
