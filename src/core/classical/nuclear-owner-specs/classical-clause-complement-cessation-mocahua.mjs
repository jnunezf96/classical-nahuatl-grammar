const spec = {
  "ownerId": "classical-clause-complement-cessation-mocahua",
  "prefix": "ClassicalClauseComplementCessationMocahua",
  "operationId": "classical.clause.complement.cessation.mocahua.execute",
  "inputContract": "complete-typed-classical-clause-complement-cessation-mocahua-source",
  "domain": "classical-clause-complement-cessation-mocahua",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4829"
  ],
  "coordinates": {
    "claim-p4829::p4829-as-a-complement-to-a-vnc-formed-on-the": {
      "assertionId": "classical-clause-complement-cessation-mocahua:p4829-as-a-complement-to-a-vnc-formed-on-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4829": [
      "cessation-mocahua"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4829": "authorized"
  }
};
export default Object.freeze(spec);
