const spec = {
  "ownerId": "classical-type-two-reflexive-single-object-transform",
  "prefix": "ClassicalTypeTwoReflexiveSingleObjectTransform",
  "operationId": "classical.type.two.reflexive.single.object.transform.execute",
  "inputContract": "complete-typed-classical-type-two-reflexive-single-object-transform-source",
  "domain": "classical-type-two-reflexive-single-object-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2483",
    "claim-p2484",
    "claim-p2485",
    "claim-p2486"
  ],
  "coordinates": {
    "claim-p2483::p2483-generation-of-a-reflexive-object-pronoun-in-the-causative": {
      "assertionId": "classical-type-two-reflexive-single-object-transform:p2483-generation-of-a-reflexive-object-pronoun-in-the-causative",
      "canonicalPath": "participants.typeTwoReflexive.authorizationStatus"
    },
    "claim-p2484::p2484-as-in-24-8-2-certain-causative-vncs-with": {
      "assertionId": "classical-type-two-reflexive-single-object-transform:p2484-as-in-24-8-2-certain-causative-vncs-with",
      "canonicalPath": "participants.typeTwoReflexive.targetObjectRequests.0.objectKind"
    },
    "claim-p2485::p2485-remember-translation-is-not-the-same-as-meaning": {
      "assertionId": "classical-type-two-reflexive-single-object-transform:p2485-remember-translation-is-not-the-same-as-meaning",
      "canonicalPath": "participants.typeTwoReflexive.wordRealization"
    },
    "claim-p2486::p2486-just-as-with-vncs-formed-on-causative-one-stems": {
      "assertionId": "classical-type-two-reflexive-single-object-transform:p2486-just-as-with-vncs-formed-on-causative-one-stems",
      "canonicalPath": "participants.typeTwoReflexive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2483": [],
    "claim-p2484": [],
    "claim-p2485": [],
    "claim-p2486": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2483": "authorized",
    "claim-p2484": "authorized",
    "claim-p2485": "authorized",
    "claim-p2486": "authorized"
  }
};
export default Object.freeze(spec);
