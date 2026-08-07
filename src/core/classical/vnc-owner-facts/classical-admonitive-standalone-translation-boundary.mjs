// Read-only typed facts for classical-admonitive-standalone-translation-boundary; this module cannot authorize another owner.
const records = {
  "claim-p1106": {
    "id": "claim-p1106",
    "ownerId": "classical-admonitive-standalone-translation-boundary",
    "semanticValue": {
      "ownerId": "classical-admonitive-standalone-translation-boundary",
      "semanticMechanism": "admonitive-standalone-translation-boundary",
      "claimCategory": "CST",
      "claimFacet": "p1106-since-admonitive-vncs-outside-a-sentence-context-have-no"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
