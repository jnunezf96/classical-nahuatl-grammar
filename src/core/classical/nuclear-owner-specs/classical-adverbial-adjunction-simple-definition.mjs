const spec = {
  "ownerId": "classical-adverbial-adjunction-simple-definition",
  "prefix": "ClassicalAdverbialAdjunctionSimpleDefinition",
  "operationId": "classical.adverbial.adjunction.simple.definition.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-simple-definition-source",
  "domain": "classical-adverbial-adjunction-simple-definition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4653",
    "claim-p4654"
  ],
  "coordinates": {
    "claim-p4653::p4653-if-neither-the-modifier-the-adjoined-clause-nor-the": {
      "assertionId": "classical-adverbial-adjunction-simple-definition:p4653-if-neither-the-modifier-the-adjoined-clause-nor-the",
      "canonicalPath": "analysis.simpleRequiresNonrecursiveUnits"
    },
    "claim-p4654::p4654-a-structure-of-adverbial-modification-is-simple-if-neither": {
      "assertionId": "classical-adverbial-adjunction-simple-definition:p4654-a-structure-of-adverbial-modification-is-simple-if-neither",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4653": [
      "simple-definition"
    ],
    "claim-p4654": [
      "simple-definition"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4653": "authorized",
    "claim-p4654": "authorized"
  }
};
export default Object.freeze(spec);
