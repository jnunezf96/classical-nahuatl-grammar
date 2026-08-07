const spec = {
  "ownerId": "classical-clause-complement-beginning-neighbor-contrast",
  "prefix": "ClassicalClauseComplementBeginningNeighborContrast",
  "operationId": "classical.clause.complement.beginning.neighbor.contrast.execute",
  "inputContract": "complete-typed-classical-clause-complement-beginning-neighbor-contrast-source",
  "domain": "classical-clause-complement-beginning-neighbor-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4823"
  ],
  "coordinates": {
    "claim-p4823::p4823-when-a-vnc-built-on-pe-hua-occurs-as": {
      "assertionId": "classical-clause-complement-beginning-neighbor-contrast:p4823-when-a-vnc-built-on-pe-hua-occurs-as",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4823": [
      "beginning-neighbor-contrast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4823": "authorized"
  }
};
export default Object.freeze(spec);
