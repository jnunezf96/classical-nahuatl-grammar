const spec = {
  "ownerId": "classical-adjectival-modifier-shift-discontinuity",
  "prefix": "ClassicalAdjectivalModifierShiftDiscontinuity",
  "operationId": "classical.adjectival.modifier.shift.discontinuity.execute",
  "inputContract": "complete-typed-classical-adjectival-modifier-shift-discontinuity-source",
  "domain": "classical-adjectival-modifier-shift-discontinuity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4096"
  ],
  "coordinates": {
    "claim-p4096::p4096-a-less-frequent-means-of-creating-discontinuity-within-the": {
      "assertionId": "classical-adjectival-modifier-shift-discontinuity:p4096-a-less-frequent-means-of-creating-discontinuity-within-the",
      "canonicalPath": "cases.discontinuous.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4096": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4096": "authorized"
  }
};
export default Object.freeze(spec);
