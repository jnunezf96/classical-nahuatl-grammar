const spec = {
  "ownerId": "classical-adjectival-long-vowel-reduplicative-intensification",
  "prefix": "ClassicalAdjectivalLongVowelReduplicativeIntensification",
  "operationId": "classical.adjectival.long.vowel.reduplicative.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-long-vowel-reduplicative-intensification-source",
  "domain": "classical-adjectival-long-vowel-reduplicative-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3961"
  ],
  "coordinates": {
    "claim-p3961::p3961-when-as-a-result-of-either-nominalization-or-deverbalizatior": {
      "assertionId": "classical-adjectival-long-vowel-reduplicative-intensification:p3961-when-as-a-result-of-either-nominalization-or-deverbalizatior",
      "canonicalPath": "sources.affectiveNnc.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3961": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3961": "authorized"
  }
};
export default Object.freeze(spec);
