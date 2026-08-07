const spec = {
  "ownerId": "classical-affinity-nounstem-derivation",
  "prefix": "ClassicalAffinityNounstemDerivation",
  "operationId": "classical.affinity.nounstem.derivation.execute",
  "inputContract": "complete-typed-classical-affinity-nounstem-derivation-source",
  "domain": "classical-affinity-nounstem-derivation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1464",
    "claim-p1465",
    "claim-p1466",
    "claim-p1467",
    "claim-p1468"
  ],
  "coordinates": {
    "claim-p1464::p1464-when-there-is-a-need-to-point-to-a": {
      "assertionId": "classical-affinity-nounstem-derivation:p1464-when-there-is-a-need-to-point-to-a",
      "canonicalPath": "stemDerivationFrame.operationId"
    },
    "claim-p1465::p1465-when-there-is-a-need-to-point-to-a": {
      "assertionId": "classical-affinity-nounstem-derivation:p1465-when-there-is-a-need-to-point-to-a",
      "canonicalPath": "stemDerivationFrame.stemFormation"
    },
    "claim-p1466::p1466-tah-tli-father-ta-tah-t-fathers-of-a": {
      "assertionId": "classical-affinity-nounstem-derivation:p1466-tah-tli-father-ta-tah-t-fathers-of-a",
      "canonicalPath": "stemDerivationFrame.derivedStem"
    },
    "claim-p1467::p1467-cal-li-house-ca-cal-li-houses-of-a": {
      "assertionId": "classical-affinity-nounstem-derivation:p1467-cal-li-house-ca-cal-li-houses-of-a",
      "canonicalPath": "stemDerivationFrame.derivedStem"
    },
    "claim-p1468::p1468-note-affective-nounstems-use-a-reduplicative-prefix-with-a": {
      "assertionId": "classical-affinity-nounstem-derivation:p1468-note-affective-nounstems-use-a-reduplicative-prefix-with-a",
      "canonicalPath": "stemDerivationFrame.reduplicativePrefix"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1464": [
      "derive-affinity-tah"
    ],
    "claim-p1465": [
      "derive-affinity-tah"
    ],
    "claim-p1466": [
      "derive-affinity-tah"
    ],
    "claim-p1467": [
      "derive-affinity-cal"
    ],
    "claim-p1468": [
      "derive-affinity-tah"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1464": "authorized",
    "claim-p1465": "authorized",
    "claim-p1466": "authorized",
    "claim-p1467": "authorized",
    "claim-p1468": "authorized"
  }
};
export default Object.freeze(spec);
