const spec = {
  "ownerId": "classical-adverbial-adjunction-recursion-system",
  "prefix": "ClassicalAdverbialAdjunctionRecursionSystem",
  "operationId": "classical.adverbial.adjunction.recursion.system.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-recursion-system-source",
  "domain": "classical-adverbial-adjunction-recursion-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4662",
    "claim-p4663"
  ],
  "coordinates": {
    "claim-p4662::p4662-a-structure-of-adverbial-modification-can-be-recursive": {
      "assertionId": "classical-adverbial-adjunction-recursion-system:p4662-a-structure-of-adverbial-modification-can-be-recursive",
      "canonicalPath": "analysis.headOrModifierOrBothMayRecurse"
    },
    "claim-p4663::p4663-this-means-that-either-the-adverbial-modifier-or-the": {
      "assertionId": "classical-adverbial-adjunction-recursion-system:p4663-this-means-that-either-the-adverbial-modifier-or-the",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4662": [
      "recursion-system"
    ],
    "claim-p4663": [
      "recursion-system"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4662": "authorized",
    "claim-p4663": "authorized"
  }
};
export default Object.freeze(spec);
