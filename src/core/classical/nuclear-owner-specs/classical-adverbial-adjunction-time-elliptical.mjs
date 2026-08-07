const spec = {
  "ownerId": "classical-adverbial-adjunction-time-elliptical",
  "prefix": "ClassicalAdverbialAdjunctionTimeElliptical",
  "operationId": "classical.adverbial.adjunction.time.elliptical.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-elliptical-source",
  "domain": "classical-adverbial-adjunction-time-elliptical",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4705"
  ],
  "coordinates": {
    "claim-p4705::p4705-the-construction-may-be-elliptical-i-e-without-the": {
      "assertionId": "classical-adverbial-adjunction-time-elliptical:p4705-the-construction-may-be-elliptical-i-e-without-the",
      "canonicalPath": "analysis.temporalIuhquiMayBeElliptical"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4705": [
      "time-elliptical"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4705": "authorized"
  }
};
export default Object.freeze(spec);
