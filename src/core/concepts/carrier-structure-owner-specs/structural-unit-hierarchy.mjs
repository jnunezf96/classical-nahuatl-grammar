const spec = {
  "ownerId": "structural-unit-hierarchy",
  "operationId": "concept.structure.unit-hierarchy.validate",
  "prefix": "ClassicalStructuralUnitHierarchy",
  "domain": "structural-unit-hierarchy",
  "inputContract": "typed-structural-unit-hierarchy-source",
  "analyses": {
    "lower-to-higher-potential": {
      "classification": "lower-to-higher-structural-potential",
      "facts": [
        "higher-ranked-structural-units-can-be-built-from-lower-ranked-units",
        "distinct-ranks-have-distinct-structural-potentials"
      ],
      "relation": "actual-rank-formation-establishes-hierarchy-potential",
      "checkpoint": "structural-unit-lower-to-higher-potential-checkpoint",
      "unitConstructed": false
    },
    "meaningful-meaningless-partition": {
      "classification": "two-fundamentally-distinct-structural-hierarchies",
      "facts": [
        "one-structural-hierarchy-is-meaningless-and-one-is-meaningful"
      ],
      "relation": "meaningful-and-meaningless-hierarchy-identities-remain-disjoint",
      "checkpoint": "structural-unit-hierarchy-partition-checkpoint",
      "unitConstructed": false
    }
  }
};
export default Object.freeze(spec);
