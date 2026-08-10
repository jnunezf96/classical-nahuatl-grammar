const spec = {
  "ownerId": "classical-compound-recursive-embedding-canvas-atom-assertions",
  "prefix": "ClassicalCompoundRecursiveEmbeddingCanvasAtomAssertions",
  "operationId": "classical.compound.recursive.embedding.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-compound-recursive-embedding-canvas-atom-assertions-source",
  "domain": "classical-compound-recursive-embedding-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-compound-recursive-embedding-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-compound-recursive-embedding",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p265-l018-457d21f4b2-semantic-assertion": {
      "assertionId": "classical-compound-recursive-embedding-canvas-atom-assertions:atom-aci-p265-l018-457d21f4b2-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P265-L018-457D21F4B2",
        "semanticOwnerId": "classical-compound-recursive-embedding",
        "assertionOwnerId": "classical-compound-recursive-embedding-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "DEP",
        "engineDisposition": "TYPED-APPLICABILITY-CONSTRAINT-OR-DEPENDENCY",
        "scope": {
          "structuralContainer": "§28.12",
          "semanticFacets": []
        },
        "canonicalStatement": "Verbstem compounding is recursive.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p265-l018-457d21f4b2-02-semantic-assertion": {
      "assertionId": "classical-compound-recursive-embedding-canvas-atom-assertions:atom-aci-p265-l018-457d21f4b2-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P265-L018-457D21F4B2-02",
        "semanticOwnerId": "classical-compound-recursive-embedding",
        "assertionOwnerId": "classical-compound-recursive-embedding-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "SCH",
        "engineDisposition": "TYPED-STRUCTURE-OR-REFERENT-RELATION",
        "scope": {
          "structuralContainer": "§28.12",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "A compound stem can itself serve as the embed of a further compound stem.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p265-l018-457d21f4b2-03-semantic-assertion": {
      "assertionId": "classical-compound-recursive-embedding-canvas-atom-assertions:atom-aci-p265-l018-457d21f4b2-03-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P265-L018-457D21F4B2-03",
        "semanticOwnerId": "classical-compound-recursive-embedding",
        "assertionOwnerId": "classical-compound-recursive-embedding-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "SCH",
        "engineDisposition": "TYPED-STRUCTURE-OR-REFERENT-RELATION",
        "scope": {
          "structuralContainer": "§28.12",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "A compound stem can itself serve as the matrix of a further compound stem.",
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
