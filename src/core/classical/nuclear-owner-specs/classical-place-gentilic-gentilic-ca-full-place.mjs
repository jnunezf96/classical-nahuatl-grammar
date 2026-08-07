const spec = {
  "ownerId": "classical-place-gentilic-gentilic-ca-full-place",
  "prefix": "ClassicalPlaceGentilicGentilicCaFullPlace",
  "operationId": "classical.place.gentilic.gentilic.ca.full.place.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-ca-full-place-source",
  "domain": "classical-place-gentilic-gentilic-ca-full-place",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4624",
    "claim-p4625"
  ],
  "coordinates": {
    "claim-p4624::p4624-a-gentilic-nnc-can-be-created-on-a-compound": {
      "assertionId": "classical-place-gentilic-gentilic-ca-full-place:p4624-a-gentilic-nnc-can-be-created-on-a-compound",
      "canonicalPath": "cases.fullPlaceGentilic.canonicalFrame"
    },
    "claim-p4625::p4625-there-are-five-types-of-stem-formations-falling-into": {
      "assertionId": "classical-place-gentilic-gentilic-ca-full-place:p4625-there-are-five-types-of-stem-formations-falling-into",
      "canonicalPath": "cases.fullPlaceGentilic.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4624": [],
    "claim-p4625": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4624": "authorized",
    "claim-p4625": "authorized"
  }
};
export default Object.freeze(spec);
