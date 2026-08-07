const spec = {
  "ownerId": "classical-clause-comparison-iuhqui-impersonal",
  "prefix": "ClassicalClauseComparisonIuhquiImpersonal",
  "operationId": "classical.clause.comparison.iuhqui.impersonal.execute",
  "inputContract": "complete-typed-classical-clause-comparison-iuhqui-impersonal-source",
  "domain": "classical-clause-comparison-iuhqui-impersonal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4922"
  ],
  "coordinates": {
    "claim-p4922::p4922-frequently-the-nnc-formed-on-iuh-qui-has-an": {
      "assertionId": "classical-clause-comparison-iuhqui-impersonal:p4922-frequently-the-nnc-formed-on-iuh-qui-has-an",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4922": [
      "iuhqui-impersonal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4922": "authorized"
  }
};
export default Object.freeze(spec);
