const spec = {
  "ownerId": "classical-active-reflexive-contextual-passive-reading",
  "prefix": "ClassicalActiveReflexiveContextualPassiveReading",
  "operationId": "classical.active.reflexive.contextual.passive.reading.execute",
  "inputContract": "complete-typed-classical-active-reflexive-contextual-passive-reading-source",
  "domain": "classical-active-reflexive-contextual-passive-reading",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2127",
    "claim-p2128",
    "claim-p2129"
  ],
  "coordinates": {
    "claim-p2127::p2127-in-addition-to-using-a-vnc-in-the-passive": {
      "assertionId": "classical-active-reflexive-contextual-passive-reading:p2127-in-addition-to-using-a-vnc-in-the-passive",
      "canonicalPath": "voice.reflexivePassive.impersonalSubjectReferent"
    },
    "claim-p2128::p2128-in-such-sentences-as-this-situation-will-straighten-itself": {
      "assertionId": "classical-active-reflexive-contextual-passive-reading:p2128-in-such-sentences-as-this-situation-will-straighten-itself",
      "canonicalPath": "voice.reflexivePassive.targetSubject"
    },
    "claim-p2129::p2129-when-this-occurs-one-must-realize-that-the-subject": {
      "assertionId": "classical-active-reflexive-contextual-passive-reading:p2129-when-this-occurs-one-must-realize-that-the-subject",
      "canonicalPath": "voice.reflexivePassive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2127": [],
    "claim-p2128": [],
    "claim-p2129": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2127": "authorized",
    "claim-p2128": "authorized",
    "claim-p2129": "authorized"
  }
};
export default Object.freeze(spec);
