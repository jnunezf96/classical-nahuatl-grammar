const spec = {
  "ownerId": "classical-relational-locative-n-preterit-subject-mode",
  "prefix": "ClassicalRelationalLocativeNPreteritSubjectMode",
  "operationId": "classical.relational.locative.n.preterit.subject.mode.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-preterit-subject-mode-source",
  "domain": "classical-relational-locative-n-preterit-subject-mode",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4336",
    "claim-p4337"
  ],
  "coordinates": {
    "claim-p4336::p4336-it-is-possible-for-this-kind-of-compound-nounstem": {
      "assertionId": "classical-relational-locative-n-preterit-subject-mode:p4336-it-is-possible-for-this-kind-of-compound-nounstem",
      "canonicalPath": "cases.nPreterit.canonicalResult"
    },
    "claim-p4337::p4337-much-more-frequently-however-these-compound-locative-nounstems-occur": {
      "assertionId": "classical-relational-locative-n-preterit-subject-mode:p4337-much-more-frequently-however-these-compound-locative-nounstems-occur",
      "canonicalPath": "cases.nPreterit.sourceFormation"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4336": [],
    "claim-p4337": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4336": "authorized",
    "claim-p4337": "authorized"
  }
};
export default Object.freeze(spec);
