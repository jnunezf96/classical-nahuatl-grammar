const spec = {
  "ownerId": "classical-clause-complement-subject-identity",
  "prefix": "ClassicalClauseComplementSubjectIdentity",
  "operationId": "classical.clause.complement.subject.identity.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-identity-source",
  "domain": "classical-clause-complement-subject-identity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4805"
  ],
  "coordinates": {
    "claim-p4805::p4805-the-subject-complement-indicates-the-nature-of-the-entity": {
      "assertionId": "classical-clause-complement-subject-identity:p4805-the-subject-complement-indicates-the-nature-of-the-entity",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4805": [
      "subject-identity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4805": "authorized"
  }
};
export default Object.freeze(spec);
