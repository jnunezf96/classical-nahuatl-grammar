const spec = {
  "ownerId": "classical-clause-complement-passive-object-transform",
  "prefix": "ClassicalClauseComplementPassiveObjectTransform",
  "operationId": "classical.clause.complement.passive.object.transform.execute",
  "inputContract": "complete-typed-classical-clause-complement-passive-object-transform-source",
  "domain": "classical-clause-complement-passive-object-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4815"
  ],
  "coordinates": {
    "claim-p4815::p4815-a-subject-complement-construction-may-also-be-generated-as": {
      "assertionId": "classical-clause-complement-passive-object-transform:p4815-a-subject-complement-construction-may-also-be-generated-as",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4815": [
      "passive-object-transform"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4815": "authorized"
  }
};
export default Object.freeze(spec);
