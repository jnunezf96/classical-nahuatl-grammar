const spec = {
  "ownerId": "classical-mood-tense-filler-formation",
  "prefix": "ClassicalMoodTenseFillerFormation",
  "operationId": "classical.mood.tense.filler.form",
  "inputContract": "complete-typed-classical-mood-tense-filler-formation-source",
  "domain": "classical-mood-tense-filler-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-finite-vnc-slots",
  "selections": [
    "claim-p753",
    "claim-p754",
    "claim-p755",
    "claim-p756"
  ],
  "coordinates": {
    "claim-p753::p753-indicative-present-0-customary-present-ni-imperfect-ya-ya": {
      "assertionId": "classical-mood-tense-filler-formation:p753-indicative-present-0-customary-present-ni-imperfect-ya-ya",
      "canonicalPath": "indicative"
    },
    "claim-p754::p754-ya-future-z-preterit-0-distant-past-ca-ca": {
      "assertionId": "classical-mood-tense-filler-formation:p754-ya-future-z-preterit-0-distant-past-ca-ca",
      "canonicalPath": "indicative.future"
    },
    "claim-p755::p755-optative-nonpast-0-past-ni": {
      "assertionId": "classical-mood-tense-filler-formation:p755-optative-nonpast-0-past-ni",
      "canonicalPath": "optative"
    },
    "claim-p756::p756-admonitive-nonpast-h-for-class-a-verbs-0-for": {
      "assertionId": "classical-mood-tense-filler-formation:p756-admonitive-nonpast-h-for-class-a-verbs-0-for",
      "canonicalPath": "admonitive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlMoodTenseFillerSystemFrame",
  "executionValidatorName": "isClassicalNahuatlMoodTenseFillerSystemFrame",
  "executionArgsBySelection": {
    "claim-p753": [],
    "claim-p754": [],
    "claim-p755": [],
    "claim-p756": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p753": "authorized",
    "claim-p754": "authorized",
    "claim-p755": "authorized",
    "claim-p756": "authorized"
  }
};
export default Object.freeze(spec);
