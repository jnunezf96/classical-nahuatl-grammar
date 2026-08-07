const spec = {
  "ownerId": "classical-place-gentilic-extension-collectivity-possessive",
  "prefix": "ClassicalPlaceGentilicExtensionCollectivityPossessive",
  "operationId": "classical.place.gentilic.extension.collectivity.possessive.execute",
  "inputContract": "complete-typed-classical-place-gentilic-extension-collectivity-possessive-source",
  "domain": "classical-place-gentilic-extension-collectivity-possessive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4648",
    "claim-p4649"
  ],
  "coordinates": {
    "claim-p4648::p4648-the-possessive-state-nnc-built-on-a-gentilic-collectivity": {
      "assertionId": "classical-place-gentilic-extension-collectivity-possessive:p4648-the-possessive-state-nnc-built-on-a-gentilic-collectivity",
      "canonicalPath": "cases.collectivityPossessiveZero.canonicalFrame"
    },
    "claim-p4649::p4649-the-gentilic-collectivity-nnc-can-function-as-an-adjectival": {
      "assertionId": "classical-place-gentilic-extension-collectivity-possessive:p4649-the-gentilic-collectivity-nnc-can-function-as-an-adjectival",
      "canonicalPath": "cases.collectivityAdjectival.sourceUsage"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4648": [],
    "claim-p4649": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4648": "authorized",
    "claim-p4649": "authorized"
  }
};
export default Object.freeze(spec);
