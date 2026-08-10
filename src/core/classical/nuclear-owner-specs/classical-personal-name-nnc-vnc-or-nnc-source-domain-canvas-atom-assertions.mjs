const spec = {
  "ownerId": "classical-personal-name-nnc-vnc-or-nnc-source-domain-canvas-atom-assertions",
  "prefix": "ClassicalPersonalNameNncVncOrNncSourceDomainCanvasAtomAssertions",
  "operationId": "classical.personal.name.nnc.vnc.or.nnc.source.domain.canvas.atom.assertions.establish",
  "inputContract": "complete-typed-classical-personal-name-nnc-vnc-or-nnc-source-domain-canvas-atom-assertions-source",
  "domain": "classical-personal-name-nnc-vnc-or-nnc-source-domain-canvas-atom-assertions",
  "mode": "owner-typed-assertion",
  "canonicalActorId": "classical-personal-name-nnc-vnc-or-nnc-source-domain-canvas-atom-assertions",
  "relatedCanonicalOwnerId": "classical-personal-name-nnc-vnc-or-nnc-source-domain",
  "selections": [
    "canonical-owner-scope"
  ],
  "coordinates": {
    "canonical-owner-scope::atom-aci-p609-l015-de4cd094d8-semantic-assertion": {
      "assertionId": "classical-personal-name-nnc-vnc-or-nnc-source-domain-canvas-atom-assertions:atom-aci-p609-l015-de4cd094d8-semantic-assertion",
      "canonicalPath": "semanticAssertion",
      "semanticAssertion": {
        "kind": "classical-grammar-atom-assertion",
        "version": 1,
        "atomId": "ACI-P609-L015-DE4CD094D8",
        "semanticOwnerId": "classical-personal-name-nnc-vnc-or-nnc-source-domain",
        "assertionOwnerId": "classical-personal-name-nnc-vnc-or-nnc-source-domain-canvas-atom-assertions",
        "grammaticalForce": "productive-canonical-grammar",
        "category": "INV",
        "engineDisposition": "READ-ONLY-TYPED-GRAMMAR-FACT",
        "scope": {
          "structuralContainer": "§56.2.1",
          "semanticFacets": [
            "tense-or-stem"
          ]
        },
        "canonicalStatement": "One class of personal-name NNC has a nominalized VNC as its stem.",
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
