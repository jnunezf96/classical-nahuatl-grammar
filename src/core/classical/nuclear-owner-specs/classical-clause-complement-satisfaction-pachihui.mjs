const spec = {
  "ownerId": "classical-clause-complement-satisfaction-pachihui",
  "prefix": "ClassicalClauseComplementSatisfactionPachihui",
  "operationId": "classical.clause.complement.satisfaction.pachihui.execute",
  "inputContract": "complete-typed-classical-clause-complement-satisfaction-pachihui-source",
  "domain": "classical-clause-complement-satisfaction-pachihui",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4827"
  ],
  "coordinates": {
    "claim-p4827::p4827-as-a-complement-to-a-vnc-formed-on-the": {
      "assertionId": "classical-clause-complement-satisfaction-pachihui:p4827-as-a-complement-to-a-vnc-formed-on-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4827": [
      "satisfaction-pachihui"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4827": "authorized"
  }
};
export default Object.freeze(spec);
