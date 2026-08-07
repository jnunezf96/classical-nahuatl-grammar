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
    "claim-p1186"
  ],
  "coordinates": {
    "claim-p1185::p1185-on-o-on-o-to-be-lying-down-except": {
      "assertionId": "classical-ono-irregular-paradigm:p1185-on-o-on-o-to-be-lying-down-except",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1186::p1186-the-other-tense-forms-are-regular": {
      "assertionId": "classical-ono-irregular-paradigm:p1186-the-other-tense-forms-are-regular",
      "canonicalPath": "authorizationStatus"
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
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1185": "authorized",
    "claim-p1186": "authorized"
  }
};
export default Object.freeze(spec);
