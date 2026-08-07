const spec = {
  "ownerId": "classical-clause-conjunction-ihuan-collocations",
  "prefix": "ClassicalClauseConjunctionIhuanCollocations",
  "operationId": "classical.clause.conjunction.ihuan.collocations.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-ihuan-collocations-source",
  "domain": "classical-clause-conjunction-ihuan-collocations",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4872"
  ],
  "coordinates": {
    "claim-p4872::p4872-in-this-construction-the-adverbial-modifier-i-hua-n": {
      "assertionId": "classical-clause-conjunction-ihuan-collocations:p4872-in-this-construction-the-adverbial-modifier-i-hua-n",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4872": [
      "ihuan-collocations"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4872": "authorized"
  }
};
export default Object.freeze(spec);
