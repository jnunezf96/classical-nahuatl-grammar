const spec = {
  "ownerId": "classical-clause-complement-subject-state-manner-contrast",
  "prefix": "ClassicalClauseComplementSubjectStateMannerContrast",
  "operationId": "classical.clause.complement.subject.state.manner.contrast.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-state-manner-contrast-source",
  "domain": "classical-clause-complement-subject-state-manner-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4808"
  ],
  "coordinates": {
    "claim-p4808::p4808-this-construction-frequently-resembles-that-of-the-adjoined-adverbial": {
      "assertionId": "classical-clause-complement-subject-state-manner-contrast:p4808-this-construction-frequently-resembles-that-of-the-adjoined-adverbial",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4808": [
      "subject-state-manner-contrast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4808": "authorized"
  }
};
export default Object.freeze(spec);
