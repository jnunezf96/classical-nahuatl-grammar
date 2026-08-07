// Read-only typed facts for classical-admonition-translation-judgment-analysis; this module cannot authorize another owner.
const records = {
  "claim-p1120": {
    "id": "claim-p1120",
    "ownerId": "classical-admonition-translation-judgment-analysis",
    "semanticValue": {
      "ownerId": "classical-admonition-translation-judgment-analysis",
      "semanticMechanism": "admonition-translation-judgment-analysis",
      "claimCategory": "RUL",
      "claimFacet": "p1120-result-note-the-formulas-for-translating-indirect-admonition-sentences"
    }
  },
  "claim-p1121": {
    "id": "claim-p1121",
    "ownerId": "classical-admonition-translation-judgment-analysis",
    "semanticValue": {
      "ownerId": "classical-admonition-translation-judgment-analysis",
      "semanticMechanism": "admonition-translation-judgment-analysis",
      "claimCategory": "CON",
      "claimFacet": "p1121-note-the-formulas-for-translating-indirect-admonition-sentences-with"
    }
  },
  "claim-p1122": {
    "id": "claim-p1122",
    "ownerId": "classical-admonition-translation-judgment-analysis",
    "semanticValue": {
      "ownerId": "classical-admonition-translation-judgment-analysis",
      "semanticMechanism": "admonition-translation-judgment-analysis",
      "claimCategory": "USE",
      "claimFacet": "p1122-an-admonition-such-as-ma-iz-moyo-cox-might"
    }
  },
  "claim-p1123": {
    "id": "claim-p1123",
    "ownerId": "classical-admonition-translation-judgment-analysis",
    "semanticValue": {
      "ownerId": "classical-admonition-translation-judgment-analysis",
      "semanticMechanism": "admonition-translation-judgment-analysis",
      "claimCategory": "USE",
      "claimFacet": "p1123-it-is-not-to-be-translated-may-it-not"
    }
  },
  "claim-p1124": {
    "id": "claim-p1124",
    "ownerId": "classical-admonition-translation-judgment-analysis",
    "semanticValue": {
      "ownerId": "classical-admonition-translation-judgment-analysis",
      "semanticMechanism": "admonition-translation-judgment-analysis",
      "claimCategory": "DEF",
      "claimFacet": "p1124-again-an-admonition-is-not-a-wish-it-is"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
