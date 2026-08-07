// Read-only typed facts for classical-optative-indicative-contrast-analysis; this module cannot authorize another owner.
const records = {
  "claim-p1054": {
    "id": "claim-p1054",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "INV",
      "claimFacet": "p1054-using-the-four-distinguishing-characteristics-in-9-3-it"
    }
  },
  "claim-p1055": {
    "id": "claim-p1055",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "ALT",
      "claimFacet": "p1055-indicative-vncs-and-by-in-the-nonpast-optative-vncs"
    }
  },
  "claim-p1056": {
    "id": "claim-p1056",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "ALT",
      "claimFacet": "p1056-the-following-can-be-either-nonpast-optative-or-present"
    }
  },
  "claim-p1057": {
    "id": "claim-p1057",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "CST",
      "claimFacet": "p1057-with-vncs-on-class-c-verbstems-the-nonpast-optative"
    }
  },
  "claim-p1058": {
    "id": "claim-p1058",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "CST",
      "claimFacet": "p1058-all-nonpast-optative-vncs-with-a-plural-subject-are"
    }
  },
  "claim-p1059": {
    "id": "claim-p1059",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "RUL",
      "claimFacet": "p1059-turning-to-a-comparison-of-past-optative-vncs-and"
    }
  },
  "claim-p1060": {
    "id": "claim-p1060",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "ALT",
      "claimFacet": "p1060-subject-singular-or-plural"
    }
  },
  "claim-p1061": {
    "id": "claim-p1061",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "CON",
      "claimFacet": "p1061-when-optative-and-indicative-vncs-have-the-same-shape"
    }
  },
  "claim-p1062": {
    "id": "claim-p1062",
    "ownerId": "classical-optative-indicative-contrast-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-indicative-contrast-analysis",
      "semanticMechanism": "optative-indicative-contrast-analysis",
      "claimCategory": "ALT",
      "claimFacet": "p1062-the-following-can-be-either-past-optative-or-customary"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
