const spec = {
  "ownerId": "classical-place-gentilic-place-n-can",
  "prefix": "ClassicalPlaceGentilicPlaceNCan",
  "operationId": "classical.place.gentilic.place.n.can.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-n-can-source",
  "domain": "classical-place-gentilic-place-n-can",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4577",
    "claim-p4578",
    "claim-p4579",
    "claim-p4580"
  ],
  "coordinates": {
    "claim-p4577::p4577-the-embed-is-any-nounstem-that-is-not-formed": {
      "assertionId": "classical-place-gentilic-place-n-can:p4577-the-embed-is-any-nounstem-that-is-not-formed",
      "canonicalPath": "cases.nCan.canonicalFrame"
    },
    "claim-p4578::p4578-the-formation-can-use-the-compound-matrix-stem-ca": {
      "assertionId": "classical-place-gentilic-place-n-can:p4578-the-formation-can-use-the-compound-matrix-stem-ca",
      "canonicalPath": "cases.nCan.lcmAxisId"
    },
    "claim-p4579::p4579-among-the-place-name-nncs-having-this-formation-are": {
      "assertionId": "classical-place-gentilic-place-n-can:p4579-among-the-place-name-nncs-having-this-formation-are",
      "canonicalPath": "cases.nCan.canonicalFrame"
    },
    "claim-p4580::p4580-the-following-are-all-the-commonly-found-place-names": {
      "assertionId": "classical-place-gentilic-place-n-can:p4580-the-following-are-all-the-commonly-found-place-names",
      "canonicalPath": "cases.nCan.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4577": [],
    "claim-p4578": [],
    "claim-p4579": [],
    "claim-p4580": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4577": "authorized",
    "claim-p4578": "authorized",
    "claim-p4579": "authorized",
    "claim-p4580": "authorized"
  }
};
export default Object.freeze(spec);
