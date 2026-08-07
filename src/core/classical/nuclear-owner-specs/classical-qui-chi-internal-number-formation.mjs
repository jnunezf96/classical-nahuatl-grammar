const spec = {
  "ownerId": "classical-qui-chi-internal-number-formation",
  "prefix": "ClassicalQuiChiInternalNumberFormation",
  "operationId": "classical.qui.chi.internal.number.formation.execute",
  "inputContract": "complete-typed-classical-qui-chi-internal-number-formation-source",
  "domain": "classical-qui-chi-internal-number-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1749",
    "claim-p1750",
    "claim-p1751"
  ],
  "coordinates": {
    "claim-p1749::p1749-result-the-stem-normally-has-the-peculiarity-of-being": {
      "assertionId": "classical-qui-chi-internal-number-formation:p1749-result-the-stem-normally-has-the-peculiarity-of-being",
      "canonicalPath": "quantitiveAuthorityRecord.predicatePluralization"
    },
    "claim-p1750::p1750-when-qui-or-its-variant-c-or-chi-or": {
      "assertionId": "classical-qui-chi-internal-number-formation:p1750-when-qui-or-its-variant-c-or-chi-or",
      "canonicalPath": "quantitiveAuthorityRecord.allowedSubjectNumberDyads"
    },
    "claim-p1751::p1751-the-morphic-dyad-in-the-plural-subject-pronoun-s": {
      "assertionId": "classical-qui-chi-internal-number-formation:p1751-the-morphic-dyad-in-the-plural-subject-pronoun-s",
      "canonicalPath": "numberFrame.internalPluralMorph"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1749": [
      "l16-quantitive-internal-n"
    ],
    "claim-p1750": [
      "l16-quantitive-internal-n"
    ],
    "claim-p1751": [
      "l16-quantitive-internal-n"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1749": "authorized",
    "claim-p1750": "authorized",
    "claim-p1751": "authorized"
  }
};
export default Object.freeze(spec);
