const spec = {
  "ownerId": "classical-attitude-compound-embed",
  "prefix": "ClassicalAttitudeCompoundEmbed",
  "operationId": "classical.attitude.compound.embed.execute",
  "inputContract": "complete-typed-classical-attitude-compound-embed-source",
  "domain": "classical-attitude-compound-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3246",
    "claim-p3247",
    "claim-p3248"
  ],
  "coordinates": {
    "claim-p3246::p3246-vncs-built-on-compound-verbstems-can-undergo-honorific-and": {
      "assertionId": "classical-attitude-compound-embed:p3246-vncs-built-on-compound-verbstems-can-undergo-honorific-and",
      "canonicalPath": "cases.compoundEmbed.rules.attitude-compound"
    },
    "claim-p3247::p3247-for-the-honorific-stem-of-te-tla-itzi-in": {
      "assertionId": "classical-attitude-compound-embed:p3247-for-the-honorific-stem-of-te-tla-itzi-in",
      "canonicalPath": "cases.compoundEmbed.authorizationStatus"
    },
    "claim-p3248::p3248-this-stem-presupposes-the-unattested-causative-stem-te-tla": {
      "assertionId": "classical-attitude-compound-embed:p3248-this-stem-presupposes-the-unattested-causative-stem-te-tla",
      "canonicalPath": "cases.compoundEmbed.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3246": [],
    "claim-p3247": [],
    "claim-p3248": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3246": "authorized",
    "claim-p3247": "authorized",
    "claim-p3248": "authorized"
  }
};
export default Object.freeze(spec);
