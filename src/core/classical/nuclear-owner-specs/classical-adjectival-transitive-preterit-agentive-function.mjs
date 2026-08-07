const spec = {
  "ownerId": "classical-adjectival-transitive-preterit-agentive-function",
  "prefix": "ClassicalAdjectivalTransitivePreteritAgentiveFunction",
  "operationId": "classical.adjectival.transitive.preterit.agentive.function.execute",
  "inputContract": "complete-typed-classical-adjectival-transitive-preterit-agentive-function-source",
  "domain": "classical-adjectival-transitive-preterit-agentive-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3910",
    "claim-p3911",
    "claim-p3912",
    "claim-p3913"
  ],
  "coordinates": {
    "claim-p3910::p3910-occasionally-the-preterit-tense-predicate-of-a-transitive-verbstem": {
      "assertionId": "classical-adjectival-transitive-preterit-agentive-function:p3910-occasionally-the-preterit-tense-predicate-of-a-transitive-verbstem",
      "canonicalPath": "cases.preteritAgentive.canonicalResult"
    },
    "claim-p3911::p3911-the-singular-common-subject-pronoun-s-number-position-is": {
      "assertionId": "classical-adjectival-transitive-preterit-agentive-function:p3911-the-singular-common-subject-pronoun-s-number-position-is",
      "canonicalPath": "cases.preteritAgentive.modifierClauseType"
    },
    "claim-p3912::p3912-the-adjectival-nnc-is-usually-built-on-a-transitive": {
      "assertionId": "classical-adjectival-transitive-preterit-agentive-function:p3912-the-adjectival-nnc-is-usually-built-on-a-transitive",
      "canonicalPath": "sources.deverbal.cases.preteritAgentive.authorizationStatus"
    },
    "claim-p3913::p3913-the-singular-common-subject-pronoun-s-number-position-is": {
      "assertionId": "classical-adjectival-transitive-preterit-agentive-function:p3913-the-singular-common-subject-pronoun-s-number-position-is",
      "canonicalPath": "cases.preteritAgentive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3910": [],
    "claim-p3911": [],
    "claim-p3912": [],
    "claim-p3913": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3910": "authorized",
    "claim-p3911": "authorized",
    "claim-p3912": "authorized",
    "claim-p3913": "authorized"
  }
};
export default Object.freeze(spec);
