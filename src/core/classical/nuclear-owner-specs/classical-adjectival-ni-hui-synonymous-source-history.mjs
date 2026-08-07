const spec = {
  "ownerId": "classical-adjectival-ni-hui-synonymous-source-history",
  "prefix": "ClassicalAdjectivalNiHuiSynonymousSourceHistory",
  "operationId": "classical.adjectival.ni.hui.synonymous.source.history.execute",
  "inputContract": "complete-typed-classical-adjectival-ni-hui-synonymous-source-history-source",
  "domain": "classical-adjectival-ni-hui-synonymous-source-history",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3933",
    "claim-p3934",
    "claim-p3935",
    "claim-p3936",
    "claim-p3937"
  ],
  "coordinates": {
    "claim-p3933::p3933-intransitive-destockal-verbstems-with-the-suffix-ni-and-rarely": {
      "assertionId": "classical-adjectival-ni-hui-synonymous-source-history:p3933-intransitive-destockal-verbstems-with-the-suffix-ni-and-rarely",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3934::p3934-these-are-denominal-verbstems-derived-from-the-deverbal-nounstems": {
      "assertionId": "classical-adjectival-ni-hui-synonymous-source-history:p3934-these-are-denominal-verbstems-derived-from-the-deverbal-nounstems",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3935::p3935-the-preterit-agentive-nounstems-formed-from-these-synonymous-verbstems": {
      "assertionId": "classical-adjectival-ni-hui-synonymous-source-history:p3935-the-preterit-agentive-nounstems-formed-from-these-synonymous-verbstems",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    },
    "claim-p3936::p3936-it-is-green": {
      "assertionId": "classical-adjectival-ni-hui-synonymous-source-history:p3936-it-is-green",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3937::p3937-it-is-diminished": {
      "assertionId": "classical-adjectival-ni-hui-synonymous-source-history:p3937-it-is-diminished",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3933": [],
    "claim-p3934": [],
    "claim-p3935": [],
    "claim-p3936": [],
    "claim-p3937": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3933": "authorized",
    "claim-p3934": "authorized",
    "claim-p3935": "authorized",
    "claim-p3936": "authorized",
    "claim-p3937": "authorized"
  }
};
export default Object.freeze(spec);
