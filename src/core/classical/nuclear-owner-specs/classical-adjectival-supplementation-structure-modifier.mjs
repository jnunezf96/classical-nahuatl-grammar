const spec = {
  "ownerId": "classical-adjectival-supplementation-structure-modifier",
  "prefix": "ClassicalAdjectivalSupplementationStructureModifier",
  "operationId": "classical.adjectival.supplementation.structure.modifier.execute",
  "inputContract": "complete-typed-classical-adjectival-supplementation-structure-modifier-source",
  "domain": "classical-adjectival-supplementation-structure-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4075",
    "claim-p4076",
    "claim-p4077",
    "claim-p4078",
    "claim-p4079"
  ],
  "coordinates": {
    "claim-p4075::p4075-a-structure-of-supplementation": {
      "assertionId": "classical-adjectival-supplementation-structure-modifier:p4075-a-structure-of-supplementation",
      "canonicalPath": "cases.supplementationModifier.canonicalResult"
    },
    "claim-p4076::p4076-contrary-to-what-translation-suggests-when-a-personal-pronominal": {
      "assertionId": "classical-adjectival-supplementation-structure-modifier:p4076-contrary-to-what-translation-suggests-when-a-personal-pronominal",
      "canonicalPath": "cases.supplementationModifier.modifierClauseType"
    },
    "claim-p4077::p4077-when-a-personal-pronominal-nnc-see-16": {
      "assertionId": "classical-adjectival-supplementation-structure-modifier:p4077-when-a-personal-pronominal-nnc-see-16",
      "canonicalPath": "sources.supplementation.authorizationStatus"
    },
    "claim-p4078::p4078-the-structure-of-modification-in-in-tlahtoa-ni-is": {
      "assertionId": "classical-adjectival-supplementation-structure-modifier:p4078-the-structure-of-modification-in-in-tlahtoa-ni-is",
      "canonicalPath": "cases.supplementationModifier.canonicalResult"
    },
    "claim-p4079::p4079-the-structure-of-modification-i-n-quipiyah-otomih-in": {
      "assertionId": "classical-adjectival-supplementation-structure-modifier:p4079-the-structure-of-modification-i-n-quipiyah-otomih-in",
      "canonicalPath": "cases.supplementationModifier.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4075": [],
    "claim-p4076": [],
    "claim-p4077": [],
    "claim-p4078": [],
    "claim-p4079": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4075": "authorized",
    "claim-p4076": "authorized",
    "claim-p4077": "authorized",
    "claim-p4078": "authorized",
    "claim-p4079": "authorized"
  }
};
export default Object.freeze(spec);
