const spec = {
  "ownerId": "classical-clause-complement-coverage-abundant-agentive",
  "prefix": "ClassicalClauseComplementCoverageAbundantAgentive",
  "operationId": "classical.clause.complement.coverage.abundant.agentive.execute",
  "inputContract": "complete-typed-classical-clause-complement-coverage-abundant-agentive-source",
  "domain": "classical-clause-complement-coverage-abundant-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4820"
  ],
  "coordinates": {
    "claim-p4820::p4820-the-complement-may-also-be-a-preterit-agentive-nnc": {
      "assertionId": "classical-clause-complement-coverage-abundant-agentive:p4820-the-complement-may-also-be-a-preterit-agentive-nnc",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4820": [
      "coverage-abundant-agentive"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4820": "authorized"
  }
};
export default Object.freeze(spec);
