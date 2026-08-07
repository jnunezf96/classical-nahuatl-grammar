const spec = {
  "ownerId": "classical-adverbial-adjunction-consideration-shared-reference",
  "prefix": "ClassicalAdverbialAdjunctionConsiderationSharedReference",
  "operationId": "classical.adverbial.adjunction.consideration.shared.reference.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-consideration-shared-reference-source",
  "domain": "classical-adverbial-adjunction-consideration-shared-reference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4726",
    "claim-p4727"
  ],
  "coordinates": {
    "claim-p4726::p4726-when-vncs-in-both-the-principal-and-the-adjunct": {
      "assertionId": "classical-adverbial-adjunction-consideration-shared-reference:p4726-when-vncs-in-both-the-principal-and-the-adjunct",
      "canonicalPath": "analysis.sharedReferenceDoesNotCollapseSupplementationAndAdjunction"
    },
    "claim-p4727::p4727-when-vncs-in-both-the-principal-and-the-adjunct": {
      "assertionId": "classical-adverbial-adjunction-consideration-shared-reference:p4727-when-vncs-in-both-the-principal-and-the-adjunct",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4726": [
      "consideration-shared-reference"
    ],
    "claim-p4727": [
      "consideration-shared-reference"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4726": "authorized",
    "claim-p4727": "authorized"
  }
};
export default Object.freeze(spec);
