const spec = {
  "ownerId": "classical-amia-irregular-paradigm",
  "prefix": "ClassicalAmiaIrregularParadigm",
  "operationId": "classical.amia.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-amia-irregular-paradigm-source",
  "domain": "classical-amia-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-amia-irregular-paradigm",
  "selections": [
    "claim-p1205",
    "claim-p1206",
    "claim-p1207",
    "claim-p1208",
    "claim-p1209"
  ],
  "coordinates": {
    "claim-p1205::p1205-am-i-a-am-i-h-to-exist-this": {
      "assertionId": "classical-amia-irregular-paradigm:p1205-am-i-a-am-i-h-to-exist-this",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1206::p1206-preterit-as-present-tense-morph-it-has-yet-another": {
      "assertionId": "classical-amia-irregular-paradigm:p1206-preterit-as-present-tense-morph-it-has-yet-another",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1207::p1207-traditionally-written-quenami": {
      "assertionId": "classical-amia-irregular-paradigm:p1207-traditionally-written-quenami",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1208::p1208-traditionally-written-solid-as-que-mmach": {
      "assertionId": "classical-amia-irregular-paradigm:p1208-traditionally-written-solid-as-que-mmach",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1209::p1209-the-que-n-can-be-incorporated-to-create-a": {
      "assertionId": "classical-amia-irregular-paradigm:p1209-the-que-n-can-be-incorporated-to-create-a",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1205": [
      "amia-quen"
    ],
    "claim-p1206": [
      "amia-quen-mach"
    ],
    "claim-p1207": [
      "amia-quen"
    ],
    "claim-p1208": [
      "amia-quen-mach"
    ],
    "claim-p1209": [
      "amia-quen"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1205": "authorized",
    "claim-p1206": "authorized",
    "claim-p1207": "authorized",
    "claim-p1208": "authorized",
    "claim-p1209": "authorized"
  }
};
export default Object.freeze(spec);
