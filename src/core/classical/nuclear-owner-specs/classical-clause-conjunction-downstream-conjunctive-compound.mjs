const spec = {
  "ownerId": "classical-clause-conjunction-downstream-conjunctive-compound",
  "prefix": "ClassicalClauseConjunctionDownstreamConjunctiveCompound",
  "operationId": "classical.clause.conjunction.downstream.conjunctive.compound.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-downstream-conjunctive-compound-source",
  "domain": "classical-clause-conjunction-downstream-conjunctive-compound",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4891"
  ],
  "coordinates": {
    "claim-p4891::p4891-the-lexical-item-created-by-the-conjoined-nncs-can": {
      "assertionId": "classical-clause-conjunction-downstream-conjunctive-compound:p4891-the-lexical-item-created-by-the-conjoined-nncs-can",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4891": [
      "downstream-conjunctive-compound"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4891": "authorized"
  }
};
export default Object.freeze(spec);
