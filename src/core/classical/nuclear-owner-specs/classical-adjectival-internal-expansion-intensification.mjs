const spec = {
  "ownerId": "classical-adjectival-internal-expansion-intensification",
  "prefix": "ClassicalAdjectivalInternalExpansionIntensification",
  "operationId": "classical.adjectival.internal.expansion.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-internal-expansion-intensification-source",
  "domain": "classical-adjectival-internal-expansion-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3971"
  ],
  "coordinates": {
    "claim-p3971::p3971-the-matrix-stem-can-be-augmented-by-an-internal": {
      "assertionId": "classical-adjectival-internal-expansion-intensification:p3971-the-matrix-stem-can-be-augmented-by-an-internal",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3971": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3971": "authorized"
  }
};
export default Object.freeze(spec);
