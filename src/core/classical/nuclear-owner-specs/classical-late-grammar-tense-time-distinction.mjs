const spec = {
  "ownerId": "classical-late-grammar-tense-time-distinction",
  "prefix": "ClassicalLateGrammarTenseTimeDistinction",
  "operationId": "classical.late.grammar.tense.time.distinction.execute",
  "inputContract": "complete-typed-classical-late-grammar-tense-time-distinction-source",
  "domain": "classical-late-grammar-tense-time-distinction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-contextual-time-runtime",
  "selections": [
    "claim-p5236",
    "claim-p5237",
    "claim-p5238",
    "claim-p5239",
    "claim-p5240"
  ],
  "coordinates": {
    "claim-p5236::p5236-in-5-5-2-remark-it-was-pointed-out": {
      "assertionId": "classical-late-grammar-tense-time-distinction:p5236-in-5-5-2-remark-it-was-pointed-out",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5237::p5237-this-is-made-evident-in-nahuatl-in-the-frequent": {
      "assertionId": "classical-late-grammar-tense-time-distinction:p5237-this-is-made-evident-in-nahuatl-in-the-frequent",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5238::p5238-such-nonsystemic-usage-occurs-primarily-in-situations-where-a": {
      "assertionId": "classical-late-grammar-tense-time-distinction:p5238-such-nonsystemic-usage-occurs-primarily-in-situations-where-a",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5239::p5239-consequently-such-shifts-are-most-frequent-in-concatenate-constructions": {
      "assertionId": "classical-late-grammar-tense-time-distinction:p5239-consequently-such-shifts-are-most-frequent-in-concatenate-constructions",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    },
    "claim-p5240::p5240-many-instances-of-the-nonsystemic-use-of-tense-have": {
      "assertionId": "classical-late-grammar-tense-time-distinction:p5240-many-instances-of-the-nonsystemic-use-of-tense-have",
      "canonicalPath": "analysis.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5236": [
      "contextual-time",
      "default"
    ],
    "claim-p5237": [
      "contextual-time",
      "default"
    ],
    "claim-p5238": [
      "contextual-time",
      "default"
    ],
    "claim-p5239": [
      "contextual-time",
      "default"
    ],
    "claim-p5240": [
      "contextual-time",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5236": "authorized",
    "claim-p5237": "authorized",
    "claim-p5238": "authorized",
    "claim-p5239": "authorized",
    "claim-p5240": "authorized"
  }
};
export default Object.freeze(spec);
