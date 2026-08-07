const spec = {
  "ownerId": "classical-compound-nuclear-clause-transformation",
  "prefix": "ClassicalCompoundNuclearClauseTransformation",
  "operationId": "classical.compound.nuclear.clause.transformation.execute",
  "inputContract": "complete-typed-classical-compound-nuclear-clause-transformation-source",
  "domain": "classical-compound-nuclear-clause-transformation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2718",
    "claim-p2719",
    "claim-p2720",
    "claim-p2721",
    "claim-p2722",
    "claim-p2723"
  ],
  "coordinates": {
    "claim-p2718::p2718-compounding-is-a-transformational-process-that-combines-two-or": {
      "assertionId": "classical-compound-nuclear-clause-transformation:p2718-compounding-is-a-transformational-process-that-combines-two-or",
      "canonicalPath": "contract.process"
    },
    "claim-p2719::p2719-three-basic-combinations-are-possible-represented-in-the-following": {
      "assertionId": "classical-compound-nuclear-clause-transformation:p2719-three-basic-combinations-are-possible-represented-in-the-following",
      "canonicalPath": "contract.underlyingClauseRelationsPreserved"
    },
    "claim-p2720::p2720-just-as-in-the-instance-of-simple-nuclear-clauses": {
      "assertionId": "classical-compound-nuclear-clause-transformation:p2720-just-as-in-the-instance-of-simple-nuclear-clauses",
      "canonicalPath": "cases.basic.operation"
    },
    "claim-p2721::p2721-when-one-is-analyzing-a-compound-nuclear-clause-it": {
      "assertionId": "classical-compound-nuclear-clause-transformation:p2721-when-one-is-analyzing-a-compound-nuclear-clause-it",
      "canonicalPath": "cases.basic.canonicalClosure"
    },
    "claim-p2722::p2722-the-underlying-nuclear-clauses-that-serve-as-the-sources": {
      "assertionId": "classical-compound-nuclear-clause-transformation:p2722-the-underlying-nuclear-clauses-that-serve-as-the-sources",
      "canonicalPath": "contract.process"
    },
    "claim-p2723::p2723-the-stems-combined-in-a-compound-stem-continue-to": {
      "assertionId": "classical-compound-nuclear-clause-transformation:p2723-the-stems-combined-in-a-compound-stem-continue-to",
      "canonicalPath": "contract.underlyingClauseRelationsPreserved"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2718": [],
    "claim-p2719": [],
    "claim-p2720": [],
    "claim-p2721": [],
    "claim-p2722": [],
    "claim-p2723": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2718": "authorized",
    "claim-p2719": "authorized",
    "claim-p2720": "authorized",
    "claim-p2721": "authorized",
    "claim-p2722": "authorized",
    "claim-p2723": "authorized"
  }
};
export default Object.freeze(spec);
