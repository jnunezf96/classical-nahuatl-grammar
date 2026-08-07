const spec = {
  "ownerId": "classical-adverbial-adjunction-consideration-projective",
  "prefix": "ClassicalAdverbialAdjunctionConsiderationProjective",
  "operationId": "classical.adverbial.adjunction.consideration.projective.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-consideration-projective-source",
  "domain": "classical-adverbial-adjunction-consideration-projective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4723",
    "claim-p4724",
    "claim-p4725"
  ],
  "coordinates": {
    "claim-p4723::p4723-when-the-principal-contains-a-transitive-vnc-with-a": {
      "assertionId": "classical-adverbial-adjunction-consideration-projective:p4723-when-the-principal-contains-a-transitive-vnc-with-a",
      "canonicalPath": "analysis.nonspecificProjectiveObjectBlocksIncludedReferentAnalysis"
    },
    "claim-p4724::p4724-the-adverbial-nature-of-the-adjunct-may-not-be": {
      "assertionId": "classical-adverbial-adjunction-consideration-projective:p4724-the-adverbial-nature-of-the-adjunct-may-not-be",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p4725::p4725-if-however-that-object-pronoun-is-nonspecific-the-construction": {
      "assertionId": "classical-adverbial-adjunction-consideration-projective:p4725-if-however-that-object-pronoun-is-nonspecific-the-construction",
      "canonicalPath": "result.relation"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4723": [
      "consideration-projective"
    ],
    "claim-p4724": [
      "consideration-projective"
    ],
    "claim-p4725": [
      "consideration-projective"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4723": "authorized",
    "claim-p4724": "authorized",
    "claim-p4725": "authorized"
  }
};
export default Object.freeze(spec);
