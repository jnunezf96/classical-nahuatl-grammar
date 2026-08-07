const spec = {
  "ownerId": "classical-deverbal-action-potential-patient",
  "prefix": "ClassicalDeverbalActionPotentialPatient",
  "operationId": "classical.deverbal.action.potential.patient.execute",
  "inputContract": "complete-typed-classical-deverbal-action-potential-patient-source",
  "domain": "classical-deverbal-action-potential-patient",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3658",
    "claim-p3659",
    "claim-p3660",
    "claim-p3661",
    "claim-p3662",
    "claim-p3663",
    "claim-p3664"
  ],
  "coordinates": {
    "claim-p3658::p3658-a-deverbal-nounstem-derived-by-either-z-or-liz": {
      "assertionId": "classical-deverbal-action-potential-patient:p3658-a-deverbal-nounstem-derived-by-either-z-or-liz",
      "canonicalPath": "cases.deverbalPotentialPatient.authorizationStatus"
    },
    "claim-p3659::p3659-an-nnc-built-on-such-a-potential-patient-nounstem": {
      "assertionId": "classical-deverbal-action-potential-patient:p3659-an-nnc-built-on-such-a-potential-patient-nounstem",
      "canonicalPath": "cases.deverbalPotentialPatient.allCanonical"
    },
    "claim-p3660::p3660-if-the-source-verbstem-is-intransitive-these-potential-patient": {
      "assertionId": "classical-deverbal-action-potential-patient:p3660-if-the-source-verbstem-is-intransitive-these-potential-patient",
      "canonicalPath": "cases.deverbalPotentialPatient.transitiveProjectiveDeletion.distinctTargetStems"
    },
    "claim-p3661::p3661-mahui-z-tli-an-act-of-fearing-fear-an": {
      "assertionId": "classical-deverbal-action-potential-patient:p3661-mahui-z-tli-an-act-of-fearing-fear-an",
      "canonicalPath": "cases.deverbalPotentialPatient.intransitiveHomophony.surfaceHomophony"
    },
    "claim-p3662::p3662-there-is-no-ambiguity-when-the-subject-pronoun-shows": {
      "assertionId": "classical-deverbal-action-potential-patient:p3662-there-is-no-ambiguity-when-the-subject-pronoun-shows",
      "canonicalPath": "cases.deverbalPotentialPatient.doubleObjectReflexiveActiveException.actionKind"
    },
    "claim-p3663::p3663-if-the-source-verbstem-is-transitive-the-potential-patient": {
      "assertionId": "classical-deverbal-action-potential-patient:p3663-if-the-source-verbstem-is-transitive-the-potential-patient",
      "canonicalPath": "cases.deverbalPotentialPatient.authorizationStatus"
    },
    "claim-p3664::p3664-tla-chi-hua-liz-tli-act-of-doings-th": {
      "assertionId": "classical-deverbal-action-potential-patient:p3664-tla-chi-hua-liz-tli-act-of-doings-th",
      "canonicalPath": "cases.deverbalPotentialPatient.allCanonical"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3658": [],
    "claim-p3659": [],
    "claim-p3660": [],
    "claim-p3661": [],
    "claim-p3662": [],
    "claim-p3663": [],
    "claim-p3664": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3658": "authorized",
    "claim-p3659": "authorized",
    "claim-p3660": "authorized",
    "claim-p3661": "authorized",
    "claim-p3662": "authorized",
    "claim-p3663": "authorized",
    "claim-p3664": "authorized"
  }
};
export default Object.freeze(spec);
