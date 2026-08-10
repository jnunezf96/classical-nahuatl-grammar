const spec = {
  "ownerId": "classical-compound-nnc-affinity-canvas-atom-assertions",
  "prefix": "ClassicalCompoundNncAffinityCanvasAtomAssertions",
  "operationId": "classical.compound.nnc.affinity.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-compound-nnc-affinity-canvas-atom-assertions-source",
  "domain": "classical-compound-nnc-affinity-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-compound-nnc-affinity-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-compound-nnc-affinity",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p303-l004-c33256556e-02-semantic-assertion": {
      "assertionId": "classical-compound-nnc-affinity-canvas-atom-assertions:atom-aci-p303-l004-c33256556e-02-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P303-L004-C33256556E-02",
        "semanticOwnerId": "classical-compound-nnc-affinity",
        "assertionOwnerId": "classical-compound-nnc-affinity-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "CST",
        "engineDisposition": "TYPED-APPLICABILITY-CONSTRAINT-OR-DEPENDENCY",
        "scope": {
          "structuralContainer": "§31.12",
          "semanticFacets": []
        },
        "canonicalStatement": "For some compound nounstems, reduplication on the matrix is obligatory.",
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
