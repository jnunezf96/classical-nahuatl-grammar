const spec = {
  "ownerId": "classical-lia-causative-domain",
  "prefix": "ClassicalLiaCausativeDomain",
  "operationId": "classical.lia.causative.domain.execute",
  "inputContract": "complete-typed-classical-lia-causative-domain-source",
  "domain": "classical-lia-causative-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2455",
    "claim-p2456"
  ],
  "coordinates": {
    "claim-p2455::p2455-this-causative-stem-forming-lia-is-phonologically-identical-to": {
      "assertionId": "classical-lia-causative-domain:p2455-this-causative-stem-forming-lia-is-phonologically-identical-to",
      "canonicalPath": "contract.axes.15.axisId"
    },
    "claim-p2456::p2456-some-intrasitive-verbs-whose-active-stem-ends-in-i": {
      "assertionId": "classical-lia-causative-domain:p2456-some-intrasitive-verbs-whose-active-stem-ends-in-i",
      "canonicalPath": "derivations.cocoya.options.1.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2455": [],
    "claim-p2456": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2455": "authorized",
    "claim-p2456": "authorized"
  }
};
export default Object.freeze(spec);
