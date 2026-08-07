const spec = {
  "ownerId": "classical-personal-name-nnc-impersonal-preterit-agentive",
  "prefix": "ClassicalPersonalNameNncImpersonalPreteritAgentive",
  "operationId": "classical.personal.name.nnc.impersonal.preterit.agentive.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-impersonal-preterit-agentive-source",
  "domain": "classical-personal-name-nnc-impersonal-preterit-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5196",
    "claim-p5197",
    "claim-p5198",
    "claim-p5199",
    "claim-p5200"
  ],
  "coordinates": {
    "claim-p5196::p5196-when-the-stem-of-a-personal-name-nnc-is": {
      "assertionId": "classical-personal-name-nnc-impersonal-preterit-agentive:p5196-when-the-stem-of-a-personal-name-nnc-is",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5197::p5197-when-the-stem-of-a-personal-name-nnc-is": {
      "assertionId": "classical-personal-name-nnc-impersonal-preterit-agentive:p5197-when-the-stem-of-a-personal-name-nnc-is",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5198::p5198-this-kind-of-name-has-a-stem-that-is": {
      "assertionId": "classical-personal-name-nnc-impersonal-preterit-agentive:p5198-this-kind-of-name-has-a-stem-that-is",
      "canonicalPath": "result.sourceFamily"
    },
    "claim-p5199::p5199-tla-co-l-i-hui-for-things-in-general": {
      "assertionId": "classical-personal-name-nnc-impersonal-preterit-agentive:p5199-tla-co-l-i-hui-for-things-in-general",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5200::p5200-the-name-has-been-mistranslated-as-curved-obsidian-blade": {
      "assertionId": "classical-personal-name-nnc-impersonal-preterit-agentive:p5200-the-name-has-been-mistranslated-as-curved-obsidian-blade",
      "canonicalPath": "analysis.scalarParadigmEquivalent"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5196": [
      "impersonal-preterit-agentive",
      "impersonal-preterit-agentive",
      "default",
      ""
    ],
    "claim-p5197": [
      "impersonal-preterit-agentive",
      "impersonal-preterit-agentive",
      "default",
      ""
    ],
    "claim-p5198": [
      "impersonal-preterit-agentive",
      "impersonal-preterit-agentive",
      "default",
      ""
    ],
    "claim-p5199": [
      "impersonal-preterit-agentive",
      "impersonal-preterit-agentive",
      "default",
      ""
    ],
    "claim-p5200": [
      "impersonal-preterit-agentive",
      "impersonal-preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5196": "authorized",
    "claim-p5197": "authorized",
    "claim-p5198": "authorized",
    "claim-p5199": "authorized",
    "claim-p5200": "authorized"
  }
};
export default Object.freeze(spec);
