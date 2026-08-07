const spec = {
  "ownerId": "classical-adjectival-ihui-ahui-synonymous-source-history",
  "prefix": "ClassicalAdjectivalIhuiAhuiSynonymousSourceHistory",
  "operationId": "classical.adjectival.ihui.ahui.synonymous.source.history.execute",
  "inputContract": "complete-typed-classical-adjectival-ihui-ahui-synonymous-source-history-source",
  "domain": "classical-adjectival-ihui-ahui-synonymous-source-history",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3945",
    "claim-p3946",
    "claim-p3947",
    "claim-p3948",
    "claim-p3949"
  ],
  "coordinates": {
    "claim-p3945::p3945-these-are-denominal-verbstems-derived-from-the-deverbal-nounstems": {
      "assertionId": "classical-adjectival-ihui-ahui-synonymous-source-history:p3945-these-are-denominal-verbstems-derived-from-the-deverbal-nounstems",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3946::p3946-the-preterit-agentive-nounstems-from-these-synonymous-verbstems-can": {
      "assertionId": "classical-adjectival-ihui-ahui-synonymous-source-history:p3946-the-preterit-agentive-nounstems-from-these-synonymous-verbstems-can",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3947::p3947-it-is-black": {
      "assertionId": "classical-adjectival-ihui-ahui-synonymous-source-history:p3947-it-is-black",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    },
    "claim-p3948::p3948-it-is-wrinkled": {
      "assertionId": "classical-adjectival-ihui-ahui-synonymous-source-history:p3948-it-is-wrinkled",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3949::p3949-the-source-verbstems-are-both-formed-on-the-stock": {
      "assertionId": "classical-adjectival-ihui-ahui-synonymous-source-history:p3949-the-source-verbstems-are-both-formed-on-the-stock",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3945": [],
    "claim-p3946": [],
    "claim-p3947": [],
    "claim-p3948": [],
    "claim-p3949": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3945": "authorized",
    "claim-p3946": "authorized",
    "claim-p3947": "authorized",
    "claim-p3948": "authorized",
    "claim-p3949": "authorized"
  }
};
export default Object.freeze(spec);
