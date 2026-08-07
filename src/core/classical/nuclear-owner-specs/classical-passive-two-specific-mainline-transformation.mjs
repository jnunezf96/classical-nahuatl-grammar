const spec = {
  "ownerId": "classical-passive-two-specific-mainline-transformation",
  "prefix": "ClassicalPassiveTwoSpecificMainlineTransformation",
  "operationId": "classical.passive.two.specific.mainline.transformation.execute",
  "inputContract": "complete-typed-classical-passive-two-specific-mainline-transformation-source",
  "domain": "classical-passive-two-specific-mainline-transformation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2117",
    "claim-p2118",
    "claim-p2119",
    "claim-p2120",
    "claim-p2121"
  ],
  "coordinates": {
    "claim-p2117::p2117-if-the-active-source-has-two-specific-projective-object": {
      "assertionId": "classical-passive-two-specific-mainline-transformation:p2117-if-the-active-source-has-two-specific-projective-object",
      "canonicalPath": "voice.twoSpecificPassive.authorizationStatus"
    },
    "claim-p2118::p2118-since-this-is-not-apparent-except-as-explained-below": {
      "assertionId": "classical-passive-two-specific-mainline-transformation:p2118-since-this-is-not-apparent-except-as-explained-below",
      "canonicalPath": "voice.twoSpecificPassive.derived.targetSubject"
    },
    "claim-p2119::p2119-it-is-the-pronominal-information-that-is-carried-by": {
      "assertionId": "classical-passive-two-specific-mainline-transformation:p2119-it-is-the-pronominal-information-that-is-carried-by",
      "canonicalPath": "voice.twoSpecificPassive.derived.retainedObjectCarriers"
    },
    "claim-p2120::p2120-the-dyad-va1-va2-of-the-shuntline-object-pronoun": {
      "assertionId": "classical-passive-two-specific-mainline-transformation:p2120-the-dyad-va1-va2-of-the-shuntline-object-pronoun",
      "canonicalPath": "voice.twoSpecificPassive.derived.sourceSubjectDeleted"
    },
    "claim-p2121::p2121-if-the-shuntline-object-pronoun-s-va1-va2-dyad": {
      "assertionId": "classical-passive-two-specific-mainline-transformation:p2121-if-the-shuntline-object-pronoun-s-va1-va2-dyad",
      "canonicalPath": "voice.twoSpecificPassive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2117": [],
    "claim-p2118": [],
    "claim-p2119": [],
    "claim-p2120": [],
    "claim-p2121": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2117": "authorized",
    "claim-p2118": "authorized",
    "claim-p2119": "authorized",
    "claim-p2120": "authorized",
    "claim-p2121": "authorized"
  }
};
export default Object.freeze(spec);
