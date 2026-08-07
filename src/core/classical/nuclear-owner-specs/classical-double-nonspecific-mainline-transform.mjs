const spec = {
  "ownerId": "classical-double-nonspecific-mainline-transform",
  "prefix": "ClassicalDoubleNonspecificMainlineTransform",
  "operationId": "classical.double.nonspecific.mainline.transform.execute",
  "inputContract": "complete-typed-classical-double-nonspecific-mainline-transform-source",
  "domain": "classical-double-nonspecific-mainline-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2499",
    "claim-p2500",
    "claim-p2501",
    "claim-p2502",
    "claim-p2503",
    "claim-p2504",
    "claim-p2505"
  ],
  "coordinates": {
    "claim-p2499::p2499-generation-of-a-nonspecific-causative-object-pronoun-in-the": {
      "assertionId": "classical-double-nonspecific-mainline-transform:p2499-generation-of-a-nonspecific-causative-object-pronoun-in-the",
      "canonicalPath": "participants.typeTwoNonspecific.implicitAgentBecomesCausativeObject"
    },
    "claim-p2500::p2500-with-a-shuntline-specific-projective-object": {
      "assertionId": "classical-double-nonspecific-mainline-transform:p2500-with-a-shuntline-specific-projective-object",
      "canonicalPath": "participants.typeTwoNonspecific.targetObjectRequests.0.objectKind"
    },
    "claim-p2501::p2501-the-subject-pronoun-0-0-0-0-of-the": {
      "assertionId": "classical-double-nonspecific-mainline-transform:p2501-the-subject-pronoun-0-0-0-0-of-the",
      "canonicalPath": "participants.fixedOrderingRules.3"
    },
    "claim-p2502::p2502-with-a-shuntline-reflexive-reciprocal-object": {
      "assertionId": "classical-double-nonspecific-mainline-transform:p2502-with-a-shuntline-reflexive-reciprocal-object",
      "canonicalPath": "participants.typeTwoNonspecific.implicitAgentBecomesCausativeObject"
    },
    "claim-p2503::p2503-this-occurs-when-the-imported-subject-of-the-causative": {
      "assertionId": "classical-double-nonspecific-mainline-transform:p2503-this-occurs-when-the-imported-subject-of-the-causative",
      "canonicalPath": "participants.typeTwoNonspecific.targetObjectRequests.0.objectKind"
    },
    "claim-p2504::p2504-there-is-one-situation-in-which-the-shuntline-reflexive": {
      "assertionId": "classical-double-nonspecific-mainline-transform:p2504-there-is-one-situation-in-which-the-shuntline-reflexive",
      "canonicalPath": "participants.fixedOrderingRules.3"
    },
    "claim-p2505::p2505-with-a-shuntline-nonspecific-projective-object": {
      "assertionId": "classical-double-nonspecific-mainline-transform:p2505-with-a-shuntline-nonspecific-projective-object",
      "canonicalPath": "participants.typeTwoNonspecific.implicitAgentBecomesCausativeObject"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2499": [],
    "claim-p2500": [],
    "claim-p2501": [],
    "claim-p2502": [],
    "claim-p2503": [],
    "claim-p2504": [],
    "claim-p2505": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2499": "authorized",
    "claim-p2500": "authorized",
    "claim-p2501": "authorized",
    "claim-p2502": "authorized",
    "claim-p2503": "authorized",
    "claim-p2504": "authorized",
    "claim-p2505": "authorized"
  }
};
export default Object.freeze(spec);
