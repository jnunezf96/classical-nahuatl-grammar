const spec = {
  "ownerId": "classical-place-gentilic-place-topographical-boundary",
  "prefix": "ClassicalPlaceGentilicPlaceTopographicalBoundary",
  "operationId": "classical.place.gentilic.place.topographical.boundary.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-topographical-boundary-source",
  "domain": "classical-place-gentilic-place-topographical-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4564"
  ],
  "coordinates": {
    "claim-p4564::p4564-a-nahuatl-topographical-feature-name-frequently-serves-as-the": {
      "assertionId": "classical-place-gentilic-place-topographical-boundary:p4564-a-nahuatl-topographical-feature-name-frequently-serves-as-the",
      "canonicalPath": "analyses.topographicalBoundary.topographicalNameIsPlaceByDefault"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4564": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4564": "authorized"
  }
};
export default Object.freeze(spec);
