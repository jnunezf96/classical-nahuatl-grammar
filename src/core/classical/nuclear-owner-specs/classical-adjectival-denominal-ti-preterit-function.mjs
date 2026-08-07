const spec = {
  "ownerId": "classical-adjectival-denominal-ti-preterit-function",
  "prefix": "ClassicalAdjectivalDenominalTiPreteritFunction",
  "operationId": "classical.adjectival.denominal.ti.preterit.function.execute",
  "inputContract": "complete-typed-classical-adjectival-denominal-ti-preterit-function-source",
  "domain": "classical-adjectival-denominal-ti-preterit-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3906",
    "claim-p3907"
  ],
  "coordinates": {
    "claim-p3906::p3906-lesson-40-there-are-a-vast-number-of-adjectival": {
      "assertionId": "classical-adjectival-denominal-ti-preterit-function:p3906-lesson-40-there-are-a-vast-number-of-adjectival",
      "canonicalPath": "cases.preteritAgentive.canonicalResult"
    },
    "claim-p3907::p3907-one-must-be-prepared-to-locate-the-quality-associated": {
      "assertionId": "classical-adjectival-denominal-ti-preterit-function:p3907-one-must-be-prepared-to-locate-the-quality-associated",
      "canonicalPath": "cases.preteritAgentive.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3906": [],
    "claim-p3907": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3906": "authorized",
    "claim-p3907": "authorized"
  }
};
export default Object.freeze(spec);
