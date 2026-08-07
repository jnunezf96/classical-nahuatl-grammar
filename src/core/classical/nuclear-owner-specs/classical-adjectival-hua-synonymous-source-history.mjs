const spec = {
  "ownerId": "classical-adjectival-hua-synonymous-source-history",
  "prefix": "ClassicalAdjectivalHuaSynonymousSourceHistory",
  "operationId": "classical.adjectival.hua.synonymous.source.history.execute",
  "inputContract": "complete-typed-classical-adjectival-hua-synonymous-source-history-source",
  "domain": "classical-adjectival-hua-synonymous-source-history",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3938",
    "claim-p3939",
    "claim-p3940",
    "claim-p3941",
    "claim-p3942",
    "claim-p3943",
    "claim-p3944"
  ],
  "coordinates": {
    "claim-p3938::p3938-these-are-denominal-verbstems-derived-from-the-deverbal-nounstem": {
      "assertionId": "classical-adjectival-hua-synonymous-source-history:p3938-these-are-denominal-verbstems-derived-from-the-deverbal-nounstem",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3939::p3939-the-preterit-agentive-nounstems-formed-from-these-synonymous-verbstems": {
      "assertionId": "classical-adjectival-hua-synonymous-source-history:p3939-the-preterit-agentive-nounstems-formed-from-these-synonymous-verbstems",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3940::p3940-it-is-dirty": {
      "assertionId": "classical-adjectival-hua-synonymous-source-history:p3940-it-is-dirty",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    },
    "claim-p3941::p3941-it-is-ashen": {
      "assertionId": "classical-adjectival-hua-synonymous-source-history:p3941-it-is-ashen",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3942::p3942-it-is-faded": {
      "assertionId": "classical-adjectival-hua-synonymous-source-history:p3942-it-is-faded",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3943::p3943-when-translation-can-express-something-of-the-difference-in": {
      "assertionId": "classical-adjectival-hua-synonymous-source-history:p3943-when-translation-can-express-something-of-the-difference-in",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    },
    "claim-p3944::p3944-there-are-occasions-when-translation-can-express-something-of": {
      "assertionId": "classical-adjectival-hua-synonymous-source-history:p3944-there-are-occasions-when-translation-can-express-something-of",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3938": [],
    "claim-p3939": [],
    "claim-p3940": [],
    "claim-p3941": [],
    "claim-p3942": [],
    "claim-p3943": [],
    "claim-p3944": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3938": "authorized",
    "claim-p3939": "authorized",
    "claim-p3940": "authorized",
    "claim-p3941": "authorized",
    "claim-p3942": "authorized",
    "claim-p3943": "authorized",
    "claim-p3944": "authorized"
  }
};
export default Object.freeze(spec);
