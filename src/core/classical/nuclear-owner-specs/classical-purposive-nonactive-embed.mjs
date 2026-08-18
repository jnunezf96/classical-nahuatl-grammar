const spec = {
  "ownerId": "classical-purposive-nonactive-embed",
  "prefix": "ClassicalPurposiveNonactiveEmbed",
  "operationId": "classical.purposive.nonactive.embed.execute",
  "inputContract": "complete-typed-classical-purposive-nonactive-embed-source",
  "domain": "classical-purposive-nonactive-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2952",
    "claim-p2953"
  ],
  "coordinates": {
    "claim-p2952::p2952-a-future-tense-predicate-built-on-a-nonactive-stem": {
      "assertionId": "classical-purposive-nonactive-embed:p2952-a-future-tense-predicate-built-on-a-nonactive-stem",
      "canonicalPath": "cases.nonactiveEmbed.facts.nonactiveEmbedAuthorized"
    },
    "claim-p2953::p2953-it-will-be-in-either-the-passive-or-the": {
      "assertionId": "classical-purposive-nonactive-embed:p2953-it-will-be-in-either-the-passive-or-the",
      "canonicalPath": "cases.nonactiveEmbed.facts.nonactiveEmbedVoices"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2952": [],
    "claim-p2953": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2952": "authorized",
    "claim-p2953": "authorized"
  }
};
export default Object.freeze(spec);
