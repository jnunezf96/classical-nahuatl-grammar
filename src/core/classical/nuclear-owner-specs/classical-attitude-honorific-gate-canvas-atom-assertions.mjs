const spec = {
  "ownerId": "classical-attitude-honorific-gate-canvas-atom-assertions",
  "prefix": "ClassicalAttitudeHonorificGateCanvasAtomAssertions",
  "operationId": "classical.attitude.honorific.gate.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-attitude-honorific-gate-canvas-atom-assertions-source",
  "domain": "classical-attitude-honorific-gate-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-attitude-honorific-gate-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-attitude-honorific-gate",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p313-l010-b419053a42-semantic-assertion": {
      "assertionId": "classical-attitude-honorific-gate-canvas-atom-assertions:atom-aci-p313-l010-b419053a42-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P313-L010-B419053A42",
        "semanticOwnerId": "classical-attitude-honorific-gate",
        "assertionOwnerId": "classical-attitude-honorific-gate-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "USE",
        "engineDisposition": "TYPED-MEANING-OR-RESULT-PROJECTION",
        "scope": {
          "structuralContainer": "§33.1",
          "semanticFacets": []
        },
        "canonicalStatement": "An honorific VNC grammatically encodes respectful status even when an English gloss does not overtly express it.",
        "evidencePolicy": {
          "evidenceAuthorizesGrammar": false,
          "evidenceAbsenceBlocksResult": false,
          "examplesWhitelistRealization": false,
          "inventoryAuthorizesGrammar": false
        }
      },
      "proofObservationKind": "owner-issued-typed-grammar-assertion"
    },
    "canonical-owner-scope::atom-aci-p313-l010-b419053a42-04-semantic-assertion": {
      "assertionId": "classical-attitude-honorific-gate-canvas-atom-assertions:atom-aci-p313-l010-b419053a42-04-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P313-L010-B419053A42-04",
        "semanticOwnerId": "classical-attitude-honorific-gate",
        "assertionOwnerId": "classical-attitude-honorific-gate-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "CST",
        "engineDisposition": "TYPED-APPLICABILITY-CONSTRAINT-OR-DEPENDENCY",
        "scope": {
          "structuralContainer": "§33.1",
          "semanticFacets": []
        },
        "canonicalStatement": "Absence of an overt English respect marker does not suppress or negate the Nahuatl honorific realization.",
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
