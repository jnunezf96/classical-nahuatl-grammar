const spec = {
  "ownerId": "classical-supplement-principal-selection-ambiguity",
  "prefix": "ClassicalSupplementPrincipalSelectionAmbiguity",
  "operationId": "classical.supplement.principal.selection.ambiguity.execute",
  "inputContract": "complete-typed-classical-supplement-principal-selection-ambiguity-source",
  "domain": "classical-supplement-principal-selection-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1822",
    "claim-p1823",
    "claim-p1824",
    "claim-p1825"
  ],
  "coordinates": {
    "claim-p1822::p1822-since-order-of-elements-does-not-as-a-rule": {
      "assertionId": "classical-supplement-principal-selection-ambiguity:p1822-since-order-of-elements-does-not-as-a-rule",
      "canonicalPath": "extractedFrames.contactAlternatives.orderSelectsPrincipal"
    },
    "claim-p1823::p1823-one-example-of-ambiguity-involves-the-combination-of-two": {
      "assertionId": "classical-supplement-principal-selection-ambiguity:p1823-one-example-of-ambiguity-involves-the-combination-of-two",
      "canonicalPath": "extractedFrames.contactAlternatives.alternatives.0.headRole"
    },
    "claim-p1824::p1824-b-he-is-my-father-this-translation-takes-notahzin": {
      "assertionId": "classical-supplement-principal-selection-ambiguity:p1824-b-he-is-my-father-this-translation-takes-notahzin",
      "canonicalPath": "extractedFrames.contactAlternatives.alternatives.1.headRole"
    },
    "claim-p1825::p1825-this-type-of-ambiguity-can-be-resolved-either-by": {
      "assertionId": "classical-supplement-principal-selection-ambiguity:p1825-this-type-of-ambiguity-can-be-resolved-either-by",
      "canonicalPath": "topic.operationFrames.0.supplementRelation"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1822": [],
    "claim-p1823": [],
    "claim-p1824": [],
    "claim-p1825": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1822": "authorized",
    "claim-p1823": "authorized",
    "claim-p1824": "authorized",
    "claim-p1825": "authorized"
  }
};
export default Object.freeze(spec);
