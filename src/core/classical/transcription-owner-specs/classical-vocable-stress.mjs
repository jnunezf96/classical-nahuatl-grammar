const spec = {
  "ownerId": "classical-vocable-stress",
  "prefix": "ClassicalVocableStress",
  "operationId": "classical.transcription.classical-vocable-stress.analyze",
  "inputContract": "complete-typed-classical-vocable-stress-source",
  "domain": "classical-vocable-stress",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-27-penultimate-vocable-stress",
    "cn-l2-27-final-short-vowel-contrast",
    "cn-l2-27-vocative-particle-exception"
  ],
  "facets": [
    "stress-nahuatl-vocables-falls-penultimate-next-last-syllable",
    "molpia-mol-pi-a-syllable-stress-helps-indicate-presence",
    "there-exception-above-rule-stress-occurs-a-nominal-nuclear",
    "a-nominal-nuclear-clause-associated-vocative-particle-e",
    "suffix-merely-interjection-pronounced-if-were-part-nominal-nuclear"
  ],
  "coordinates": {
    "cn-l2-27-penultimate-vocable-stress::stress-nahuatl-vocables-falls-penultimate-next-last-syllable": {
      "assertionId": "classical-vocable-stress:stress-nahuatl-vocables-falls-penultimate-next-last-syllable",
      "canonicalPath": ""
    },
    "cn-l2-27-final-short-vowel-contrast::molpia-mol-pi-a-syllable-stress-helps-indicate-presence": {
      "assertionId": "classical-vocable-stress:molpia-mol-pi-a-syllable-stress-helps-indicate-presence",
      "canonicalPath": ""
    },
    "cn-l2-27-vocative-particle-exception::there-exception-above-rule-stress-occurs-a-nominal-nuclear": {
      "assertionId": "classical-vocable-stress:there-exception-above-rule-stress-occurs-a-nominal-nuclear",
      "canonicalPath": ""
    },
    "cn-l2-27-vocative-particle-exception::a-nominal-nuclear-clause-associated-vocative-particle-e": {
      "assertionId": "classical-vocable-stress:a-nominal-nuclear-clause-associated-vocative-particle-e",
      "canonicalPath": ""
    },
    "cn-l2-27-vocative-particle-exception::suffix-merely-interjection-pronounced-if-were-part-nominal-nuclear": {
      "assertionId": "classical-vocable-stress:suffix-merely-interjection-pronounced-if-were-part-nominal-nuclear",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlStressRules",
  "executionFunctionName": "buildClassicalNahuatlStressFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-27-penultimate-vocable-stress": [
      "calli",
      {}
    ],
    "cn-l2-27-final-short-vowel-contrast": [
      "calaqui",
      {
        "finalShortVowelContrast": true
      }
    ],
    "cn-l2-27-vocative-particle-exception": [
      "nopiltziné",
      {
        "vocativeParticle": true
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
