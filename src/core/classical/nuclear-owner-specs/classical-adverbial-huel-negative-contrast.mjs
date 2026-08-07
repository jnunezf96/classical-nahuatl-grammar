const spec = {
  "ownerId": "classical-adverbial-huel-negative-contrast",
  "prefix": "ClassicalAdverbialHuelNegativeContrast",
  "operationId": "classical.adverbial.huel.negative.contrast.execute",
  "inputContract": "complete-typed-classical-adverbial-huel-negative-contrast-source",
  "domain": "classical-adverbial-huel-negative-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4167",
    "claim-p4168"
  ],
  "coordinates": {
    "claim-p4167::p4167-hoel-can-also-be-translated-to-a-considerable-extent": {
      "assertionId": "classical-adverbial-huel-negative-contrast:p4167-hoel-can-also-be-translated-to-a-considerable-extent",
      "canonicalPath": "cases.particleHuel.canonicalResult"
    },
    "claim-p4168::p4168-there-is-also-a-flawed-subject-nnc-formed-on": {
      "assertionId": "classical-adverbial-huel-negative-contrast:p4168-there-is-also-a-flawed-subject-nnc-formed-on",
      "canonicalPath": "cases.particleHuel.context.semanticPolarity"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4167": [],
    "claim-p4168": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4167": "authorized",
    "claim-p4168": "authorized"
  }
};
export default Object.freeze(spec);
