const spec = {
  "ownerId": "classical-clause-conjunction-ihuan-explicit-silent-head",
  "prefix": "ClassicalClauseConjunctionIhuanExplicitSilentHead",
  "operationId": "classical.clause.conjunction.ihuan.explicit.silent.head.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-ihuan-explicit-silent-head-source",
  "domain": "classical-clause-conjunction-ihuan-explicit-silent-head",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4869"
  ],
  "coordinates": {
    "claim-p4869::p4869-the-head-that-ihua-n-modifies-adverbially-in-the": {
      "assertionId": "classical-clause-conjunction-ihuan-explicit-silent-head:p4869-the-head-that-ihua-n-modifies-adverbially-in-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4869": [
      "ihuan-explicit-silent-head"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4869": "authorized"
  }
};
export default Object.freeze(spec);
