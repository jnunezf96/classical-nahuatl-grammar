const spec = {
  "ownerId": "classical-place-gentilic-place-pan-connective-t",
  "prefix": "ClassicalPlaceGentilicPlacePanConnectiveT",
  "operationId": "classical.place.gentilic.place.pan.connective.t.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-pan-connective-t-source",
  "domain": "classical-place-gentilic-place-pan-connective-t",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4588",
    "claim-p4589"
  ],
  "coordinates": {
    "claim-p4588::p4588-a-place-name-nounstem-formed-on-pan-can-involve": {
      "assertionId": "classical-place-gentilic-place-pan-connective-t:p4588-a-place-name-nounstem-formed-on-pan-can-involve",
      "canonicalPath": "analyses.panFormationContrast.integratedCanonical"
    },
    "claim-p4589::p4589-the-formation-may-be-built-on-a-connective-t": {
      "assertionId": "classical-place-gentilic-place-pan-connective-t:p4589-the-formation-may-be-built-on-a-connective-t",
      "canonicalPath": "analyses.panFormationContrast.connectiveCanonical"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4588": [],
    "claim-p4589": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4588": "authorized",
    "claim-p4589": "authorized"
  }
};
export default Object.freeze(spec);
