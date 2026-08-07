const spec = {
  "ownerId": "classical-numeral-conjunctive-compound",
  "prefix": "ClassicalNumeralConjunctiveCompound",
  "operationId": "classical.numeral.conjunctive.compound.execute",
  "inputContract": "complete-typed-classical-numeral-conjunctive-compound-source",
  "domain": "classical-numeral-conjunctive-compound",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3303",
    "claim-p3304"
  ],
  "coordinates": {
    "claim-p3303::p3303-in-addition-to-linking-numeral-nncs-by-means-of": {
      "assertionId": "classical-numeral-conjunctive-compound:p3303-in-addition-to-linking-numeral-nncs-by-means-of",
      "canonicalPath": "cases.conjunctiveCompound.rules.numeral/conjunctive-compound"
    },
    "claim-p3304::p3304-the-following-compound-stemmed-nncs-illustrate-the-formation": {
      "assertionId": "classical-numeral-conjunctive-compound:p3304-the-following-compound-stemmed-nncs-illustrate-the-formation",
      "canonicalPath": "cases.conjunctiveCompound.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3303": [],
    "claim-p3304": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3303": "authorized",
    "claim-p3304": "authorized"
  }
};
export default Object.freeze(spec);
