const spec = {
  "ownerId": "classical-place-gentilic-extension-gentilic-collectivity",
  "prefix": "ClassicalPlaceGentilicExtensionGentilicCollectivity",
  "operationId": "classical.place.gentilic.extension.gentilic.collectivity.execute",
  "inputContract": "complete-typed-classical-place-gentilic-extension-gentilic-collectivity-source",
  "domain": "classical-place-gentilic-extension-gentilic-collectivity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4645",
    "claim-p4646",
    "claim-p4647"
  ],
  "coordinates": {
    "claim-p4645::p4645-gentilic-nounstems-can-be-embedded-in-the-matrix-nounstem": {
      "assertionId": "classical-place-gentilic-extension-gentilic-collectivity:p4645-gentilic-nounstems-can-be-embedded-in-the-matrix-nounstem",
      "canonicalPath": "cases.collectivity.canonicalFrame"
    },
    "claim-p4646::p4646-if-a-milpan-functions-as-a-locative-adverbial-nnc": {
      "assertionId": "classical-place-gentilic-extension-gentilic-collectivity:p4646-if-a-milpan-functions-as-a-locative-adverbial-nnc",
      "canonicalPath": "analyses.collectivityPertinencyBoundary.surfaceIdentityTransfersOwnership"
    },
    "claim-p4647::p4647-if-an-nnc-such-as-a-mi-lpan-is": {
      "assertionId": "classical-place-gentilic-extension-gentilic-collectivity:p4647-if-an-nnc-such-as-a-mi-lpan-is",
      "canonicalPath": "analyses.collectivityPertinencyBoundary.usageControlsAnalysis"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4645": [],
    "claim-p4646": [],
    "claim-p4647": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4645": "authorized",
    "claim-p4646": "authorized",
    "claim-p4647": "authorized"
  }
};
export default Object.freeze(spec);
