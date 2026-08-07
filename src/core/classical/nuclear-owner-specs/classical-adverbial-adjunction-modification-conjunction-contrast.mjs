const spec = {
  "ownerId": "classical-adverbial-adjunction-modification-conjunction-contrast",
  "prefix": "ClassicalAdverbialAdjunctionModificationConjunctionContrast",
  "operationId": "classical.adverbial.adjunction.modification.conjunction.contrast.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-modification-conjunction-contrast-source",
  "domain": "classical-adverbial-adjunction-modification-conjunction-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4690"
  ],
  "coordinates": {
    "claim-p4690::p4690-adverbial-collocations-created-by-modification-must-be-distinguished-from": {
      "assertionId": "classical-adverbial-adjunction-modification-conjunction-contrast:p4690-adverbial-collocations-created-by-modification-must-be-distinguished-from",
      "canonicalPath": "analysis.modificationAndConjunctionRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4690": [
      "modification-conjunction-contrast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4690": "authorized"
  }
};
export default Object.freeze(spec);
