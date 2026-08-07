const spec = {
  "ownerId": "classical-clause-complement-subject-composition",
  "prefix": "ClassicalClauseComplementSubjectComposition",
  "operationId": "classical.clause.complement.subject.composition.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-composition-source",
  "domain": "classical-clause-complement-subject-composition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4806"
  ],
  "coordinates": {
    "claim-p4806::p4806-the-subject-complement-indicates-the-material-of-which-the": {
      "assertionId": "classical-clause-complement-subject-composition:p4806-the-subject-complement-indicates-the-material-of-which-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4806": [
      "subject-composition"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4806": "authorized"
  }
};
export default Object.freeze(spec);
