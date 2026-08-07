const spec = {
  "ownerId": "classical-adverbial-adjunction-multiple-nucleus-simple",
  "prefix": "ClassicalAdverbialAdjunctionMultipleNucleusSimple",
  "operationId": "classical.adverbial.adjunction.multiple.nucleus.simple.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-multiple-nucleus-simple-source",
  "domain": "classical-adverbial-adjunction-multiple-nucleus-simple",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4661"
  ],
  "coordinates": {
    "claim-p4661::p4661-a-simple-structure-of-adverbial-modification-need-not-be": {
      "assertionId": "classical-adverbial-adjunction-multiple-nucleus-simple:p4661-a-simple-structure-of-adverbial-modification-need-not-be",
      "canonicalPath": "analysis.simpleAdjunctionAllowsMultipleNucleusUnits"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4661": [
      "multiple-nucleus-simple"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4661": "authorized"
  }
};
export default Object.freeze(spec);
