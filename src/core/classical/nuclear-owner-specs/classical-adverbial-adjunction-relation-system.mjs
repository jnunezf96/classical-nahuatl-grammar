const spec = {
  "ownerId": "classical-adverbial-adjunction-relation-system",
  "prefix": "ClassicalAdverbialAdjunctionRelationSystem",
  "operationId": "classical.adverbial.adjunction.relation.system.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-relation-system-source",
  "domain": "classical-adverbial-adjunction-relation-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4699",
    "claim-p4700",
    "claim-p4701"
  ],
  "coordinates": {
    "claim-p4699::p4699-structures-of-adverbial-modification-can-be-more-complicated-than": {
      "assertionId": "classical-adverbial-adjunction-relation-system:p4699-structures-of-adverbial-modification-can-be-more-complicated-than",
      "canonicalPath": "analysis.relationTypeCount"
    },
    "claim-p4700::p4700-in-the-structures-of-adverbial-modification-presented-in-this": {
      "assertionId": "classical-adverbial-adjunction-relation-system:p4700-in-the-structures-of-adverbial-modification-presented-in-this",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4701::p4701-there-are-ten-meaning-types-which-will-be-taken": {
      "assertionId": "classical-adverbial-adjunction-relation-system:p4701-there-are-ten-meaning-types-which-will-be-taken",
      "canonicalPath": "relationSet.length"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4699": [
      "relation-system"
    ],
    "claim-p4700": [
      "relation-system"
    ],
    "claim-p4701": [
      "relation-system"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4699": "authorized",
    "claim-p4700": "authorized",
    "claim-p4701": "authorized"
  }
};
export default Object.freeze(spec);
