const spec = {
  "ownerId": "classical-adjectival-compound-nnc-adjectival-function",
  "prefix": "ClassicalAdjectivalCompoundNncAdjectivalFunction",
  "operationId": "classical.adjectival.compound.nnc.adjectival.function.execute",
  "inputContract": "complete-typed-classical-adjectival-compound-nnc-adjectival-function-source",
  "domain": "classical-adjectival-compound-nnc-adjectival-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3914"
  ],
  "coordinates": {
    "claim-p3914::p3914-the-predicate-of-a-compound-stemmed-nnc-can-be": {
      "assertionId": "classical-adjectival-compound-nnc-adjectival-function:p3914-the-predicate-of-a-compound-stemmed-nnc-can-be",
      "canonicalPath": "cases.compoundMatrix.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3914": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3914": "authorized"
  }
};
export default Object.freeze(spec);
