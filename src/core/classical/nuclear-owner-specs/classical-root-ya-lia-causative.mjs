const spec = {
  "ownerId": "classical-root-ya-lia-causative",
  "prefix": "ClassicalRootYaLiaCausative",
  "operationId": "classical.root.ya.lia.causative.execute",
  "inputContract": "complete-typed-classical-root-ya-lia-causative-source",
  "domain": "classical-root-ya-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2458",
    "claim-p2459"
  ],
  "coordinates": {
    "claim-p2458::p2458-the-ya-is-deleted-and-lia-is-attached-to": {
      "assertionId": "classical-root-ya-lia-causative:p2458-the-ya-is-deleted-and-lia-is-attached-to",
      "canonicalPath": "derivations.ahhuiaya.options.1.targetStem"
    },
    "claim-p2459::p2459-those-verb-stems-ending-in-a-that-take-lia": {
      "assertionId": "classical-root-ya-lia-causative:p2459-those-verb-stems-ending-in-a-that-take-lia",
      "canonicalPath": "derivations.ceceya.options.1.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2458": [],
    "claim-p2459": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2458": "authorized",
    "claim-p2459": "authorized"
  }
};
export default Object.freeze(spec);
