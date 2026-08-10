const spec = {
  "ownerId": "discontinuous-unit-admissibility-canvas-atom-assertions",
  "prefix": "DiscontinuousUnitAdmissibilityCanvasAtomAssertions",
  "operationId": "discontinuous.unit.admissibility.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-discontinuous-unit-admissibility-canvas-atom-assertions-source",
  "domain": "discontinuous-unit-admissibility-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "discontinuous-unit-admissibility-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "discontinuous-unit-admissibility",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p027-l014-8a719e5b2e-02-semantic-assertion": {
      "assertionId": "discontinuous-unit-admissibility-canvas-atom-assertions:atom-aci-p027-l014-8a719e5b2e-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P027-L014-8A719E5B2E-02",
        "semanticOwnerId": "discontinuous-unit-admissibility",
        "assertionOwnerId": "discontinuous-unit-admissibility-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "CST",
        "engineDisposition": "TYPED-APPLICABILITY-CONSTRAINT-OR-DEPENDENCY",
        "scope": {
          "structuralContainer": "§1.11",
          "semanticFacets": []
        },
        "canonicalStatement": "Some grammatical complexes are obligatorily discontinuous.",
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
