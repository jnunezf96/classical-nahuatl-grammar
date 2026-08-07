const spec = {
  "ownerId": "classical-pilca-irregular-paradigm",
  "prefix": "ClassicalPilcaIrregularParadigm",
  "operationId": "classical.pilca.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-pilca-irregular-paradigm-source",
  "domain": "classical-pilca-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-pilca-irregular-paradigm",
  "selections": [
    "claim-p1187",
    "claim-p1188"
  ],
  "coordinates": {
    "claim-p1187::p1187-pil-ca-pil-ca-to-be-hanging": {
      "assertionId": "classical-pilca-irregular-paradigm:p1187-pil-ca-pil-ca-to-be-hanging",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1188::p1188-the-other-tense-forms-are-regular": {
      "assertionId": "classical-pilca-irregular-paradigm:p1188-the-other-tense-forms-are-regular",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1187": [
      "pilca-present"
    ],
    "claim-p1188": [
      "pilca-present"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1187": "authorized",
    "claim-p1188": "authorized"
  }
};
export default Object.freeze(spec);
