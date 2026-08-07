const spec = {
  "ownerId": "classical-relational-locative-n-place-time-domain",
  "prefix": "ClassicalRelationalLocativeNPlaceTimeDomain",
  "operationId": "classical.relational.locative.n.place.time.domain.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-place-time-domain-source",
  "domain": "classical-relational-locative-n-place-time-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4318",
    "claim-p4319"
  ],
  "coordinates": {
    "claim-p4318::p4318-the-matrix-only-nounstem-n-tli-place-is-used": {
      "assertionId": "classical-relational-locative-n-place-time-domain:p4318-the-matrix-only-nounstem-n-tli-place-is-used",
      "canonicalPath": "cases.optionTwo.canonicalResult"
    },
    "claim-p4319::p4319-on-occasion-however-the-meaning-can-give-way-to": {
      "assertionId": "classical-relational-locative-n-place-time-domain:p4319-on-occasion-however-the-meaning-can-give-way-to",
      "canonicalPath": "cases.optionTwo.stemId"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4318": [],
    "claim-p4319": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4318": "authorized",
    "claim-p4319": "authorized"
  }
};
export default Object.freeze(spec);
