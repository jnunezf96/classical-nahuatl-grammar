const spec = {
  "ownerId": "classical-clause-complement-subject-iyoh-contact",
  "prefix": "ClassicalClauseComplementSubjectIyohContact",
  "operationId": "classical.clause.complement.subject.iyoh.contact.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-iyoh-contact-source",
  "domain": "classical-clause-complement-subject-iyoh-contact",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4814"
  ],
  "coordinates": {
    "claim-p4814::p4814-the-subject-pronoun-of-an-nnc-built-on-this": {
      "assertionId": "classical-clause-complement-subject-iyoh-contact:p4814-the-subject-pronoun-of-an-nnc-built-on-this",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4814": [
      "subject-iyoh-contact"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4814": "authorized"
  }
};
export default Object.freeze(spec);
