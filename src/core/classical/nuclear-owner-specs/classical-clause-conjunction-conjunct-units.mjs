const spec = {
  "ownerId": "classical-clause-conjunction-conjunct-units",
  "prefix": "ClassicalClauseConjunctionConjunctUnits",
  "operationId": "classical.clause.conjunction.conjunct.units.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-conjunct-units-source",
  "domain": "classical-clause-conjunction-conjunct-units",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4838"
  ],
  "coordinates": {
    "claim-p4838::p4838-because-of-the-nature-of-nahuatl-syntax-conjuncts-are": {
      "assertionId": "classical-clause-conjunction-conjunct-units:p4838-because-of-the-nature-of-nahuatl-syntax-conjuncts-are",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4838": [
      "conjunct-units"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4838": "authorized"
  }
};
export default Object.freeze(spec);
