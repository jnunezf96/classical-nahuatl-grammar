const spec = {
  "ownerId": "classical-personal-name-nnc-calendar-name-shapes",
  "prefix": "ClassicalPersonalNameNncCalendarNameShapes",
  "operationId": "classical.personal.name.nnc.calendar.name.shapes.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-calendar-name-shapes-source",
  "domain": "classical-personal-name-nnc-calendar-name-shapes",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5224",
    "claim-p5225",
    "claim-p5226"
  ],
  "coordinates": {
    "claim-p5224::p5224-the-name-may-be-a-double-nucleus-construction": {
      "assertionId": "classical-personal-name-nnc-calendar-name-shapes:p5224-the-name-may-be-a-double-nucleus-construction",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5225::p5225-the-name-may-be-a-single-nucleus-construction": {
      "assertionId": "classical-personal-name-nnc-calendar-name-shapes:p5225-the-name-may-be-a-single-nucleus-construction",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5226::p5226-at-times-only-the-day-sign-nnc-serves-as": {
      "assertionId": "classical-personal-name-nnc-calendar-name-shapes:p5226-at-times-only-the-day-sign-nnc-serves-as",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5224": [
      "calendar-name-shapes",
      "calendar-double-nucleus",
      "calendar",
      ""
    ],
    "claim-p5225": [
      "calendar-name-shapes",
      "calendar-double-nucleus",
      "calendar",
      ""
    ],
    "claim-p5226": [
      "calendar-name-shapes",
      "calendar-double-nucleus",
      "calendar",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5224": "authorized",
    "claim-p5225": "authorized",
    "claim-p5226": "authorized"
  }
};
export default Object.freeze(spec);
