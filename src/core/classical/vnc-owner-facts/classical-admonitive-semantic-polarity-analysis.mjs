// Read-only typed facts for classical-admonitive-semantic-polarity-analysis; this module cannot authorize another owner.
const records = {
  "claim-p1095": {
    "id": "claim-p1095",
    "ownerId": "classical-admonitive-semantic-polarity-analysis",
    "semanticValue": {
      "ownerId": "classical-admonitive-semantic-polarity-analysis",
      "semanticMechanism": "admonitive-semantic-polarity-analysis",
      "claimCategory": "DEF",
      "claimFacet": "p1095-the-admonitive-mood-is-used-to-express-warnings-or"
    }
  },
  "claim-p1096": {
    "id": "claim-p1096",
    "ownerId": "classical-admonitive-semantic-polarity-analysis",
    "semanticValue": {
      "ownerId": "classical-admonitive-semantic-polarity-analysis",
      "semanticMechanism": "admonitive-semantic-polarity-analysis",
      "claimCategory": "CST",
      "claimFacet": "p1096-a-vnc-in-the-admonitive-mood-does-not-prohibit"
    }
  },
  "claim-p1097": {
    "id": "claim-p1097",
    "ownerId": "classical-admonitive-semantic-polarity-analysis",
    "semanticValue": {
      "ownerId": "classical-admonitive-semantic-polarity-analysis",
      "semanticMechanism": "admonitive-semantic-polarity-analysis",
      "claimCategory": "ALT",
      "claimFacet": "p1097-it-is-not-negative-either-in-shape-or-meaning"
    }
  },
  "claim-p1098": {
    "id": "claim-p1098",
    "ownerId": "classical-admonitive-semantic-polarity-analysis",
    "semanticValue": {
      "ownerId": "classical-admonitive-semantic-polarity-analysis",
      "semanticMechanism": "admonitive-semantic-polarity-analysis",
      "claimCategory": "DEF",
      "claimFacet": "p1098-it-is-rather-a-positive-form-and-has-an"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
