const spec = {
  "ownerId": "classical-personal-name-nnc-present-agentive-adverbial-embed",
  "prefix": "ClassicalPersonalNameNncPresentAgentiveAdverbialEmbed",
  "operationId": "classical.personal.name.nnc.present.agentive.adverbial.embed.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-present-agentive-adverbial-embed-source",
  "domain": "classical-personal-name-nnc-present-agentive-adverbial-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5183",
    "claim-p5184",
    "claim-p5185",
    "claim-p5186",
    "claim-p5187"
  ],
  "coordinates": {
    "claim-p5183::p5183-a-present-agentive-nnc-serves-as-the-stem": {
      "assertionId": "classical-personal-name-nnc-present-agentive-adverbial-embed:p5183-a-present-agentive-nnc-serves-as-the-stem",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5184::p5184-therefore-with-the-adverbial-embed-equivalent-to-by-means": {
      "assertionId": "classical-personal-name-nnc-present-agentive-adverbial-embed:p5184-therefore-with-the-adverbial-embed-equivalent-to-by-means",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5185::p5185-what-is-absolutely-certain-is-that-the-entity-named": {
      "assertionId": "classical-personal-name-nnc-present-agentive-adverbial-embed:p5185-what-is-absolutely-certain-is-that-the-entity-named",
      "canonicalPath": "result.sourceFamily"
    },
    "claim-p5186::p5186-the-nounstem-filling-the-embed-subposition-of-a-compound": {
      "assertionId": "classical-personal-name-nnc-present-agentive-adverbial-embed:p5186-the-nounstem-filling-the-embed-subposition-of-a-compound",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5187::p5187-the-inner-embed-stem-chi-mal-li-shield-is": {
      "assertionId": "classical-personal-name-nnc-present-agentive-adverbial-embed:p5187-the-inner-embed-stem-chi-mal-li-shield-is",
      "canonicalPath": "analysis.scalarParadigmEquivalent"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5183": [
      "present-agentive-adverbial-embed",
      "present-agentive",
      "default",
      ""
    ],
    "claim-p5184": [
      "present-agentive-adverbial-embed",
      "present-agentive",
      "default",
      ""
    ],
    "claim-p5185": [
      "present-agentive-adverbial-embed",
      "present-agentive",
      "default",
      ""
    ],
    "claim-p5186": [
      "present-agentive-adverbial-embed",
      "present-agentive",
      "default",
      ""
    ],
    "claim-p5187": [
      "present-agentive-adverbial-embed",
      "present-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5183": "authorized",
    "claim-p5184": "authorized",
    "claim-p5185": "authorized",
    "claim-p5186": "authorized",
    "claim-p5187": "authorized"
  }
};
export default Object.freeze(spec);
