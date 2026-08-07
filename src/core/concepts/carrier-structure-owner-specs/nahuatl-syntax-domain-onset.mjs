const spec = {
  "ownerId": "nahuatl-syntax-domain-onset",
  "operationId": "classical.structure.syntax-domain-onset.validate",
  "prefix": "ClassicalNahuatlSyntaxDomainOnset",
  "domain": "nahuatl-syntax-domain-onset",
  "inputContract": "typed-nahuatl-syntax-domain-source",
  "analyses": {
    "group-rank-onset": {
      "classification": "Classical-Nahuatl-syntax-begins-at-group-rank",
      "facts": [
        "the-Classical-Nahuatl-syntactic-domain-begins-with-an-owner-issued-group"
      ],
      "relation": "group-rank-follows-particle-and-nuclear-clause-ranks",
      "checkpoint": "nahuatl-syntax-group-rank-onset-checkpoint",
      "unitConstructed": false
    }
  }
};
export default Object.freeze(spec);
