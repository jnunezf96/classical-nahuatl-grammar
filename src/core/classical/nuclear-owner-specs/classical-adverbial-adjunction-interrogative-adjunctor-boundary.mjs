const spec = {
  "ownerId": "classical-adverbial-adjunction-interrogative-adjunctor-boundary",
  "prefix": "ClassicalAdverbialAdjunctionInterrogativeAdjunctorBoundary",
  "operationId": "classical.adverbial.adjunction.interrogative.adjunctor.boundary.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-interrogative-adjunctor-boundary-source",
  "domain": "classical-adverbial-adjunction-interrogative-adjunctor-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4694",
    "claim-p4695"
  ],
  "coordinates": {
    "claim-p4694::p4694-whenever-an-adjoined-clause-is-present": {
      "assertionId": "classical-adverbial-adjunction-interrogative-adjunctor-boundary:p4694-whenever-an-adjoined-clause-is-present",
      "canonicalPath": "analysis.adjunctorSeparatesBeforeAdjoinedClause"
    },
    "claim-p4695::p4695-here-the-in-is-written-separately-whenever-an-adjoined": {
      "assertionId": "classical-adverbial-adjunction-interrogative-adjunctor-boundary:p4695-here-the-in-is-written-separately-whenever-an-adjoined",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4694": [
      "interrogative-adjunctor-boundary"
    ],
    "claim-p4695": [
      "interrogative-adjunctor-boundary"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4694": "authorized",
    "claim-p4695": "authorized"
  }
};
export default Object.freeze(spec);
