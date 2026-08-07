const spec = {
  "ownerId": "classical-type-two-specific-single-object-transform",
  "prefix": "ClassicalTypeTwoSpecificSingleObjectTransform",
  "operationId": "classical.type.two.specific.single.object.transform.execute",
  "inputContract": "complete-typed-classical-type-two-specific-single-object-transform-source",
  "domain": "classical-type-two-specific-single-object-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2481",
    "claim-p2482"
  ],
  "coordinates": {
    "claim-p2481::p2481-the-source-for-a-single-object-causative-vnc-formed": {
      "assertionId": "classical-type-two-specific-single-object-transform:p2481-the-source-for-a-single-object-causative-vnc-formed",
      "canonicalPath": "participants.typeTwoSpecific.authorizationStatus"
    },
    "claim-p2482::p2482-generation-of-a-specific-projective-object-pronoun-in-the": {
      "assertionId": "classical-type-two-specific-single-object-transform:p2482-generation-of-a-specific-projective-object-pronoun-in-the",
      "canonicalPath": "participants.typeTwoSpecific.targetObjectRequests.0.objectKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2481": [],
    "claim-p2482": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2481": "authorized",
    "claim-p2482": "authorized"
  }
};
export default Object.freeze(spec);
