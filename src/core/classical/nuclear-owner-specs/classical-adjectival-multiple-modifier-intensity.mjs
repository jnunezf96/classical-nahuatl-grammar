const spec = {
  "ownerId": "classical-adjectival-multiple-modifier-intensity",
  "prefix": "ClassicalAdjectivalMultipleModifierIntensity",
  "operationId": "classical.adjectival.multiple.modifier.intensity.execute",
  "inputContract": "complete-typed-classical-adjectival-multiple-modifier-intensity-source",
  "domain": "classical-adjectival-multiple-modifier-intensity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3981"
  ],
  "coordinates": {
    "claim-p3981::p3981-in-addition-to-the-intensification-of-adjectival-stems-by": {
      "assertionId": "classical-adjectival-multiple-modifier-intensity:p3981-in-addition-to-the-intensification-of-adjectival-stems-by",
      "canonicalPath": "cases.cooperating.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3981": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3981": "authorized"
  }
};
export default Object.freeze(spec);
