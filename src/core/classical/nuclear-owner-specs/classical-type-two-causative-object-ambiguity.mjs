const spec = {
  "ownerId": "classical-type-two-causative-object-ambiguity",
  "prefix": "ClassicalTypeTwoCausativeObjectAmbiguity",
  "operationId": "classical.type.two.causative.object.ambiguity.execute",
  "inputContract": "complete-typed-classical-type-two-causative-object-ambiguity-source",
  "domain": "classical-type-two-causative-object-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2436",
    "claim-p2437",
    "claim-p2438"
  ],
  "coordinates": {
    "claim-p2436::p2436-a-supplementary-object-removes-the-ambiguity": {
      "assertionId": "classical-type-two-causative-object-ambiguity:p2436-a-supplementary-object-removes-the-ambiguity",
      "canonicalPath": "participants.doubleSpecific.targetObjectRequests.0.objectKind"
    },
    "claim-p2437::p2437-a-further-curiosity-is-that-when-the-causative-object": {
      "assertionId": "classical-type-two-causative-object-ambiguity:p2437-a-further-curiosity-is-that-when-the-causative-object",
      "canonicalPath": "participants.doubleSpecific.targetObjectRequests.1.objectKind"
    },
    "claim-p2438::p2438-certain-writers-ignore-this-general-practice-and-use-a": {
      "assertionId": "classical-type-two-causative-object-ambiguity:p2438-certain-writers-ignore-this-general-practice-and-use-a",
      "canonicalPath": "participants.specificSilencing"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2436": [],
    "claim-p2437": [],
    "claim-p2438": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2436": "authorized",
    "claim-p2437": "authorized",
    "claim-p2438": "authorized"
  }
};
export default Object.freeze(spec);
