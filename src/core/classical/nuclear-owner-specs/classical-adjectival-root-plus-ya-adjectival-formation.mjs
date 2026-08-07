const spec = {
  "ownerId": "classical-adjectival-root-plus-ya-adjectival-formation",
  "prefix": "ClassicalAdjectivalRootPlusYaAdjectivalFormation",
  "operationId": "classical.adjectival.root.plus.ya.adjectival.formation.execute",
  "inputContract": "complete-typed-classical-adjectival-root-plus-ya-adjectival-formation-source",
  "domain": "classical-adjectival-root-plus-ya-adjectival-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3922",
    "claim-p3923",
    "claim-p3924"
  ],
  "coordinates": {
    "claim-p3922::p3922-intransitive-root-plus-ya-verbstems-permit-a-special-adjectival": {
      "assertionId": "classical-adjectival-root-plus-ya-adjectival-formation:p3922-intransitive-root-plus-ya-verbstems-permit-a-special-adjectival",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3923::p3923-denominal-verbstems-ending-in-ti-ya-formed-according-to": {
      "assertionId": "classical-adjectival-root-plus-ya-adjectival-formation:p3923-denominal-verbstems-ending-in-ti-ya-formed-according-to",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3924::p3924-some-of-these-root-plus-ya-verbs-also-use": {
      "assertionId": "classical-adjectival-root-plus-ya-adjectival-formation:p3924-some-of-these-root-plus-ya-verbs-also-use",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3922": [],
    "claim-p3923": [],
    "claim-p3924": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3922": "authorized",
    "claim-p3923": "authorized",
    "claim-p3924": "authorized"
  }
};
export default Object.freeze(spec);
