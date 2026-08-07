const spec = {
  "ownerId": "classical-place-gentilic-place-function-use",
  "prefix": "ClassicalPlaceGentilicPlaceFunctionUse",
  "operationId": "classical.place.gentilic.place.function.use.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-function-use-source",
  "domain": "classical-place-gentilic-place-function-use",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4555",
    "claim-p4556",
    "claim-p4557"
  ],
  "coordinates": {
    "claim-p4555::p4555-the-place-so-named-may-be-real-fictional-mythical": {
      "assertionId": "classical-place-gentilic-place-function-use:p4555-the-place-so-named-may-be-real-fictional-mythical",
      "canonicalPath": "analyses.functionUse.usage"
    },
    "claim-p4556::p4556-a-place-name-nnc-can-be-used-in-the": {
      "assertionId": "classical-place-gentilic-place-function-use:p4556-a-place-name-nnc-can-be-used-in-the",
      "canonicalPath": "analyses.functionUse.EnglishPrepositionAuthorizesMorphology"
    },
    "claim-p4557::p4557-as-an-adverbial-nnc-this-is-the-most-common": {
      "assertionId": "classical-place-gentilic-place-function-use:p4557-as-an-adverbial-nnc-this-is-the-most-common",
      "canonicalPath": "analyses.functionUse.usage"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4555": [],
    "claim-p4556": [],
    "claim-p4557": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4555": "authorized",
    "claim-p4556": "authorized",
    "claim-p4557": "authorized"
  }
};
export default Object.freeze(spec);
