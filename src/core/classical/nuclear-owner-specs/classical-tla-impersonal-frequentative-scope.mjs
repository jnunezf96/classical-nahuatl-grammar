const spec = {
  "ownerId": "classical-tla-impersonal-frequentative-scope",
  "prefix": "ClassicalTlaImpersonalFrequentativeScope",
  "operationId": "classical.tla.impersonal.frequentative.scope.execute",
  "inputContract": "complete-typed-classical-tla-impersonal-frequentative-scope-source",
  "domain": "classical-tla-impersonal-frequentative-scope",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2662",
    "claim-p2663"
  ],
  "coordinates": {
    "claim-p2662::p2662-the-frequentative-stem-can-undergo-tla-fusion": {
      "assertionId": "classical-tla-impersonal-frequentative-scope:p2662-the-frequentative-stem-can-undergo-tla-fusion",
      "canonicalPath": "cases.fusedTlaStemScope.targetStem"
    },
    "claim-p2663::p2663-tia-impersonal-stems-permit-two-formations-1-the-reduplication": {
      "assertionId": "classical-tla-impersonal-frequentative-scope:p2663-tia-impersonal-stems-permit-two-formations-1-the-reduplication",
      "canonicalPath": "cases.fusedTlaObjectScope.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2662": [],
    "claim-p2663": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2662": "authorized",
    "claim-p2663": "authorized"
  }
};
export default Object.freeze(spec);
