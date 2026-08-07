const spec = {
  "ownerId": "classical-adverbial-compound-or-possessive-alternative",
  "prefix": "ClassicalAdverbialCompoundOrPossessiveAlternative",
  "operationId": "classical.adverbial.compound.or.possessive.alternative.execute",
  "inputContract": "complete-typed-classical-adverbial-compound-or-possessive-alternative-source",
  "domain": "classical-adverbial-compound-or-possessive-alternative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4232"
  ],
  "coordinates": {
    "claim-p4232::p4232-others-can-occur-either-in-compound-stems-or-in": {
      "assertionId": "classical-adverbial-compound-or-possessive-alternative:p4232-others-can-occur-either-in-compound-stems-or-in",
      "canonicalPath": "cases.compoundNepan.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4232": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4232": "authorized"
  }
};
export default Object.freeze(spec);
