const spec = {
  "ownerId": "classical-negative-command-formation",
  "prefix": "ClassicalNegativeCommandFormation",
  "operationId": "classical.negative.command.formation.execute",
  "inputContract": "complete-typed-classical-negative-command-formation-source",
  "domain": "classical-negative-command-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-negative-command-formation",
  "selections": [
    "claim-p1089",
    "claim-p1090",
    "claim-p1091",
    "claim-p1092",
    "claim-p1093",
    "claim-p1094"
  ],
  "coordinates": {
    "claim-p1089::p1089-a-negative-command-sentence-or-a-negative-exhortation-sentence": {
      "assertionId": "classical-negative-command-formation:p1089-a-negative-command-sentence-or-a-negative-exhortation-sentence",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1090::p1090-it-may-be-formed-with-either-a-nonpast": {
      "assertionId": "classical-negative-command-formation:p1090-it-may-be-formed-with-either-a-nonpast",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1091::p1091-optative-vnc-or-a-future-optative-vnc": {
      "assertionId": "classical-negative-command-formation:p1091-optative-vnc-or-a-future-optative-vnc",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1092::p1092-7-an-affirmative-command-that-is-ungracious-or-is": {
      "assertionId": "classical-negative-command-formation:p1092-7-an-affirmative-command-that-is-ungracious-or-is",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1093::p1093-in-the-negative-version-of-such-a-command-since": {
      "assertionId": "classical-negative-command-formation:p1093-in-the-negative-version-of-such-a-command-since",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1094::p1094-this-is-normally-found-in-the-slightly-more-emphatic": {
      "assertionId": "classical-negative-command-formation:p1094-this-is-normally-found-in-the-slightly-more-emphatic",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1089": [
      "negative-command"
    ],
    "claim-p1090": [
      "future-negative-command"
    ],
    "claim-p1091": [
      "negative-command"
    ],
    "claim-p1092": [
      "future-negative-command"
    ],
    "claim-p1093": [
      "negative-command"
    ],
    "claim-p1094": [
      "future-negative-command"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1089": "authorized",
    "claim-p1090": "authorized",
    "claim-p1091": "authorized",
    "claim-p1092": "authorized",
    "claim-p1093": "authorized",
    "claim-p1094": "authorized"
  }
};
export default Object.freeze(spec);
