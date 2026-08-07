const spec = {
  "ownerId": "classical-destockal-hui-causative-preference",
  "prefix": "ClassicalDestockalHuiCausativePreference",
  "operationId": "classical.destockal.hui.causative.preference.execute",
  "inputContract": "complete-typed-classical-destockal-hui-causative-preference-source",
  "domain": "classical-destockal-hui-causative-preference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2339",
    "claim-p2340"
  ],
  "coordinates": {
    "claim-p2339::p2339-the-majority-of-hui-destockal-stems-prefer-to-replace": {
      "assertionId": "classical-destockal-hui-causative-preference:p2339-the-majority-of-hui-destockal-stems-prefer-to-replace",
      "canonicalPath": "derivations.tlapihui.options.1.derivationRoute"
    },
    "claim-p2340::p2340-only-a-few-hui-stems-prefer-to-add-the": {
      "assertionId": "classical-destockal-hui-causative-preference:p2340-only-a-few-hui-stems-prefer-to-add-the",
      "canonicalPath": "derivations.tlapihui.options.0.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2339": [],
    "claim-p2340": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2339": "authorized",
    "claim-p2340": "authorized"
  }
};
export default Object.freeze(spec);
