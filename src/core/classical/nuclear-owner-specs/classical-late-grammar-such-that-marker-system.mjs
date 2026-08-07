const spec = {
  "ownerId": "classical-late-grammar-such-that-marker-system",
  "prefix": "ClassicalLateGrammarSuchThatMarkerSystem",
  "operationId": "classical.late.grammar.such.that.marker.system.execute",
  "inputContract": "complete-typed-classical-late-grammar-such-that-marker-system-source",
  "domain": "classical-late-grammar-such-that-marker-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-such-that-adjunction-runtime",
  "selections": [
    "claim-p5319",
    "claim-p5320"
  ],
  "coordinates": {
    "claim-p5319::p5319-the-particle-mah-such-that-and-its-negative-counterpart": {
      "assertionId": "classical-late-grammar-such-that-marker-system:p5319-the-particle-mah-such-that-and-its-negative-counterpart",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5320::p5320-the-adjunctor-in-is-optional": {
      "assertionId": "classical-late-grammar-such-that-marker-system:p5320-the-adjunctor-in-is-optional",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5319": [
      "such-that-adjunction",
      "optional-in"
    ],
    "claim-p5320": [
      "such-that-adjunction",
      "optional-in"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5319": "authorized",
    "claim-p5320": "authorized"
  }
};
export default Object.freeze(spec);
