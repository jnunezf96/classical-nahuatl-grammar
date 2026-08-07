const spec = {
  "ownerId": "classical-predicate-nominalization-preterit-patientive",
  "prefix": "ClassicalPredicateNominalizationPreteritPatientive",
  "operationId": "classical.predicate.nominalization.preterit.patientive.execute",
  "inputContract": "complete-typed-classical-predicate-nominalization-preterit-patientive-source",
  "domain": "classical-predicate-nominalization-preterit-patientive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3383",
    "claim-p3384"
  ],
  "coordinates": {
    "claim-p3383::p3383-the-formation-is-not-frequent": {
      "assertionId": "classical-predicate-nominalization-preterit-patientive:p3383-the-formation-is-not-frequent",
      "canonicalPath": "cases.preteritPatientive.authorizationStatus"
    },
    "claim-p3384::p3384-cehuechili-lo-c-ce-huechi-li-lo-c-he": {
      "assertionId": "classical-predicate-nominalization-preterit-patientive:p3384-cehuechili-lo-c-ce-huechi-li-lo-c-he",
      "canonicalPath": "cases.preteritPatientive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3383": [],
    "claim-p3384": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3383": "authorized",
    "claim-p3384": "authorized"
  }
};
export default Object.freeze(spec);
