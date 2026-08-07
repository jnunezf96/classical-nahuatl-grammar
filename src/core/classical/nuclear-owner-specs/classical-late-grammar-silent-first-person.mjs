const spec = {
  "ownerId": "classical-late-grammar-silent-first-person",
  "prefix": "ClassicalLateGrammarSilentFirstPerson",
  "operationId": "classical.late.grammar.silent.first.person.execute",
  "inputContract": "complete-typed-classical-late-grammar-silent-first-person-source",
  "domain": "classical-late-grammar-silent-first-person",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-silent-first-person-runtime",
  "selections": [
    "claim-p5276",
    "claim-p5277",
    "claim-p5278",
    "claim-p5279"
  ],
  "coordinates": {
    "claim-p5276::p5276-in-a-sequence-of-concatenated-vncs-all-of-which": {
      "assertionId": "classical-late-grammar-silent-first-person:p5276-in-a-sequence-of-concatenated-vncs-all-of-which",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5277::p5277-it-is-as-if-the-pers1-subposition-in-the": {
      "assertionId": "classical-late-grammar-silent-first-person:p5277-it-is-as-if-the-pers1-subposition-in-the",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5278::p5278-the-sentences-may-be-juxtaposed-either-by-adjunction-creating": {
      "assertionId": "classical-late-grammar-silent-first-person:p5278-the-sentences-may-be-juxtaposed-either-by-adjunction-creating",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5279::p5279-there-is-one-other-situation-in-which-the-morph": {
      "assertionId": "classical-late-grammar-silent-first-person:p5279-there-is-one-other-situation-in-which-the-morph",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5276": [
      "silent-first-person",
      "default"
    ],
    "claim-p5277": [
      "silent-first-person",
      "default"
    ],
    "claim-p5278": [
      "silent-first-person",
      "default"
    ],
    "claim-p5279": [
      "silent-first-person",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5276": "authorized",
    "claim-p5277": "authorized",
    "claim-p5278": "authorized",
    "claim-p5279": "authorized"
  }
};
export default Object.freeze(spec);
