const spec = {
  "ownerId": "classical-ono-irregular-paradigm",
  "prefix": "ClassicalOnoIrregularParadigm",
  "operationId": "classical.ono.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-ono-irregular-paradigm-source",
  "domain": "classical-ono-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-ono-irregular-paradigm",
  "selections": [
    "claim-p1185",
    "claim-p1186",
    "claim-p1185-02",
    "claim-p1185-03",
    "claim-p1185-04"
  ],
  "coordinates": {
    "claim-p1185::ono-schema": {
      "assertionId": "classical-ono-irregular-paradigm:ono-schema",
      "canonicalPath": "lesson11.selectedStem"
    },
    "claim-p1186::p1186-the-other-tense-forms-are-regular": {
      "assertionId": "classical-ono-irregular-paradigm:p1186-the-other-tense-forms-are-regular",
      "canonicalPath": "lesson11.regularSystemRemainsAuthority"
    },
    "claim-p1185-02::ono-fused-directional": {
      "assertionId": "classical-ono-irregular-paradigm:ono-fused-directional",
      "canonicalPath": "lesson11.fusedDirectional.fusedDirectional"
    },
    "claim-p1185-03::ono-connective-t-exception": {
      "assertionId": "classical-ono-irregular-paradigm:ono-connective-t-exception",
      "canonicalPath": "lesson11.selectedStem"
    },
    "claim-p1185-04::ono-locative-only": {
      "assertionId": "classical-ono-irregular-paradigm:ono-locative-only",
      "canonicalPath": "lesson11.fusedDirectional.fusedDirectional"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1185": [
      "ono-present"
    ],
    "claim-p1186": [
      "ono-present"
    ],
    "claim-p1185-02": [
      "ono-present"
    ],
    "claim-p1185-03": [
      "ono-connective-t-matrix"
    ],
    "claim-p1185-04": [
      "ono-present"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1185": "authorized",
    "claim-p1186": "authorized",
    "claim-p1185-02": "authorized",
    "claim-p1185-03": "authorized",
    "claim-p1185-04": "authorized"
  }
};
export default Object.freeze(spec);
