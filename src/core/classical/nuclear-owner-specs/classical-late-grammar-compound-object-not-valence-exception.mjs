const spec = {
  "ownerId": "classical-late-grammar-compound-object-not-valence-exception",
  "prefix": "ClassicalLateGrammarCompoundObjectNotValenceException",
  "operationId": "classical.late.grammar.compound.object.not.valence.exception.execute",
  "inputContract": "complete-typed-classical-late-grammar-compound-object-not-valence-exception-source",
  "domain": "classical-late-grammar-compound-object-not-valence-exception",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-valence-source-analysis-runtime",
  "selections": [
    "claim-p5254",
    "claim-p5255",
    "claim-p5256",
    "claim-p5257",
    "claim-p5258"
  ],
  "coordinates": {
    "claim-p5254::p5254-care-must-be-taken-in-this-regard-when-assessing": {
      "assertionId": "classical-late-grammar-compound-object-not-valence-exception:p5254-care-must-be-taken-in-this-regard-when-assessing",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5255::p5255-when-assessing-compound-verbstems": {
      "assertionId": "classical-late-grammar-compound-object-not-valence-exception:p5255-when-assessing-compound-verbstems",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5256::p5256-at-first-sight-a-mante-ca-here-seems-to": {
      "assertionId": "classical-late-grammar-compound-object-not-valence-exception:p5256-at-first-sight-a-mante-ca-here-seems-to",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5257::p5257-this-first-impression-must-be-rejected-the-embed-stem": {
      "assertionId": "classical-late-grammar-compound-object-not-valence-exception:p5257-this-first-impression-must-be-rejected-the-embed-stem",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    },
    "claim-p5258::p5258-the-vnc-is-thus-translated-they-used-to-practice": {
      "assertionId": "classical-late-grammar-compound-object-not-valence-exception:p5258-the-vnc-is-thus-translated-they-used-to-practice",
      "canonicalPath": "analysis.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5254": [
      "valence-source-analysis",
      "compound"
    ],
    "claim-p5255": [
      "valence-source-analysis",
      "compound"
    ],
    "claim-p5256": [
      "valence-source-analysis",
      "compound"
    ],
    "claim-p5257": [
      "valence-source-analysis",
      "compound"
    ],
    "claim-p5258": [
      "valence-source-analysis",
      "compound"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5254": "authorized",
    "claim-p5255": "authorized",
    "claim-p5256": "authorized",
    "claim-p5257": "authorized",
    "claim-p5258": "authorized"
  }
};
export default Object.freeze(spec);
