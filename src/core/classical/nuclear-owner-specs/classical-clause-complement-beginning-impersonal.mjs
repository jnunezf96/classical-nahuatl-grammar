const spec = {
  "ownerId": "classical-clause-complement-beginning-impersonal",
  "prefix": "ClassicalClauseComplementBeginningImpersonal",
  "operationId": "classical.clause.complement.beginning.impersonal.execute",
  "inputContract": "complete-typed-classical-clause-complement-beginning-impersonal-source",
  "domain": "classical-clause-complement-beginning-impersonal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4826"
  ],
  "coordinates": {
    "claim-p4826::p4826-the-construction-may-be-impersonal": {
      "assertionId": "classical-clause-complement-beginning-impersonal:p4826-the-construction-may-be-impersonal",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4826": [
      "beginning-impersonal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4826": "authorized"
  }
};
export default Object.freeze(spec);
