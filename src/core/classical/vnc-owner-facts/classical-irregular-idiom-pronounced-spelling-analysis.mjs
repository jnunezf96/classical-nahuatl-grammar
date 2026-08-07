// Read-only typed facts for classical-irregular-idiom-pronounced-spelling-analysis; this module cannot authorize another owner.
const records = {
  "claim-p1261": {
    "id": "claim-p1261",
    "ownerId": "classical-irregular-idiom-pronounced-spelling-analysis",
    "semanticValue": {
      "ownerId": "classical-irregular-idiom-pronounced-spelling-analysis",
      "semanticMechanism": "irregular-idiom-pronounced-spelling-analysis",
      "claimCategory": "REA",
      "claimFacet": "p1261-also-spelled-toyezqueh-as-it-is-pronounced"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
