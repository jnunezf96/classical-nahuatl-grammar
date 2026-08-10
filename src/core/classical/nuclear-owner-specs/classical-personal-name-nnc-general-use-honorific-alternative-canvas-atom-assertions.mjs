const spec = {
  "ownerId": "classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions",
  "prefix": "ClassicalPersonalNameNncGeneralUseHonorificAlternativeCanvasAtomAssertions",
  "operationId": "classical.personal.name.nnc.general.use.honorific.alternative.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions-source",
  "domain": "classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-personal-name-nnc-general-use-honorific-alternative",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p609-l034-593f9a56e0-02-semantic-assertion": {
      "assertionId": "classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions:atom-aci-p609-l034-593f9a56e0-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P609-L034-593F9A56E0-02",
        "semanticOwnerId": "classical-personal-name-nnc-general-use-honorific-alternative",
        "assertionOwnerId": "classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "CST",
        "engineDisposition": "TYPED-APPLICABILITY-CONSTRAINT-OR-DEPENDENCY",
        "scope": {
          "structuralContainer": "§56.2.1.a",
          "semanticFacets": []
        },
        "canonicalStatement": "In an honorific personal-name NNC, this formation has a different translation value from the preceding formation.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p609-l034-593f9a56e0-03-semantic-assertion": {
      "assertionId": "classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions:atom-aci-p609-l034-593f9a56e0-03-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P609-L034-593F9A56E0-03",
        "semanticOwnerId": "classical-personal-name-nnc-general-use-honorific-alternative",
        "assertionOwnerId": "classical-personal-name-nnc-general-use-honorific-alternative-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "USE",
        "engineDisposition": "TYPED-MEANING-OR-RESULT-PROJECTION",
        "scope": {
          "structuralContainer": "§56.2.1.a",
          "semanticFacets": []
        },
        "canonicalStatement": "This honorific personal-name formation is less common than the preceding formation.",
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
