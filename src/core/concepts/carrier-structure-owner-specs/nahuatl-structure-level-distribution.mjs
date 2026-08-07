const spec = {
  "ownerId": "nahuatl-structure-level-distribution",
  "operationId": "classical.structure.level-distribution.validate",
  "prefix": "ClassicalNahuatlStructureLevelDistribution",
  "domain": "nahuatl-structure-level-distribution",
  "inputContract": "typed-nahuatl-structure-level-distribution-source",
  "analyses": {
    "cross-level-distribution": {
      "classification": "Nahuatl-structure-level-distribution",
      "facts": [
        "some-structures-occur-only-or-mainly-on-the-morphosyntactical-level",
        "some-structures-occur-only-on-the-syntactical-level",
        "some-structures-occur-on-both-the-morphological-and-syntactical-levels"
      ],
      "relation": "morphological-morphosyntactical-and-syntactical-level-assignments-remain-distinct",
      "checkpoint": "nahuatl-cross-level-structure-distribution-checkpoint",
      "unitConstructed": false
    }
  }
};
export default Object.freeze(spec);
