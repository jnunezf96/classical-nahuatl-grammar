const spec = {
  "ownerId": "classical-connective-compound-preterit-embed",
  "prefix": "ClassicalConnectiveCompoundPreteritEmbed",
  "operationId": "classical.connective.compound.preterit.embed.execute",
  "inputContract": "complete-typed-classical-connective-compound-preterit-embed-source",
  "domain": "classical-connective-compound-preterit-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2765",
    "claim-p2766",
    "claim-p2767",
    "claim-p2768"
  ],
  "coordinates": {
    "claim-p2765::p2765-in-all-of-these-connective-t-compounds-the-verbal": {
      "assertionId": "classical-connective-compound-preterit-embed:p2765-in-all-of-these-connective-t-compounds-the-verbal",
      "canonicalPath": "contract.connectiveEmbedTense"
    },
    "claim-p2766::p2766-there-is-therefore-an-implied-difference-in-the-time": {
      "assertionId": "classical-connective-compound-preterit-embed:p2766-there-is-therefore-an-implied-difference-in-the-time",
      "canonicalPath": "cases.preteritEmbed.facts.embedStem"
    },
    "claim-p2767::p2767-here-the-embed-is-generated-from-the-preterit-tense": {
      "assertionId": "classical-connective-compound-preterit-embed:p2767-here-the-embed-is-generated-from-the-preterit-tense",
      "canonicalPath": "cases.preteritEmbed.facts.matrixStem"
    },
    "claim-p2768::p2768-note-when-dealing-with-vnc-vnc-compound-formations-some": {
      "assertionId": "classical-connective-compound-preterit-embed:p2768-note-when-dealing-with-vnc-vnc-compound-formations-some",
      "canonicalPath": "contract.connectiveEmbedTense"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2765": [],
    "claim-p2766": [],
    "claim-p2767": [],
    "claim-p2768": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2765": "authorized",
    "claim-p2766": "authorized",
    "claim-p2767": "authorized",
    "claim-p2768": "authorized"
  }
};
export default Object.freeze(spec);
