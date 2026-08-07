const spec = {
  "ownerId": "classical-adjectival-numeral-quantitive-nonpreposed",
  "prefix": "ClassicalAdjectivalNumeralQuantitiveNonpreposed",
  "operationId": "classical.adjectival.numeral.quantitive.nonpreposed.execute",
  "inputContract": "complete-typed-classical-adjectival-numeral-quantitive-nonpreposed-source",
  "domain": "classical-adjectival-numeral-quantitive-nonpreposed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4091"
  ],
  "coordinates": {
    "claim-p4091::p4091-nahuatl-frequently-uses-the-nonpreposed-adjectival-adjunct-as-the": {
      "assertionId": "classical-adjectival-numeral-quantitive-nonpreposed:p4091-nahuatl-frequently-uses-the-nonpreposed-adjectival-adjunct-as-the",
      "canonicalPath": "cases.quantitiveHead.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4091": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4091": "authorized"
  }
};
export default Object.freeze(spec);
