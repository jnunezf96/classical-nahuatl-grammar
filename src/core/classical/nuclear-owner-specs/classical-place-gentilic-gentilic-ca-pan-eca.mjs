const spec = {
  "ownerId": "classical-place-gentilic-gentilic-ca-pan-eca",
  "prefix": "ClassicalPlaceGentilicGentilicCaPanEca",
  "operationId": "classical.place.gentilic.gentilic.ca.pan.eca.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-ca-pan-eca-source",
  "domain": "classical-place-gentilic-gentilic-ca-pan-eca",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4626"
  ],
  "coordinates": {
    "claim-p4626::p4626-place-name-nounstems-formed-on-pan-see-48-3": {
      "assertionId": "classical-place-gentilic-gentilic-ca-pan-eca:p4626-place-name-nounstems-formed-on-pan-see-48-3",
      "canonicalPath": "cases.panEcaGentilic.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4626": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4626": "authorized"
  }
};
export default Object.freeze(spec);
