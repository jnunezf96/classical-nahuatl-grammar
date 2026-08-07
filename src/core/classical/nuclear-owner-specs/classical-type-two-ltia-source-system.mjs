const spec = {
  "ownerId": "classical-type-two-ltia-source-system",
  "prefix": "ClassicalTypeTwoLtiaSourceSystem",
  "operationId": "classical.type.two.ltia.source.system.execute",
  "inputContract": "complete-typed-classical-type-two-ltia-source-system-source",
  "domain": "classical-type-two-ltia-source-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2442",
    "claim-p2443"
  ],
  "coordinates": {
    "claim-p2442::p2442-the-formation-is-distinguished-by-the-presence-of-an": {
      "assertionId": "classical-type-two-ltia-source-system:p2442-the-formation-is-distinguished-by-the-presence-of-an",
      "canonicalPath": "contract.axes.14.axisId"
    },
    "claim-p2443::p2443-class-c-and-d-verbs-make-their-causative-stems": {
      "assertionId": "classical-type-two-ltia-source-system:p2443-class-c-and-d-verbs-make-their-causative-stems",
      "canonicalPath": "derivations.cua.options.0.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2442": [],
    "claim-p2443": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2442": "authorized",
    "claim-p2443": "authorized"
  }
};
export default Object.freeze(spec);
