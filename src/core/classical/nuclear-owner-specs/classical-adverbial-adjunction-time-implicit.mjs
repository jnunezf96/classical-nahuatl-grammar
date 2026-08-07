const spec = {
  "ownerId": "classical-adverbial-adjunction-time-implicit",
  "prefix": "ClassicalAdverbialAdjunctionTimeImplicit",
  "operationId": "classical.adverbial.adjunction.time.implicit.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-implicit-source",
  "domain": "classical-adverbial-adjunction-time-implicit",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4702",
    "claim-p4703"
  ],
  "coordinates": {
    "claim-p4702::p4702-the-principal-clause-unit-is-modified-by-an-adverbial": {
      "assertionId": "classical-adverbial-adjunction-time-implicit:p4702-the-principal-clause-unit-is-modified-by-an-adverbial",
      "canonicalPath": "analysis.timeMayBeImplicit"
    },
    "claim-p4703::p4703-the-temporal-meaning-may-be-implicit-with-the-adjoined": {
      "assertionId": "classical-adverbial-adjunction-time-implicit:p4703-the-temporal-meaning-may-be-implicit-with-the-adjoined",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4702": [
      "time-implicit"
    ],
    "claim-p4703": [
      "time-implicit"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4702": "authorized",
    "claim-p4703": "authorized"
  }
};
export default Object.freeze(spec);
