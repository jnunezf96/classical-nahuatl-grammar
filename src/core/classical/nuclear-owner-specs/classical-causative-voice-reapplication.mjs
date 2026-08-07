const spec = {
  "ownerId": "classical-causative-voice-reapplication",
  "prefix": "ClassicalCausativeVoiceReapplication",
  "operationId": "classical.causative.voice.reapplication.execute",
  "inputContract": "complete-typed-classical-causative-voice-reapplication-source",
  "domain": "classical-causative-voice-reapplication",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2522"
  ],
  "coordinates": {
    "claim-p2522::p2522-vncs-formed-on-causative-verb-stems-may-undergo-the": {
      "assertionId": "classical-causative-voice-reapplication:p2522-vncs-formed-on-causative-verb-stems-may-undergo-the",
      "canonicalPath": "interactions.passive.selectedVoice"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2522": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2522": "authorized"
  }
};
export default Object.freeze(spec);
