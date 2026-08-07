const spec = {
  "ownerId": "classical-adverbial-adjunction-time-demonstrative-subject",
  "prefix": "ClassicalAdverbialAdjunctionTimeDemonstrativeSubject",
  "operationId": "classical.adverbial.adjunction.time.demonstrative.subject.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-demonstrative-subject-source",
  "domain": "classical-adverbial-adjunction-time-demonstrative-subject",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4712"
  ],
  "coordinates": {
    "claim-p4712::p4712-at-times-the-principal-clause-within-the-adverbial-clause": {
      "assertionId": "classical-adverbial-adjunction-time-demonstrative-subject:p4712-at-times-the-principal-clause-within-the-adverbial-clause",
      "canonicalPath": "analysis.demonstrativeSubjectWithAdverbialPredicateLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4712": [
      "time-demonstrative-subject"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4712": "authorized"
  }
};
export default Object.freeze(spec);
