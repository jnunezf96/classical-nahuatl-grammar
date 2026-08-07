const spec = {
  "ownerId": "classical-clause-complement-double-nucleus-complement",
  "prefix": "ClassicalClauseComplementDoubleNucleusComplement",
  "operationId": "classical.clause.complement.double.nucleus.complement.execute",
  "inputContract": "complete-typed-classical-clause-complement-double-nucleus-complement-source",
  "domain": "classical-clause-complement-double-nucleus-complement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4789"
  ],
  "coordinates": {
    "claim-p4789::p4789-in-addition-to-the-incorporated-complement-compound-verbstems-presented": {
      "assertionId": "classical-clause-complement-double-nucleus-complement:p4789-in-addition-to-the-incorporated-complement-compound-verbstems-presented",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4789": [
      "double-nucleus-complement"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4789": "authorized"
  }
};
export default Object.freeze(spec);
