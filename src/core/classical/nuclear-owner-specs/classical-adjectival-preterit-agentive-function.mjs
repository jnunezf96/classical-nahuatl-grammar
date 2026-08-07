const spec = {
  "ownerId": "classical-adjectival-preterit-agentive-function",
  "prefix": "ClassicalAdjectivalPreteritAgentiveFunction",
  "operationId": "classical.adjectival.preterit.agentive.function.execute",
  "inputContract": "complete-typed-classical-adjectival-preterit-agentive-function-source",
  "domain": "classical-adjectival-preterit-agentive-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3903",
    "claim-p3904",
    "claim-p3905"
  ],
  "coordinates": {
    "claim-p3903::p3903-the-nominalized-preterit-predicate-i-e-the-preterit-agentive": {
      "assertionId": "classical-adjectival-preterit-agentive-function:p3903-the-nominalized-preterit-predicate-i-e-the-preterit-agentive",
      "canonicalPath": "cases.preteritAgentive.canonicalResult"
    },
    "claim-p3904::p3904-the-majority-of-these-nominalized-vncs-are-built-on": {
      "assertionId": "classical-adjectival-preterit-agentive-function:p3904-the-majority-of-these-nominalized-vncs-are-built-on",
      "canonicalPath": "cases.preteritAgentive.modifierClauseType"
    },
    "claim-p3905::p3905-occasionally-the-adjectival-nnc-shows-an-idiomatic-or-metaphorical": {
      "assertionId": "classical-adjectival-preterit-agentive-function:p3905-occasionally-the-adjectival-nnc-shows-an-idiomatic-or-metaphorical",
      "canonicalPath": "sources.deverbal.cases.preteritAgentive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3903": [],
    "claim-p3904": [],
    "claim-p3905": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3903": "authorized",
    "claim-p3904": "authorized",
    "claim-p3905": "authorized"
  }
};
export default Object.freeze(spec);
