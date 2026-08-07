const spec = {
  "ownerId": "classical-entitive-pronominal-subtype-system",
  "prefix": "ClassicalEntitivePronominalSubtypeSystem",
  "operationId": "classical.entitive.pronominal.subtype.system.execute",
  "inputContract": "complete-typed-classical-entitive-pronominal-subtype-system-source",
  "domain": "classical-entitive-pronominal-subtype-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1648",
    "claim-p1649",
    "claim-p1650",
    "claim-p1651",
    "claim-p1652"
  ],
  "coordinates": {
    "claim-p1648::p1648-there-are-four-subtypes-of-entitive-pronominal-nncs-personal": {
      "assertionId": "classical-entitive-pronominal-subtype-system:p1648-there-are-four-subtypes-of-entitive-pronominal-nncs-personal",
      "canonicalPath": "pronominalFrame.sourceFrame.semanticKind"
    },
    "claim-p1649::p1649-nahuatl-has-no-relative-pronouns": {
      "assertionId": "classical-entitive-pronominal-subtype-system:p1649-nahuatl-has-no-relative-pronouns",
      "canonicalPath": "pronominalFrame.sourceFrame.relativePronounInventory"
    },
    "claim-p1650::p1650-the-only-real-personal-pronouns-in-nahuatl-are-the": {
      "assertionId": "classical-entitive-pronominal-subtype-system:p1650-the-only-real-personal-pronouns-in-nahuatl-are-the",
      "canonicalPath": "pronominalFrame.sourceFrame.subtype"
    },
    "claim-p1651::p1651-there-are-however-two-nounstems-one-simple-eh-and": {
      "assertionId": "classical-entitive-pronominal-subtype-system:p1651-there-are-however-two-nounstems-one-simple-eh-and",
      "canonicalPath": "pronominalFrame.sourceFrame.EnglishPronounTranslationIsStructuralAuthority"
    },
    "claim-p1652::p1652-the-meaning-of-both-nounstems-seems-to-be-an": {
      "assertionId": "classical-entitive-pronominal-subtype-system:p1652-the-meaning-of-both-nounstems-seems-to-be-an",
      "canonicalPath": "pronominalFrame.sourceFrame.referentCategory"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1648": [
      "l16-personal-simple"
    ],
    "claim-p1649": [
      "l16-personal-simple"
    ],
    "claim-p1650": [
      "l16-personal-simple"
    ],
    "claim-p1651": [
      "l16-personal-simple"
    ],
    "claim-p1652": [
      "l16-personal-simple"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1648": "authorized",
    "claim-p1649": "authorized",
    "claim-p1650": "authorized",
    "claim-p1651": "authorized",
    "claim-p1652": "authorized"
  }
};
export default Object.freeze(spec);
