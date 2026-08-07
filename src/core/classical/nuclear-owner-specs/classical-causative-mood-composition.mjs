const spec = {
  "ownerId": "classical-causative-mood-composition",
  "prefix": "ClassicalCausativeMoodComposition",
  "operationId": "classical.causative.mood.composition.execute",
  "inputContract": "complete-typed-classical-causative-mood-composition-source",
  "domain": "classical-causative-mood-composition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2521"
  ],
  "coordinates": {
    "claim-p2521::p2521-vncs-formed-on-causative-verb-stems-may-be-used": {
      "assertionId": "classical-causative-mood-composition:p2521-vncs-formed-on-causative-verb-stems-may-be-used",
      "canonicalPath": "interactions.moodWish.sentenceType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2521": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2521": "authorized"
  }
};
export default Object.freeze(spec);
