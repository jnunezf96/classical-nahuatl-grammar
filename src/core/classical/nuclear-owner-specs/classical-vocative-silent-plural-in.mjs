const spec = {
  "ownerId": "classical-vocative-silent-plural-in",
  "prefix": "ClassicalVocativeSilentPluralIn",
  "operationId": "classical.vocative.silent.plural.in.execute",
  "inputContract": "complete-typed-classical-vocative-silent-plural-in-source",
  "domain": "classical-vocative-silent-plural-in",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1873"
  ],
  "coordinates": {
    "claim-p1873::p1873-at-times-the-num2-plural-morph-in-occurring-in": {
      "assertionId": "classical-vocative-silent-plural-in:p1873-at-times-the-num2-plural-morph-in-occurring-in",
      "canonicalPath": "vocativePlural.operations.0"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1873": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1873": "authorized"
  }
};
export default Object.freeze(spec);
