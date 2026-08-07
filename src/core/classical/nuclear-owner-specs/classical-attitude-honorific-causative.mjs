const spec = {
  "ownerId": "classical-attitude-honorific-causative",
  "prefix": "ClassicalAttitudeHonorificCausative",
  "operationId": "classical.attitude.honorific.causative.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-causative-source",
  "domain": "classical-attitude-honorific-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3209",
    "claim-p3211",
    "claim-p3212",
    "claim-p3213",
    "claim-p3215",
    "claim-p3216"
  ],
  "coordinates": {
    "claim-p3209::p3209-as-a-general-rule-an-intransitive-verb-creates-an": {
      "assertionId": "classical-attitude-honorific-causative:p3209-as-a-general-rule-an-intransitive-verb-creates-an",
      "canonicalPath": "cases.honorificCausative.rules.honorific-causative"
    },
    "claim-p3211::p3211-the-intransitive-verbstem-cal-aqui-forms-an-honorific-vnc": {
      "assertionId": "classical-attitude-honorific-causative:p3211-the-intransitive-verbstem-cal-aqui-forms-an-honorific-vnc",
      "canonicalPath": "cases.honorificCausative.authorizationStatus"
    },
    "claim-p3212::p3212-also-the-inchoative-verbstem-tla-t-hui-l-ti": {
      "assertionId": "classical-attitude-honorific-causative:p3212-also-the-inchoative-verbstem-tla-t-hui-l-ti",
      "canonicalPath": "cases.honorificCausative.gcdSatisfied"
    },
    "claim-p3213::p3213-most-intransitive-verbstems-use-type-two-causative-stems": {
      "assertionId": "classical-attitude-honorific-causative:p3213-most-intransitive-verbstems-use-type-two-causative-stems",
      "canonicalPath": "cases.honorificCausative.lcmComplete"
    },
    "claim-p3215::p3215-those-intransitive-verbs-that-form-their-causative-stem-with": {
      "assertionId": "classical-attitude-honorific-causative:p3215-those-intransitive-verbs-that-form-their-causative-stem-with",
      "canonicalPath": "cases.honorificCausative.rules.honorific-causative"
    },
    "claim-p3216::p3216-several-of-the-irregular-intransitive-verbs-of-lesson-11": {
      "assertionId": "classical-attitude-honorific-causative:p3216-several-of-the-irregular-intransitive-verbs-of-lesson-11",
      "canonicalPath": "cases.honorificCausative.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3209": [],
    "claim-p3211": [],
    "claim-p3212": [],
    "claim-p3213": [],
    "claim-p3215": [],
    "claim-p3216": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3209": "authorized",
    "claim-p3211": "authorized",
    "claim-p3212": "authorized",
    "claim-p3213": "authorized",
    "claim-p3215": "authorized",
    "claim-p3216": "authorized"
  }
};
export default Object.freeze(spec);
