const spec = {
  "ownerId": "classical-applicative-voice-reapplication",
  "prefix": "ClassicalApplicativeVoiceReapplication",
  "operationId": "classical.applicative.voice.reapplication.execute",
  "inputContract": "complete-typed-classical-applicative-voice-reapplication-source",
  "domain": "classical-applicative-voice-reapplication",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2627",
    "claim-p2628",
    "claim-p2629"
  ],
  "coordinates": {
    "claim-p2627::p2627-applicative-vncs-may-undergo-the-passive-and-impersonal-transformations": {
      "assertionId": "classical-applicative-voice-reapplication:p2627-applicative-vncs-may-undergo-the-passive-and-impersonal-transformations",
      "canonicalPath": "interactions.passive.selectedVoice"
    },
    "claim-p2628::p2628-note-as-can-be-seen-in-the-second-and": {
      "assertionId": "classical-applicative-voice-reapplication:p2628-note-as-can-be-seen-in-the-second-and",
      "canonicalPath": "interactions.passive.authorizationStatus"
    },
    "claim-p2629::p2629-at-times-it-is-best-not-even-to-try": {
      "assertionId": "classical-applicative-voice-reapplication:p2629-at-times-it-is-best-not-even-to-try",
      "canonicalPath": "interactions.passive.formulaStringAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2627": [],
    "claim-p2628": [],
    "claim-p2629": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2627": "authorized",
    "claim-p2628": "authorized",
    "claim-p2629": "authorized"
  }
};
export default Object.freeze(spec);
