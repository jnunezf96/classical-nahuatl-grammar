const spec = {
  "ownerId": "classical-adjectival-male-bonding-modification",
  "prefix": "ClassicalAdjectivalMaleBondingModification",
  "operationId": "classical.adjectival.male.bonding.modification.execute",
  "inputContract": "complete-typed-classical-adjectival-male-bonding-modification-source",
  "domain": "classical-adjectival-male-bonding-modification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4130",
    "claim-p4131",
    "claim-p4132",
    "claim-p4133"
  ],
  "coordinates": {
    "claim-p4130::p4130-another-idiomatic-structure-of-modification-involves-the-nounstem-oquich": {
      "assertionId": "classical-adjectival-male-bonding-modification:p4130-another-idiomatic-structure-of-modification-involves-the-nounstem-oquich",
      "canonicalPath": "cases.maleBonding.canonicalResult"
    },
    "claim-p4131::p4131-as-stated-in-18-7-a-male-speaker-having": {
      "assertionId": "classical-adjectival-male-bonding-modification:p4131-as-stated-in-18-7-a-male-speaker-having",
      "canonicalPath": "cases.maleBonding.exceptionProfile"
    },
    "claim-p4132::p4132-if-a-woman": {
      "assertionId": "classical-adjectival-male-bonding-modification:p4132-if-a-woman",
      "canonicalPath": "cases.maleBonding.discourseSourceContextPresent"
    },
    "claim-p4133::p4133-if-a-woman-or-a-man-not-associated-with": {
      "assertionId": "classical-adjectival-male-bonding-modification:p4133-if-a-woman-or-a-man-not-associated-with",
      "canonicalPath": "cases.maleBonding.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4130": [],
    "claim-p4131": [],
    "claim-p4132": [],
    "claim-p4133": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4130": "authorized",
    "claim-p4131": "authorized",
    "claim-p4132": "authorized",
    "claim-p4133": "authorized"
  }
};
export default Object.freeze(spec);
