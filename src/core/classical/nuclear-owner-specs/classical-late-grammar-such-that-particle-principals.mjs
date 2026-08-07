const spec = {
  "ownerId": "classical-late-grammar-such-that-particle-principals",
  "prefix": "ClassicalLateGrammarSuchThatParticlePrincipals",
  "operationId": "classical.late.grammar.such.that.particle.principals.execute",
  "inputContract": "complete-typed-classical-late-grammar-such-that-particle-principals-source",
  "domain": "classical-late-grammar-such-that-particle-principals",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-such-that-adjunction-runtime",
  "selections": [
    "claim-p5323",
    "claim-p5324"
  ],
  "coordinates": {
    "claim-p5323::p5323-the-adjoined-clause-introduced-by-the-particles-mah-and": {
      "assertionId": "classical-late-grammar-such-that-particle-principals:p5323-the-adjoined-clause-introduced-by-the-particles-mah-and",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5324::p5324-the-combination-of-ahmo-mah-or-ahmo-in-mah": {
      "assertionId": "classical-late-grammar-such-that-particle-principals:p5324-the-combination-of-ahmo-mah-or-ahmo-in-mah",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5323": [
      "such-that-adjunction",
      "default"
    ],
    "claim-p5324": [
      "such-that-adjunction",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5323": "authorized",
    "claim-p5324": "authorized"
  }
};
export default Object.freeze(spec);
