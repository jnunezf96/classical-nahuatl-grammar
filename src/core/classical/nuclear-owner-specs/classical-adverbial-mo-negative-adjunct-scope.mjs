const spec = {
  "ownerId": "classical-adverbial-mo-negative-adjunct-scope",
  "prefix": "ClassicalAdverbialMoNegativeAdjunctScope",
  "operationId": "classical.adverbial.mo.negative.adjunct.scope.execute",
  "inputContract": "complete-typed-classical-adverbial-mo-negative-adjunct-scope-source",
  "domain": "classical-adverbial-mo-negative-adjunct-scope",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4175",
    "claim-p4176",
    "claim-p4177",
    "claim-p4178"
  ],
  "coordinates": {
    "claim-p4175::p4175-the-mo-can-also-follow-certain-negativized-adverbial-adjuncts": {
      "assertionId": "classical-adverbial-mo-negative-adjunct-scope:p4175-the-mo-can-also-follow-certain-negativized-adverbial-adjuncts",
      "canonicalPath": "cases.particleMoNegative.canonicalResult"
    },
    "claim-p4176::p4176-in-certain-subordinate-clauses-mo-alone-i-e-without": {
      "assertionId": "classical-adverbial-mo-negative-adjunct-scope:p4176-in-certain-subordinate-clauses-mo-alone-i-e-without",
      "canonicalPath": "cases.particleMoNegative.context.semanticPolarity"
    },
    "claim-p4177::p4177-consequently-negativity-in-a-sentence-in-which-the-action": {
      "assertionId": "classical-adverbial-mo-negative-adjunct-scope:p4177-consequently-negativity-in-a-sentence-in-which-the-action",
      "canonicalPath": "cases.particleMoSubordinate.context.semanticPolarity"
    },
    "claim-p4178::p4178-this-rule-for-negative-adjunct-explains-the-position-of": {
      "assertionId": "classical-adverbial-mo-negative-adjunct-scope:p4178-this-rule-for-negative-adjunct-explains-the-position-of",
      "canonicalPath": "cases.particleMoNegative.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4175": [],
    "claim-p4176": [],
    "claim-p4177": [],
    "claim-p4178": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4175": "authorized",
    "claim-p4176": "authorized",
    "claim-p4177": "authorized",
    "claim-p4178": "authorized"
  }
};
export default Object.freeze(spec);
