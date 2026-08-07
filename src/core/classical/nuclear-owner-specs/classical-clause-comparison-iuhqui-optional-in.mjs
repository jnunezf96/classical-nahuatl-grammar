const spec = {
  "ownerId": "classical-clause-comparison-iuhqui-optional-in",
  "prefix": "ClassicalClauseComparisonIuhquiOptionalIn",
  "operationId": "classical.clause.comparison.iuhqui.optional.in.execute",
  "inputContract": "complete-typed-classical-clause-comparison-iuhqui-optional-in-source",
  "domain": "classical-clause-comparison-iuhqui-optional-in",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4923"
  ],
  "coordinates": {
    "claim-p4923::p4923-the-adjoined-clause-may-be-and-frequently-is-introduced": {
      "assertionId": "classical-clause-comparison-iuhqui-optional-in:p4923-the-adjoined-clause-may-be-and-frequently-is-introduced",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4923": [
      "iuhqui-optional-in"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4923": "authorized"
  }
};
export default Object.freeze(spec);
