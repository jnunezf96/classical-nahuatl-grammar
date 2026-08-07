const spec = {
  "ownerId": "classical-female-vocative-prosody",
  "prefix": "ClassicalFemaleVocativeProsody",
  "operationId": "classical.female.vocative.prosody.execute",
  "inputContract": "complete-typed-classical-female-vocative-prosody-source",
  "domain": "classical-female-vocative-prosody",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1874",
    "claim-p1875"
  ],
  "coordinates": {
    "claim-p1874::p1874-instead-they-pronounce-the-final-syllable-of-an-nnc": {
      "assertionId": "classical-female-vocative-prosody:p1874-instead-they-pronounce-the-final-syllable-of-an-nnc",
      "canonicalPath": "vocativeFemale.speakerGender"
    },
    "claim-p1875::p1875-women-speakers-do-not-use-the-vocative-particle-e": {
      "assertionId": "classical-female-vocative-prosody:p1875-women-speakers-do-not-use-the-vocative-particle-e",
      "canonicalPath": "vocativeFemale.prosody"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1874": [],
    "claim-p1875": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1874": "authorized",
    "claim-p1875": "authorized"
  }
};
export default Object.freeze(spec);
