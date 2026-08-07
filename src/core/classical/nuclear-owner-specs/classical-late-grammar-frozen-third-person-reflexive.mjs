const spec = {
  "ownerId": "classical-late-grammar-frozen-third-person-reflexive",
  "prefix": "ClassicalLateGrammarFrozenThirdPersonReflexive",
  "operationId": "classical.late.grammar.frozen.third.person.reflexive.execute",
  "inputContract": "complete-typed-classical-late-grammar-frozen-third-person-reflexive-source",
  "domain": "classical-late-grammar-frozen-third-person-reflexive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-closed-construction-exception-runtime",
  "selections": [
    "claim-p5304"
  ],
  "coordinates": {
    "claim-p5304::p5304-there-is-a-strange-formation-in-which-a-reflexive": {
      "assertionId": "classical-late-grammar-frozen-third-person-reflexive:p5304-there-is-a-strange-formation-in-which-a-reflexive",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5304": [
      "closed-construction-exception",
      "frozen-reflexive"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5304": "authorized"
  }
};
export default Object.freeze(spec);
