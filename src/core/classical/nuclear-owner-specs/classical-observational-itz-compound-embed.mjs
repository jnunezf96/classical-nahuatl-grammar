const spec = {
  "ownerId": "classical-observational-itz-compound-embed",
  "prefix": "ClassicalObservationalItzCompoundEmbed",
  "operationId": "classical.observational.itz.compound.embed.execute",
  "inputContract": "complete-typed-classical-observational-itz-compound-embed-source",
  "domain": "classical-observational-itz-compound-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2824",
    "claim-p2825",
    "claim-p2826",
    "claim-p2827",
    "claim-p2828",
    "claim-p2829"
  ],
  "coordinates": {
    "claim-p2824::p2824-as-already-mentioned-in-26-1-the-verbstem-te": {
      "assertionId": "classical-observational-itz-compound-embed:p2824-as-already-mentioned-in-26-1-the-verbstem-te",
      "canonicalPath": "cases.itzObservational.facts.itzEmbedSense"
    },
    "claim-p2825::p2825-te-itz-t-o-to-sit-remain-looking-at": {
      "assertionId": "classical-observational-itz-compound-embed:p2825-te-itz-t-o-to-sit-remain-looking-at",
      "canonicalPath": "cases.itzObservational.facts.embedStem"
    },
    "claim-p2826::p2826-tla-itz-ti-uh-to-go-seeing-s-th": {
      "assertionId": "classical-observational-itz-compound-embed:p2826-tla-itz-ti-uh-to-go-seeing-s-th",
      "canonicalPath": "blockedCases.itzMissingSense.blockReason"
    },
    "claim-p2827::p2827-one-also-finds-the-perfective-stem-of-the-intransitive": {
      "assertionId": "classical-observational-itz-compound-embed:p2827-one-also-finds-the-perfective-stem-of-the-intransitive",
      "canonicalPath": "cases.itzObservational.facts.itzEmbedSense"
    },
    "claim-p2828::p2828-itz-ti-uh-to-go-looking": {
      "assertionId": "classical-observational-itz-compound-embed:p2828-itz-ti-uh-to-go-looking",
      "canonicalPath": "cases.itzObservational.facts.embedStem"
    },
    "claim-p2829::p2829-itz-ti-ca-h-to-be-looking-to-be": {
      "assertionId": "classical-observational-itz-compound-embed:p2829-itz-ti-ca-h-to-be-looking-to-be",
      "canonicalPath": "blockedCases.itzMissingSense.blockReason"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2824": [],
    "claim-p2825": [],
    "claim-p2826": [],
    "claim-p2827": [],
    "claim-p2828": [],
    "claim-p2829": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2824": "authorized",
    "claim-p2825": "authorized",
    "claim-p2826": "authorized",
    "claim-p2827": "authorized",
    "claim-p2828": "authorized",
    "claim-p2829": "authorized"
  }
};
export default Object.freeze(spec);
