const spec = {
  "ownerId": "classical-nominal-embed-ih-interaction",
  "prefix": "ClassicalNominalEmbedIhInteraction",
  "operationId": "classical.nominal.embed.ih.interaction.execute",
  "inputContract": "complete-typed-classical-nominal-embed-ih-interaction-source",
  "domain": "classical-nominal-embed-ih-interaction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3014",
    "claim-p3015",
    "claim-p3016",
    "claim-p3017"
  ],
  "coordinates": {
    "claim-p3014::p3014-the-adverbial-embed-can-occur-on-destockal-frequentative-verbstems": {
      "assertionId": "classical-nominal-embed-ih-interaction:p3014-the-adverbial-embed-can-occur-on-destockal-frequentative-verbstems",
      "canonicalPath": "cases.ihInteraction.rules.nominal-embed/ih-interaction"
    },
    "claim-p3015::p3015-ih-ca-cahu-a-ca-to-twitter-shrilly": {
      "assertionId": "classical-nominal-embed-ih-interaction:p3015-ih-ca-cahu-a-ca-to-twitter-shrilly",
      "canonicalPath": "cases.ihInteraction.authorizationStatus"
    },
    "claim-p3016::p3016-or-it-can-itself-be-reduplicated-the-i-is": {
      "assertionId": "classical-nominal-embed-ih-interaction:p3016-or-it-can-itself-be-reduplicated-the-i-is",
      "canonicalPath": "cases.ihInteraction.gcdSatisfied"
    },
    "claim-p3017::p3017-like-the-formation-in-27-4-1-the-compound": {
      "assertionId": "classical-nominal-embed-ih-interaction:p3017-like-the-formation-in-27-4-1-the-compound",
      "canonicalPath": "cases.ihInteraction.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3014": [],
    "claim-p3015": [],
    "claim-p3016": [],
    "claim-p3017": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3014": "authorized",
    "claim-p3015": "authorized",
    "claim-p3016": "authorized",
    "claim-p3017": "authorized"
  }
};
export default Object.freeze(spec);
