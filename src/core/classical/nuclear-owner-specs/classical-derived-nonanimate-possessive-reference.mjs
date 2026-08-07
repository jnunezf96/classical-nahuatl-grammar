const spec = {
  "ownerId": "classical-derived-nonanimate-possessive-reference",
  "prefix": "ClassicalDerivedNonanimatePossessiveReference",
  "operationId": "classical.derived.nonanimate.possessive.reference.execute",
  "inputContract": "complete-typed-classical-derived-nonanimate-possessive-reference-source",
  "domain": "classical-derived-nonanimate-possessive-reference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1603"
  ],
  "coordinates": {
    "claim-p1603::p1603-a-possessive-state-nnc-may-be-formed-on-a": {
      "assertionId": "classical-derived-nonanimate-possessive-reference:p1603-a-possessive-state-nnc-may-be-formed-on-a",
      "canonicalPath": "ordinaryContract.leastCommonMultiple.selectedCoordinate.derivedNonanimateCommonActive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1603": [
      "l15-derived-nonanimate"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1603": "authorized"
  }
};
export default Object.freeze(spec);
