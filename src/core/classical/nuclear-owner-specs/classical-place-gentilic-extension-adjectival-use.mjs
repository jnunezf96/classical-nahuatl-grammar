const spec = {
  "ownerId": "classical-place-gentilic-extension-adjectival-use",
  "prefix": "ClassicalPlaceGentilicExtensionAdjectivalUse",
  "operationId": "classical.place.gentilic.extension.adjectival.use.execute",
  "inputContract": "complete-typed-classical-place-gentilic-extension-adjectival-use-source",
  "domain": "classical-place-gentilic-extension-adjectival-use",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4644"
  ],
  "coordinates": {
    "claim-p4644::p4644-like-other-nncs-a-gentilic-nnc-may-be-used": {
      "assertionId": "classical-place-gentilic-extension-adjectival-use:p4644-like-other-nncs-a-gentilic-nnc-may-be-used",
      "canonicalPath": "cases.adjectivalGentilic.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4644": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4644": "authorized"
  }
};
export default Object.freeze(spec);
