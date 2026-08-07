const spec = {
  "ownerId": "classical-adjectival-huei-pronominal-function",
  "prefix": "ClassicalAdjectivalHueiPronominalFunction",
  "operationId": "classical.adjectival.huei.pronominal.function.execute",
  "inputContract": "complete-typed-classical-adjectival-huei-pronominal-function-source",
  "domain": "classical-adjectival-huei-pronominal-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3865"
  ],
  "coordinates": {
    "claim-p3865::p3865-one-adjectival-stem-hue-i-big-person-big-thing": {
      "assertionId": "classical-adjectival-huei-pronominal-function:p3865-one-adjectival-stem-hue-i-big-person-big-thing",
      "canonicalPath": "cases.pronominalHead.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3865": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3865": "authorized"
  }
};
export default Object.freeze(spec);
