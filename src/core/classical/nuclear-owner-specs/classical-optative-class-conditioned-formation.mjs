const spec = {
  "ownerId": "classical-optative-class-conditioned-formation",
  "prefix": "ClassicalOptativeClassConditionedFormation",
  "operationId": "classical.optative.class.conditioned.formation.execute",
  "inputContract": "complete-typed-classical-optative-class-conditioned-formation-source",
  "domain": "classical-optative-class-conditioned-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-optative-class-conditioned-formation",
  "selections": [
    "claim-p1049",
    "claim-p1050",
    "claim-p1051",
    "claim-p1052",
    "claim-p1053"
  ],
  "coordinates": {
    "claim-p1049::p1049-all-nonpast-optative-vncs-built-on-class-c-verbstems": {
      "assertionId": "classical-optative-class-conditioned-formation:p1049-all-nonpast-optative-vncs-built-on-class-c-verbstems",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1050::p1050-when-followed-only-by-silent-morphs-and-long-when": {
      "assertionId": "classical-optative-class-conditioned-formation:p1050-when-followed-only-by-silent-morphs-and-long-when",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1051::p1051-the-resultant-final-vowel-lo-or-i-of-the": {
      "assertionId": "classical-optative-class-conditioned-formation:p1051-the-resultant-final-vowel-lo-or-i-of-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1052::p1052-when-followed-only-by-silent-morphs-and-a-long": {
      "assertionId": "classical-optative-class-conditioned-formation:p1052-when-followed-only-by-silent-morphs-and-a-long",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1053::p1053-all-nonpast-optative-vncs-built-on-class-d-verbstems": {
      "assertionId": "classical-optative-class-conditioned-formation:p1053-all-nonpast-optative-vncs-built-on-class-d-verbstems",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1049": [
      "class-c-nonpast"
    ],
    "claim-p1050": [
      "class-d-nonpast"
    ],
    "claim-p1051": [
      "class-c-nonpast"
    ],
    "claim-p1052": [
      "class-d-nonpast"
    ],
    "claim-p1053": [
      "class-c-nonpast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1049": "authorized",
    "claim-p1050": "authorized",
    "claim-p1051": "authorized",
    "claim-p1052": "authorized",
    "claim-p1053": "authorized"
  }
};
export default Object.freeze(spec);
