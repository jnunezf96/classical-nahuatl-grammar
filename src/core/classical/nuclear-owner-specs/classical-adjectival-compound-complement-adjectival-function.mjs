const spec = {
  "ownerId": "classical-adjectival-compound-complement-adjectival-function",
  "prefix": "ClassicalAdjectivalCompoundComplementAdjectivalFunction",
  "operationId": "classical.adjectival.compound.complement.adjectival.function.execute",
  "inputContract": "complete-typed-classical-adjectival-compound-complement-adjectival-function-source",
  "domain": "classical-adjectival-compound-complement-adjectival-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4001"
  ],
  "coordinates": {
    "claim-p4001::p4001-the-compound-verbstem-can-occur-in-a-preterit-agentive": {
      "assertionId": "classical-adjectival-compound-complement-adjectival-function:p4001-the-compound-verbstem-can-occur-in-a-preterit-agentive",
      "canonicalPath": "sources.nominalEmbed.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4001": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4001": "authorized"
  }
};
export default Object.freeze(spec);
