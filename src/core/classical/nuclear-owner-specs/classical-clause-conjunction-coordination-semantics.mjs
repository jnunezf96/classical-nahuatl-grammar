const spec = {
  "ownerId": "classical-clause-conjunction-coordination-semantics",
  "prefix": "ClassicalClauseConjunctionCoordinationSemantics",
  "operationId": "classical.clause.conjunction.coordination.semantics.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-coordination-semantics-source",
  "domain": "classical-clause-conjunction-coordination-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4839"
  ],
  "coordinates": {
    "claim-p4839::p4839-conjunction-may-be-either-additive-english-and-alternative-english": {
      "assertionId": "classical-clause-conjunction-coordination-semantics:p4839-conjunction-may-be-either-additive-english-and-alternative-english",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4839": [
      "coordination-semantics"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4839": "authorized"
  }
};
export default Object.freeze(spec);
