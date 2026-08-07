const spec = {
  "ownerId": "classical-place-gentilic-place-co-place-affective",
  "prefix": "ClassicalPlaceGentilicPlaceCoPlaceAffective",
  "operationId": "classical.place.gentilic.place.co.place.affective.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-co-place-affective-source",
  "domain": "classical-place-gentilic-place-co-place-affective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4596"
  ],
  "coordinates": {
    "claim-p4596::p4596-a-place-name-nounstem-can-serve-as-an-embed": {
      "assertionId": "classical-place-gentilic-place-co-place-affective:p4596-a-place-name-nounstem-can-serve-as-an-embed",
      "canonicalPath": "cases.coPlaceAffective.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4596": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4596": "authorized"
  }
};
export default Object.freeze(spec);
