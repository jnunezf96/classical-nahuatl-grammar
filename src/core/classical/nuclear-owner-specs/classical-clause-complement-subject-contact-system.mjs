const spec = {
  "ownerId": "classical-clause-complement-subject-contact-system",
  "prefix": "ClassicalClauseComplementSubjectContactSystem",
  "operationId": "classical.clause.complement.subject.contact.system.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-contact-system-source",
  "domain": "classical-clause-complement-subject-contact-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4809"
  ],
  "coordinates": {
    "claim-p4809::p4809-nncs-formed-on-the-following-three-nounstems-are-frequent": {
      "assertionId": "classical-clause-complement-subject-contact-system:p4809-nncs-formed-on-the-following-three-nounstems-are-frequent",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4809": [
      "subject-contact-system"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4809": "authorized"
  }
};
export default Object.freeze(spec);
