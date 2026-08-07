const spec = {
  "ownerId": "classical-ihca-irregular-paradigm",
  "prefix": "ClassicalIhcaIrregularParadigm",
  "operationId": "classical.ihca.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-ihca-irregular-paradigm-source",
  "domain": "classical-ihca-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-ihca-irregular-paradigm",
  "selections": [
    "claim-p1183",
    "claim-p1184"
  ],
  "coordinates": {
    "claim-p1183::p1183-ih-ca-ih-ca-to-be-standing": {
      "assertionId": "classical-ihca-irregular-paradigm:p1183-ih-ca-ih-ca-to-be-standing",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1184::p1184-the-other-tense-forms-are-regular": {
      "assertionId": "classical-ihca-irregular-paradigm:p1184-the-other-tense-forms-are-regular",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1183": [
      "ihca-present"
    ],
    "claim-p1184": [
      "ihca-past"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1183": "authorized",
    "claim-p1184": "authorized"
  }
};
export default Object.freeze(spec);
