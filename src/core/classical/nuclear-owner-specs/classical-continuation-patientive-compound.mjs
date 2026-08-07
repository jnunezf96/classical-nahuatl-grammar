const spec = {
  "ownerId": "classical-continuation-patientive-compound",
  "prefix": "ClassicalContinuationPatientiveCompound",
  "operationId": "classical.continuation.patientive.compound.execute",
  "inputContract": "complete-typed-classical-continuation-patientive-compound-source",
  "domain": "classical-continuation-patientive-compound",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3743",
    "claim-p3744",
    "claim-p3745",
    "claim-p3746"
  ],
  "coordinates": {
    "claim-p3743::p3743-at-times-these-nahuatl-patientive-nounstems-can-be-translated": {
      "assertionId": "classical-continuation-patientive-compound:p3743-at-times-these-nahuatl-patientive-nounstems-can-be-translated",
      "canonicalPath": "cases.patientiveCompoundContinuation.authorizationStatus"
    },
    "claim-p3744::p3744-this-translation-reverses-the-governed-to-governing-relationship-of": {
      "assertionId": "classical-continuation-patientive-compound:p3744-this-translation-reverses-the-governed-to-governing-relationship-of",
      "canonicalPath": "cases.patientiveCompoundContinuation.canonicalResult"
    },
    "claim-p3745::p3745-at-times-other-ways-of-translating-these-nounstems-are": {
      "assertionId": "classical-continuation-patientive-compound:p3745-at-times-other-ways-of-translating-these-nounstems-are",
      "canonicalPath": "cases.patientiveCompoundContinuation.gcdSatisfied"
    },
    "claim-p3746::p3746-the-deverbal-nounstem-like-any-other-nounstem-can-be": {
      "assertionId": "classical-continuation-patientive-compound:p3746-the-deverbal-nounstem-like-any-other-nounstem-can-be",
      "canonicalPath": "cases.patientiveCompoundContinuation.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3743": [],
    "claim-p3744": [],
    "claim-p3745": [],
    "claim-p3746": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3743": "authorized",
    "claim-p3744": "authorized",
    "claim-p3745": "authorized",
    "claim-p3746": "authorized"
  }
};
export default Object.freeze(spec);
