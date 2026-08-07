// Read-only typed facts for classical-optative-category-analysis; this module cannot authorize another owner.
const records = {
  "claim-p1035": {
    "id": "claim-p1035",
    "ownerId": "classical-optative-category-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-category-analysis",
      "semanticMechanism": "optative-category-analysis",
      "claimCategory": "USE",
      "claimFacet": "p1035-the-optative-mood-is-characteristically-used-to-express-wishes"
    }
  },
  "claim-p1036": {
    "id": "claim-p1036",
    "ownerId": "classical-optative-category-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-category-analysis",
      "semanticMechanism": "optative-category-analysis",
      "claimCategory": "CST",
      "claimFacet": "p1036-as-explained-in-lessons-5-and-7-vncs-manifesting"
    }
  },
  "claim-p1037": {
    "id": "claim-p1037",
    "ownerId": "classical-optative-category-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-category-analysis",
      "semanticMechanism": "optative-category-analysis",
      "claimCategory": "DEF",
      "claimFacet": "p1037-the-latter-could-be-called-the-general-past-since"
    }
  },
  "claim-p1038": {
    "id": "claim-p1038",
    "ownerId": "classical-optative-category-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-category-analysis",
      "semanticMechanism": "optative-category-analysis",
      "claimCategory": "INV",
      "claimFacet": "p1038-indicative-tenses-there-are-also-so-called-future-optative"
    }
  },
  "claim-p1039": {
    "id": "claim-p1039",
    "ownerId": "classical-optative-category-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-category-analysis",
      "semanticMechanism": "optative-category-analysis",
      "claimCategory": "CON",
      "claimFacet": "p1039-when-regret-or-disillusionment-is-expressed-about-a-definitely"
    }
  },
  "claim-p1040": {
    "id": "claim-p1040",
    "ownerId": "classical-optative-category-analysis",
    "semanticValue": {
      "ownerId": "classical-optative-category-analysis",
      "semanticMechanism": "optative-category-analysis",
      "claimCategory": "CST",
      "claimFacet": "p1040-preterit-and-future-optative-vncs-a-preterit-or-future"
    }
  }
};
export default Object.freeze(Object.fromEntries(Object.entries(records).map(([key, value]) => [key, Object.freeze({ ...value, semanticValue: Object.freeze(value.semanticValue) })])));
