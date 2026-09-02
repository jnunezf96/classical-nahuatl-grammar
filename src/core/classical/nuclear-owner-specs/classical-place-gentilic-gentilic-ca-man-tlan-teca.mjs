const spec = {
  "ownerId": "classical-place-gentilic-gentilic-ca-man-tlan-teca",
  "prefix": "ClassicalPlaceGentilicGentilicCaManTlanTeca",
  "operationId": "classical.place.gentilic.gentilic.ca.man.tlan.teca.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-ca-man-tlan-teca-source",
  "domain": "classical-place-gentilic-gentilic-ca-man-tlan-teca",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4634",
    "claim-p4635"
  ],
  "coordinates": {
    "claim-p4634::p4634-tla-n-see-48-2-4-as-matrix-form": {
      "assertionId": "classical-place-gentilic-gentilic-ca-man-tlan-teca:p4634-tla-n-see-48-2-4-as-matrix-form",
      "canonicalPath": "cases.tlanGentilic.lcmAxisId"
    },
    "claim-p4635::p4635-place-name-nounstems-that-have-ma-n-see-48": {
      "assertionId": "classical-place-gentilic-gentilic-ca-man-tlan-teca:p4635-place-name-nounstems-that-have-ma-n-see-48",
      "canonicalPath": "constraints.manTlanGentilicPair.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4634": [],
    "claim-p4635": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4634": "authorized",
    "claim-p4635": "authorized"
  }
};
export default Object.freeze(spec);
