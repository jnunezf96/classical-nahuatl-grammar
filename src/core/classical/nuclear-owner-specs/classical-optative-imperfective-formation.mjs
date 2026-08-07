const spec = {
  "ownerId": "classical-optative-imperfective-formation",
  "prefix": "ClassicalOptativeImperfectiveFormation",
  "operationId": "classical.optative.imperfective.formation.execute",
  "inputContract": "complete-typed-classical-optative-imperfective-formation-source",
  "domain": "classical-optative-imperfective-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-optative-imperfective-formation",
  "selections": [
    "claim-p1041",
    "claim-p1042",
    "claim-p1043",
    "claim-p1044",
    "claim-p1045"
  ],
  "coordinates": {
    "claim-p1041::p1041-as-explained-in-5-5-2-both-nonpast-and": {
      "assertionId": "classical-optative-imperfective-formation:p1041-as-explained-in-5-5-2-both-nonpast-and",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1042::p1042-as-illustrated-in-7-7-the-predicate-of-a": {
      "assertionId": "classical-optative-imperfective-formation:p1042-as-illustrated-in-7-7-the-predicate-of-a",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1043::p1043-also-when-built-on-class-a-or-class-b": {
      "assertionId": "classical-optative-imperfective-formation:p1043-also-when-built-on-class-a-or-class-b",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1044::p1044-result-also": {
      "assertionId": "classical-optative-imperfective-formation:p1044-result-also",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1045::p1045-subject-is-built-on-a-class-d-verbstem-the": {
      "assertionId": "classical-optative-imperfective-formation:p1045-subject-is-built-on-a-class-d-verbstem-the",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1041": [
      "nonpast-class-b"
    ],
    "claim-p1042": [
      "past-class-a"
    ],
    "claim-p1043": [
      "nonpast-class-b"
    ],
    "claim-p1044": [
      "class-d-nonpast"
    ],
    "claim-p1045": [
      "class-c-nonpast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1041": "authorized",
    "claim-p1042": "authorized",
    "claim-p1043": "authorized",
    "claim-p1044": "authorized",
    "claim-p1045": "authorized"
  }
};
export default Object.freeze(spec);
