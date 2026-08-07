const spec = {
  "ownerId": "classical-destockal-short-vowel-hui-system",
  "prefix": "ClassicalDestockalShortVowelHuiSystem",
  "operationId": "classical.destockal.short.vowel.hui.system.execute",
  "inputContract": "complete-typed-classical-destockal-short-vowel-hui-system-source",
  "domain": "classical-destockal-short-vowel-hui-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2375",
    "claim-p2376",
    "claim-p2377"
  ],
  "coordinates": {
    "claim-p2375::p2375-the-choice-of-which-of-these-short-vowels-occurs": {
      "assertionId": "classical-destockal-short-vowel-hui-system:p2375-the-choice-of-which-of-these-short-vowels-occurs",
      "canonicalPath": "derivations.polihui.analysisCategories.0"
    },
    "claim-p2376::p2376-the-third-kind-of-intransitive-destockal-verbstem-is-characterized": {
      "assertionId": "classical-destockal-short-vowel-hui-system:p2376-the-third-kind-of-intransitive-destockal-verbstem-is-characterized",
      "canonicalPath": "contract.axes.7.axisId"
    },
    "claim-p2377::p2377-this-is-the-opposite-of-the-regular-stock-formative": {
      "assertionId": "classical-destockal-short-vowel-hui-system:p2377-this-is-the-opposite-of-the-regular-stock-formative",
      "canonicalPath": "contract.axes.8.axisId"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2375": [],
    "claim-p2376": [],
    "claim-p2377": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2375": "authorized",
    "claim-p2376": "authorized",
    "claim-p2377": "authorized"
  }
};
export default Object.freeze(spec);
