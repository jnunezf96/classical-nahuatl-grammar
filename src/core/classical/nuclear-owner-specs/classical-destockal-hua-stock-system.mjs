const spec = {
  "ownerId": "classical-destockal-hua-stock-system",
  "prefix": "ClassicalDestockalHuaStockSystem",
  "operationId": "classical.destockal.hua.stock.system.execute",
  "inputContract": "complete-typed-classical-destockal-hua-stock-system-source",
  "domain": "classical-destockal-hua-stock-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2345",
    "claim-p2346"
  ],
  "coordinates": {
    "claim-p2345::p2345-there-are-two-stock-formatives-a-and-e": {
      "assertionId": "classical-destockal-hua-stock-system:p2345-there-are-two-stock-formatives-a-and-e",
      "canonicalPath": "sources.pinahua.analysisCategories.0"
    },
    "claim-p2346::p2346-the-second-kind-of-intransitive-destockal-verbstem-is-characterized": {
      "assertionId": "classical-destockal-hua-stock-system:p2346-the-second-kind-of-intransitive-destockal-verbstem-is-characterized",
      "canonicalPath": "contract.axes.4.semanticFactRole"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2345": [],
    "claim-p2346": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2345": "authorized",
    "claim-p2346": "authorized"
  }
};
export default Object.freeze(spec);
