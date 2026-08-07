const spec = {
  "ownerId": "classical-predicate-nominalization-future-agentive",
  "prefix": "ClassicalPredicateNominalizationFutureAgentive",
  "operationId": "classical.predicate.nominalization.future.agentive.execute",
  "inputContract": "complete-typed-classical-predicate-nominalization-future-agentive-source",
  "domain": "classical-predicate-nominalization-future-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3571",
    "claim-p3572",
    "claim-p3573",
    "claim-p3574",
    "claim-p3575",
    "claim-p3576",
    "claim-p3577",
    "claim-p3578",
    "claim-p3579"
  ],
  "coordinates": {
    "claim-p3571::p3571-the-nominalization-of-a-future-tense-vnc-to-create": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3571-the-nominalization-of-a-future-tense-vnc-to-create",
      "canonicalPath": "cases.futureAgentive.authorizationStatus"
    },
    "claim-p3572::p3572-it-resembles-the-preterit-agentive-nnc-in-that-its": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3572-it-resembles-the-preterit-agentive-nnc-in-that-its",
      "canonicalPath": "cases.futureAgentive.canonicalResult"
    },
    "claim-p3573::p3573-the-restricted-use-nounstem-found-in-the-absolutive-state": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3573-the-restricted-use-nounstem-found-in-the-absolutive-state",
      "canonicalPath": "cases.futureAgentive.gcdSatisfied"
    },
    "claim-p3574::p3574-when-it-is-singular-however-its-number-position-is": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3574-when-it-is-singular-however-its-number-position-is",
      "canonicalPath": "cases.futureAgentive.lcmComplete"
    },
    "claim-p3575::p3575-when-the-subject-pronoun-is-plural-its-number-position": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3575-when-the-subject-pronoun-is-plural-its-number-position",
      "canonicalPath": "cases.futureAgentive.sourceStage"
    },
    "claim-p3576::p3576-the-general-use-stem-is-a-fully-nominal-stem": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3576-the-general-use-stem-is-a-fully-nominal-stem",
      "canonicalPath": "cases.futureAgentive.authorizationStatus"
    },
    "claim-p3577::p3577-in-creating-possessive-state-nncs-as-in-the-case": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3577-in-creating-possessive-state-nncs-as-in-the-case",
      "canonicalPath": "cases.futureAgentive.canonicalResult"
    },
    "claim-p3578::p3578-the-general-use-future-agentive-nounstem-also-occurs-as": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3578-the-general-use-future-agentive-nounstem-also-occurs-as",
      "canonicalPath": "cases.futureAgentive.gcdSatisfied"
    },
    "claim-p3579::p3579-the-restricted-use-stem-apparently-became-so-lexicalized-that": {
      "assertionId": "classical-predicate-nominalization-future-agentive:p3579-the-restricted-use-stem-apparently-became-so-lexicalized-that",
      "canonicalPath": "cases.futureAgentive.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3571": [],
    "claim-p3572": [],
    "claim-p3573": [],
    "claim-p3574": [],
    "claim-p3575": [],
    "claim-p3576": [],
    "claim-p3577": [],
    "claim-p3578": [],
    "claim-p3579": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3571": "authorized",
    "claim-p3572": "authorized",
    "claim-p3573": "authorized",
    "claim-p3574": "authorized",
    "claim-p3575": "authorized",
    "claim-p3576": "authorized",
    "claim-p3577": "authorized",
    "claim-p3578": "authorized",
    "claim-p3579": "authorized"
  }
};
export default Object.freeze(spec);
