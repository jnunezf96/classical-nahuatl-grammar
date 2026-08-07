const spec = {
  "ownerId": "classical-clause-complement-object-state",
  "prefix": "ClassicalClauseComplementObjectState",
  "operationId": "classical.clause.complement.object.state.execute",
  "inputContract": "complete-typed-classical-clause-complement-object-state-source",
  "domain": "classical-clause-complement-object-state",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4801"
  ],
  "coordinates": {
    "claim-p4801::p4801-the-object-complement-is-an-adjectival-nnc-that-indicates": {
      "assertionId": "classical-clause-complement-object-state:p4801-the-object-complement-is-an-adjectival-nnc-that-indicates",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4801": [
      "object-state"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4801": "authorized"
  }
};
export default Object.freeze(spec);
