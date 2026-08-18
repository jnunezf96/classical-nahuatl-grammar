const spec = {
  "ownerId": "classical-vowel-elision",
  "prefix": "ClassicalVowelElision",
  "operationId": "classical.transcription.classical-vowel-elision.analyze",
  "inputContract": "complete-typed-classical-vowel-elision-source",
  "domain": "classical-vowel-elision",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-214-long-vowel-resists-elision",
    "cn-l2-214-spelling-change-required",
    "cn-l2-214-supportive-i-not-proper-elision"
  ],
  "facets": [
    "initial-final-short-vowel-vocables-elided-i-e-omitted",
    "a-long-vowel-tends-not-undergo-elision",
    "notice-if-elision-indicated-writing-a-spelling-change-often",
    "omitted-vowel-a-supportive-i",
    "omitted-vowel-a-supportive-i-not-properly-speaking-elision"
  ],
  "coordinates": {
    "cn-l2-214-long-vowel-resists-elision::initial-final-short-vowel-vocables-elided-i-e-omitted": {
      "assertionId": "classical-vowel-elision:initial-final-short-vowel-vocables-elided-i-e-omitted",
      "canonicalPath": ""
    },
    "cn-l2-214-long-vowel-resists-elision::a-long-vowel-tends-not-undergo-elision": {
      "assertionId": "classical-vowel-elision:a-long-vowel-tends-not-undergo-elision",
      "canonicalPath": ""
    },
    "cn-l2-214-spelling-change-required::notice-if-elision-indicated-writing-a-spelling-change-often": {
      "assertionId": "classical-vowel-elision:notice-if-elision-indicated-writing-a-spelling-change-often",
      "canonicalPath": ""
    },
    "cn-l2-214-supportive-i-not-proper-elision::omitted-vowel-a-supportive-i": {
      "assertionId": "classical-vowel-elision:omitted-vowel-a-supportive-i",
      "canonicalPath": ""
    },
    "cn-l2-214-supportive-i-not-proper-elision::omitted-vowel-a-supportive-i-not-properly-speaking-elision": {
      "assertionId": "classical-vowel-elision:omitted-vowel-a-supportive-i-not-properly-speaking-elision",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlVowelElisionRules",
  "executionFunctionName": "buildClassicalNahuatlVowelElisionFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-214-long-vowel-resists-elision": [
      {
        "sourceMorpheme": "icxi",
        "targetMorpheme": "cxi",
        "elisionSide": "initial",
        "vowelLength": "long",
        "supportiveI": false,
        "indicatedInWriting": false,
        "listedStressGroupExample": false,
        "stressGroupCombination": true
      }
    ],
    "cn-l2-214-spelling-change-required": [
      {
        "sourceMorpheme": "icxi",
        "targetMorpheme": "cxi",
        "elisionSide": "initial",
        "vowelLength": "short",
        "supportiveI": false,
        "indicatedInWriting": true,
        "listedStressGroupExample": false,
        "stressGroupCombination": true
      }
    ],
    "cn-l2-214-supportive-i-not-proper-elision": [
      {
        "sourceMorpheme": "icxi",
        "targetMorpheme": "cxi",
        "elisionSide": "initial",
        "vowelLength": "short",
        "supportiveI": true,
        "indicatedInWriting": false,
        "listedStressGroupExample": false,
        "stressGroupCombination": true
      }
    ]
  },
  "requireSelectedRuleMatch": true,
  "expectedCanonicalStatusBySelection": {
    "cn-l2-214-long-vowel-resists-elision": "blocked"
  }
};
export default Object.freeze(spec);
