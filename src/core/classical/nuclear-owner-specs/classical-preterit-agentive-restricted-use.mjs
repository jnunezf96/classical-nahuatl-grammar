const spec = {
  "ownerId": "classical-preterit-agentive-restricted-use",
  "prefix": "ClassicalPreteritAgentiveRestrictedUse",
  "operationId": "classical.preterit.agentive.restricted.use.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-restricted-use-source",
  "domain": "classical-preterit-agentive-restricted-use",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3369",
    "claim-p3370",
    "claim-p3371",
    "claim-p3372",
    "claim-p3373",
    "claim-p3374",
    "claim-p3375",
    "claim-p3376",
    "claim-p3377",
    "claim-p3378",
    "claim-p3379",
    "claim-p3380"
  ],
  "coordinates": {
    "claim-p3369::p3369-a-preterit-tense-vnc-is-converted-into-an-absolutive": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3369-a-preterit-tense-vnc-is-converted-into-an-absolutive",
      "canonicalPath": "cases.preteritRestricted.authorizationStatus"
    },
    "claim-p3370::p3370-the-vnc-predicate-becomes-a-nounstem": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3370-the-vnc-predicate-becomes-a-nounstem",
      "canonicalPath": "cases.preteritRestricted.canonicalResult"
    },
    "claim-p3371::p3371-a-projective-object-is-represented-byte-or-tla-a": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3371-a-projective-object-is-represented-byte-or-tla-a",
      "canonicalPath": "cases.preteritRestricted.gcdSatisfied"
    },
    "claim-p3372::p3372-the-preterit-tense-morph-is-always-the-final-constituent": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3372-the-preterit-tense-morph-is-always-the-final-constituent",
      "canonicalPath": "cases.preteritRestricted.lcmComplete"
    },
    "claim-p3373::p3373-the-dyadic-number-morphs-of-the-vnc-s-subject": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3373-the-dyadic-number-morphs-of-the-vnc-s-subject",
      "canonicalPath": "cases.preteritRestricted.sourceObjectPattern"
    },
    "claim-p3374::p3374-phonologically-there-is-no-difference-in-the-source-vnc": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3374-phonologically-there-is-no-difference-in-the-source-vnc",
      "canonicalPath": "cases.preteritRestricted.authorizationStatus"
    },
    "claim-p3375::p3375-the-difference-is-a-morphosyntactical-one-the-vnc-and": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3375-the-difference-is-a-morphosyntactical-one-the-vnc-and",
      "canonicalPath": "cases.preteritRestricted.canonicalResult"
    },
    "claim-p3376::p3376-obviously-if-the-source-vnc-were-represented-as-having": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3376-obviously-if-the-source-vnc-were-represented-as-having",
      "canonicalPath": "cases.preteritRestricted.gcdSatisfied"
    },
    "claim-p3377::p3377-monomorphemic-intransitive-class-a-verbstems-tend-not-to-participate": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3377-monomorphemic-intransitive-class-a-verbstems-tend-not-to-participate",
      "canonicalPath": "cases.preteritRestricted.lcmComplete"
    },
    "claim-p3378::p3378-the-following-preterit-agentive-nncs-are-formed-on-dimorphemic": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3378-the-following-preterit-agentive-nncs-are-formed-on-dimorphemic",
      "canonicalPath": "cases.preteritRestricted.sourceObjectPattern"
    },
    "claim-p3379::p3379-as-can-be-seen-english-frequently-does-not-have": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3379-as-can-be-seen-english-frequently-does-not-have",
      "canonicalPath": "cases.preteritRestricted.authorizationStatus"
    },
    "claim-p3380::p3380-the-use-of-the-affinity-stem-may-be-obligatory": {
      "assertionId": "classical-preterit-agentive-restricted-use:p3380-the-use-of-the-affinity-stem-may-be-obligatory",
      "canonicalPath": "cases.preteritRestricted.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3369": [],
    "claim-p3370": [],
    "claim-p3371": [],
    "claim-p3372": [],
    "claim-p3373": [],
    "claim-p3374": [],
    "claim-p3375": [],
    "claim-p3376": [],
    "claim-p3377": [],
    "claim-p3378": [],
    "claim-p3379": [],
    "claim-p3380": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3369": "authorized",
    "claim-p3370": "authorized",
    "claim-p3371": "authorized",
    "claim-p3372": "authorized",
    "claim-p3373": "authorized",
    "claim-p3374": "authorized",
    "claim-p3375": "authorized",
    "claim-p3376": "authorized",
    "claim-p3377": "authorized",
    "claim-p3378": "authorized",
    "claim-p3379": "authorized",
    "claim-p3380": "authorized"
  }
};
export default Object.freeze(spec);
