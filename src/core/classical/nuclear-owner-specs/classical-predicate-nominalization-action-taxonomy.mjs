const spec = {
  "ownerId": "classical-predicate-nominalization-action-taxonomy",
  "prefix": "ClassicalPredicateNominalizationActionTaxonomy",
  "operationId": "classical.predicate.nominalization.action.taxonomy.execute",
  "inputContract": "complete-typed-classical-predicate-nominalization-action-taxonomy-source",
  "domain": "classical-predicate-nominalization-action-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3580",
    "claim-p3582",
    "claim-p3580-02"
  ],
  "coordinates": {
    "claim-p3580::action-nnc-semantic-range": {
      "assertionId": "classical-predicate-nominalization-action-taxonomy:action-nnc-semantic-range",
      "canonicalPath": "actionTaxonomyDefinition.stemSemanticRange"
    },
    "claim-p3582::p3582-as-with-certain-other-nncs-resulting-from-nominalization-the": {
      "assertionId": "classical-predicate-nominalization-action-taxonomy:p3582-as-with-certain-other-nncs-resulting-from-nominalization-the",
      "canonicalPath": "cases.actionTaxonomy.second.canonicalResult"
    },
    "claim-p3580-02::action-nnc-label-qualified": {
      "assertionId": "classical-predicate-nominalization-action-taxonomy:action-nnc-label-qualified",
      "canonicalPath": "actionTaxonomyDefinition.labelQualification.fullyExhaustive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3580": [],
    "claim-p3582": [],
    "claim-p3580-02": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3580": "authorized",
    "claim-p3582": "authorized",
    "claim-p3580-02": "authorized"
  }
};
export default Object.freeze(spec);
