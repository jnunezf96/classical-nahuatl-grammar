const spec = {
  "ownerId": "classical-absolutive-nnc-subject-category-system",
  "prefix": "ClassicalAbsolutiveNncSubjectCategorySystem",
  "operationId": "classical.absolutive.nnc.subject.category.system.execute",
  "inputContract": "complete-typed-classical-absolutive-nnc-subject-category-system-source",
  "domain": "classical-absolutive-nnc-subject-category-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1270",
    "claim-p1271",
    "claim-p1272",
    "claim-p1273"
  ],
  "coordinates": {
    "claim-p1270::p1270-the-categories-of-the-subject-in-an-nnc-are": {
      "assertionId": "classical-absolutive-nnc-subject-category-system:p1270-the-categories-of-the-subject-in-an-nnc-are",
      "canonicalPath": "personFrame.case"
    },
    "claim-p1271::p1271-the-subject-spers1-andpers2-subpositions-have-exactly-the-same": {
      "assertionId": "classical-absolutive-nnc-subject-category-system:p1271-the-subject-spers1-andpers2-subpositions-have-exactly-the-same",
      "canonicalPath": "personFrame.formulaRegion"
    },
    "claim-p1272::p1272-just-as-in-a-vnc-in-an-nnc-the": {
      "assertionId": "classical-absolutive-nnc-subject-category-system:p1272-just-as-in-a-vnc-in-an-nnc-the",
      "canonicalPath": "numberFrame.numberBelongsTo"
    },
    "claim-p1273::p1273-state-is-a-category-that-belongs-to-the-predicate": {
      "assertionId": "classical-absolutive-nnc-subject-category-system:p1273-state-is-a-category-that-belongs-to-the-predicate",
      "canonicalPath": "numberFrame.numberIsNounInflection"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1270": [
      "common-tli"
    ],
    "claim-p1271": [
      "common-tli"
    ],
    "claim-p1272": [
      "common-tli"
    ],
    "claim-p1273": [
      "common-tli"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1270": "authorized",
    "claim-p1271": "authorized",
    "claim-p1272": "authorized",
    "claim-p1273": "authorized"
  }
};
export default Object.freeze(spec);
