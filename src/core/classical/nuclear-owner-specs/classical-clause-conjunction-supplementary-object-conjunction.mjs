const spec = {
  "ownerId": "classical-clause-conjunction-supplementary-object-conjunction",
  "prefix": "ClassicalClauseConjunctionSupplementaryObjectConjunction",
  "operationId": "classical.clause.conjunction.supplementary.object.conjunction.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-supplementary-object-conjunction-source",
  "domain": "classical-clause-conjunction-supplementary-object-conjunction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4852"
  ],
  "coordinates": {
    "claim-p4852::p4852-the-adjunct-group-functions-as-a-supplementary-object": {
      "assertionId": "classical-clause-conjunction-supplementary-object-conjunction:p4852-the-adjunct-group-functions-as-a-supplementary-object",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4852": [
      "supplementary-object-conjunction"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4852": "authorized"
  }
};
export default Object.freeze(spec);
