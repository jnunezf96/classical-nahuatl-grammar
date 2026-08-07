const spec = {
  "ownerId": "classical-vnc-voice-authorization",
  "prefix": "ClassicalVncVoiceAuthorization",
  "operationId": "classical.vnc.voice.authorization.execute",
  "inputContract": "complete-typed-classical-vnc-voice-authorization-source",
  "domain": "classical-vnc-voice-authorization",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3052"
  ],
  "coordinates": {
    "claim-p3052::p3052-a-nonactive-stem-can-be-formed-from-any-of": {
      "assertionId": "classical-vnc-voice-authorization:p3052-a-nonactive-stem-can-be-formed-from-any-of",
      "canonicalPath": "cases.base.rules.vnc/voice-authorization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3052": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3052": "authorized"
  }
};
export default Object.freeze(spec);
