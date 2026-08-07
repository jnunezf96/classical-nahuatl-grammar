const spec = {
  "ownerId": "classical-preterit-agentive-general-use-ca",
  "prefix": "ClassicalPreteritAgentiveGeneralUseCa",
  "operationId": "classical.preterit.agentive.general.use.ca.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-general-use-ca-source",
  "domain": "classical-preterit-agentive-general-use-ca",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3401",
    "claim-p3402",
    "claim-p3403",
    "claim-p3404",
    "claim-p3405",
    "claim-p3406",
    "claim-p3407"
  ],
  "coordinates": {
    "claim-p3401::p3401-while-the-restricted-use-preterit-agentive-nounstem-is-merely": {
      "assertionId": "classical-preterit-agentive-general-use-ca:p3401-while-the-restricted-use-preterit-agentive-nounstem-is-merely",
      "canonicalPath": "cases.preteritGeneralUse.authorizationStatus"
    },
    "claim-p3402::p3402-the-general-use-preterit-agentive-stem": {
      "assertionId": "classical-preterit-agentive-general-use-ca:p3402-the-general-use-preterit-agentive-stem",
      "canonicalPath": "cases.preteritGeneralUse.canonicalResult"
    },
    "claim-p3403::p3403-it-is-a-compound-one-in-which-the-embed": {
      "assertionId": "classical-preterit-agentive-general-use-ca:p3403-it-is-a-compound-one-in-which-the-embed",
      "canonicalPath": "cases.preteritGeneralUse.gcdSatisfied"
    },
    "claim-p3404::p3404-since-this-stem-keeps-its-long-a-even-when": {
      "assertionId": "classical-preterit-agentive-general-use-ca:p3404-since-this-stem-keeps-its-long-a-even-when",
      "canonicalPath": "cases.preteritGeneralUse.lcmComplete"
    },
    "claim-p3405::p3405-in-addition-to-occurring-in-possessive-state-nncs-the": {
      "assertionId": "classical-preterit-agentive-general-use-ca:p3405-in-addition-to-occurring-in-possessive-state-nncs-the",
      "canonicalPath": "cases.preteritGeneralUse.allowedStates.1"
    },
    "claim-p3406::p3406-since-the-nominalized-preterit-predicate-as-nounstem-that-was": {
      "assertionId": "classical-preterit-agentive-general-use-ca:p3406-since-the-nominalized-preterit-predicate-as-nounstem-that-was",
      "canonicalPath": "cases.preteritGeneralUse.authorizationStatus"
    },
    "claim-p3407::p3407-the-preterit-tense-morph-being-an-integral-part-of": {
      "assertionId": "classical-preterit-agentive-general-use-ca:p3407-the-preterit-tense-morph-being-an-integral-part-of",
      "canonicalPath": "cases.preteritGeneralUse.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3401": [],
    "claim-p3402": [],
    "claim-p3403": [],
    "claim-p3404": [],
    "claim-p3405": [],
    "claim-p3406": [],
    "claim-p3407": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3401": "authorized",
    "claim-p3402": "authorized",
    "claim-p3403": "authorized",
    "claim-p3404": "authorized",
    "claim-p3405": "authorized",
    "claim-p3406": "authorized",
    "claim-p3407": "authorized"
  }
};
export default Object.freeze(spec);
