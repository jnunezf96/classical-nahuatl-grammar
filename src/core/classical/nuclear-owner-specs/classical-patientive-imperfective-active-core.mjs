const spec = {
  "ownerId": "classical-patientive-imperfective-active-core",
  "prefix": "ClassicalPatientiveImperfectiveActiveCore",
  "operationId": "classical.patientive.imperfective.active.core.execute",
  "inputContract": "complete-typed-classical-patientive-imperfective-active-core-source",
  "domain": "classical-patientive-imperfective-active-core",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3760",
    "claim-p3761",
    "claim-p3762",
    "claim-p3763",
    "claim-p3764",
    "claim-p3765",
    "claim-p3766",
    "claim-p3767"
  ],
  "coordinates": {
    "claim-p3760::p3760-the-imperfective-patientive-nounstem-has-an-imperfective-active-stem": {
      "assertionId": "classical-patientive-imperfective-active-core:p3760-the-imperfective-patientive-nounstem-has-an-imperfective-active-stem",
      "canonicalPath": "cases.patientiveImperfectiveCore.authorizationStatus"
    },
    "claim-p3761::p3761-as-in-39-1-the-nounstem-is-again-modeled": {
      "assertionId": "classical-patientive-imperfective-active-core:p3761-as-in-39-1-the-nounstem-is-again-modeled",
      "canonicalPath": "cases.patientiveImperfectiveCore.first.canonicalResult"
    },
    "claim-p3762::p3762-class-d-verbs-use-the-imperfective-verbstem-with-final": {
      "assertionId": "classical-patientive-imperfective-active-core:p3762-class-d-verbs-use-the-imperfective-verbstem-with-final",
      "canonicalPath": "cases.patientiveImperfectiveCore.second.canonicalResult"
    },
    "claim-p3763::p3763-class-c-verbs-use-the-truncated-imperfective-verbstem-with": {
      "assertionId": "classical-patientive-imperfective-active-core:p3763-class-c-verbs-use-the-truncated-imperfective-verbstem-with",
      "canonicalPath": "cases.patientiveImperfectiveCore.distinctRuleSets"
    },
    "claim-p3764::p3764-the-derived-nounstem-belongs-to-the-ti-class": {
      "assertionId": "classical-patientive-imperfective-active-core:p3764-the-derived-nounstem-belongs-to-the-ti-class",
      "canonicalPath": "cases.patientiveImperfectiveCore.authorizationStatus"
    },
    "claim-p3765::p3765-if-the-source-verbstem-is-transitive-the-imperfective-patientive": {
      "assertionId": "classical-patientive-imperfective-active-core:p3765-if-the-source-verbstem-is-transitive-the-imperfective-patientive",
      "canonicalPath": "cases.patientiveImperfectiveCore.first.canonicalResult"
    },
    "claim-p3766::p3766-the-english-speaker-s-worldview-would-prefer-an-agentive": {
      "assertionId": "classical-patientive-imperfective-active-core:p3766-the-english-speaker-s-worldview-would-prefer-an-agentive",
      "canonicalPath": "cases.patientiveImperfectiveCore.second.canonicalResult"
    },
    "claim-p3767::p3767-with-a-transitive-or-an-intransitive-verbstem-as-source": {
      "assertionId": "classical-patientive-imperfective-active-core:p3767-with-a-transitive-or-an-intransitive-verbstem-as-source",
      "canonicalPath": "cases.patientiveImperfectiveCore.distinctRuleSets"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3760": [],
    "claim-p3761": [],
    "claim-p3762": [],
    "claim-p3763": [],
    "claim-p3764": [],
    "claim-p3765": [],
    "claim-p3766": [],
    "claim-p3767": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3760": "authorized",
    "claim-p3761": "authorized",
    "claim-p3762": "authorized",
    "claim-p3763": "authorized",
    "claim-p3764": "authorized",
    "claim-p3765": "authorized",
    "claim-p3766": "authorized",
    "claim-p3767": "authorized"
  }
};
export default Object.freeze(spec);
