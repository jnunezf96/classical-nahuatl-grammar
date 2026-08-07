const spec = {
  "ownerId": "classical-personal-name-nnc-historical-third-person-source",
  "prefix": "ClassicalPersonalNameNncHistoricalThirdPersonSource",
  "operationId": "classical.personal.name.nnc.historical.third.person.source.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-historical-third-person-source-source",
  "domain": "classical-personal-name-nnc-historical-third-person-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5159"
  ],
  "coordinates": {
    "claim-p5159::p5159-nahuatl-personal-names-which-always-appear-in-historical-studies": {
      "assertionId": "classical-personal-name-nnc-historical-third-person-source:p5159-nahuatl-personal-names-which-always-appear-in-historical-studies",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5159": [
      "historical-third-person-source",
      "preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5159": "authorized"
  }
};
export default Object.freeze(spec);
