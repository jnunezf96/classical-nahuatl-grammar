const spec = {
  "ownerId": "classical-personal-name-nnc-god-name-normal-nnc-reranking",
  "prefix": "ClassicalPersonalNameNncGodNameNormalNncReranking",
  "operationId": "classical.personal.name.nnc.god.name.normal.nnc.reranking.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-god-name-normal-nnc-reranking-source",
  "domain": "classical-personal-name-nnc-god-name-normal-nnc-reranking",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5231",
    "claim-p5232"
  ],
  "coordinates": {
    "claim-p5231::p5231-note-1-in-certain-instances-personal-name-nncs-that": {
      "assertionId": "classical-personal-name-nnc-god-name-normal-nnc-reranking:p5231-note-1-in-certain-instances-personal-name-nncs-that",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5232::p5232-the-form-tiquetzalco-co-ah-is-also-found": {
      "assertionId": "classical-personal-name-nnc-god-name-normal-nnc-reranking:p5232-the-form-tiquetzalco-co-ah-is-also-found",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5231": [
      "god-name-normal-nnc-reranking",
      "absolutive-state-nnc",
      "default",
      "god-name-to-normal-nnc"
    ],
    "claim-p5232": [
      "god-name-normal-nnc-reranking",
      "absolutive-state-nnc",
      "default",
      "god-name-to-normal-nnc"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5231": "authorized",
    "claim-p5232": "authorized"
  }
};
export default Object.freeze(spec);
