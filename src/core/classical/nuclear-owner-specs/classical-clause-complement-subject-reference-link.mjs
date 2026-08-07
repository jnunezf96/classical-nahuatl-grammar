const spec = {
  "ownerId": "classical-clause-complement-subject-reference-link",
  "prefix": "ClassicalClauseComplementSubjectReferenceLink",
  "operationId": "classical.clause.complement.subject.reference.link.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-reference-link-source",
  "domain": "classical-clause-complement-subject-reference-link",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4802"
  ],
  "coordinates": {
    "claim-p4802::p4802-the-subject-pronoun-of-the-nnc-that-functions-as": {
      "assertionId": "classical-clause-complement-subject-reference-link:p4802-the-subject-pronoun-of-the-nnc-that-functions-as",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4802": [
      "subject-reference-link"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4802": "authorized"
  }
};
export default Object.freeze(spec);
