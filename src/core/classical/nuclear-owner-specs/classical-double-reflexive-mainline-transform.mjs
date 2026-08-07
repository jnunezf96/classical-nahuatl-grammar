const spec = {
  "ownerId": "classical-double-reflexive-mainline-transform",
  "prefix": "ClassicalDoubleReflexiveMainlineTransform",
  "operationId": "classical.double.reflexive.mainline.transform.execute",
  "inputContract": "complete-typed-classical-double-reflexive-mainline-transform-source",
  "domain": "classical-double-reflexive-mainline-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2496",
    "claim-p2497",
    "claim-p2498"
  ],
  "coordinates": {
    "claim-p2496::p2496-generation-of-a-mainline-reflexive-causative-object-pronoun-in": {
      "assertionId": "classical-double-reflexive-mainline-transform:p2496-generation-of-a-mainline-reflexive-causative-object-pronoun-in",
      "canonicalPath": "participants.objectCombinations.2.positions.0.objectKind"
    },
    "claim-p2497::p2497-with-a-shuntline-specific-projective-object": {
      "assertionId": "classical-double-reflexive-mainline-transform:p2497-with-a-shuntline-specific-projective-object",
      "canonicalPath": "participants.objectCombinations.2.positions.0.prominence"
    },
    "claim-p2498::p2498-with-a-shuntline-nonspecific-object": {
      "assertionId": "classical-double-reflexive-mainline-transform:p2498-with-a-shuntline-nonspecific-object",
      "canonicalPath": "participants.fixedOrderingRules.2"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2496": [],
    "claim-p2497": [],
    "claim-p2498": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2496": "authorized",
    "claim-p2497": "authorized",
    "claim-p2498": "authorized"
  }
};
export default Object.freeze(spec);
