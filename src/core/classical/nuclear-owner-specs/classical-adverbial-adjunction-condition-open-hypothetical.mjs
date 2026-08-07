const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-open-hypothetical",
  "prefix": "ClassicalAdverbialAdjunctionConditionOpenHypothetical",
  "operationId": "classical.adverbial.adjunction.condition.open.hypothetical.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-open-hypothetical-source",
  "domain": "classical-adverbial-adjunction-condition-open-hypothetical",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4740"
  ],
  "coordinates": {
    "claim-p4740::p4740-the-condition-set-up-in-the-adverbial-clause-may": {
      "assertionId": "classical-adverbial-adjunction-condition-open-hypothetical:p4740-the-condition-set-up-in-the-adverbial-clause-may",
      "canonicalPath": "analysis.openAndHypotheticalRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4740": [
      "condition-open-hypothetical"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4740": "authorized"
  }
};
export default Object.freeze(spec);
