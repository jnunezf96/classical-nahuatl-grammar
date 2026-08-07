const spec = {
  "ownerId": "classical-clause-complement-subject-state",
  "prefix": "ClassicalClauseComplementSubjectState",
  "operationId": "classical.clause.complement.subject.state.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-state-source",
  "domain": "classical-clause-complement-subject-state",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4807"
  ],
  "coordinates": {
    "claim-p4807::p4807-the-subject-complement-indicates-the-state-of-the-entity": {
      "assertionId": "classical-clause-complement-subject-state:p4807-the-subject-complement-indicates-the-state-of-the-entity",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4807": [
      "subject-state"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4807": "authorized"
  }
};
export default Object.freeze(spec);
