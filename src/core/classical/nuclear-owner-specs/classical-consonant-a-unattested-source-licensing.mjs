const spec = {
  "ownerId": "classical-consonant-a-unattested-source-licensing",
  "prefix": "ClassicalConsonantAUnattestedSourceLicensing",
  "operationId": "classical.consonant.a.unattested.source.licensing.execute",
  "inputContract": "complete-typed-classical-consonant-a-unattested-source-licensing-source",
  "domain": "classical-consonant-a-unattested-source-licensing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2571"
  ],
  "coordinates": {
    "claim-p2571::p2571-in-certain-instances-the-source-stem-is-no-longer": {
      "assertionId": "classical-consonant-a-unattested-source-licensing:p2571-in-certain-instances-the-source-stem-is-no-longer",
      "canonicalPath": "formations.sourceAbsentConsonantA.option.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2571": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2571": "authorized"
  }
};
export default Object.freeze(spec);
