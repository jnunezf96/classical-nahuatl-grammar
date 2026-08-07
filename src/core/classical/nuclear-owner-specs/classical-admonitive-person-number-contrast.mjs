const spec = {
  "ownerId": "classical-admonitive-person-number-contrast",
  "prefix": "ClassicalAdmonitivePersonNumberContrast",
  "operationId": "classical.admonitive.person.number.contrast.execute",
  "inputContract": "complete-typed-classical-admonitive-person-number-contrast-source",
  "domain": "classical-admonitive-person-number-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-admonitive-person-number-contrast",
  "selections": [
    "claim-p1131",
    "claim-p1132",
    "claim-p1133",
    "claim-p1134"
  ],
  "coordinates": {
    "claim-p1131::p1131-the-pers1-morphs-x-and-xi-always-distinguish-a": {
      "assertionId": "classical-admonitive-person-number-contrast:p1131-the-pers1-morphs-x-and-xi-always-distinguish-a",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1132::p1132-the-vncs-with-plural-subjects-are-always-distinctive": {
      "assertionId": "classical-admonitive-person-number-contrast:p1132-the-vncs-with-plural-subjects-are-always-distinctive",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1133::p1133-in-texts-that-do-not-represent-the-glottal-stop": {
      "assertionId": "classical-admonitive-person-number-contrast:p1133-in-texts-that-do-not-represent-the-glottal-stop",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1134::p1134-remarks-the-admonitive-vncs-and-the-nonpast-optative-vncs": {
      "assertionId": "classical-admonitive-person-number-contrast:p1134-remarks-the-admonitive-vncs-and-the-nonpast-optative-vncs",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1131": [
      "direct-warning"
    ],
    "claim-p1132": [
      "class-b-plural"
    ],
    "claim-p1133": [
      "direct-warning"
    ],
    "claim-p1134": [
      "class-b-plural"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1131": "authorized",
    "claim-p1132": "authorized",
    "claim-p1133": "authorized",
    "claim-p1134": "authorized"
  }
};
export default Object.freeze(spec);
