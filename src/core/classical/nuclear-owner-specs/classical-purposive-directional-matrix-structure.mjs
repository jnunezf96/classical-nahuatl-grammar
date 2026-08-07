const spec = {
  "ownerId": "classical-purposive-directional-matrix-structure",
  "prefix": "ClassicalPurposiveDirectionalMatrixStructure",
  "operationId": "classical.purposive.directional.matrix.structure.execute",
  "inputContract": "complete-typed-classical-purposive-directional-matrix-structure-source",
  "domain": "classical-purposive-directional-matrix-structure",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2898",
    "claim-p2899",
    "claim-p2900",
    "claim-p2901",
    "claim-p2902"
  ],
  "coordinates": {
    "claim-p2898::p2898-the-verbstem-occurring-in-the-matrix-subposition-is-intransitive": {
      "assertionId": "classical-purposive-directional-matrix-structure:p2898-the-verbstem-occurring-in-the-matrix-subposition-is-intransitive",
      "canonicalPath": "contract.matrixValence"
    },
    "claim-p2899::p2899-it-consists-of-a-directional-prefix-fused-to-a": {
      "assertionId": "classical-purposive-directional-matrix-structure:p2899-it-consists-of-a-directional-prefix-fused-to-a",
      "canonicalPath": "contract.matrixDirectionalPlacement"
    },
    "claim-p2900::p2900-these-directional-prefixes-are-archaic-survivals-found-now-only": {
      "assertionId": "classical-purposive-directional-matrix-structure:p2900-these-directional-prefixes-are-archaic-survivals-found-now-only",
      "canonicalPath": "contract.directionalMorphs.outbound"
    },
    "claim-p2901::p2901-the-variant-future-tense-morph-always-precedes-them": {
      "assertionId": "classical-purposive-directional-matrix-structure:p2901-the-variant-future-tense-morph-always-precedes-them",
      "canonicalPath": "contract.directionalMorphs.inbound"
    },
    "claim-p2902::p2902-it-should-be-remembered-that-these-compound-stem-internal": {
      "assertionId": "classical-purposive-directional-matrix-structure:p2902-it-should-be-remembered-that-these-compound-stem-internal",
      "canonicalPath": "contract.matrixValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2898": [],
    "claim-p2899": [],
    "claim-p2900": [],
    "claim-p2901": [],
    "claim-p2902": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2898": "authorized",
    "claim-p2899": "authorized",
    "claim-p2900": "authorized",
    "claim-p2901": "authorized",
    "claim-p2902": "authorized"
  }
};
export default Object.freeze(spec);
