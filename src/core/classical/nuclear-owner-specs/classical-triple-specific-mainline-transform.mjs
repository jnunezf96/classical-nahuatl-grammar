const spec = {
  "ownerId": "classical-triple-specific-mainline-transform",
  "prefix": "ClassicalTripleSpecificMainlineTransform",
  "operationId": "classical.triple.specific.mainline.transform.execute",
  "inputContract": "complete-typed-classical-triple-specific-mainline-transform-source",
  "domain": "classical-triple-specific-mainline-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2509",
    "claim-p2510"
  ],
  "coordinates": {
    "claim-p2509::p2509-generation-of-a-mainline-specific-projective-causative-object-pronoun": {
      "assertionId": "classical-triple-specific-mainline-transform:p2509-generation-of-a-mainline-specific-projective-causative-object-pronoun",
      "canonicalPath": "participants.tripleSpecific.authorizationStatus"
    },
    "claim-p2510::p2510-there-is-a-special-situation-in-which-the-shuntline": {
      "assertionId": "classical-triple-specific-mainline-transform:p2510-there-is-a-special-situation-in-which-the-shuntline",
      "canonicalPath": "participants.tripleSpecific.targetObjectRequests.2.objectKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2509": [],
    "claim-p2510": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2509": "authorized",
    "claim-p2510": "authorized"
  }
};
export default Object.freeze(spec);
