const spec = {
  "ownerId": "classical-passive-specific-nonspecific-retention",
  "prefix": "ClassicalPassiveSpecificNonspecificRetention",
  "operationId": "classical.passive.specific.nonspecific.retention.execute",
  "inputContract": "complete-typed-classical-passive-specific-nonspecific-retention-source",
  "domain": "classical-passive-specific-nonspecific-retention",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2122",
    "claim-p2123",
    "claim-p2124"
  ],
  "coordinates": {
    "claim-p2122::p2122-if-the-active-source-has-two-projective-objects-only": {
      "assertionId": "classical-passive-specific-nonspecific-retention:p2122-if-the-active-source-has-two-projective-objects-only",
      "canonicalPath": "voice.specificHumanPassive.authorizationStatus"
    },
    "claim-p2123::p2123-the-pronominal-information-carried-by-the-va1-va2-dyad": {
      "assertionId": "classical-passive-specific-nonspecific-retention:p2123-the-pronominal-information-carried-by-the-va1-va2-dyad",
      "canonicalPath": "voice.specificHumanPassive.derived.retainedObjectCarriers"
    },
    "claim-p2124::p2124-the-nonspecific-object-of-the-source-remains-in-the": {
      "assertionId": "classical-passive-specific-nonspecific-retention:p2124-the-nonspecific-object-of-the-source-remains-in-the",
      "canonicalPath": "voice.specificHumanPassive.derived.targetValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2122": [],
    "claim-p2123": [],
    "claim-p2124": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2122": "authorized",
    "claim-p2123": "authorized",
    "claim-p2124": "authorized"
  }
};
export default Object.freeze(spec);
