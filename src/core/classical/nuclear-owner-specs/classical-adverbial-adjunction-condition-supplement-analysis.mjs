const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-supplement-analysis",
  "prefix": "ClassicalAdverbialAdjunctionConditionSupplementAnalysis",
  "operationId": "classical.adverbial.adjunction.condition.supplement.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-supplement-analysis-source",
  "domain": "classical-adverbial-adjunction-condition-supplement-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4742"
  ],
  "coordinates": {
    "claim-p4742::p4742-anquimacazqueh-in-tlahtoa-ni-is-the-supplementary-subject-of": {
      "assertionId": "classical-adverbial-adjunction-condition-supplement-analysis:p4742-anquimacazqueh-in-tlahtoa-ni-is-the-supplementary-subject-of",
      "canonicalPath": "analysis.supplementationClaimAuthorizesCondition"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4742": [
      "condition-supplement-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4742": "authorized"
  }
};
export default Object.freeze(spec);
