const spec = {
  "ownerId": "classical-late-grammar-preterit-agentive-object-complement",
  "prefix": "ClassicalLateGrammarPreteritAgentiveObjectComplement",
  "operationId": "classical.late.grammar.preterit.agentive.object.complement.execute",
  "inputContract": "complete-typed-classical-late-grammar-preterit-agentive-object-complement-source",
  "domain": "classical-late-grammar-preterit-agentive-object-complement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-closed-construction-exception-runtime",
  "selections": [
    "claim-p5298",
    "claim-p5299",
    "claim-p5300"
  ],
  "coordinates": {
    "claim-p5298::p5298-occasionally-the-restricted-use-preterit-as-present-agentive-nounstem": {
      "assertionId": "classical-late-grammar-preterit-agentive-object-complement:p5298-occasionally-the-restricted-use-preterit-as-present-agentive-nounstem",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5299::p5299-even-more-surprising-is-the-fact-that-the-subject": {
      "assertionId": "classical-late-grammar-preterit-agentive-object-complement:p5299-even-more-surprising-is-the-fact-that-the-subject",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5300::p5300-unattested-verbstem-petzi-to-become-smooth-shiny-polished-see": {
      "assertionId": "classical-late-grammar-preterit-agentive-object-complement:p5300-unattested-verbstem-petzi-to-become-smooth-shiny-polished-see",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5298": [
      "closed-construction-exception",
      "object-complement"
    ],
    "claim-p5299": [
      "closed-construction-exception",
      "object-complement"
    ],
    "claim-p5300": [
      "closed-construction-exception",
      "object-complement"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5298": "authorized",
    "claim-p5299": "authorized",
    "claim-p5300": "authorized"
  }
};
export default Object.freeze(spec);
