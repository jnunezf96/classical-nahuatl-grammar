const spec = {
  "ownerId": "classical-clause-conjunction-auh-placement",
  "prefix": "ClassicalClauseConjunctionAuhPlacement",
  "operationId": "classical.clause.conjunction.auh.placement.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-auh-placement-source",
  "domain": "classical-clause-conjunction-auh-placement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4855"
  ],
  "coordinates": {
    "claim-p4855::p4855-auh-has-a-somewhat-restricted-use-not-joining-as": {
      "assertionId": "classical-clause-conjunction-auh-placement:p4855-auh-has-a-somewhat-restricted-use-not-joining-as",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4855": [
      "auh-placement"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4855": "authorized"
  }
};
export default Object.freeze(spec);
