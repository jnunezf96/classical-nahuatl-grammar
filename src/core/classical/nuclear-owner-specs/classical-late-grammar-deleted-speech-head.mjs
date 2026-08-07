const spec = {
  "ownerId": "classical-late-grammar-deleted-speech-head",
  "prefix": "ClassicalLateGrammarDeletedSpeechHead",
  "operationId": "classical.late.grammar.deleted.speech.head.execute",
  "inputContract": "complete-typed-classical-late-grammar-deleted-speech-head-source",
  "domain": "classical-late-grammar-deleted-speech-head",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deleted-speech-head-runtime",
  "selections": [
    "claim-p5274",
    "claim-p5275"
  ],
  "coordinates": {
    "claim-p5274::p5274-object-pronoun-that-serves-as-head-for-the-quotation": {
      "assertionId": "classical-late-grammar-deleted-speech-head:p5274-object-pronoun-that-serves-as-head-for-the-quotation",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5275::p5275-the-deletion-also-occurs-in-the-indirect-speech-construction": {
      "assertionId": "classical-late-grammar-deleted-speech-head:p5275-the-deletion-also-occurs-in-the-indirect-speech-construction",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5274": [
      "deleted-speech-head",
      "default"
    ],
    "claim-p5275": [
      "deleted-speech-head",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5274": "authorized",
    "claim-p5275": "authorized"
  }
};
export default Object.freeze(spec);
