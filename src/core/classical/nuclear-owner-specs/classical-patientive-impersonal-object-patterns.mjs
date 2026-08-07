const spec = {
  "ownerId": "classical-patientive-impersonal-object-patterns",
  "prefix": "ClassicalPatientiveImpersonalObjectPatterns",
  "operationId": "classical.patientive.impersonal.object.patterns.execute",
  "inputContract": "complete-typed-classical-patientive-impersonal-object-patterns-source",
  "domain": "classical-patientive-impersonal-object-patterns",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3712",
    "claim-p3713",
    "claim-p3714",
    "claim-p3715",
    "claim-p3716",
    "claim-p3717"
  ],
  "coordinates": {
    "claim-p3712::p3712-nounstem-derived-from-an-impersonal-voice-vnc-s-core": {
      "assertionId": "classical-patientive-impersonal-object-patterns:p3712-nounstem-derived-from-an-impersonal-voice-vnc-s-core",
      "canonicalPath": "cases.patientiveImpersonalObjectPatterns.authorizationStatus"
    },
    "claim-p3713::p3713-nounstem-derived-from-an-impersonal-voice-vnc-s-core": {
      "assertionId": "classical-patientive-impersonal-object-patterns:p3713-nounstem-derived-from-an-impersonal-voice-vnc-s-core",
      "canonicalPath": "cases.patientiveImpersonalObjectPatterns.first.canonicalResult"
    },
    "claim-p3714::p3714-unless-a-projective-object-pronoun-te-or-tla-is": {
      "assertionId": "classical-patientive-impersonal-object-patterns:p3714-unless-a-projective-object-pronoun-te-or-tla-is",
      "canonicalPath": "cases.patientiveImpersonalObjectPatterns.second.canonicalResult"
    },
    "claim-p3715::p3715-the-direct-object-pronoun-of-the-source-must-not": {
      "assertionId": "classical-patientive-impersonal-object-patterns:p3715-the-direct-object-pronoun-of-the-source-must-not",
      "canonicalPath": "cases.patientiveImpersonalObjectPatterns.distinctTargetStems"
    },
    "claim-p3716::p3716-nounstem-derived-from-an-impersonal-voice-vnc-s-core": {
      "assertionId": "classical-patientive-impersonal-object-patterns:p3716-nounstem-derived-from-an-impersonal-voice-vnc-s-core",
      "canonicalPath": "cases.patientiveImpersonalObjectPatterns.authorizationStatus"
    },
    "claim-p3717::p3717-in-rare-instances-a-transitive-verbstem-that-ends-in": {
      "assertionId": "classical-patientive-impersonal-object-patterns:p3717-in-rare-instances-a-transitive-verbstem-that-ends-in",
      "canonicalPath": "cases.patientiveImpersonalObjectPatterns.first.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3712": [],
    "claim-p3713": [],
    "claim-p3714": [],
    "claim-p3715": [],
    "claim-p3716": [],
    "claim-p3717": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3712": "authorized",
    "claim-p3713": "authorized",
    "claim-p3714": "authorized",
    "claim-p3715": "authorized",
    "claim-p3716": "authorized",
    "claim-p3717": "authorized"
  }
};
export default Object.freeze(spec);
