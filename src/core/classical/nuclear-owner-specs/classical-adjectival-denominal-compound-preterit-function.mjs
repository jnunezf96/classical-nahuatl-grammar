const spec = {
  "ownerId": "classical-adjectival-denominal-compound-preterit-function",
  "prefix": "ClassicalAdjectivalDenominalCompoundPreteritFunction",
  "operationId": "classical.adjectival.denominal.compound.preterit.function.execute",
  "inputContract": "complete-typed-classical-adjectival-denominal-compound-preterit-function-source",
  "domain": "classical-adjectival-denominal-compound-preterit-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4006",
    "claim-p4007"
  ],
  "coordinates": {
    "claim-p4006::p4006-a-compound-nounstem-can-be-the-source-for-a": {
      "assertionId": "classical-adjectival-denominal-compound-preterit-function:p4006-a-compound-nounstem-can-be-the-source-for-a",
      "canonicalPath": "cases.preteritAgentive.canonicalResult"
    },
    "claim-p4007::p4007-the-most-frequent-use-of-these-verbstems-is-in": {
      "assertionId": "classical-adjectival-denominal-compound-preterit-function:p4007-the-most-frequent-use-of-these-verbstems-is-in",
      "canonicalPath": "cases.preteritAgentive.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4006": [],
    "claim-p4007": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4006": "authorized",
    "claim-p4007": "authorized"
  }
};
export default Object.freeze(spec);
