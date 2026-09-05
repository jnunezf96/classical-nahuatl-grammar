const spec = {
  "ownerId": "classical-destockal-stock-vowel-harmony",
  "prefix": "ClassicalDestockalStockVowelHarmony",
  "operationId": "classical.destockal.stock.vowel.harmony.execute",
  "inputContract": "complete-typed-classical-destockal-stock-vowel-harmony-source",
  "domain": "classical-destockal-stock-vowel-harmony",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2311",
    "claim-p2312",
    "claim-p2313"
  ],
  "coordinates": {
    "claim-p2311::p2311-the-stock-formative-is-a-long-vowel-that-is": {
      "assertionId": "classical-destockal-stock-vowel-harmony:p2311-the-stock-formative-is-a-long-vowel-that-is",
      "canonicalPath": "constraints.destockalStockVowelHarmonySystem.regularLongStockHarmony"
    },
    "claim-p2311::aci-p201-l004-5d859597bd-regular-long-stock-harmony": {
      "assertionId": "classical-destockal-stock-vowel-harmony:aci-p201-l004-5d859597bd-regular-long-stock-harmony",
      "canonicalPath": "constraints.destockalStockVowelHarmonySystem.regularLongStockHarmony"
    },
    "claim-p2312::p2312-the-stem-formative-on-the-intransitive-stem-of-the": {
      "assertionId": "classical-destockal-stock-vowel-harmony:p2312-the-stem-formative-on-the-intransitive-stem-of-the",
      "canonicalPath": "constraints.destockalStockVowelHarmonySystem.firstTypeThemeAlternation"
    },
    "claim-p2312::aci-p201-l004-8cf59410d7-first-type-theme-alternation": {
      "assertionId": "classical-destockal-stock-vowel-harmony:aci-p201-l004-8cf59410d7-first-type-theme-alternation",
      "canonicalPath": "constraints.destockalStockVowelHarmonySystem.firstTypeThemeAlternation"
    },
    "claim-p2313::p2313-there-may-be-exceptions": {
      "assertionId": "classical-destockal-stock-vowel-harmony:p2313-there-may-be-exceptions",
      "canonicalPath": "constraints.destockalStockVowelHarmonySystem.exceptionPolicy.exists"
    },
    "claim-p2313::aci-p201-l005-2e368a61c9-exception-policy-exists": {
      "assertionId": "classical-destockal-stock-vowel-harmony:aci-p201-l005-2e368a61c9-exception-policy-exists",
      "canonicalPath": "constraints.destockalStockVowelHarmonySystem.exceptionPolicy.exists"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2311": [],
    "claim-p2312": [],
    "claim-p2313": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2311": "authorized",
    "claim-p2312": "authorized",
    "claim-p2313": "authorized"
  }
};
export default Object.freeze(spec);
