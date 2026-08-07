const spec = {
  "ownerId": "classical-patientive-human-source-tla",
  "prefix": "ClassicalPatientiveHumanSourceTla",
  "operationId": "classical.patientive.human.source.tla.execute",
  "inputContract": "complete-typed-classical-patientive-human-source-tla-source",
  "domain": "classical-patientive-human-source-tla",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3721",
    "claim-p3722",
    "claim-p3723",
    "claim-p3724",
    "claim-p3725",
    "claim-p3726"
  ],
  "coordinates": {
    "claim-p3721::p3721-a-final-a-in-the-active-voice-verbstem-is": {
      "assertionId": "classical-patientive-human-source-tla:p3721-a-final-a-in-the-active-voice-verbstem-is",
      "canonicalPath": "cases.patientiveHumanSourceTla.authorizationStatus"
    },
    "claim-p3722::p3722-tla-chcui-tl-a-thing-dug-out-as-a": {
      "assertionId": "classical-patientive-human-source-tla:p3722-tla-chcui-tl-a-thing-dug-out-as-a",
      "canonicalPath": "cases.patientiveHumanSourceTla.first.canonicalResult"
    },
    "claim-p3723::p3723-when-the-active-voice-source-is-a-single-object": {
      "assertionId": "classical-patientive-human-source-tla:p3723-when-the-active-voice-source-is-a-single-object",
      "canonicalPath": "cases.patientiveHumanSourceTla.second.canonicalResult"
    },
    "claim-p3724::p3724-instead-it-has-the-impersonal-tla-prefix-see-22": {
      "assertionId": "classical-patientive-human-source-tla:p3724-instead-it-has-the-impersonal-tla-prefix-see-22",
      "canonicalPath": "cases.patientiveHumanSourceTla.distinctTargetStems"
    },
    "claim-p3725::p3725-the-nounstem-tla-pach-o-l-li-has-a": {
      "assertionId": "classical-patientive-human-source-tla:p3725-the-nounstem-tla-pach-o-l-li-has-a",
      "canonicalPath": "cases.patientiveHumanSourceTla.authorizationStatus"
    },
    "claim-p3726::p3726-some-of-these-stems-may-have-homonyms-derived-ultimately": {
      "assertionId": "classical-patientive-human-source-tla:p3726-some-of-these-stems-may-have-homonyms-derived-ultimately",
      "canonicalPath": "cases.patientiveHumanSourceTla.first.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3721": [],
    "claim-p3722": [],
    "claim-p3723": [],
    "claim-p3724": [],
    "claim-p3725": [],
    "claim-p3726": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3721": "authorized",
    "claim-p3722": "authorized",
    "claim-p3723": "authorized",
    "claim-p3724": "authorized",
    "claim-p3725": "authorized",
    "claim-p3726": "authorized"
  }
};
export default Object.freeze(spec);
