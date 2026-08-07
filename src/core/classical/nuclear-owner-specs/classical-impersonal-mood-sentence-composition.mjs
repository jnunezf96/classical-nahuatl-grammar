const spec = {
  "ownerId": "classical-impersonal-mood-sentence-composition",
  "prefix": "ClassicalImpersonalMoodSentenceComposition",
  "operationId": "classical.impersonal.mood.sentence.composition.execute",
  "inputContract": "complete-typed-classical-impersonal-mood-sentence-composition-source",
  "domain": "classical-impersonal-mood-sentence-composition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2167"
  ],
  "coordinates": {
    "claim-p2167::p2167-an-assertion-in-the-impersonal-voice-may-be-converted": {
      "assertionId": "classical-impersonal-mood-sentence-composition:p2167-an-assertion-in-the-impersonal-voice-may-be-converted",
      "canonicalPath": "contract.gcd.operationOrder.4"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2167": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2167": "authorized"
  }
};
export default Object.freeze(spec);
