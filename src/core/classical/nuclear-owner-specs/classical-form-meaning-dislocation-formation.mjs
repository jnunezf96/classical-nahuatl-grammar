const spec = {
  "ownerId": "classical-form-meaning-dislocation-formation",
  "prefix": "ClassicalFormMeaningDislocationFormation",
  "operationId": "classical.form.meaning.dislocation.formation.execute",
  "inputContract": "complete-typed-classical-form-meaning-dislocation-formation-source",
  "domain": "classical-form-meaning-dislocation-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-form-meaning-dislocation-formation",
  "selections": [
    "claim-p1178",
    "claim-p1179",
    "claim-p1180",
    "claim-p1181",
    "claim-p1182"
  ],
  "coordinates": {
    "claim-p1178::p1178-irregularities-due-to-the-dislocation-of-form-and-meaning": {
      "assertionId": "classical-form-meaning-dislocation-formation:p1178-irregularities-due-to-the-dislocation-of-form-and-meaning",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1179::p1179-preterit-tense-vncs-are-used-with-a-present-indicative": {
      "assertionId": "classical-form-meaning-dislocation-formation:p1179-preterit-tense-vncs-are-used-with-a-present-indicative",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1180::p1180-verbs-having-this-irregularity-do-not-permit-vncs-with": {
      "assertionId": "classical-form-meaning-dislocation-formation:p1180-verbs-having-this-irregularity-do-not-permit-vncs-with",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1181::p1181-those-with-a-distant-past-as-past-tense-usually": {
      "assertionId": "classical-form-meaning-dislocation-formation:p1181-those-with-a-distant-past-as-past-tense-usually",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1182::p1182-the-majority-of-verbs-showing-the-idiosyncrasy-of-form": {
      "assertionId": "classical-form-meaning-dislocation-formation:p1182-the-majority-of-verbs-showing-the-idiosyncrasy-of-form",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1178": [
      "ihca-present"
    ],
    "claim-p1179": [
      "ihca-past"
    ],
    "claim-p1180": [
      "ihca-present"
    ],
    "claim-p1181": [
      "ihca-past"
    ],
    "claim-p1182": [
      "ihca-present"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1178": "authorized",
    "claim-p1179": "authorized",
    "claim-p1180": "authorized",
    "claim-p1181": "authorized",
    "claim-p1182": "authorized"
  }
};
export default Object.freeze(spec);
