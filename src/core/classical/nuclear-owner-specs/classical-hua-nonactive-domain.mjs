const spec = {
  "ownerId": "classical-hua-nonactive-domain",
  "prefix": "ClassicalHuaNonactiveDomain",
  "operationId": "classical.hua.nonactive.domain.execute",
  "inputContract": "complete-typed-classical-hua-nonactive-domain-source",
  "domain": "classical-hua-nonactive-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2072",
    "claim-p2073",
    "claim-p2074",
    "claim-p2075",
    "claim-p2076",
    "claim-p2077",
    "claim-p2078"
  ],
  "coordinates": {
    "claim-p2072::p2072-the-suffix-hua-derives-nonactive-stems-from-active-ones": {
      "assertionId": "classical-hua-nonactive-domain:p2072-the-suffix-hua-derives-nonactive-stems-from-active-ones",
      "canonicalPath": "nonactive.records.hua.suffixFamily"
    },
    "claim-p2073::p2073-source-intransitive-stems-that-end-in-qui-are-exceptions": {
      "assertionId": "classical-hua-nonactive-domain:p2073-source-intransitive-stems-that-end-in-qui-are-exceptions",
      "canonicalPath": "nonactive.records.hua.formationCore"
    },
    "claim-p2074::p2074-when-the-source-stem-ends-in-o-the-suffix": {
      "assertionId": "classical-hua-nonactive-domain:p2074-when-the-source-stem-ends-in-o-the-suffix",
      "canonicalPath": "nonactive.records.hua.targetClass"
    },
    "claim-p2075::p2075-although-hua-is-mainly-associated-with-intransitive-stems-certain": {
      "assertionId": "classical-hua-nonactive-domain:p2075-although-hua-is-mainly-associated-with-intransitive-stems-certain",
      "canonicalPath": "nonactive.records.hua.suffixFamily"
    },
    "claim-p2076::p2076-they-are-usually-of-one-syllable-although-long-transitive": {
      "assertionId": "classical-hua-nonactive-domain:p2076-they-are-usually-of-one-syllable-although-long-transitive",
      "canonicalPath": "nonactive.records.hua.formationCore"
    },
    "claim-p2077::p2077-rarely-a-transitive-class-c-verb-ending-in-ia": {
      "assertionId": "classical-hua-nonactive-domain:p2077-rarely-a-transitive-class-c-verb-ending-in-ia",
      "canonicalPath": "nonactive.records.hua.targetClass"
    },
    "claim-p2078::p2078-before-the-hua-phonemically-long-i-and-o-keep": {
      "assertionId": "classical-hua-nonactive-domain:p2078-before-the-hua-phonemically-long-i-and-o-keep",
      "canonicalPath": "nonactive.records.hua.suffixFamily"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2072": [],
    "claim-p2073": [],
    "claim-p2074": [],
    "claim-p2075": [],
    "claim-p2076": [],
    "claim-p2077": [],
    "claim-p2078": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2072": "authorized",
    "claim-p2073": "authorized",
    "claim-p2074": "authorized",
    "claim-p2075": "authorized",
    "claim-p2076": "authorized",
    "claim-p2077": "authorized",
    "claim-p2078": "authorized"
  }
};
export default Object.freeze(spec);
