const spec = {
  "ownerId": "classical-clause-complement-beginning-pehua",
  "prefix": "ClassicalClauseComplementBeginningPehua",
  "operationId": "classical.clause.complement.beginning.pehua.execute",
  "inputContract": "complete-typed-classical-clause-complement-beginning-pehua-source",
  "domain": "classical-clause-complement-beginning-pehua",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4824",
    "claim-p4825"
  ],
  "coordinates": {
    "claim-p4824::p4824-as-a-complement-to-a-vnc-formed-on-the": {
      "assertionId": "classical-clause-complement-beginning-pehua:p4824-as-a-complement-to-a-vnc-formed-on-the",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4825::p4825-when-a-vnc-built-on-pe-hua-occurs-as": {
      "assertionId": "classical-clause-complement-beginning-pehua:p4825-when-a-vnc-built-on-pe-hua-occurs-as",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4824": [
      "beginning-pehua"
    ],
    "claim-p4825": [
      "beginning-pehua"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4824": "authorized",
    "claim-p4825": "authorized"
  }
};
export default Object.freeze(spec);
