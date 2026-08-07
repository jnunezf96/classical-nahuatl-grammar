const spec = {
  "ownerId": "classical-possessive-nnc-subject-category-system",
  "prefix": "ClassicalPossessiveNncSubjectCategorySystem",
  "operationId": "classical.possessive.nnc.subject.category.system.execute",
  "inputContract": "complete-typed-classical-possessive-nnc-subject-category-system-source",
  "domain": "classical-possessive-nnc-subject-category-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1368",
    "claim-p1369"
  ],
  "coordinates": {
    "claim-p1368::p1368-the-fillers-for-the-subject-personal-pronoun-positions-in": {
      "assertionId": "classical-possessive-nnc-subject-category-system:p1368-the-fillers-for-the-subject-personal-pronoun-positions-in",
      "canonicalPath": "contractGreatestCommonDivisor.subjectPersonSystem"
    },
    "claim-p1369::p1369-the-subject-pronoun-s-pers1-and-pers2-morphs-are": {
      "assertionId": "classical-possessive-nnc-subject-category-system:p1369-the-subject-pronoun-s-pers1-and-pers2-morphs-are",
      "canonicalPath": "personFrame.case"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1368": [
      "dyadic-1sg"
    ],
    "claim-p1369": [
      "dyadic-1sg"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1368": "authorized",
    "claim-p1369": "authorized"
  }
};
export default Object.freeze(spec);
