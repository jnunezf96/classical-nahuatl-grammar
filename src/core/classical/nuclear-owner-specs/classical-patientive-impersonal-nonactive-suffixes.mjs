const spec = {
  "ownerId": "classical-patientive-impersonal-nonactive-suffixes",
  "prefix": "ClassicalPatientiveImpersonalNonactiveSuffixes",
  "operationId": "classical.patientive.impersonal.nonactive.suffixes.execute",
  "inputContract": "complete-typed-classical-patientive-impersonal-nonactive-suffixes-source",
  "domain": "classical-patientive-impersonal-nonactive-suffixes",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3718",
    "claim-p3719",
    "claim-p3720"
  ],
  "coordinates": {
    "claim-p3718::p3718-nounstem-derived-from-an-impersonal-voice-vnc-s-core": {
      "assertionId": "classical-patientive-impersonal-nonactive-suffixes:p3718-nounstem-derived-from-an-impersonal-voice-vnc-s-core",
      "canonicalPath": "cases.patientiveImpersonalSuffixes.authorizationStatus"
    },
    "claim-p3719::p3719-nounstem-derived-from-an-impersonal-voice-vnc-s-core": {
      "assertionId": "classical-patientive-impersonal-nonactive-suffixes:p3719-nounstem-derived-from-an-impersonal-voice-vnc-s-core",
      "canonicalPath": "cases.patientiveImpersonalSuffixes.allCanonical"
    },
    "claim-p3720::p3720-unless-the-vowel-in-front-of-hua-represents-a": {
      "assertionId": "classical-patientive-impersonal-nonactive-suffixes:p3720-unless-the-vowel-in-front-of-hua-represents-a",
      "canonicalPath": "cases.patientiveImpersonalSuffixes.records.2.nounClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3718": [],
    "claim-p3719": [],
    "claim-p3720": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3718": "authorized",
    "claim-p3719": "authorized",
    "claim-p3720": "authorized"
  }
};
export default Object.freeze(spec);
