const spec = {
  "ownerId": "classical-mani-irregular-paradigm",
  "prefix": "ClassicalManiIrregularParadigm",
  "operationId": "classical.mani.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-mani-irregular-paradigm-source",
  "domain": "classical-mani-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-mani-irregular-paradigm",
  "selections": [
    "claim-p1213",
    "claim-p1214",
    "claim-p1215",
    "claim-p1213-02",
    "claim-p1213-03",
    "claim-p1213-04"
  ],
  "coordinates": {
    "claim-p1213::mani-schema": {
      "assertionId": "classical-mani-irregular-paradigm:mani-schema",
      "canonicalPath": "lesson11.selectedStem"
    },
    "claim-p1214::p1214-it-is-not-ordinarily-used-for-individual-animate-beings": {
      "assertionId": "classical-mani-irregular-paradigm:p1214-it-is-not-ordinarily-used-for-individual-animate-beings",
      "canonicalPath": "lesson11.usageStatus"
    },
    "claim-p1215::p1215-is-also-used-for-masses-or-crowds-of-men": {
      "assertionId": "classical-mani-irregular-paradigm:p1215-is-also-used-for-masses-or-crowds-of-men",
      "canonicalPath": "lesson11.contextualInterpretation"
    },
    "claim-p1213-02::mani-preterit-imperfective-stem": {
      "assertionId": "classical-mani-irregular-paradigm:mani-preterit-imperfective-stem",
      "canonicalPath": "lesson11.selectedStem"
    },
    "claim-p1213-03::mani-distant-past-as-past": {
      "assertionId": "classical-mani-irregular-paradigm:mani-distant-past-as-past",
      "canonicalPath": "lesson11.morphologicalTense"
    },
    "claim-p1213-04::mani-wide-flat-usage": {
      "assertionId": "classical-mani-irregular-paradigm:mani-wide-flat-usage",
      "canonicalPath": "lesson11.contextualInterpretation"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1213": [
      "mani-present"
    ],
    "claim-p1214": [
      "mani-individual-animate"
    ],
    "claim-p1215": [
      "mani-present"
    ],
    "claim-p1213-02": [
      "mani-preterit"
    ],
    "claim-p1213-03": [
      "mani-past"
    ],
    "claim-p1213-04": [
      "mani-wide-flat"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1213": "authorized",
    "claim-p1214": "authorized",
    "claim-p1215": "authorized",
    "claim-p1213-02": "authorized",
    "claim-p1213-03": "authorized",
    "claim-p1213-04": "authorized"
  }
};
export default Object.freeze(spec);
