const spec = {
  "ownerId": "classical-adjectival-z-tiya-synonymous-triplet",
  "prefix": "ClassicalAdjectivalZTiyaSynonymousTriplet",
  "operationId": "classical.adjectival.z.tiya.synonymous.triplet.execute",
  "inputContract": "complete-typed-classical-adjectival-z-tiya-synonymous-triplet-source",
  "domain": "classical-adjectival-z-tiya-synonymous-triplet",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3950",
    "claim-p3951",
    "claim-p3952",
    "claim-p3953",
    "claim-p3954",
    "claim-p3955"
  ],
  "coordinates": {
    "claim-p3950::p3950-the-other-is-derived-according-to-40-9-from": {
      "assertionId": "classical-adjectival-z-tiya-synonymous-triplet:p3950-the-other-is-derived-according-to-40-9-from",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3951::p3951-these-are-denominal-verbstems-derived-from-the-deverbal-nounstems": {
      "assertionId": "classical-adjectival-z-tiya-synonymous-triplet:p3951-these-are-denominal-verbstems-derived-from-the-deverbal-nounstems",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3952::p3952-it-is-slippery-like-a-fish-or-soap": {
      "assertionId": "classical-adjectival-z-tiya-synonymous-triplet:p3952-it-is-slippery-like-a-fish-or-soap",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    },
    "claim-p3953::p3953-it-is-soft": {
      "assertionId": "classical-adjectival-z-tiya-synonymous-triplet:p3953-it-is-soft",
      "canonicalPath": "cases.rootStockPatientive.canonicalResult"
    },
    "claim-p3954::p3954-occasionally-there-may-be-a-translatable-difference-in-the": {
      "assertionId": "classical-adjectival-z-tiya-synonymous-triplet:p3954-occasionally-there-may-be-a-translatable-difference-in-the",
      "canonicalPath": "cases.rootStockPatientive.modifierClauseType"
    },
    "claim-p3955::p3955-along-with-the-synonymous-preterit-agentive-nncs-discussed-in": {
      "assertionId": "classical-adjectival-z-tiya-synonymous-triplet:p3955-along-with-the-synonymous-preterit-agentive-nncs-discussed-in",
      "canonicalPath": "sources.patientive.cases.rootStockNi.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3950": [],
    "claim-p3951": [],
    "claim-p3952": [],
    "claim-p3953": [],
    "claim-p3954": [],
    "claim-p3955": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3950": "authorized",
    "claim-p3951": "authorized",
    "claim-p3952": "authorized",
    "claim-p3953": "authorized",
    "claim-p3954": "authorized",
    "claim-p3955": "authorized"
  }
};
export default Object.freeze(spec);
