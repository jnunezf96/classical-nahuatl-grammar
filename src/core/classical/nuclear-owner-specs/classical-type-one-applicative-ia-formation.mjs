const spec = {
  "ownerId": "classical-type-one-applicative-ia-formation",
  "prefix": "ClassicalTypeOneApplicativeIaFormation",
  "operationId": "classical.type.one.applicative.ia.formation.execute",
  "inputContract": "complete-typed-classical-type-one-applicative-ia-formation-source",
  "domain": "classical-type-one-applicative-ia-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2538",
    "claim-p2539"
  ],
  "coordinates": {
    "claim-p2538::p2538-if-that-stem-final-vowel-is-a-causative-morpheme": {
      "assertionId": "classical-type-one-applicative-ia-formation:p2538-if-that-stem-final-vowel-is-a-causative-morpheme",
      "canonicalPath": "formations.typeOnePinahua.option.derivationSubtype"
    },
    "claim-p2539::p2539-the-basic-type-of-applicative-verb-stems-is-derived": {
      "assertionId": "classical-type-one-applicative-ia-formation:p2539-the-basic-type-of-applicative-verb-stems-is-derived",
      "canonicalPath": "formations.typeOnePinahua.option.scopeModel"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2538": [],
    "claim-p2539": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2538": "authorized",
    "claim-p2539": "authorized"
  }
};
export default Object.freeze(spec);
