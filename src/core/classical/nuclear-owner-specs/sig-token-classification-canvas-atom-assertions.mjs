const spec = {
  "ownerId": "sig-token-classification-canvas-atom-assertions",
  "prefix": "SigTokenClassificationCanvasAtomAssertions",
  "operationId": "sig.token.classification.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-sig-token-classification-canvas-atom-assertions-source",
  "domain": "sig-token-classification-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "sig-token-classification-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "sig-token-classification",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p025-l037-5d87ec0010-02-semantic-assertion": {
      "assertionId": "sig-token-classification-canvas-atom-assertions:atom-aci-p025-l037-5d87ec0010-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P025-L037-5D87EC0010-02",
        "semanticOwnerId": "sig-token-classification",
        "assertionOwnerId": "sig-token-classification-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "CST",
        "engineDisposition": "TYPED-APPLICABILITY-CONSTRAINT-OR-DEPENDENCY",
        "scope": {
          "structuralContainer": "§1.8.3",
          "semanticFacets": []
        },
        "canonicalStatement": "A sigeme is a set with exactly one token-level member.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p025-l037-71b57177ac-02-semantic-assertion": {
      "assertionId": "sig-token-classification-canvas-atom-assertions:atom-aci-p025-l037-71b57177ac-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P025-L037-71B57177AC-02",
        "semanticOwnerId": "sig-token-classification",
        "assertionOwnerId": "sig-token-classification-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "DEF",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§1.8.3",
          "semanticFacets": []
        },
        "canonicalStatement": "A regular sig is a token-level representation of a sigeme.",
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
