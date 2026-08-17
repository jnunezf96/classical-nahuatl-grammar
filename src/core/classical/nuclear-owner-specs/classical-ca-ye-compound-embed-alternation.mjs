const spec = {
  "ownerId": "classical-ca-ye-compound-embed-alternation",
  "prefix": "ClassicalCaYeCompoundEmbedAlternation",
  "operationId": "classical.ca.ye.compound.embed.alternation.execute",
  "inputContract": "complete-typed-classical-ca-ye-compound-embed-alternation-source",
  "domain": "classical-ca-ye-compound-embed-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2815",
    "claim-p2816",
    "claim-p2817"
  ],
  "coordinates": {
    "claim-p2815::p2815-the-verb-ca-h-when-occurring-as-the-embed": {
      "assertionId": "classical-ca-ye-compound-embed-alternation:p2815-the-verb-ca-h-when-occurring-as-the-embed",
      "canonicalPath": "cases.caEmbed.facts.specialPerfectiveEmbedResult"
    },
    "claim-p2816::p2816-this-is-an-unexpected-formation-since-it-is-the": {
      "assertionId": "classical-ca-ye-compound-embed-alternation:p2816-this-is-an-unexpected-formation-since-it-is-the",
      "canonicalPath": "cases.caEmbed.facts.caToYeEmbedAlternation"
    },
    "claim-p2817::p2817-ye-ti-uh-to-go-away-being": {
      "assertionId": "classical-ca-ye-compound-embed-alternation:p2817-ye-ti-uh-to-go-away-being",
      "canonicalPath": "cases.caEmbed.facts.embedStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2815": [],
    "claim-p2816": [],
    "claim-p2817": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2815": "authorized",
    "claim-p2816": "authorized",
    "claim-p2817": "authorized"
  }
};
export default Object.freeze(spec);
