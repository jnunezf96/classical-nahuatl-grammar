const spec = {
  "ownerId": "nuclear-clause-morphosyntax-domain",
  "operationId": "classical.nuclear-clause.morphosyntax.validate",
  "prefix": "ClassicalNuclearClauseMorphosyntaxDomain",
  "domain": "nuclear-clause-morphosyntax-domain",
  "inputContract": "typed-nuclear-clause-morphosyntax-source",
  "analyses": {
    "subject-predicate-morphosyntax": {
      "classification": "nuclear-clause-morphosyntax-domain",
      "facts": [
        "nuclear-clauses-obligatorily-contain-subject-and-predicate-structure",
        "nuclear-clauses-are-governed-by-morphosyntax"
      ],
      "relation": "morphosyntax-consumes-a-complete-owner-issued-nuclear-clause",
      "checkpoint": "nuclear-clause-morphosyntax-domain-checkpoint",
      "unitConstructed": false
    }
  }
};
export default Object.freeze(spec);
