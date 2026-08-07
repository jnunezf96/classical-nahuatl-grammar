const spec = {
  "ownerId": "classical-adverbial-tequitl-zan-collocation",
  "prefix": "ClassicalAdverbialTequitlZanCollocation",
  "operationId": "classical.adverbial.tequitl.zan.collocation.execute",
  "inputContract": "complete-typed-classical-adverbial-tequitl-zan-collocation-source",
  "domain": "classical-adverbial-tequitl-zan-collocation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4160"
  ],
  "coordinates": {
    "claim-p4160::p4160-it-is-with-work-effort-the-adverbial-nnc-always": {
      "assertionId": "classical-adverbial-tequitl-zan-collocation:p4160-it-is-with-work-effort-the-adverbial-nnc-always",
      "canonicalPath": "cases.nncTequitl.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4160": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4160": "authorized"
  }
};
export default Object.freeze(spec);
