const spec = {
  "ownerId": "classical-impersonal-reflexive-ne-retention",
  "prefix": "ClassicalImpersonalReflexiveNeRetention",
  "operationId": "classical.impersonal.reflexive.ne.retention.execute",
  "inputContract": "complete-typed-classical-impersonal-reflexive-ne-retention-source",
  "domain": "classical-impersonal-reflexive-ne-retention",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2166"
  ],
  "coordinates": {
    "claim-p2166::p2166-when-generated-from-an-active-voice-transitive-source-that": {
      "assertionId": "classical-impersonal-reflexive-ne-retention:p2166-when-generated-from-an-active-voice-transitive-source-that",
      "canonicalPath": "voice.reflexiveImpersonal.formulaRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2166": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2166": "authorized"
  }
};
export default Object.freeze(spec);
