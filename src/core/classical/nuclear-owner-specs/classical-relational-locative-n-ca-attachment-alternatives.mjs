const spec = {
  "ownerId": "classical-relational-locative-n-ca-attachment-alternatives",
  "prefix": "ClassicalRelationalLocativeNCaAttachmentAlternatives",
  "operationId": "classical.relational.locative.n.ca.attachment.alternatives.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-ca-attachment-alternatives-source",
  "domain": "classical-relational-locative-n-ca-attachment-alternatives",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4326",
    "claim-p4327",
    "claim-p4328"
  ],
  "coordinates": {
    "claim-p4326::p4326-the-combination-of-ca-tl-and-n-tli-occurs": {
      "assertionId": "classical-relational-locative-n-ca-attachment-alternatives:p4326-the-combination-of-ca-tl-and-n-tli-occurs",
      "canonicalPath": "cases.nPreterit.canonicalResult"
    },
    "claim-p4327::p4327-formula-2-x-ca-n-tli": {
      "assertionId": "classical-relational-locative-n-ca-attachment-alternatives:p4327-formula-2-x-ca-n-tli",
      "canonicalPath": "cases.nActiveAction.canonicalResult"
    },
    "claim-p4328::p4328-formula-1-x-ca-n-tli": {
      "assertionId": "classical-relational-locative-n-ca-attachment-alternatives:p4328-formula-1-x-ca-n-tli",
      "canonicalPath": "contract.sourceAndRelationalOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4326": [],
    "claim-p4327": [],
    "claim-p4328": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4326": "authorized",
    "claim-p4327": "authorized",
    "claim-p4328": "authorized"
  }
};
export default Object.freeze(spec);
