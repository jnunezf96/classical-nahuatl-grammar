const spec = {
  "ownerId": "classical-huia-causative-domain",
  "prefix": "ClassicalHuiaCausativeDomain",
  "operationId": "classical.huia.causative.domain.execute",
  "inputContract": "complete-typed-classical-huia-causative-domain-source",
  "domain": "classical-huia-causative-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2460",
    "claim-p2461"
  ],
  "coordinates": {
    "claim-p2460::p2460-this-causative-stem-forming-unit-is-identical-to-the": {
      "assertionId": "classical-huia-causative-domain:p2460-this-causative-stem-forming-unit-is-identical-to-the",
      "canonicalPath": "contract.axes.16.axisId"
    },
    "claim-p2461::p2461-when-an-intransitive-active-stem-ends-in-o-and": {
      "assertionId": "classical-huia-causative-domain:p2461-when-an-intransitive-active-stem-ends-in-o-and",
      "canonicalPath": "derivations.temo.options.0.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2460": [],
    "claim-p2461": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2460": "authorized",
    "claim-p2461": "authorized"
  }
};
export default Object.freeze(spec);
