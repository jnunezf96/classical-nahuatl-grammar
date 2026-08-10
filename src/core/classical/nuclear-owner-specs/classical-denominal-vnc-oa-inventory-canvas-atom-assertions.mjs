const spec = {
  "ownerId": "classical-denominal-vnc-oa-inventory-canvas-atom-assertions",
  "prefix": "ClassicalDenominalVncOaInventoryCanvasAtomAssertions",
  "operationId": "classical.denominal.vnc.oa.inventory.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-denominal-vnc-oa-inventory-canvas-atom-assertions-source",
  "domain": "classical-denominal-vnc-oa-inventory-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-denominal-vnc-oa-inventory-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-denominal-vnc-oa-inventory",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p601-l028-cef18d1619-semantic-assertion": {
      "assertionId": "classical-denominal-vnc-oa-inventory-canvas-atom-assertions:atom-aci-p601-l028-cef18d1619-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P601-L028-CEF18D1619",
        "semanticOwnerId": "classical-denominal-vnc-oa-inventory",
        "assertionOwnerId": "classical-denominal-vnc-oa-inventory-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "INV",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§55.3",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "A denominal intransitive o-ā stem of §55.3 has two licensed meanings.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p601-l028-cef18d1619-02-semantic-assertion": {
      "assertionId": "classical-denominal-vnc-oa-inventory-canvas-atom-assertions:atom-aci-p601-l028-cef18d1619-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P601-L028-CEF18D1619-02",
        "semanticOwnerId": "classical-denominal-vnc-oa-inventory",
        "assertionOwnerId": "classical-denominal-vnc-oa-inventory-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "INV",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§55.3",
          "semanticFacets": [
            "object",
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "The corresponding single-object huiā stem of §55.3 has two licensed meanings.",
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
