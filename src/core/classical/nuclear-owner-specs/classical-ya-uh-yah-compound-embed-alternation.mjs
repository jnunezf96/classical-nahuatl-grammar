const spec = {
  "ownerId": "classical-ya-uh-yah-compound-embed-alternation",
  "prefix": "ClassicalYaUhYahCompoundEmbedAlternation",
  "operationId": "classical.ya.uh.yah.compound.embed.alternation.execute",
  "inputContract": "complete-typed-classical-ya-uh-yah-compound-embed-alternation-source",
  "domain": "classical-ya-uh-yah-compound-embed-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2818",
    "claim-p2819",
    "claim-p2820"
  ],
  "coordinates": {
    "claim-p2818::p2818-the-verb-ya-uh-uses-a-preterit-predicate-formed": {
      "assertionId": "classical-ya-uh-yah-compound-embed-alternation:p2818-the-verb-ya-uh-uses-a-preterit-predicate-formed",
      "canonicalPath": "cases.yaEmbed.facts.embedStem"
    },
    "claim-p2819::p2819-this-is-a-regular-formation": {
      "assertionId": "classical-ya-uh-yah-compound-embed-alternation:p2819-this-is-a-regular-formation",
      "canonicalPath": "cases.yaEmbed.targetStem"
    },
    "claim-p2820::p2820-ya-yah-ti-nemi-to-stroll-along-to-go": {
      "assertionId": "classical-ya-uh-yah-compound-embed-alternation:p2820-ya-yah-ti-nemi-to-stroll-along-to-go",
      "canonicalPath": "cases.yaEmbed.facts.embedStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2818": [],
    "claim-p2819": [],
    "claim-p2820": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2818": "authorized",
    "claim-p2819": "authorized",
    "claim-p2820": "authorized"
  }
};
export default Object.freeze(spec);
