const spec = {
  "ownerId": "classical-denominal-vnc-ya-root-rank-source",
  "prefix": "ClassicalDenominalVncYaRootRankSource",
  "operationId": "classical.denominal.vnc.ya.root.rank.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-root-rank-source-source",
  "domain": "classical-denominal-vnc-ya-root-rank-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4986"
  ],
  "coordinates": {
    "claim-p4986::p4986-to-form-a-denominal-verbstem-ya-is-attached-directly": {
      "assertionId": "classical-denominal-vnc-ya-root-rank-source:p4986-to-form-a-denominal-verbstem-ya-is-attached-directly",
      "canonicalPath": "result.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4986": [
      "ya-root-rank-source",
      "inceptive-root-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4986": "authorized"
  }
};
export default Object.freeze(spec);
