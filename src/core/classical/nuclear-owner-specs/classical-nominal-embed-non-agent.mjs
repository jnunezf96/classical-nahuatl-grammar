const spec = {
  "ownerId": "classical-nominal-embed-non-agent",
  "prefix": "ClassicalNominalEmbedNonAgent",
  "operationId": "classical.nominal.embed.non.agent.execute",
  "inputContract": "complete-typed-classical-nominal-embed-non-agent-source",
  "domain": "classical-nominal-embed-non-agent",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3054",
    "claim-p3055",
    "claim-p3056",
    "claim-p3057",
    "claim-p3058"
  ],
  "coordinates": {
    "claim-p3054::p3054-special-care-must-be-taken-on-one-point-the": {
      "assertionId": "classical-nominal-embed-non-agent:p3054-special-care-must-be-taken-on-one-point-the",
      "canonicalPath": "cases.base.rules.nominal-embed/non-agent"
    },
    "claim-p3055::p3055-proof-of-this-lies-in-the-fact-that-the": {
      "assertionId": "classical-nominal-embed-non-agent:p3055-proof-of-this-lies-in-the-fact-that-the",
      "canonicalPath": "cases.base.authorizationStatus"
    },
    "claim-p3056::p3056-this-is-even-more-so-when-the-only-reasonable": {
      "assertionId": "classical-nominal-embed-non-agent:p3056-this-is-even-more-so-when-the-only-reasonable",
      "canonicalPath": "cases.base.gcdSatisfied"
    },
    "claim-p3057::p3057-for-instance-the-preferred-translation-for-huexi-uhtla-hua": {
      "assertionId": "classical-nominal-embed-non-agent:p3057-for-instance-the-preferred-translation-for-huexi-uhtla-hua",
      "canonicalPath": "cases.base.lcmComplete"
    },
    "claim-p3058::p3058-when-the-vnc-has-a-first-or-second-person": {
      "assertionId": "classical-nominal-embed-non-agent:p3058-when-the-vnc-has-a-first-or-second-person",
      "canonicalPath": "cases.base.rules.nominal-embed/non-agent"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3054": [],
    "claim-p3055": [],
    "claim-p3056": [],
    "claim-p3057": [],
    "claim-p3058": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3054": "authorized",
    "claim-p3055": "authorized",
    "claim-p3056": "authorized",
    "claim-p3057": "authorized",
    "claim-p3058": "authorized"
  }
};
export default Object.freeze(spec);
