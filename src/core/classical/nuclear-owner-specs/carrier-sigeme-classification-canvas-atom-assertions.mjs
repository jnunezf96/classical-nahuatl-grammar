const spec = {
  "ownerId": "carrier-sigeme-classification-canvas-atom-assertions",
  "prefix": "CarrierSigemeClassificationCanvasAtomAssertions",
  "operationId": "carrier.sigeme.classification.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-carrier-sigeme-classification-canvas-atom-assertions-source",
  "domain": "carrier-sigeme-classification-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "carrier-sigeme-classification-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "carrier-sigeme-classification",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p023-l036-0ecb58a90d-02-semantic-assertion": {
      "assertionId": "carrier-sigeme-classification-canvas-atom-assertions:atom-aci-p023-l036-0ecb58a90d-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P023-L036-0ECB58A90D-02",
        "semanticOwnerId": "carrier-sigeme-classification",
        "assertionOwnerId": "carrier-sigeme-classification-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "REA",
        "engineDisposition": "CANONICAL-OPERATION-OR-ALTERNATION",
        "scope": {
          "structuralContainer": "§1.6.3",
          "semanticFacets": []
        },
        "canonicalStatement": "The slash in /Ø/ distinguishes the sigeme symbol from the vowel o.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    }
  }
};
export default Object.freeze(spec);
