const spec = {
  "ownerId": "classical-verbstem-category-system-canvas-atom-assertions",
  "prefix": "ClassicalVerbstemCategorySystemCanvasAtomAssertions",
  "operationId": "classical.verbstem.category.system.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-verbstem-category-system-canvas-atom-assertions-source",
  "domain": "classical-verbstem-category-system-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-verbstem-category-system-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-verbstem-category-system",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p069-l021-42e3067b45-semantic-assertion": {
      "assertionId": "classical-verbstem-category-system-canvas-atom-assertions:atom-aci-p069-l021-42e3067b45-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P069-L021-42E3067B45",
        "semanticOwnerId": "classical-verbstem-category-system",
        "assertionOwnerId": "classical-verbstem-category-system-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "CST",
        "engineDisposition": "TYPED-APPLICABILITY-CONSTRAINT-OR-DEPENDENCY",
        "scope": {
          "structuralContainer": "§5.5.1",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "For most verbs, formation of the perfective stem from the imperfective stem is not predictable.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p069-l021-42e3067b45-02-semantic-assertion": {
      "assertionId": "classical-verbstem-category-system-canvas-atom-assertions:atom-aci-p069-l021-42e3067b45-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P069-L021-42E3067B45-02",
        "semanticOwnerId": "classical-verbstem-category-system",
        "assertionOwnerId": "classical-verbstem-category-system-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "INV",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§5.5.1",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "A verb's imperfective stem and perfective stem must both be lexically known even when the mapping between them is unpredictable.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p069-l021-42e3067b45-03-semantic-assertion": {
      "assertionId": "classical-verbstem-category-system-canvas-atom-assertions:atom-aci-p069-l021-42e3067b45-03-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P069-L021-42E3067B45-03",
        "semanticOwnerId": "classical-verbstem-category-system",
        "assertionOwnerId": "classical-verbstem-category-system-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "INV",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§5.5.1",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "Lack of a predictable derivation does not mean that a verb lacks a perfective stem realization.",
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
