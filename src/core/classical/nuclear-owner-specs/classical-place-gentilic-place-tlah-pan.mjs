const spec = {
  "ownerId": "classical-place-gentilic-place-tlah-pan",
  "prefix": "ClassicalPlaceGentilicPlaceTlahPan",
  "operationId": "classical.place.gentilic.place.tlah.pan.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-tlah-pan-source",
  "domain": "classical-place-gentilic-place-tlah-pan",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4601"
  ],
  "coordinates": {
    "claim-p4601::p4601-the-embed-may-be-formed-on-the-relational-nounstem": {
      "assertionId": "classical-place-gentilic-place-tlah-pan:p4601-the-embed-may-be-formed-on-the-relational-nounstem",
      "canonicalPath": "cases.tlahPan.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4601": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4601": "authorized"
  }
};
export default Object.freeze(spec);
