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
    "claim-p3581",
    "claim-p3582"
  ],
  "coordinates": {
    "claim-p3580::p3580-the-nominalization-process-also-produces-action-nncs-whose-stem": {
      "assertionId": "classical-predicate-nominalization-action-taxonomy:p3580-the-nominalization-process-also-produces-action-nncs-whose-stem",
      "canonicalPath": "cases.actionTaxonomy.authorizationStatus"
    },
    "claim-p3581::p3581-compare-english-action-words-such-as-reflection-which-is": {
      "assertionId": "classical-predicate-nominalization-action-taxonomy:p3581-compare-english-action-words-such-as-reflection-which-is",
      "canonicalPath": "cases.actionTaxonomy.first.canonicalResult"
    },
    "claim-p3582::p3582-as-with-certain-other-nncs-resulting-from-nominalization-the": {
      "assertionId": "classical-predicate-nominalization-action-taxonomy:p3582-as-with-certain-other-nncs-resulting-from-nominalization-the",
      "canonicalPath": "cases.actionTaxonomy.second.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3580": [],
    "claim-p3581": [],
    "claim-p3582": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3580": "authorized",
    "claim-p3581": "authorized",
    "claim-p3582": "authorized"
  }
};
export default Object.freeze(spec);
