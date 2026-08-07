const spec = {
  "ownerId": "classical-pronominal-internal-number-formation",
  "prefix": "ClassicalPronominalInternalNumberFormation",
  "operationId": "classical.pronominal.internal.number.formation.execute",
  "inputContract": "complete-typed-classical-pronominal-internal-number-formation-source",
  "domain": "classical-pronominal-internal-number-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1646",
    "claim-p1647"
  ],
  "coordinates": {
    "claim-p1646::p1646-pronominal-stems-are-pluralized-by-including-the-plural-number": {
      "assertionId": "classical-pronominal-internal-number-formation:p1646-pronominal-stems-are-pluralized-by-including-the-plural-number",
      "canonicalPath": "numberFrame.internalPluralMorph"
    },
    "claim-p1647::p1647-a-pronominal-nnc-formed-on-a-pluralized-stem-has": {
      "assertionId": "classical-pronominal-internal-number-formation:p1647-a-pronominal-nnc-formed-on-a-pluralized-stem-has",
      "canonicalPath": "numberFrame.subjectNumberBelongsTo"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1646": [
      "l16-personal-compound-plural"
    ],
    "claim-p1647": [
      "l16-personal-compound-plural"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1646": "authorized",
    "claim-p1647": "authorized"
  }
};
export default Object.freeze(spec);
