const spec = {
  "ownerId": "classical-supplement-topic-linearization",
  "prefix": "ClassicalSupplementTopicLinearization",
  "operationId": "classical.supplement.topic.linearization.execute",
  "inputContract": "complete-typed-classical-supplement-topic-linearization-source",
  "domain": "classical-supplement-topic-linearization",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1817",
    "claim-p1818",
    "claim-p1819",
    "claim-p1820",
    "claim-p1821"
  ],
  "coordinates": {
    "claim-p1817::p1817-when-transposed-to-a-position-before-the-principal-the": {
      "assertionId": "classical-supplement-topic-linearization:p1817-when-transposed-to-a-position-before-the-principal-the",
      "canonicalPath": "extractedFrames.topicOrder.order"
    },
    "claim-p1818::p1818-previous-examples-have-shown-them-placed-after-the-principal": {
      "assertionId": "classical-supplement-topic-linearization:p1818-previous-examples-have-shown-them-placed-after-the-principal",
      "canonicalPath": "extractedFrames.topicOrder.topic"
    },
    "claim-p1819::p1819-result-the-supplement-subject-object-or-possessor-becomes-a": {
      "assertionId": "classical-supplement-topic-linearization:p1819-result-the-supplement-subject-object-or-possessor-becomes-a",
      "canonicalPath": "extractedFrames.topicOrder.comment"
    },
    "claim-p1820::p1820-what-is-said-about-the-topic-i-e-what": {
      "assertionId": "classical-supplement-topic-linearization:p1820-what-is-said-about-the-topic-i-e-what",
      "canonicalPath": "extractedFrames.topicAdjunctor.adjunctor"
    },
    "claim-p1821::p1821-a-topic-by-definition-must-be-an-adjunct-and": {
      "assertionId": "classical-supplement-topic-linearization:p1821-a-topic-by-definition-must-be-an-adjunct-and",
      "canonicalPath": "topic.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1817": [],
    "claim-p1818": [],
    "claim-p1819": [],
    "claim-p1820": [],
    "claim-p1821": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1817": "authorized",
    "claim-p1818": "authorized",
    "claim-p1819": "authorized",
    "claim-p1820": "authorized",
    "claim-p1821": "authorized"
  }
};
export default Object.freeze(spec);
