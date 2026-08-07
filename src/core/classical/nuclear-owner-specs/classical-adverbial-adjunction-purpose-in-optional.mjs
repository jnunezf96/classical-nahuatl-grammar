const spec = {
  "ownerId": "classical-adverbial-adjunction-purpose-in-optional",
  "prefix": "ClassicalAdverbialAdjunctionPurposeInOptional",
  "operationId": "classical.adverbial.adjunction.purpose.in.optional.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-purpose-in-optional-source",
  "domain": "classical-adverbial-adjunction-purpose-in-optional",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4733"
  ],
  "coordinates": {
    "claim-p4733::p4733-when-the-adjunctor-in-is-not-present": {
      "assertionId": "classical-adverbial-adjunction-purpose-in-optional:p4733-when-the-adjunctor-in-is-not-present",
      "canonicalPath": "analysis.purposeAdjunctorMayBeAbsent"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4733": [
      "purpose-in-optional"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4733": "authorized"
  }
};
export default Object.freeze(spec);
