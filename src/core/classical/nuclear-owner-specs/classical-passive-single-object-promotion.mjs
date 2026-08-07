const spec = {
  "ownerId": "classical-passive-single-object-promotion",
  "prefix": "ClassicalPassiveSingleObjectPromotion",
  "operationId": "classical.passive.single.object.promotion.execute",
  "inputContract": "complete-typed-classical-passive-single-object-promotion-source",
  "domain": "classical-passive-single-object-promotion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2110",
    "claim-p2111"
  ],
  "coordinates": {
    "claim-p2110::p2110-if-the-active-vnc-has-a-single-specific-projective": {
      "assertionId": "classical-passive-single-object-promotion:p2110-if-the-active-vnc-has-a-single-specific-projective",
      "canonicalPath": "voice.passiveSingle.promotedObjectBecomesSubject"
    },
    "claim-p2111::p2111-the-shift-from-objective-case-to-nominative-case-requires": {
      "assertionId": "classical-passive-single-object-promotion:p2111-the-shift-from-objective-case-to-nominative-case-requires",
      "canonicalPath": "voice.passiveSingle.targetSubject"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2110": [],
    "claim-p2111": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2110": "authorized",
    "claim-p2111": "authorized"
  }
};
export default Object.freeze(spec);
