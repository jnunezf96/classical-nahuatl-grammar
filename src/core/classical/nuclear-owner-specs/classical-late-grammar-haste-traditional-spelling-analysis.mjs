const spec = {
  "ownerId": "classical-late-grammar-haste-traditional-spelling-analysis",
  "prefix": "ClassicalLateGrammarHasteTraditionalSpellingAnalysis",
  "operationId": "classical.late.grammar.haste.traditional.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-late-grammar-haste-traditional-spelling-analysis-source",
  "domain": "classical-late-grammar-haste-traditional-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-exclamatory-utterance-runtime",
  "selections": [
    "claim-p5309",
    "claim-p5310",
    "claim-p5311",
    "claim-p5312",
    "claim-p5313",
    "claim-p5314",
    "claim-p5315",
    "claim-p5316"
  ],
  "coordinates": {
    "claim-p5309::p5309-traditionally-written-oque": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5309-traditionally-written-oque",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5310::p5310-traditionally-written-tlaoque-or-tlaque-with-elision-of-the": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5310-traditionally-written-tlaoque-or-tlaque-with-elision-of-the",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5311::p5311-traditionally-written-maoque-or-maque-with-elision-of-the": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5311-traditionally-written-maoque-or-maque-with-elision-of-the",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5312::p5312-traditionally-written-tlacuel-tlacuele-and-tlacuelehuatl": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5312-traditionally-written-tlacuel-tlacuele-and-tlacuelehuatl",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    },
    "claim-p5313::p5313-traditionally-written-macuel-macuele-and-macuelehuatl": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5313-traditionally-written-macuel-macuele-and-macuelehuatl",
      "canonicalPath": "analysis.translationAuthority"
    },
    "claim-p5314::p5314-traditionally-written-mayecuel-and-mayecuele": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5314-traditionally-written-mayecuel-and-mayecuele",
      "canonicalPath": "analysis.traditionalSpellingAuthority"
    },
    "claim-p5315::p5315-maye-cue-l-eh": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5315-maye-cue-l-eh",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5316::p5316-traditionally-written-tlayecuel-and-tlayecuele": {
      "assertionId": "classical-late-grammar-haste-traditional-spelling-analysis:p5316-traditionally-written-tlayecuel-and-tlayecuele",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5309": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5310": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5311": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5312": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5313": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5314": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5315": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5316": [
      "exclamatory-utterance",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5309": "authorized",
    "claim-p5310": "authorized",
    "claim-p5311": "authorized",
    "claim-p5312": "authorized",
    "claim-p5313": "authorized",
    "claim-p5314": "authorized",
    "claim-p5315": "authorized",
    "claim-p5316": "authorized"
  }
};
export default Object.freeze(spec);
