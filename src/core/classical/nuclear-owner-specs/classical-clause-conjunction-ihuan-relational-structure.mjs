const spec = {
  "ownerId": "classical-clause-conjunction-ihuan-relational-structure",
  "prefix": "ClassicalClauseConjunctionIhuanRelationalStructure",
  "operationId": "classical.clause.conjunction.ihuan.relational.structure.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-ihuan-relational-structure-source",
  "domain": "classical-clause-conjunction-ihuan-relational-structure",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4863"
  ],
  "coordinates": {
    "claim-p4863::p4863-the-possessive-state-relational-nnc-i-hua-n-it": {
      "assertionId": "classical-clause-conjunction-ihuan-relational-structure:p4863-the-possessive-state-relational-nnc-i-hua-n-it",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4863": [
      "ihuan-relational-structure"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4863": "authorized"
  }
};
export default Object.freeze(spec);
