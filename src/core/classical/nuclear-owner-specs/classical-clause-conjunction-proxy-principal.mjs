const spec = {
  "ownerId": "classical-clause-conjunction-proxy-principal",
  "prefix": "ClassicalClauseConjunctionProxyPrincipal",
  "operationId": "classical.clause.conjunction.proxy.principal.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-proxy-principal-source",
  "domain": "classical-clause-conjunction-proxy-principal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4870",
    "claim-p4871"
  ],
  "coordinates": {
    "claim-p4870::p4870-in-the-following-examples-the-head-modified-by-ihua": {
      "assertionId": "classical-clause-conjunction-proxy-principal:p4870-in-the-following-examples-the-head-modified-by-ihua",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4871::p4871-in-this-case-the-i-hua-n-can-be": {
      "assertionId": "classical-clause-conjunction-proxy-principal:p4871-in-this-case-the-i-hua-n-can-be",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4870": [
      "proxy-principal"
    ],
    "claim-p4871": [
      "proxy-principal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4870": "authorized",
    "claim-p4871": "authorized"
  }
};
export default Object.freeze(spec);
