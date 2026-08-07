const spec = {
  "ownerId": "classical-defective-a-irregular-paradigm",
  "prefix": "ClassicalDefectiveAIrregularParadigm",
  "operationId": "classical.defective.a.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-defective-a-irregular-paradigm-source",
  "domain": "classical-defective-a-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-defective-a-irregular-paradigm",
  "selections": [
    "claim-p1189",
    "claim-p1190",
    "claim-p1191",
    "claim-p1192",
    "claim-p1193"
  ],
  "coordinates": {
    "claim-p1189::p1189-a-a-to-be-present-this-is-a-defective": {
      "assertionId": "classical-defective-a-irregular-paradigm:p1189-a-a-to-be-present-this-is-a-defective",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1190::p1190-the-negative-vncs-are-translated-to-be-absent": {
      "assertionId": "classical-defective-a-irregular-paradigm:p1190-the-negative-vncs-are-translated-to-be-absent",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1191::p1191-there-are-no-vncs-with-other-tense-morphs": {
      "assertionId": "classical-defective-a-irregular-paradigm:p1191-there-are-no-vncs-with-other-tense-morphs",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1192::p1192-negative-using-the-negative-prefix-ah-ay": {
      "assertionId": "classical-defective-a-irregular-paradigm:p1192-negative-using-the-negative-prefix-ah-ay",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1193::p1193-traditionally-spelled-solid-ayocac": {
      "assertionId": "classical-defective-a-irregular-paradigm:p1193-traditionally-spelled-solid-ayocac",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1189": [
      "a-present"
    ],
    "claim-p1190": [
      "a-negative"
    ],
    "claim-p1191": [
      "a-present"
    ],
    "claim-p1192": [
      "a-negative"
    ],
    "claim-p1193": [
      "a-present"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1189": "authorized",
    "claim-p1190": "authorized",
    "claim-p1191": "authorized",
    "claim-p1192": "authorized",
    "claim-p1193": "authorized"
  }
};
export default Object.freeze(spec);
