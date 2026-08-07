const spec = {
  "ownerId": "classical-causative-participant-transform",
  "prefix": "ClassicalCausativeParticipantTransform",
  "operationId": "classical.causative.participant.transform.execute",
  "inputContract": "complete-typed-classical-causative-participant-transform-source",
  "domain": "classical-causative-participant-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2476",
    "claim-p2477",
    "claim-p2478",
    "claim-p2479",
    "claim-p2480"
  ],
  "coordinates": {
    "claim-p2476::p2476-step-2-creates-an-object-subject-pronoun-that-is": {
      "assertionId": "classical-causative-participant-transform:p2476-step-2-creates-an-object-subject-pronoun-that-is",
      "canonicalPath": "contract.axes.13.axisId"
    },
    "claim-p2477::p2477-basically-a-source-vnc-is-compacted-into-the-causative": {
      "assertionId": "classical-causative-participant-transform:p2477-basically-a-source-vnc-is-compacted-into-the-causative",
      "canonicalPath": "participants.typeTwoSpecific.targetObjectRequests.0.governor"
    },
    "claim-p2478::p2478-a-causative-vnc-formed-on-a-type-two-causative": {
      "assertionId": "classical-causative-participant-transform:p2478-a-causative-vnc-formed-on-a-type-two-causative",
      "canonicalPath": "participants.typeTwoSpecific.targetSubject"
    },
    "claim-p2479::p2479-this-is-demonstrated-in-the-following-three-sections": {
      "assertionId": "classical-causative-participant-transform:p2479-this-is-demonstrated-in-the-following-three-sections",
      "canonicalPath": "participants.typeTwoNonspecific.sourceVoice"
    },
    "claim-p2480::p2480-the-specificity-of-the-causative-object-pronoun-is-determined": {
      "assertionId": "classical-causative-participant-transform:p2480-the-specificity-of-the-causative-object-pronoun-is-determined",
      "canonicalPath": "contract.axes.13.axisId"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2476": [],
    "claim-p2477": [],
    "claim-p2478": [],
    "claim-p2479": [],
    "claim-p2480": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2476": "authorized",
    "claim-p2477": "authorized",
    "claim-p2478": "authorized",
    "claim-p2479": "authorized",
    "claim-p2480": "authorized"
  }
};
export default Object.freeze(spec);
