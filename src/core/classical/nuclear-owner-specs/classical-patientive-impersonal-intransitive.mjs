const spec = {
  "ownerId": "classical-patientive-impersonal-intransitive",
  "prefix": "ClassicalPatientiveImpersonalIntransitive",
  "operationId": "classical.patientive.impersonal.intransitive.execute",
  "inputContract": "complete-typed-classical-patientive-impersonal-intransitive-source",
  "domain": "classical-patientive-impersonal-intransitive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3703",
    "claim-p3704",
    "claim-p3705",
    "claim-p3706",
    "claim-p3707",
    "claim-p3708",
    "claim-p3709",
    "claim-p3710",
    "claim-p3711"
  ],
  "coordinates": {
    "claim-p3703::p3703-the-impersonal-patientive-nounstem-has-the-core-of-an": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3703-the-impersonal-patientive-nounstem-has-the-core-of-an",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.authorizationStatus"
    },
    "claim-p3704::p3704-the-formation-is-the-same-as-with-the-passive": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3704-the-formation-is-the-same-as-with-the-passive",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.canonicalResult"
    },
    "claim-p3705::p3705-the-following-remarks-illustrate-some-of-the-properties-of": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3705-the-following-remarks-illustrate-some-of-the-properties-of",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.gcdSatisfied"
    },
    "claim-p3706::p3706-at-times-it-is-difficult-to-capture-through-translation": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3706-at-times-it-is-difficult-to-capture-through-translation",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.lcmComplete"
    },
    "claim-p3707::p3707-the-difference-between-them-is-vaguely-similar-to-that": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3707-the-difference-between-them-is-vaguely-similar-to-that",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.sourceVoice"
    },
    "claim-p3708::p3708-nounstem-derived-from-an-impersonal-voice-vnc-s-core": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3708-nounstem-derived-from-an-impersonal-voice-vnc-s-core",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.authorizationStatus"
    },
    "claim-p3709::p3709-in-some-instances-the-source-is-doubly-impersonal-i": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3709-in-some-instances-the-source-is-doubly-impersonal-i",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.canonicalResult"
    },
    "claim-p3710::p3710-certain-intransitive-verbstems-consisting-of-a-root-plus-ya": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3710-certain-intransitive-verbstems-consisting-of-a-root-plus-ya",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.gcdSatisfied"
    },
    "claim-p3711::p3711-nounstem-derived-from-an-impersonal-voice-vnc-s-core": {
      "assertionId": "classical-patientive-impersonal-intransitive:p3711-nounstem-derived-from-an-impersonal-voice-vnc-s-core",
      "canonicalPath": "cases.patientiveImpersonalIntransitive.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3703": [],
    "claim-p3704": [],
    "claim-p3705": [],
    "claim-p3706": [],
    "claim-p3707": [],
    "claim-p3708": [],
    "claim-p3709": [],
    "claim-p3710": [],
    "claim-p3711": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3703": "authorized",
    "claim-p3704": "authorized",
    "claim-p3705": "authorized",
    "claim-p3706": "authorized",
    "claim-p3707": "authorized",
    "claim-p3708": "authorized",
    "claim-p3709": "authorized",
    "claim-p3710": "authorized",
    "claim-p3711": "authorized"
  }
};
export default Object.freeze(spec);
