const spec = {
  "ownerId": "classical-outbound-purposive-past-indicative",
  "prefix": "ClassicalOutboundPurposivePastIndicative",
  "operationId": "classical.outbound.purposive.past.indicative.execute",
  "inputContract": "complete-typed-classical-outbound-purposive-past-indicative-source",
  "domain": "classical-outbound-purposive-past-indicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2927",
    "claim-p2928",
    "claim-p2929",
    "claim-p2930",
    "claim-p2931",
    "claim-p2932"
  ],
  "coordinates": {
    "claim-p2927::p2927-the-tense-morph-0-has-a-past-indicative-meaning": {
      "assertionId": "classical-outbound-purposive-past-indicative:p2927-the-tense-morph-0-has-a-past-indicative-meaning",
      "canonicalPath": "cases.singularSeries.outbound-past-indicative.facts.matrixTenseMeaning"
    },
    "claim-p2928::p2928-the-vnc-is-optionally-accompanied-by-the-antecessive-order": {
      "assertionId": "classical-outbound-purposive-past-indicative:p2928-the-vnc-is-optionally-accompanied-by-the-antecessive-order",
      "canonicalPath": "cases.singularSeries.outbound-past-indicative.facts.ordinaryAntecessiveAvailable"
    },
    "claim-p2929::p2929-the-tense-meaning-covers-the-area-of-the-preterit": {
      "assertionId": "classical-outbound-purposive-past-indicative:p2929-the-tense-meaning-covers-the-area-of-the-preterit",
      "canonicalPath": "cases.singularSeries.outbound-past-indicative.facts.licensedReadingRange"
    },
    "claim-p2930::p2930-note-a-vnc-with-a-first-or-third-person": {
      "assertionId": "classical-outbound-purposive-past-indicative:p2930-note-a-vnc-with-a-first-or-third-person",
      "canonicalPath": "cases.singularSeries.outbound-past-indicative.facts.pastPurposiveHomographContrast"
    },
    "claim-p2931::p2931-the-presence-of-the-particle-ma-is-the-distinguishing": {
      "assertionId": "classical-outbound-purposive-past-indicative:p2931-the-presence-of-the-particle-ma-is-the-distinguishing",
      "canonicalPath": "cases.singularSeries.outbound-past-indicative.facts.pastPurposiveNeverIntroducedByMa"
    },
    "claim-p2932::p2932-in-texts-that-do-not-indicate-glottal-stops-the": {
      "assertionId": "classical-outbound-purposive-past-indicative:p2932-in-texts-that-do-not-indicate-glottal-stops-the",
      "canonicalPath": "cases.singularSeries.outbound-past-indicative.facts.pastPurposiveAnalysisUsesTypedStructureAndMaContext"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2927": [],
    "claim-p2928": [],
    "claim-p2929": [],
    "claim-p2930": [],
    "claim-p2931": [],
    "claim-p2932": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2927": "authorized",
    "claim-p2928": "authorized",
    "claim-p2929": "authorized",
    "claim-p2930": "authorized",
    "claim-p2931": "authorized",
    "claim-p2932": "authorized"
  }
};
export default Object.freeze(spec);
