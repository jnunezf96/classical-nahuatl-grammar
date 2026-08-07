// Read-only typed facts for classical-irregular-vnc-idiom-boundary; this module cannot authorize another owner.
const records = {
  "claim-p1260": {
    "id": "claim-p1260",
    "ownerId": "classical-irregular-vnc-idiom-boundary",
    "semanticValue": {
      "ownerId": "classical-irregular-vnc-idiom-boundary",
      "semanticMechanism": "irregular-vnc-idiom-boundary",
      "claimCategory": "EXC",
      "claimFacet": "p1260-irregular-vncs-are-frequently-used-in-idiomatic-expressions"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
