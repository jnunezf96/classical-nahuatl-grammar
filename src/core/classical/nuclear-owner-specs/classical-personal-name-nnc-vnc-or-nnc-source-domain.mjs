const spec = {
  "ownerId": "classical-personal-name-nnc-vnc-or-nnc-source-domain",
  "prefix": "ClassicalPersonalNameNncVncOrNncSourceDomain",
  "operationId": "classical.personal.name.nnc.vnc.or.nnc.source.domain.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-vnc-or-nnc-source-domain-source",
  "domain": "classical-personal-name-nnc-vnc-or-nnc-source-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5170"
  ],
  "coordinates": {
    "claim-p5170::p5170-the-source-for-the-personal-name-can-be-a": {
      "assertionId": "classical-personal-name-nnc-vnc-or-nnc-source-domain:p5170-the-source-for-the-personal-name-can-be-a",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5170": [
      "vnc-or-nnc-source-domain",
      "absolutive-state-nnc",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5170": "authorized"
  }
};
export default Object.freeze(spec);
