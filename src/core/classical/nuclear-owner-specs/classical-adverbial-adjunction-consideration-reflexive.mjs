const spec = {
  "ownerId": "classical-adverbial-adjunction-consideration-reflexive",
  "prefix": "ClassicalAdverbialAdjunctionConsiderationReflexive",
  "operationId": "classical.adverbial.adjunction.consideration.reflexive.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-consideration-reflexive-source",
  "domain": "classical-adverbial-adjunction-consideration-reflexive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4720",
    "claim-p4721",
    "claim-p4722"
  ],
  "coordinates": {
    "claim-p4720::p4720-when-the-principal-contains-a-reflexive-vnc": {
      "assertionId": "classical-adverbial-adjunction-consideration-reflexive:p4720-when-the-principal-contains-a-reflexive-vnc",
      "canonicalPath": "analysis.reflexivePrincipalSupportsConsiderationAnalysis"
    },
    "claim-p4721::p4721-the-adverbial-nature-of-the-adjunct-is-again-clear": {
      "assertionId": "classical-adverbial-adjunction-consideration-reflexive:p4721-the-adverbial-nature-of-the-adjunct-is-again-clear",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4722::p4722-the-verb-m-o-mati-to-know-oneself-in": {
      "assertionId": "classical-adverbial-adjunction-consideration-reflexive:p4722-the-verb-m-o-mati-to-know-oneself-in",
      "canonicalPath": "result.relation"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4720": [
      "consideration-reflexive"
    ],
    "claim-p4721": [
      "consideration-reflexive"
    ],
    "claim-p4722": [
      "consideration-reflexive"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4720": "authorized",
    "claim-p4721": "authorized",
    "claim-p4722": "authorized"
  }
};
export default Object.freeze(spec);
