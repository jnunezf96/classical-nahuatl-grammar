const spec = {
  "ownerId": "classical-destockal-irregular-source-lifecycle",
  "prefix": "ClassicalDestockalIrregularSourceLifecycle",
  "operationId": "classical.destockal.irregular.source.lifecycle.execute",
  "inputContract": "complete-typed-classical-destockal-irregular-source-lifecycle-source",
  "domain": "classical-destockal-irregular-source-lifecycle",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2343",
    "claim-p2344"
  ],
  "coordinates": {
    "claim-p2343::p2343-there-are-a-few-irregular-destockal-verbstems-of-the": {
      "assertionId": "classical-destockal-irregular-source-lifecycle:p2343-there-are-a-few-irregular-destockal-verbstems-of-the",
      "canonicalPath": "derivations.mini.options.0.derivationRoute"
    },
    "claim-p2344::p2344-among-the-destockal-verbstems-with-ni-as-the-stem": {
      "assertionId": "classical-destockal-irregular-source-lifecycle:p2344-among-the-destockal-verbstems-with-ni-as-the-stem",
      "canonicalPath": "derivations.xini.options.0.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2343": [],
    "claim-p2344": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2343": "authorized",
    "claim-p2344": "authorized"
  }
};
export default Object.freeze(spec);
