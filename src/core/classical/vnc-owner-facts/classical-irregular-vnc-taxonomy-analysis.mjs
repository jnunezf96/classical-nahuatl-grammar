// Read-only typed facts for classical-irregular-vnc-taxonomy-analysis; this module cannot authorize another owner.
const records = {
  "claim-p1156": {
    "id": "claim-p1156",
    "ownerId": "classical-irregular-vnc-taxonomy-analysis",
    "semanticValue": {
      "ownerId": "classical-irregular-vnc-taxonomy-analysis",
      "semanticMechanism": "irregular-vnc-taxonomy-analysis",
      "claimCategory": "RUL",
      "claimFacet": "p1156-irregularity-in-nahuatl-vncs-appears-primarily-1-in-the"
    }
  },
  "claim-p1157": {
    "id": "claim-p1157",
    "ownerId": "classical-irregular-vnc-taxonomy-analysis",
    "semanticValue": {
      "ownerId": "classical-irregular-vnc-taxonomy-analysis",
      "semanticMechanism": "irregular-vnc-taxonomy-analysis",
      "claimCategory": "DEF",
      "claimFacet": "p1157-there-may-infrequently-be-an-irregularity-in-the-shape"
    }
  },
  "claim-p1158": {
    "id": "claim-p1158",
    "ownerId": "classical-irregular-vnc-taxonomy-analysis",
    "semanticValue": {
      "ownerId": "classical-irregular-vnc-taxonomy-analysis",
      "semanticMechanism": "irregular-vnc-taxonomy-analysis",
      "claimCategory": "RUL",
      "claimFacet": "p1158-in-these-lessons-irregularity-in-the-formation-of-the"
    }
  },
  "claim-p1159": {
    "id": "claim-p1159",
    "ownerId": "classical-irregular-vnc-taxonomy-analysis",
    "semanticValue": {
      "ownerId": "classical-irregular-vnc-taxonomy-analysis",
      "semanticMechanism": "irregular-vnc-taxonomy-analysis",
      "claimCategory": "EXC",
      "claimFacet": "p1159-a-perfective-stem-formed-according-to-the-rules-for"
    }
  },
  "claim-p1160": {
    "id": "claim-p1160",
    "ownerId": "classical-irregular-vnc-taxonomy-analysis",
    "semanticValue": {
      "ownerId": "classical-irregular-vnc-taxonomy-analysis",
      "semanticMechanism": "irregular-vnc-taxonomy-analysis",
      "claimCategory": "SCH",
      "claimFacet": "p1160-in-class-b-verbstems-of-the-type-ce-ya"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
