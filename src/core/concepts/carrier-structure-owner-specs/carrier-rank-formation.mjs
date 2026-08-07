const spec = {
  "ownerId": "carrier-rank-formation",
  "operationId": "classical.carrier.rank.form",
  "prefix": "ClassicalCarrierRankFormation",
  "domain": "carrier-rank-formation",
  "inputContract": "typed-carrier-rank-formation-source",
  "analyses": {
    "normal-lower-rank-source": {
      "classification": "normal-lower-to-higher-rank-formation",
      "facts": [
        "lower-ranked-carrier-units-normally-source-higher-ranked-carrier-units"
      ],
      "relation": "source-unit-rank-precedes-target-unit-rank",
      "checkpoint": "carrier-normal-rank-formation-checkpoint",
      "unitConstructed": false
    },
    "single-unit-rank-upgrade": {
      "classification": "single-lower-unit-upgraded-to-higher-rank",
      "facts": [
        "a-single-lower-ranked-carrier-unit-can-be-upgraded-to-a-higher-rank"
      ],
      "relation": "upgrade-preserves-source-unit-identity-while-changing-rank-potential",
      "checkpoint": "carrier-single-unit-upgrade-checkpoint",
      "unitConstructed": false
    }
  }
};
export default Object.freeze(spec);
