const spec = {
  "ownerId": "classical-real-vocative-category",
  "prefix": "ClassicalRealVocativeCategory",
  "operationId": "classical.real.vocative.category.execute",
  "inputContract": "complete-typed-classical-real-vocative-category-source",
  "domain": "classical-real-vocative-category",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1867"
  ],
  "coordinates": {
    "claim-p1867::p1867-the-real-vocative-differs-from-the-so-called-vocative": {
      "assertionId": "classical-real-vocative-category:p1867-the-real-vocative-differs-from-the-so-called-vocative",
      "canonicalPath": "vocativeMale.kind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1867": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1867": "authorized"
  }
};
export default Object.freeze(spec);
