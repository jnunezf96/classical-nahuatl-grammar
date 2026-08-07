const spec = {
  "ownerId": "classical-passive-mood-sentence-composition",
  "prefix": "ClassicalPassiveMoodSentenceComposition",
  "operationId": "classical.passive.mood.sentence.composition.execute",
  "inputContract": "complete-typed-classical-passive-mood-sentence-composition-source",
  "domain": "classical-passive-mood-sentence-composition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2126"
  ],
  "coordinates": {
    "claim-p2126::p2126-assertions-in-the-passive-voice-may-be-converted-into": {
      "assertionId": "classical-passive-mood-sentence-composition:p2126-assertions-in-the-passive-voice-may-be-converted-into",
      "canonicalPath": "contract.gcd.operationOrder.4"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2126": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2126": "authorized"
  }
};
export default Object.freeze(spec);
