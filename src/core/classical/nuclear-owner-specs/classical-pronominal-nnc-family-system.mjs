const spec = {
  "ownerId": "classical-pronominal-nnc-family-system",
  "prefix": "ClassicalPronominalNncFamilySystem",
  "operationId": "classical.pronominal.nnc.family.system.execute",
  "inputContract": "complete-typed-classical-pronominal-nnc-family-system-source",
  "domain": "classical-pronominal-nnc-family-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1643",
    "claim-p1644",
    "claim-p1645"
  ],
  "coordinates": {
    "claim-p1643::p1643-there-is-a-special-kind-of-nnc-which-is": {
      "assertionId": "classical-pronominal-nnc-family-system:p1643-there-is-a-special-kind-of-nnc-which-is",
      "canonicalPath": "pronominalContract.greatestCommonDivisor.identityId"
    },
    "claim-p1644::p1644-these-stems-therefore-occur-only-in-absolutive-state-nncs": {
      "assertionId": "classical-pronominal-nnc-family-system:p1644-these-stems-therefore-occur-only-in-absolutive-state-nncs",
      "canonicalPath": "pronominalFrame.sourceFrame.state"
    },
    "claim-p1645::p1645-besides-being-of-two-semantic-kinds-entitive-and-quantitive": {
      "assertionId": "classical-pronominal-nnc-family-system:p1645-besides-being-of-two-semantic-kinds-entitive-and-quantitive",
      "canonicalPath": "pronominalContract.leastCommonMultiple.axisCount"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1643": [
      "l16-personal-simple"
    ],
    "claim-p1644": [
      "l16-personal-simple"
    ],
    "claim-p1645": [
      "l16-personal-simple"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1643": "authorized",
    "claim-p1644": "authorized",
    "claim-p1645": "authorized"
  }
};
export default Object.freeze(spec);
