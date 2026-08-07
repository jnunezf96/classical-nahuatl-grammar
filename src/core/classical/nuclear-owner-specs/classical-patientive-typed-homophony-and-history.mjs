const spec = {
  "ownerId": "classical-patientive-typed-homophony-and-history",
  "prefix": "ClassicalPatientiveTypedHomophonyAndHistory",
  "operationId": "classical.patientive.typed.homophony.and.history.execute",
  "inputContract": "complete-typed-classical-patientive-typed-homophony-and-history-source",
  "domain": "classical-patientive-typed-homophony-and-history",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3796",
    "claim-p3797",
    "claim-p3798",
    "claim-p3799",
    "claim-p3800"
  ],
  "coordinates": {
    "claim-p3796::p3796-note-there-is-a-difficulty-in-that-the-absolutive": {
      "assertionId": "classical-patientive-typed-homophony-and-history:p3796-note-there-is-a-difficulty-in-that-the-absolutive",
      "canonicalPath": "cases.typedHomophonyHistory.authorizationStatus"
    },
    "claim-p3797::p3797-it-is-difficult-for-english-to-capture-the-fineness": {
      "assertionId": "classical-patientive-typed-homophony-and-history:p3797-it-is-difficult-for-english-to-capture-the-fineness",
      "canonicalPath": "contract.evidenceRoles.typedHomophonyHistory"
    },
    "claim-p3798::p3798-as-a-result-the-meaning-intended-in-a-given": {
      "assertionId": "classical-patientive-typed-homophony-and-history:p3798-as-a-result-the-meaning-intended-in-a-given",
      "canonicalPath": "contract.translationAuthority"
    },
    "claim-p3799::p3799-aqui-to-enter": {
      "assertionId": "classical-patientive-typed-homophony-and-history:p3799-aqui-to-enter",
      "canonicalPath": "contract.storedExampleAuthority"
    },
    "claim-p3800::p3800-tla-aqui-a-causative-to-cause-s-th-to": {
      "assertionId": "classical-patientive-typed-homophony-and-history:p3800-tla-aqui-a-causative-to-cause-s-th-to",
      "canonicalPath": "cases.typedHomophonyHistory.surfaceHomophony"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3796": [],
    "claim-p3797": [],
    "claim-p3798": [],
    "claim-p3799": [],
    "claim-p3800": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3796": "authorized",
    "claim-p3797": "authorized",
    "claim-p3798": "authorized",
    "claim-p3799": "authorized",
    "claim-p3800": "authorized"
  }
};
export default Object.freeze(spec);
