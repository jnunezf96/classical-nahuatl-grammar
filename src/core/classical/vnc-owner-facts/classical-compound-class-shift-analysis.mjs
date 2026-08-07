// Read-only typed facts for classical-compound-class-shift-analysis; this module cannot authorize another owner.
const records = {
  "claim-p1161": {
    "id": "claim-p1161",
    "ownerId": "classical-compound-class-shift-analysis",
    "semanticValue": {
      "ownerId": "classical-compound-class-shift-analysis",
      "semanticMechanism": "compound-class-shift-analysis",
      "claimCategory": "DEP",
      "claimFacet": "p1161-as-a-rule-a-compound-verbstem-see-lessons-28"
    }
  },
  "claim-p1162": {
    "id": "claim-p1162",
    "ownerId": "classical-compound-class-shift-analysis",
    "semanticValue": {
      "ownerId": "classical-compound-class-shift-analysis",
      "semanticMechanism": "compound-class-shift-analysis",
      "claimCategory": "DEF",
      "claimFacet": "p1162-not-to-do-so-constitutes-an-irregularity"
    }
  },
  "claim-p1163": {
    "id": "claim-p1163",
    "ownerId": "classical-compound-class-shift-analysis",
    "semanticValue": {
      "ownerId": "classical-compound-class-shift-analysis",
      "semanticMechanism": "compound-class-shift-analysis",
      "claimCategory": "SCH",
      "claimFacet": "p1163-tla-cui-tla-cui-to-takes-th"
    }
  },
  "claim-p1164": {
    "id": "claim-p1164",
    "ownerId": "classical-compound-class-shift-analysis",
    "semanticValue": {
      "ownerId": "classical-compound-class-shift-analysis",
      "semanticMechanism": "compound-class-shift-analysis",
      "claimCategory": "SCH",
      "claimFacet": "p1164-tla-ahco-cui-tla-ahco-uc-tla-ahco-c"
    }
  },
  "claim-p1165": {
    "id": "claim-p1165",
    "ownerId": "classical-compound-class-shift-analysis",
    "semanticValue": {
      "ownerId": "classical-compound-class-shift-analysis",
      "semanticMechanism": "compound-class-shift-analysis",
      "claimCategory": "SCH",
      "claimFacet": "p1165-ce-cui-ce-uc-pers-to-be-cold-the"
    }
  },
  "claim-p1166": {
    "id": "claim-p1166",
    "ownerId": "classical-compound-class-shift-analysis",
    "semanticValue": {
      "ownerId": "classical-compound-class-shift-analysis",
      "semanticMechanism": "compound-class-shift-analysis",
      "claimCategory": "ALT",
      "claimFacet": "p1166-in-these-examples-the-class-a-membership-of-the"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
