const spec = {
  "ownerId": "classical-syllable-structure-canvas-atom-assertions",
  "prefix": "ClassicalSyllableStructureCanvasAtomAssertions",
  "operationId": "classical.syllable.structure.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-syllable-structure-canvas-atom-assertions-source",
  "domain": "classical-syllable-structure-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-syllable-structure-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-syllable-structure",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p028-l007-af1513ed05-02-semantic-assertion": {
      "assertionId": "classical-syllable-structure-canvas-atom-assertions:atom-aci-p028-l007-af1513ed05-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P028-L007-AF1513ED05-02",
        "semanticOwnerId": "classical-syllable-structure",
        "assertionOwnerId": "classical-syllable-structure-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "REA",
        "engineDisposition": "CANONICAL-OPERATION-OR-ALTERNATION",
        "scope": {
          "structuralContainer": "§1.11.1.b",
          "semanticFacets": []
        },
        "canonicalStatement": "in English syllabic consonants, /1 m n r/, can also serve as center.",
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
