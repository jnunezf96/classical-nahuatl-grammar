const spec = {
  "ownerId": "classical-affirmative-admonition-formation",
  "prefix": "ClassicalAffirmativeAdmonitionFormation",
  "operationId": "classical.affirmative.admonition.formation.execute",
  "inputContract": "complete-typed-classical-affirmative-admonition-formation-source",
  "domain": "classical-affirmative-admonition-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-affirmative-admonition-formation",
  "selections": [
    "claim-p1107",
    "claim-p1108",
    "claim-p1109",
    "claim-p1110",
    "claim-p1111",
    "claim-p1112",
    "claim-p1113",
    "claim-p1114",
    "claim-p1115"
  ],
  "coordinates": {
    "claim-p1107::p1107-by-substituting-an-admonitive-vnc-for-a-present": {
      "assertionId": "classical-affirmative-admonition-formation:p1107-by-substituting-an-admonitive-vnc-for-a-present",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1108::p1108-indicative-vnc-and-inserting-the-introductory-particle-ma-an": {
      "assertionId": "classical-affirmative-admonition-formation:p1108-indicative-vnc-and-inserting-the-introductory-particle-ma-an",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1109::p1109-it-may-optionally-be-strengthened-by-the-adverbialized-nnc": {
      "assertionId": "classical-affirmative-admonition-formation:p1109-it-may-optionally-be-strengthened-by-the-adverbialized-nnc",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1110::p1110-the-admonition-sentence-with-a-second-person-subject-is": {
      "assertionId": "classical-affirmative-admonition-formation:p1110-the-admonition-sentence-with-a-second-person-subject-is",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1111::p1111-with-a-third-person-subject-it-is-like-an": {
      "assertionId": "classical-affirmative-admonition-formation:p1111-with-a-third-person-subject-it-is-like-an",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1112::p1112-and-with-a-first-person-subject-it-is-like": {
      "assertionId": "classical-affirmative-admonition-formation:p1112-and-with-a-first-person-subject-it-is-like",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1113::p1113-of-course-the-translations-need-not-be-limited-to": {
      "assertionId": "classical-affirmative-admonition-formation:p1113-of-course-the-translations-need-not-be-limited-to",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1114::p1114-is-not-acceptable-don-t-presupposes-a-negative-command": {
      "assertionId": "classical-affirmative-admonition-formation:p1114-is-not-acceptable-don-t-presupposes-a-negative-command",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1115::p1115-they-must-be-careful-not-to-shout-etc": {
      "assertionId": "classical-affirmative-admonition-formation:p1115-they-must-be-careful-not-to-shout-etc",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1107": [
      "direct-warning"
    ],
    "claim-p1108": [
      "indirect-warning"
    ],
    "claim-p1109": [
      "exhortative-warning"
    ],
    "claim-p1110": [
      "strengthened-warning"
    ],
    "claim-p1111": [
      "direct-warning"
    ],
    "claim-p1112": [
      "indirect-warning"
    ],
    "claim-p1113": [
      "exhortative-warning"
    ],
    "claim-p1114": [
      "strengthened-warning"
    ],
    "claim-p1115": [
      "direct-warning"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1107": "authorized",
    "claim-p1108": "authorized",
    "claim-p1109": "authorized",
    "claim-p1110": "authorized",
    "claim-p1111": "authorized",
    "claim-p1112": "authorized",
    "claim-p1113": "authorized",
    "claim-p1114": "authorized",
    "claim-p1115": "authorized"
  }
};
export default Object.freeze(spec);
