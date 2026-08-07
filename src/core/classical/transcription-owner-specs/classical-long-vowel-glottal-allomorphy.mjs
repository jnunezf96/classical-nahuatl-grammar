const spec = {
  "ownerId": "classical-long-vowel-glottal-allomorphy",
  "prefix": "ClassicalLongVowelGlottalAllomorphy",
  "operationId": "classical.transcription.classical-long-vowel-glottal-allomorphy.analyze",
  "inputContract": "complete-typed-classical-long-vowel-glottal-allomorphy-source",
  "domain": "classical-long-vowel-glottal-allomorphy",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-215-irregular-short-vowel-glottal-morph",
    "cn-l2-215-embed-subposition-required"
  ],
  "facets": [
    "times-morphemes-a-long-final-vowel-morphic-repertory-irregular",
    "furthermore-morph-glottal-stop-must-occupy-embed-subposition-a",
    "a-small-number-morphemes-permit"
  ],
  "coordinates": {
    "cn-l2-215-irregular-short-vowel-glottal-morph::times-morphemes-a-long-final-vowel-morphic-repertory-irregular": {
      "assertionId": "classical-long-vowel-glottal-allomorphy:times-morphemes-a-long-final-vowel-morphic-repertory-irregular",
      "canonicalPath": ""
    },
    "cn-l2-215-embed-subposition-required::furthermore-morph-glottal-stop-must-occupy-embed-subposition-a": {
      "assertionId": "classical-long-vowel-glottal-allomorphy:furthermore-morph-glottal-stop-must-occupy-embed-subposition-a",
      "canonicalPath": ""
    },
    "cn-l2-215-embed-subposition-required::a-small-number-morphemes-permit": {
      "assertionId": "classical-long-vowel-glottal-allomorphy:a-small-number-morphemes-permit",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlLongVowelGlottalRules",
  "executionFunctionName": "buildClassicalNahuatlLongVowelGlottalFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-215-irregular-short-vowel-glottal-morph": [
      {
        "morpheme": "huē",
        "compoundSubposition": "embed",
        "matrixMorpheme": "cāuh",
        "matrixDeterminesChoice": true,
        "listedExample": false
      }
    ],
    "cn-l2-215-embed-subposition-required": [
      {
        "morpheme": "huē",
        "compoundSubposition": "embed",
        "matrixMorpheme": "cāuh",
        "matrixDeterminesChoice": true,
        "listedExample": false
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
