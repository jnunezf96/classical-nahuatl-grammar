const spec = {
  "ownerId": "classical-optative-second-person-formation",
  "prefix": "ClassicalOptativeSecondPersonFormation",
  "operationId": "classical.optative.second.person.formation.execute",
  "inputContract": "complete-typed-classical-optative-second-person-formation-source",
  "domain": "classical-optative-second-person-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-optative-second-person-formation",
  "selections": [
    "claim-p1046"
  ],
  "coordinates": {
    "claim-p1046::p1046-all-nonpast-and-past-optative-vncs-use-the-morphs": {
      "assertionId": "classical-optative-second-person-formation:p1046-all-nonpast-and-past-optative-vncs-use-the-morphs",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1046": [
      "direct-command"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1046": "authorized"
  }
};
export default Object.freeze(spec);
