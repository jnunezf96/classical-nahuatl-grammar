const spec = {
  "ownerId": "classical-adjectival-cooperating-preposed-nonpreposed",
  "prefix": "ClassicalAdjectivalCooperatingPreposedNonpreposed",
  "operationId": "classical.adjectival.cooperating.preposed.nonpreposed.execute",
  "inputContract": "complete-typed-classical-adjectival-cooperating-preposed-nonpreposed-source",
  "domain": "classical-adjectival-cooperating-preposed-nonpreposed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4092"
  ],
  "coordinates": {
    "claim-p4092::p4092-there-may-be-both-preposed-and-nonpreposed-adjectival-modifiers": {
      "assertionId": "classical-adjectival-cooperating-preposed-nonpreposed:p4092-there-may-be-both-preposed-and-nonpreposed-adjectival-modifiers",
      "canonicalPath": "cases.cooperating.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4092": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4092": "authorized"
  }
};
export default Object.freeze(spec);
