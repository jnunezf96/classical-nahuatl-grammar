const spec = {
  "ownerId": "classical-reflexive-incompatibility-replacement",
  "prefix": "ClassicalReflexiveIncompatibilityReplacement",
  "operationId": "classical.reflexive.incompatibility.replacement.execute",
  "inputContract": "complete-typed-classical-reflexive-incompatibility-replacement-source",
  "domain": "classical-reflexive-incompatibility-replacement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2519",
    "claim-p2520"
  ],
  "coordinates": {
    "claim-p2519::p2519-the-replacement-of-a-source-mainline-reflexive-pronoun-with": {
      "assertionId": "classical-reflexive-incompatibility-replacement:p2519-the-replacement-of-a-source-mainline-reflexive-pronoun-with",
      "canonicalPath": "participants.specificSilencing"
    },
    "claim-p2520::p2520-one-such-instance-involves-the-rule-concerning-incompatibility-of": {
      "assertionId": "classical-reflexive-incompatibility-replacement:p2520-one-such-instance-involves-the-rule-concerning-incompatibility-of",
      "canonicalPath": "participants.fixedOrderingRules.0"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2519": [],
    "claim-p2520": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2519": "authorized",
    "claim-p2520": "authorized"
  }
};
export default Object.freeze(spec);
