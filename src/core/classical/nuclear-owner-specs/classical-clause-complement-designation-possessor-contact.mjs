const spec = {
  "ownerId": "classical-clause-complement-designation-possessor-contact",
  "prefix": "ClassicalClauseComplementDesignationPossessorContact",
  "operationId": "classical.clause.complement.designation.possessor.contact.execute",
  "inputContract": "complete-typed-classical-clause-complement-designation-possessor-contact-source",
  "domain": "classical-clause-complement-designation-possessor-contact",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4799",
    "claim-p4800"
  ],
  "coordinates": {
    "claim-p4799::p4799-when-however-a-possessive-state-nnc-takes-the-place": {
      "assertionId": "classical-clause-complement-designation-possessor-contact:p4799-when-however-a-possessive-state-nnc-takes-the-place",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4800::p4800-the-object-complement-changes-to-a-possessor-complement": {
      "assertionId": "classical-clause-complement-designation-possessor-contact:p4800-the-object-complement-changes-to-a-possessor-complement",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4799": [
      "designation-possessor-contact"
    ],
    "claim-p4800": [
      "designation-possessor-contact"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4799": "authorized",
    "claim-p4800": "authorized"
  }
};
export default Object.freeze(spec);
