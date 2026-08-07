const spec = {
  "ownerId": "classical-applicative-participant-transform",
  "prefix": "ClassicalApplicativeParticipantTransform",
  "operationId": "classical.applicative.participant.transform.execute",
  "inputContract": "complete-typed-classical-applicative-participant-transform-source",
  "domain": "classical-applicative-participant-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2605",
    "claim-p2606",
    "claim-p2607",
    "claim-p2608"
  ],
  "coordinates": {
    "claim-p2605::p2605-the-last-added-applicative-object-pronoun-of-an-applicative": {
      "assertionId": "classical-applicative-participant-transform:p2605-the-last-added-applicative-object-pronoun-of-an-applicative",
      "canonicalPath": "participants.doubleSpecific.sourceSubjectPreservedByApplicative"
    },
    "claim-p2606::p2606-a-vnc-is-transformed-into-its-applicative-counter-part": {
      "assertionId": "classical-applicative-participant-transform:p2606-a-vnc-is-transformed-into-its-applicative-counter-part",
      "canonicalPath": "participants.doubleSpecific.addedObjectRequest.governor"
    },
    "claim-p2607::p2607-if-there-are-two-objects-the-one-of-the": {
      "assertionId": "classical-applicative-participant-transform:p2607-if-there-are-two-objects-the-one-of-the",
      "canonicalPath": "participants.doubleSpecific.newestDerivationalLevel"
    },
    "claim-p2608::p2608-if-there-are-three-objects-the-one-of-the": {
      "assertionId": "classical-applicative-participant-transform:p2608-if-there-are-three-objects-the-one-of-the",
      "canonicalPath": "participants.tripleSpecific.newestDerivationalLevel"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2605": [],
    "claim-p2606": [],
    "claim-p2607": [],
    "claim-p2608": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2605": "authorized",
    "claim-p2606": "authorized",
    "claim-p2607": "authorized",
    "claim-p2608": "authorized"
  }
};
export default Object.freeze(spec);
