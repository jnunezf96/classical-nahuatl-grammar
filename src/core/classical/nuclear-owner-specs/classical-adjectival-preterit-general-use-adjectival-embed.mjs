const spec = {
  "ownerId": "classical-adjectival-preterit-general-use-adjectival-embed",
  "prefix": "ClassicalAdjectivalPreteritGeneralUseAdjectivalEmbed",
  "operationId": "classical.adjectival.preterit.general.use.adjectival.embed.execute",
  "inputContract": "complete-typed-classical-adjectival-preterit-general-use-adjectival-embed-source",
  "domain": "classical-adjectival-preterit-general-use-adjectival-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4009",
    "claim-p4010"
  ],
  "coordinates": {
    "claim-p4009::p4009-when-the-adjectivally-functioning-embed-is-a-preterit-agentive": {
      "assertionId": "classical-adjectival-preterit-general-use-adjectival-embed:p4009-when-the-adjectivally-functioning-embed-is-a-preterit-agentive",
      "canonicalPath": "sources.deverbal.authorizationStatus"
    },
    "claim-p4010::p4010-when-the-adjectivally-functioning-embed-is-a-preterit-agentive": {
      "assertionId": "classical-adjectival-preterit-general-use-adjectival-embed:p4010-when-the-adjectivally-functioning-embed-is-a-preterit-agentive",
      "canonicalPath": "sources.deverbal.typedFrameAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4009": [],
    "claim-p4010": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4009": "authorized",
    "claim-p4010": "authorized"
  }
};
export default Object.freeze(spec);
