const spec = {
  "ownerId": "classical-outbound-purposive-nonpast-optative",
  "prefix": "ClassicalOutboundPurposiveNonpastOptative",
  "operationId": "classical.outbound.purposive.nonpast.optative.execute",
  "inputContract": "complete-typed-classical-outbound-purposive-nonpast-optative-source",
  "domain": "classical-outbound-purposive-nonpast-optative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2933",
    "claim-p2934",
    "claim-p2935",
    "claim-p2936",
    "claim-p2937",
    "claim-p2938",
    "claim-p2939",
    "claim-p2940",
    "claim-p2941",
    "claim-p2942"
  ],
  "coordinates": {
    "claim-p2933::p2933-the-tense-morph-0-has-a-nonpast-optative-meaning": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2933-the-tense-morph-0-has-a-nonpast-optative-meaning",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-optative.targetStem"
    },
    "claim-p2934::p2934-for-a-nonpast-optative-vnc-there-is-an-irregular": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2934-for-a-nonpast-optative-vnc-there-is-an-irregular",
      "canonicalPath": "cases.pluralSeries.outbound-nonpast-optative.numberMorph"
    },
    "claim-p2935::p2935-care-must-be-taken-not-to-confuse-the-purposive": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2935-care-must-be-taken-not-to-confuse-the-purposive",
      "canonicalPath": "cases.irregularPluralN.facts.purposiveOptativeDistinctFromAdmonitive"
    },
    "claim-p2936::p2936-purposive-optative-ti-tzahtzi-t-i-h": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2936-purposive-optative-ti-tzahtzi-t-i-h",
      "canonicalPath": "cases.pluralSeries.outbound-nonpast-optative.facts.purposiveOptativeMatrixEnding"
    },
    "claim-p2937::p2937-remarks-the-length-on-the-i-before-the-n": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2937-remarks-the-length-on-the-i-before-the-n",
      "canonicalPath": "cases.irregularPluralN.targetStem"
    },
    "claim-p2938::p2938-the-second-person-subject-of-the-purposive-optative-vnc": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2938-the-second-person-subject-of-the-purposive-optative-vnc",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-optative.facts.secondPersonPers1DerivedByFiniteGrammar"
    },
    "claim-p2939::p2939-in-texts-that-indicate-neither-the-glottal-stop-nor": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2939-in-texts-that-indicate-neither-the-glottal-stop-nor",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-optative.facts.optativeAnalysisChoiceRequiredOnlyWhenTypedTextIsUnderspecified"
    },
    "claim-p2940::p2940-all-other-vnc-pair-members-built-on-verbs-of": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2940-all-other-vnc-pair-members-built-on-verbs-of",
      "canonicalPath": "cases.pluralSeries.outbound-nonpast-optative.facts.traditionalUnmarkedOptativeMayBeAmbiguous"
    },
    "claim-p2941::p2941-note-certain-early-spanish-grammarians-of-nahuatl-recommended-a": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2941-note-certain-early-spanish-grammarians-of-nahuatl-recommended-a",
      "canonicalPath": "cases.earlySingularGlottal.targetStem"
    },
    "claim-p2942::p2942-the-singular-vncs-with-t-i-like-their-plural": {
      "assertionId": "classical-outbound-purposive-nonpast-optative:p2942-the-singular-vncs-with-t-i-like-their-plural",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-optative.facts.ordinarySingularTiRemainsPreferred"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2933": [],
    "claim-p2934": [],
    "claim-p2935": [],
    "claim-p2936": [],
    "claim-p2937": [],
    "claim-p2938": [],
    "claim-p2939": [],
    "claim-p2940": [],
    "claim-p2941": [],
    "claim-p2942": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2933": "authorized",
    "claim-p2934": "authorized",
    "claim-p2935": "authorized",
    "claim-p2936": "authorized",
    "claim-p2937": "authorized",
    "claim-p2938": "authorized",
    "claim-p2939": "authorized",
    "claim-p2940": "authorized",
    "claim-p2941": "authorized",
    "claim-p2942": "authorized"
  }
};
export default Object.freeze(spec);
