const spec = {
  "ownerId": "classical-clause-complement-object-designation",
  "prefix": "ClassicalClauseComplementObjectDesignation",
  "operationId": "classical.clause.complement.object.designation.execute",
  "inputContract": "complete-typed-classical-clause-complement-object-designation-source",
  "domain": "classical-clause-complement-object-designation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4798"
  ],
  "coordinates": {
    "claim-p4798::p4798-the-object-complement-can-indicate-the-name-of-the": {
      "assertionId": "classical-clause-complement-object-designation:p4798-the-object-complement-can-indicate-the-name-of-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4798": [
      "object-designation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4798": "authorized"
  }
};
export default Object.freeze(spec);
