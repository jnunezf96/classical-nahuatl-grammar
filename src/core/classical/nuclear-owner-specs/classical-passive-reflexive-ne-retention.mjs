const spec = {
  "ownerId": "classical-passive-reflexive-ne-retention",
  "prefix": "ClassicalPassiveReflexiveNeRetention",
  "operationId": "classical.passive.reflexive.ne.retention.execute",
  "inputContract": "complete-typed-classical-passive-reflexive-ne-retention-source",
  "domain": "classical-passive-reflexive-ne-retention",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2112",
    "claim-p2113"
  ],
  "coordinates": {
    "claim-p2112::p2112-if-the-active-vnc-has-a-single-specific-reflexive": {
      "assertionId": "classical-passive-reflexive-ne-retention:p2112-if-the-active-vnc-has-a-single-specific-reflexive",
      "canonicalPath": "voice.reflexivePassive.targetSubject"
    },
    "claim-p2113::p2113-at-the-same-time-that-the-object-of-the": {
      "assertionId": "classical-passive-reflexive-ne-retention:p2113-at-the-same-time-that-the-object-of-the",
      "canonicalPath": "voice.reflexivePassive.valence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2112": [],
    "claim-p2113": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2112": "authorized",
    "claim-p2113": "authorized"
  }
};
export default Object.freeze(spec);
