const spec = {
  "ownerId": "classical-clause-complement-subject-el-possessor-contact",
  "prefix": "ClassicalClauseComplementSubjectElPossessorContact",
  "operationId": "classical.clause.complement.subject.el.possessor.contact.execute",
  "inputContract": "complete-typed-classical-clause-complement-subject-el-possessor-contact-source",
  "domain": "classical-clause-complement-subject-el-possessor-contact",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4812",
    "claim-p4813"
  ],
  "coordinates": {
    "claim-p4812::p4812-again-when-an-nnc-built-on-this-nounstem-acts": {
      "assertionId": "classical-clause-complement-subject-el-possessor-contact:p4812-again-when-an-nnc-built-on-this-nounstem-acts",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4813::p4813-when-an-nnc-built-on-this-nounstem-acts-as": {
      "assertionId": "classical-clause-complement-subject-el-possessor-contact:p4813-when-an-nnc-built-on-this-nounstem-acts-as",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4812": [
      "subject-el-possessor-contact"
    ],
    "claim-p4813": [
      "subject-el-possessor-contact"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4812": "authorized",
    "claim-p4813": "authorized"
  }
};
export default Object.freeze(spec);
