const spec = {
  "ownerId": "classical-optative-plural-number-formation",
  "prefix": "ClassicalOptativePluralNumberFormation",
  "operationId": "classical.optative.plural.number.formation.execute",
  "inputContract": "complete-typed-classical-optative-plural-number-formation-source",
  "domain": "classical-optative-plural-number-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-optative-plural-number-formation",
  "selections": [
    "claim-p1047",
    "claim-p1048"
  ],
  "coordinates": {
    "claim-p1047::p1047-all-nonpast-optative-vncs-use-the-morphic-dyad-c": {
      "assertionId": "classical-optative-plural-number-formation:p1047-all-nonpast-optative-vncs-use-the-morphic-dyad-c",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1048::p1048-result-all-nonpast-optative-vncs-use-the-morphic-dyad": {
      "assertionId": "classical-optative-plural-number-formation:p1048-result-all-nonpast-optative-vncs-use-the-morphic-dyad",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1047": [
      "class-c-nonpast"
    ],
    "claim-p1048": [
      "class-c-nonpast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1047": "authorized",
    "claim-p1048": "authorized"
  }
};
export default Object.freeze(spec);
