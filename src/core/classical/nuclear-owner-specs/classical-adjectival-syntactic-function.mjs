const spec = {
  "ownerId": "classical-adjectival-syntactic-function",
  "prefix": "ClassicalAdjectivalSyntacticFunction",
  "operationId": "classical.adjectival.syntactic.function.execute",
  "inputContract": "complete-typed-classical-adjectival-syntactic-function-source",
  "domain": "classical-adjectival-syntactic-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3861",
    "claim-p3862"
  ],
  "coordinates": {
    "claim-p3861::p3861-in-nahuatl-grammar-the-term-adjective-labels-a-syntactical": {
      "assertionId": "classical-adjectival-syntactic-function:p3861-in-nahuatl-grammar-the-term-adjective-labels-a-syntactical",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p3862::p3862-consequently-an-adjectival-nuclear-clause-is-merely-a-nominal": {
      "assertionId": "classical-adjectival-syntactic-function:p3862-consequently-an-adjectival-nuclear-clause-is-merely-a-nominal",
      "canonicalPath": "cases.ordinary.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3861": [],
    "claim-p3862": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3861": "authorized",
    "claim-p3862": "authorized"
  }
};
export default Object.freeze(spec);
