const spec = {
  "ownerId": "classical-adjectival-hueiya-adjectival-alternative",
  "prefix": "ClassicalAdjectivalHueiyaAdjectivalAlternative",
  "operationId": "classical.adjectival.hueiya.adjectival.alternative.execute",
  "inputContract": "complete-typed-classical-adjectival-hueiya-adjectival-alternative-source",
  "domain": "classical-adjectival-hueiya-adjectival-alternative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3925",
    "claim-p3926",
    "claim-p3927"
  ],
  "coordinates": {
    "claim-p3925::p3925-the-verbstem-hue-i-ya-to-become-big-to": {
      "assertionId": "classical-adjectival-hueiya-adjectival-alternative:p3925-the-verbstem-hue-i-ya-to-become-big-to",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3926::p3926-the-verb-s-class-b-stem-is-also-used": {
      "assertionId": "classical-adjectival-hueiya-adjectival-alternative:p3926-the-verb-s-class-b-stem-is-also-used",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3927::p3927-the-preterit-agentive-nounstem-built-on-the-verb-s": {
      "assertionId": "classical-adjectival-hueiya-adjectival-alternative:p3927-the-preterit-agentive-nounstem-built-on-the-verb-s",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3925": [],
    "claim-p3926": [],
    "claim-p3927": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3925": "authorized",
    "claim-p3926": "authorized",
    "claim-p3927": "authorized"
  }
};
export default Object.freeze(spec);
