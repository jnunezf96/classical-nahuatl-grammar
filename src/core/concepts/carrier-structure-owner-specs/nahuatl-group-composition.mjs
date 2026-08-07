const spec = {
  "ownerId": "nahuatl-group-composition",
  "operationId": "classical.structure.group.compose",
  "prefix": "ClassicalNahuatlGroupComposition",
  "domain": "nahuatl-group-composition",
  "inputContract": "typed-nahuatl-group-composition-source",
  "analyses": {
    "particles-only": {
      "classification": "group-composed-only-of-particles",
      "facts": [
        "a-Classical-Nahuatl-group-can-consist-only-of-owner-issued-particles"
      ],
      "relation": "particle-only-group-retains-every-particle-owner-identity",
      "checkpoint": "nahuatl-particle-only-group-checkpoint",
      "unitConstructed": true
    },
    "particles-and-nuclear-clause": {
      "classification": "group-composed-of-particles-and-one-nuclear-clause",
      "facts": [
        "a-Classical-Nahuatl-group-can-consist-of-particles-and-a-complete-nuclear-clause"
      ],
      "relation": "particle-and-nuclear-clause-results-remain-distinct-constituents",
      "checkpoint": "nahuatl-particle-nuclear-clause-group-checkpoint",
      "unitConstructed": true
    },
    "multiple-nuclear-clauses": {
      "classification": "group-composed-of-multiple-nuclear-clauses",
      "facts": [
        "a-Classical-Nahuatl-group-can-consist-of-more-than-one-complete-nuclear-clause"
      ],
      "relation": "multiple-nuclear-clauses-remain-complete-before-group-composition",
      "checkpoint": "nahuatl-multiple-nuclear-clause-group-checkpoint",
      "unitConstructed": true
    }
  }
};
export default Object.freeze(spec);
