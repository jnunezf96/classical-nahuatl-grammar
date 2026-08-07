const spec = {
  "ownerId": "classical-place-gentilic-gentilic-alternative-route",
  "prefix": "ClassicalPlaceGentilicGentilicAlternativeRoute",
  "operationId": "classical.place.gentilic.gentilic.alternative.route.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-alternative-route-source",
  "domain": "classical-place-gentilic-gentilic-alternative-route",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4637"
  ],
  "coordinates": {
    "claim-p4637::p4637-note-1-a-place-name-that-normally-forms-a": {
      "assertionId": "classical-place-gentilic-gentilic-alternative-route:p4637-note-1-a-place-name-that-normally-forms-a",
      "canonicalPath": "analyses.alternativeRoute.productiveCanonical"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4637": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4637": "authorized"
  }
};
export default Object.freeze(spec);
