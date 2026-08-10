const spec = {
  "ownerId": "classical-pil-noble-canvas-atom-assertions",
  "prefix": "ClassicalPilNobleCanvasAtomAssertions",
  "operationId": "classical.pil.noble.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-pil-noble-canvas-atom-assertions-source",
  "domain": "classical-pil-noble-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-pil-noble-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-pil-noble",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p310-l025-f0e2dde949-03-semantic-assertion": {
      "assertionId": "classical-pil-noble-canvas-atom-assertions:atom-aci-p310-l025-f0e2dde949-03-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P310-L025-F0E2DDE949-03",
        "semanticOwnerId": "classical-pil-noble",
        "assertionOwnerId": "classical-pil-noble-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "ALT",
        "engineDisposition": "CANONICAL-OPERATION-OR-ALTERNATION",
        "scope": {
          "structuralContainer": "§32.6.2.a",
          "semanticFacets": []
        },
        "canonicalStatement": "This nounstem can refer to a woman.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p310-l025-f0e2dde949-04-semantic-assertion": {
      "assertionId": "classical-pil-noble-canvas-atom-assertions:atom-aci-p310-l025-f0e2dde949-04-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P310-L025-F0E2DDE949-04",
        "semanticOwnerId": "classical-pil-noble",
        "assertionOwnerId": "classical-pil-noble-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "USE",
        "engineDisposition": "TYPED-MEANING-OR-RESULT-PROJECTION",
        "scope": {
          "structuralContainer": "§32.6.2.a",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "When referring to a woman, a gender-specific stem is customarily preferred.",
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
