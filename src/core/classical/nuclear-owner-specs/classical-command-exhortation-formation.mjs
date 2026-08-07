const spec = {
  "ownerId": "classical-command-exhortation-formation",
  "prefix": "ClassicalCommandExhortationFormation",
  "operationId": "classical.command.exhortation.formation.execute",
  "inputContract": "complete-typed-classical-command-exhortation-formation-source",
  "domain": "classical-command-exhortation-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-command-exhortation-formation",
  "selections": [
    "claim-p1077",
    "claim-p1078",
    "claim-p1079",
    "claim-p1080",
    "claim-p1081",
    "claim-p1082",
    "claim-p1083",
    "claim-p1084",
    "claim-p1085",
    "claim-p1086"
  ],
  "coordinates": {
    "claim-p1077::p1077-to-express-a-command-sentence-or-an-exhortation-sentence": {
      "assertionId": "classical-command-exhortation-formation:p1077-to-express-a-command-sentence-or-an-exhortation-sentence",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1078::p1078-nahuatl-has-no-imperative-mood": {
      "assertionId": "classical-command-exhortation-formation:p1078-nahuatl-has-no-imperative-mood",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1079::p1079-a-wish-sentence-with-a-second-person-subject-may": {
      "assertionId": "classical-command-exhortation-formation:p1079-a-wish-sentence-with-a-second-person-subject-may",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1080::p1080-obviously-these-sentences-are-created-by-the-same-transformation": {
      "assertionId": "classical-command-exhortation-formation:p1080-obviously-these-sentences-are-created-by-the-same-transformation",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1081::p1081-the-particle-ma-or-tla-is-obligatory-if-the": {
      "assertionId": "classical-command-exhortation-formation:p1081-the-particle-ma-or-tla-is-obligatory-if-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1082::p1082-result-subject": {
      "assertionId": "classical-command-exhortation-formation:p1082-result-subject",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1083::p1083-subject-when-the-subject-is-second-person-however-the": {
      "assertionId": "classical-command-exhortation-formation:p1083-subject-when-the-subject-is-second-person-however-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1084::p1084-while-ma-creates-a-polite-command-an-even-more": {
      "assertionId": "classical-command-exhortation-formation:p1084-while-ma-creates-a-polite-command-an-even-more",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1085::p1085-a-command-or-exhortation-that-seeks-compliance-in-the": {
      "assertionId": "classical-command-exhortation-formation:p1085-a-command-or-exhortation-that-seeks-compliance-in-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1086::p1086-placed-after-ma-the-particle-te-l-nevertheless-however": {
      "assertionId": "classical-command-exhortation-formation:p1086-placed-after-ma-the-particle-te-l-nevertheless-however",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1077": [
      "direct-command"
    ],
    "claim-p1078": [
      "indirect-command"
    ],
    "claim-p1079": [
      "exhortation"
    ],
    "claim-p1080": [
      "courteous-command"
    ],
    "claim-p1081": [
      "direct-command"
    ],
    "claim-p1082": [
      "indirect-command"
    ],
    "claim-p1083": [
      "exhortation"
    ],
    "claim-p1084": [
      "courteous-command"
    ],
    "claim-p1085": [
      "direct-command"
    ],
    "claim-p1086": [
      "indirect-command"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1077": "authorized",
    "claim-p1078": "authorized",
    "claim-p1079": "authorized",
    "claim-p1080": "authorized",
    "claim-p1081": "authorized",
    "claim-p1082": "authorized",
    "claim-p1083": "authorized",
    "claim-p1084": "authorized",
    "claim-p1085": "authorized",
    "claim-p1086": "authorized"
  }
};
export default Object.freeze(spec);
