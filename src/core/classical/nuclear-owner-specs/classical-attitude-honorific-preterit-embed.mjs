const spec = {
  "ownerId": "classical-attitude-honorific-preterit-embed",
  "prefix": "ClassicalAttitudeHonorificPreteritEmbed",
  "operationId": "classical.attitude.honorific.preterit.embed.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-preterit-embed-source",
  "domain": "classical-attitude-honorific-preterit-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3232",
    "claim-p3233",
    "claim-p3234",
    "claim-p3235",
    "claim-p3236",
    "claim-p3237",
    "claim-p3238"
  ],
  "coordinates": {
    "claim-p3232::p3232-vncs-with-a-mainline-reflexive-object-pronoun-create-their": {
      "assertionId": "classical-attitude-honorific-preterit-embed:p3232-vncs-with-a-mainline-reflexive-object-pronoun-create-their",
      "canonicalPath": "cases.honorificPreteritEmbed.rules.honorific-preterit-embed"
    },
    "claim-p3233::p3233-this-is-a-stem-built-on-the-integrated-compound": {
      "assertionId": "classical-attitude-honorific-preterit-embed:p3233-this-is-a-stem-built-on-the-integrated-compound",
      "canonicalPath": "cases.honorificPreteritEmbed.authorizationStatus"
    },
    "claim-p3234::p3234-the-matrix-vnc-is-built-on-the-causative-stem": {
      "assertionId": "classical-attitude-honorific-preterit-embed:p3234-the-matrix-vnc-is-built-on-the-causative-stem",
      "canonicalPath": "cases.honorificPreteritEmbed.gcdSatisfied"
    },
    "claim-p3235::p3235-this-stem-is-created-according-to-the-stem-forming": {
      "assertionId": "classical-attitude-honorific-preterit-embed:p3235-this-stem-is-created-according-to-the-stem-forming",
      "canonicalPath": "cases.honorificPreteritEmbed.lcmComplete"
    },
    "claim-p3236::p3236-since-the-preterit-predicate-functions-as-an-incorporated-object": {
      "assertionId": "classical-attitude-honorific-preterit-embed:p3236-since-the-preterit-predicate-functions-as-an-incorporated-object",
      "canonicalPath": "cases.honorificPreteritEmbed.rules.honorific-preterit-embed"
    },
    "claim-p3237::p3237-the-transformational-process-that-creates-this-preterit-embed-compound": {
      "assertionId": "classical-attitude-honorific-preterit-embed:p3237-the-transformational-process-that-creates-this-preterit-embed-compound",
      "canonicalPath": "cases.honorificPreteritEmbed.authorizationStatus"
    },
    "claim-p3238::p3238-the-description-given-in-28-11-is-therefore-valid": {
      "assertionId": "classical-attitude-honorific-preterit-embed:p3238-the-description-given-in-28-11-is-therefore-valid",
      "canonicalPath": "cases.honorificPreteritEmbed.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3232": [],
    "claim-p3233": [],
    "claim-p3234": [],
    "claim-p3235": [],
    "claim-p3236": [],
    "claim-p3237": [],
    "claim-p3238": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3232": "authorized",
    "claim-p3233": "authorized",
    "claim-p3234": "authorized",
    "claim-p3235": "authorized",
    "claim-p3236": "authorized",
    "claim-p3237": "authorized",
    "claim-p3238": "authorized"
  }
};
export default Object.freeze(spec);
