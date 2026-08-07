const spec = {
  "ownerId": "classical-adjectival-cardinal-numeral-modifier",
  "prefix": "ClassicalAdjectivalCardinalNumeralModifier",
  "operationId": "classical.adjectival.cardinal.numeral.modifier.execute",
  "inputContract": "complete-typed-classical-adjectival-cardinal-numeral-modifier-source",
  "domain": "classical-adjectival-cardinal-numeral-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4066",
    "claim-p4067"
  ],
  "coordinates": {
    "claim-p4066::p4066-a-structure-of-modification-containing-a-cardinal-numeral-nnc": {
      "assertionId": "classical-adjectival-cardinal-numeral-modifier:p4066-a-structure-of-modification-containing-a-cardinal-numeral-nnc",
      "canonicalPath": "cases.cardinalModifier.canonicalResult"
    },
    "claim-p4067::p4067-a-common-use-of-the-cardinal-numeral-nnc-as": {
      "assertionId": "classical-adjectival-cardinal-numeral-modifier:p4067-a-common-use-of-the-cardinal-numeral-nnc-as",
      "canonicalPath": "cases.cardinalModifier.modifierClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4066": [],
    "claim-p4067": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4066": "authorized",
    "claim-p4067": "authorized"
  }
};
export default Object.freeze(spec);
