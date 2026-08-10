const spec = {
  "ownerId": "morpheme-taxonomy-canvas-atom-assertions",
  "prefix": "MorphemeTaxonomyCanvasAtomAssertions",
  "operationId": "morpheme.taxonomy.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-morpheme-taxonomy-canvas-atom-assertions-source",
  "domain": "morpheme-taxonomy-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "morpheme-taxonomy-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "morpheme-taxonomy",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p024-l011-8d1f006496-02-semantic-assertion": {
      "assertionId": "morpheme-taxonomy-canvas-atom-assertions:atom-aci-p024-l011-8d1f006496-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P024-L011-8D1F006496-02",
        "semanticOwnerId": "morpheme-taxonomy",
        "assertionOwnerId": "morpheme-taxonomy-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "DEF",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§1.7",
          "semanticFacets": []
        },
        "canonicalStatement": "The morpheme is the smallest unit that manifests linguistic duality.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p024-l016-fc75a2ab0d-02-semantic-assertion": {
      "assertionId": "morpheme-taxonomy-canvas-atom-assertions:atom-aci-p024-l016-fc75a2ab0d-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P024-L016-FC75A2AB0D-02",
        "semanticOwnerId": "morpheme-taxonomy",
        "assertionOwnerId": "morpheme-taxonomy-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "USE",
        "engineDisposition": "TYPED-MEANING-OR-RESULT-PROJECTION",
        "scope": {
          "structuralContainer": "§1.7",
          "semanticFacets": []
        },
        "canonicalStatement": "For economy, these lessons represent a morpheme as /carrier/, ‘gloss.’",
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
