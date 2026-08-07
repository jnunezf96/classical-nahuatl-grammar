const spec = {
  "ownerId": "classical-regressive-assimilation",
  "prefix": "ClassicalRegressiveAssimilation",
  "operationId": "classical.transcription.classical-regressive-assimilation.analyze",
  "inputContract": "complete-typed-classical-regressive-assimilation-source",
  "domain": "classical-regressive-assimilation",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-211-regressive-nasal-sibilant",
    "cn-l2-211-regressive-sibilant-group",
    "cn-l2-211-regressive-w-bilabial",
    "cn-l2-211-regressive-m-n-nn",
    "cn-l2-211-regressive-m-partial",
    "cn-l2-211-regressive-n-m-mm",
    "cn-l2-211-regressive-n-p-mp",
    "cn-l2-211-low-frequency-ch-p-pp"
  ],
  "facets": [
    "following-rules-deal-most-frequent-cases-regressive-assimilation-second",
    "nasal-sibilant-long-sibilant",
    "a-combination-any-two-unlike-consonants-group-s-s",
    "twelve-possibilities-following-common",
    "c-¢-¢¢-c-s-ss-¢-c-c",
    "w-bilabial-long-bilabial",
    "m-n-nn",
    "m-followed-t-λ-¢-c-k-kw-undergoes",
    "n-here-always-spelled-n",
    "n-m-mm",
    "n-followed-p-undergoes-partial-assimilation-resulting-mp",
    "remark-suggested-less-frequently-encountered-assimilation-possible-example-c",
    "p-pp"
  ],
  "coordinates": {
    "cn-l2-211-regressive-nasal-sibilant::following-rules-deal-most-frequent-cases-regressive-assimilation-second": {
      "assertionId": "classical-regressive-assimilation:following-rules-deal-most-frequent-cases-regressive-assimilation-second",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-nasal-sibilant::nasal-sibilant-long-sibilant": {
      "assertionId": "classical-regressive-assimilation:nasal-sibilant-long-sibilant",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-sibilant-group::a-combination-any-two-unlike-consonants-group-s-s": {
      "assertionId": "classical-regressive-assimilation:a-combination-any-two-unlike-consonants-group-s-s",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-sibilant-group::twelve-possibilities-following-common": {
      "assertionId": "classical-regressive-assimilation:twelve-possibilities-following-common",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-sibilant-group::c-¢-¢¢-c-s-ss-¢-c-c": {
      "assertionId": "classical-regressive-assimilation:c-¢-¢¢-c-s-ss-¢-c-c",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-w-bilabial::w-bilabial-long-bilabial": {
      "assertionId": "classical-regressive-assimilation:w-bilabial-long-bilabial",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-m-n-nn::m-n-nn": {
      "assertionId": "classical-regressive-assimilation:m-n-nn",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-m-partial::m-followed-t-λ-¢-c-k-kw-undergoes": {
      "assertionId": "classical-regressive-assimilation:m-followed-t-λ-¢-c-k-kw-undergoes",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-m-partial::n-here-always-spelled-n": {
      "assertionId": "classical-regressive-assimilation:n-here-always-spelled-n",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-n-m-mm::n-m-mm": {
      "assertionId": "classical-regressive-assimilation:n-m-mm",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-n-p-mp::n-followed-p-undergoes-partial-assimilation-resulting-mp": {
      "assertionId": "classical-regressive-assimilation:n-followed-p-undergoes-partial-assimilation-resulting-mp",
      "canonicalPath": ""
    },
    "cn-l2-211-low-frequency-ch-p-pp::remark-suggested-less-frequently-encountered-assimilation-possible-example-c": {
      "assertionId": "classical-regressive-assimilation:remark-suggested-less-frequently-encountered-assimilation-possible-example-c",
      "canonicalPath": ""
    },
    "cn-l2-211-low-frequency-ch-p-pp::p-pp": {
      "assertionId": "classical-regressive-assimilation:p-pp",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlAssimilationRules",
  "executionFunctionName": "buildClassicalNahuatlAssimilationFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-211-regressive-nasal-sibilant": [
      {
        "leftConsonant": "m",
        "rightConsonant": "s",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-211-regressive-sibilant-group": [
      {
        "leftConsonant": "ch",
        "rightConsonant": "tz",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-211-regressive-w-bilabial": [
      {
        "leftConsonant": "w",
        "rightConsonant": "m",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-211-regressive-m-n-nn": [
      {
        "leftConsonant": "m",
        "rightConsonant": "n",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-211-regressive-m-partial": [
      {
        "leftConsonant": "m",
        "rightConsonant": "t",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-211-regressive-n-m-mm": [
      {
        "leftConsonant": "n",
        "rightConsonant": "m",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-211-regressive-n-p-mp": [
      {
        "leftConsonant": "n",
        "rightConsonant": "p",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-211-low-frequency-ch-p-pp": [
      {
        "leftConsonant": "ch",
        "rightConsonant": "p",
        "grammaticalConstruction": true
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
