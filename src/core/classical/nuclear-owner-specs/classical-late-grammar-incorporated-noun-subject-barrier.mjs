const spec = {
  "ownerId": "classical-late-grammar-incorporated-noun-subject-barrier",
  "prefix": "ClassicalLateGrammarIncorporatedNounSubjectBarrier",
  "operationId": "classical.late.grammar.incorporated.noun.subject.barrier.execute",
  "inputContract": "complete-typed-classical-late-grammar-incorporated-noun-subject-barrier-source",
  "domain": "classical-late-grammar-incorporated-noun-subject-barrier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-incorporated-noun-role-runtime",
  "selections": [
    "claim-p5328",
    "claim-p5329",
    "claim-p5330",
    "claim-p5331",
    "claim-p5332"
  ],
  "coordinates": {
    "claim-p5328::p5328-the-possible-functions-of-a-nounstem-incorporated-into-a": {
      "assertionId": "classical-late-grammar-incorporated-noun-subject-barrier:p5328-the-possible-functions-of-a-nounstem-incorporated-into-a",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5329::p5329-in-nahuatl-the-nuclear-subject-the-subject-in-the": {
      "assertionId": "classical-late-grammar-incorporated-noun-subject-barrier:p5329-in-nahuatl-the-nuclear-subject-the-subject-in-the",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5330::p5330-there-is-no-way-the-positions-filled-by-the": {
      "assertionId": "classical-late-grammar-incorporated-noun-subject-barrier:p5330-there-is-no-way-the-positions-filled-by-the",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5331::p5331-since-however-the-third-person-subject-pronoun-has-its": {
      "assertionId": "classical-late-grammar-incorporated-noun-subject-barrier:p5331-since-however-the-third-person-subject-pronoun-has-its",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    },
    "claim-p5332::p5332-there-are-two-situations-in-which-this-temptation-is": {
      "assertionId": "classical-late-grammar-incorporated-noun-subject-barrier:p5332-there-are-two-situations-in-which-this-temptation-is",
      "canonicalPath": "analysis.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5328": [
      "incorporated-noun-role",
      "default"
    ],
    "claim-p5329": [
      "incorporated-noun-role",
      "default"
    ],
    "claim-p5330": [
      "incorporated-noun-role",
      "default"
    ],
    "claim-p5331": [
      "incorporated-noun-role",
      "default"
    ],
    "claim-p5332": [
      "incorporated-noun-role",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5328": "authorized",
    "claim-p5329": "authorized",
    "claim-p5330": "authorized",
    "claim-p5331": "authorized",
    "claim-p5332": "authorized"
  }
};
export default Object.freeze(spec);
