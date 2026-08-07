const spec = {
  "ownerId": "classical-personal-name-nnc-calendar-name-relation",
  "prefix": "ClassicalPersonalNameNncCalendarNameRelation",
  "operationId": "classical.personal.name.nnc.calendar.name.relation.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-calendar-name-relation-source",
  "domain": "classical-personal-name-nnc-calendar-name-relation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5221",
    "claim-p5222",
    "claim-p5223"
  ],
  "coordinates": {
    "claim-p5221::p5221-a-calendrical-name-taken-from-the-divinatory-calendar-see": {
      "assertionId": "classical-personal-name-nnc-calendar-name-relation:p5221-a-calendrical-name-taken-from-the-divinatory-calendar-see",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5222::p5222-it-often-serves-as-an-alternate-name-especially-if": {
      "assertionId": "classical-personal-name-nnc-calendar-name-relation:p5222-it-often-serves-as-an-alternate-name-especially-if",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5223::p5223-if-it-names-a-god": {
      "assertionId": "classical-personal-name-nnc-calendar-name-relation:p5223-if-it-names-a-god",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5221": [
      "calendar-name-relation",
      "calendar-personalizing-thing",
      "calendar",
      ""
    ],
    "claim-p5222": [
      "calendar-name-relation",
      "calendar-personalizing-thing",
      "calendar",
      ""
    ],
    "claim-p5223": [
      "calendar-name-relation",
      "calendar-personalizing-thing",
      "calendar",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5221": "authorized",
    "claim-p5222": "authorized",
    "claim-p5223": "authorized"
  }
};
export default Object.freeze(spec);
