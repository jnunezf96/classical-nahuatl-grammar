const spec = {
  "ownerId": "classical-denominal-vnc-hui-w-contact",
  "prefix": "ClassicalDenominalVncHuiWContact",
  "operationId": "classical.denominal.vnc.hui.w.contact.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-hui-w-contact-source",
  "domain": "classical-denominal-vnc-hui-w-contact",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4979"
  ],
  "coordinates": {
    "claim-p4979::p4979-the-general-use-stem-is-tla-uh-w-w": {
      "assertionId": "classical-denominal-vnc-hui-w-contact:p4979-the-general-use-stem-is-tla-uh-w-w",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4979": [
      "hui-w-contact",
      "inceptive-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4979": "authorized"
  }
};
export default Object.freeze(spec);
