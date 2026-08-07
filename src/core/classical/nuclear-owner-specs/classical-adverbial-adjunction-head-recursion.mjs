const spec = {
  "ownerId": "classical-adverbial-adjunction-head-recursion",
  "prefix": "ClassicalAdverbialAdjunctionHeadRecursion",
  "operationId": "classical.adverbial.adjunction.head.recursion.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-head-recursion-source",
  "domain": "classical-adverbial-adjunction-head-recursion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4664",
    "claim-p4665"
  ],
  "coordinates": {
    "claim-p4664::p4664-when-the-head-of-a-structure-of-adverbial-modification": {
      "assertionId": "classical-adverbial-adjunction-head-recursion:p4664-when-the-head-of-a-structure-of-adverbial-modification",
      "canonicalPath": "analysis.recursiveHeadRequiresIssuedPriorComposition"
    },
    "claim-p4665::p4665-when-the-head-of-a-structure-of-adverbial-modification": {
      "assertionId": "classical-adverbial-adjunction-head-recursion:p4665-when-the-head-of-a-structure-of-adverbial-modification",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4664": [
      "head-recursion"
    ],
    "claim-p4665": [
      "head-recursion"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4664": "authorized",
    "claim-p4665": "authorized"
  }
};
export default Object.freeze(spec);
