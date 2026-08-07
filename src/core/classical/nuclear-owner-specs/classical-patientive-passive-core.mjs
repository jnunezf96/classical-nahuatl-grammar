const spec = {
  "ownerId": "classical-patientive-passive-core",
  "prefix": "ClassicalPatientivePassiveCore",
  "operationId": "classical.patientive.passive.core.execute",
  "inputContract": "complete-typed-classical-patientive-passive-core-source",
  "domain": "classical-patientive-passive-core",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3691",
    "claim-p3692",
    "claim-p3693",
    "claim-p3694",
    "claim-p3695",
    "claim-p3696",
    "claim-p3697",
    "claim-p3698"
  ],
  "coordinates": {
    "claim-p3691::p3691-the-passive-patientive-nounstem-has-the-core-of-a": {
      "assertionId": "classical-patientive-passive-core:p3691-the-passive-patientive-nounstem-has-the-core-of-a",
      "canonicalPath": "cases.patientivePassiveCore.authorizationStatus"
    },
    "claim-p3692::p3692-since-a-passive-vnc-cannot-be-derived-from-an": {
      "assertionId": "classical-patientive-passive-core:p3692-since-a-passive-vnc-cannot-be-derived-from-an",
      "canonicalPath": "cases.patientivePassiveCore.canonicalResult"
    },
    "claim-p3693::p3693-the-nounstem-includes-any-nonspecific-projective-object-pronoun-or": {
      "assertionId": "classical-patientive-passive-core:p3693-the-nounstem-includes-any-nonspecific-projective-object-pronoun-or",
      "canonicalPath": "cases.patientivePassiveCore.gcdSatisfied"
    },
    "claim-p3694::p3694-if-the-core-of-the-passive-voice-vnc-source": {
      "assertionId": "classical-patientive-passive-core:p3694-if-the-core-of-the-passive-voice-vnc-source",
      "canonicalPath": "cases.patientivePassiveCore.lcmComplete"
    },
    "claim-p3695::p3695-timaltin-tima-maltin-we-are-captives": {
      "assertionId": "classical-patientive-passive-core:p3695-timaltin-tima-maltin-we-are-captives",
      "canonicalPath": "cases.patientivePassiveCore.patientiveSourceFamily"
    },
    "claim-p3696::p3696-occasionally-the-meaning-of-the-derived-nounstem-has-been": {
      "assertionId": "classical-patientive-passive-core:p3696-occasionally-the-meaning-of-the-derived-nounstem-has-been",
      "canonicalPath": "cases.patientivePassiveCore.authorizationStatus"
    },
    "claim-p3697::p3697-piya-l-li-piye-l-li-a-thing-that": {
      "assertionId": "classical-patientive-passive-core:p3697-piya-l-li-piye-l-li-a-thing-that",
      "canonicalPath": "cases.patientivePassiveCore.canonicalResult"
    },
    "claim-p3698::p3698-derivation-from-a-passive-vnc-whose-stem-is-formed": {
      "assertionId": "classical-patientive-passive-core:p3698-derivation-from-a-passive-vnc-whose-stem-is-formed",
      "canonicalPath": "cases.patientivePassiveCore.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3691": [],
    "claim-p3692": [],
    "claim-p3693": [],
    "claim-p3694": [],
    "claim-p3695": [],
    "claim-p3696": [],
    "claim-p3697": [],
    "claim-p3698": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3691": "authorized",
    "claim-p3692": "authorized",
    "claim-p3693": "authorized",
    "claim-p3694": "authorized",
    "claim-p3695": "authorized",
    "claim-p3696": "authorized",
    "claim-p3697": "authorized",
    "claim-p3698": "authorized"
  }
};
export default Object.freeze(spec);
