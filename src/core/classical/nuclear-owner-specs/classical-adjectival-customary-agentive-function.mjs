const spec = {
  "ownerId": "classical-adjectival-customary-agentive-function",
  "prefix": "ClassicalAdjectivalCustomaryAgentiveFunction",
  "operationId": "classical.adjectival.customary.agentive.function.execute",
  "inputContract": "complete-typed-classical-adjectival-customary-agentive-function-source",
  "domain": "classical-adjectival-customary-agentive-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3898",
    "claim-p3899"
  ],
  "coordinates": {
    "claim-p3898::p3898-the-nominalized-active-voice-customary-present-predicate-i-e": {
      "assertionId": "classical-adjectival-customary-agentive-function:p3898-the-nominalized-active-voice-customary-present-predicate-i-e",
      "canonicalPath": "cases.customaryAgentive.canonicalResult"
    },
    "claim-p3899::p3899-a-vnc-built-on-a-connective-t-compound-verbstem": {
      "assertionId": "classical-adjectival-customary-agentive-function:p3899-a-vnc-built-on-a-connective-t-compound-verbstem",
      "canonicalPath": "cases.customaryAgentive.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3898": [],
    "claim-p3899": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3898": "authorized",
    "claim-p3899": "authorized"
  }
};
export default Object.freeze(spec);
