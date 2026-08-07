const spec = {
  "ownerId": "classical-clause-complement-subject-cel-possessor-contact",
  "prefix": "ClassicalClauseComplementSubjectCelPossessorContact",
  "operationId": "classical.clause.complement.subject.cel.possessor.contact.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-cel-possessor-contact-source",
  "domain": "classical-clause-complement-subject-cel-possessor-contact",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4810",
    "claim-p4811"
  ],
  "coordinates": {
    "claim-p4810::p4810-when-an-nnc-built-on-this-nounstem-acts-as": {
      "assertionId": "classical-clause-complement-subject-cel-possessor-contact:p4810-when-an-nnc-built-on-this-nounstem-acts-as",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4811::p4811-when-an-nnc-built-on-this-nounstem-acts-as": {
      "assertionId": "classical-clause-complement-subject-cel-possessor-contact:p4811-when-an-nnc-built-on-this-nounstem-acts-as",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4810": [
      "subject-cel-possessor-contact"
    ],
    "claim-p4811": [
      "subject-cel-possessor-contact"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4810": "authorized",
    "claim-p4811": "authorized"
  }
};
export default Object.freeze(spec);
