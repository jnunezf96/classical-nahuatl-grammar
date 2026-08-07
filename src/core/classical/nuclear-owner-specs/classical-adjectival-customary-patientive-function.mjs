const spec = {
  "ownerId": "classical-adjectival-customary-patientive-function",
  "prefix": "ClassicalAdjectivalCustomaryPatientiveFunction",
  "operationId": "classical.adjectival.customary.patientive.function.execute",
  "inputContract": "complete-typed-classical-adjectival-customary-patientive-function-source",
  "domain": "classical-adjectival-customary-patientive-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3900"
  ],
  "coordinates": {
    "claim-p3900::p3900-the-nominalized-customary-present-passive-voice-predicate-i-e": {
      "assertionId": "classical-adjectival-customary-patientive-function:p3900-the-nominalized-customary-present-passive-voice-predicate-i-e",
      "canonicalPath": "cases.customaryPatientive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3900": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3900": "authorized"
  }
};
export default Object.freeze(spec);
