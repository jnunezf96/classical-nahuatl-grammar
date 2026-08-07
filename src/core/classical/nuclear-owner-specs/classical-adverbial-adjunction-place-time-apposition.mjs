const spec = {
  "ownerId": "classical-adverbial-adjunction-place-time-apposition",
  "prefix": "ClassicalAdverbialAdjunctionPlaceTimeApposition",
  "operationId": "classical.adverbial.adjunction.place.time.apposition.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-place-time-apposition-source",
  "domain": "classical-adverbial-adjunction-place-time-apposition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4687",
    "claim-p4688",
    "claim-p4689"
  ],
  "coordinates": {
    "claim-p4687::p4687-another-very-frequent-kind-of-recursion-inside-the-modifier": {
      "assertionId": "classical-adverbial-adjunction-place-time-apposition:p4687-another-very-frequent-kind-of-recursion-inside-the-modifier",
      "canonicalPath": "analysis.generalPlaceOrTimePrecedesSpecificNnc"
    },
    "claim-p4688::p4688-a-unit-is-formed-by-combining-an-adverbial-adjunct": {
      "assertionId": "classical-adverbial-adjunction-place-time-apposition:p4688-a-unit-is-formed-by-combining-an-adverbial-adjunct",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4689::p4689-in-this-structure-of-adverbial-apposition-the-modifier-follows": {
      "assertionId": "classical-adverbial-adjunction-place-time-apposition:p4689-in-this-structure-of-adverbial-apposition-the-modifier-follows",
      "canonicalPath": "result.relation"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4687": [
      "place-time-apposition"
    ],
    "claim-p4688": [
      "place-time-apposition"
    ],
    "claim-p4689": [
      "place-time-apposition"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4687": "authorized",
    "claim-p4688": "authorized",
    "claim-p4689": "authorized"
  }
};
export default Object.freeze(spec);
