const spec = {
  "ownerId": "carrier-grapheme-classification-canvas-atom-assertions",
  "prefix": "CarrierGraphemeClassificationCanvasAtomAssertions",
  "operationId": "carrier.grapheme.classification.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-carrier-grapheme-classification-canvas-atom-assertions-source",
  "domain": "carrier-grapheme-classification-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "carrier-grapheme-classification-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "carrier-grapheme-classification",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p023-l020-fa3f525868-02-semantic-assertion": {
      "assertionId": "carrier-grapheme-classification-canvas-atom-assertions:atom-aci-p023-l020-fa3f525868-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P023-L020-FA3F525868-02",
        "semanticOwnerId": "carrier-grapheme-classification",
        "assertionOwnerId": "carrier-grapheme-classification-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "DEF",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§1.6.2",
          "semanticFacets": []
        },
        "canonicalStatement": "it includes the entire range of possible shapes (script, print, upper or lower case, italic, boldface, etc.) that the symbolized value can assume and still be recognizable as such.",
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
