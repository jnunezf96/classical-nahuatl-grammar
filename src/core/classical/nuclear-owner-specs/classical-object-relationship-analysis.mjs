const spec = {
  "ownerId": "classical-object-relationship-analysis",
  "prefix": "ClassicalObjectRelationshipAnalysis",
  "operationId": "classical.object.relationship.analysis.analyze",
  "inputContract": "complete-typed-classical-object-relationship-analysis-source",
  "domain": "classical-object-relationship-analysis",
  "mode": "canonical-fact",
  "canonicalActorId": "classical-object-relationship-analysis",
  "selections": [
    "claim-p950",
    "claim-p951",
    "claim-p952",
    "claim-p952-02",
    "claim-p952-03"
  ],
  "coordinates": {
    "claim-p950::p950-the-indefinite-pronouns-te-and-tla-have-the-following": {
      "assertionId": "classical-object-relationship-analysis:p950-the-indefinite-pronouns-te-and-tla-have-the-following",
      "canonicalPath": "semanticValue"
    },
    "claim-p951::p951-as-the-translation-of-the-indefinites-shows-indefinite-ranges": {
      "assertionId": "classical-object-relationship-analysis:p951-as-the-translation-of-the-indefinites-shows-indefinite-ranges",
      "canonicalPath": "semanticValue"
    },
    "claim-p952::p952-if-the-vnc-in-item-a-had-been-tite": {
      "assertionId": "classical-object-relationship-analysis:p952-if-the-vnc-in-item-a-had-been-tite",
      "canonicalPath": "semanticValue"
    },
    "claim-p952-02::p952-02-plural-subject-selects-plural-reflexive": {
      "assertionId": "classical-object-relationship-analysis:p952-02-plural-subject-selects-plural-reflexive",
      "canonicalPath": "semanticValue"
    },
    "claim-p952-03::p952-03-plural-reflexive-allows-reciprocative-interpretation": {
      "assertionId": "classical-object-relationship-analysis:p952-03-plural-reflexive-allows-reciprocative-interpretation",
      "canonicalPath": "semanticValue"
    }
  },
  "collectionCapabilityName": "CLASSICAL_NAHUATL_VNC_FACT_RECORDS"
};
export default Object.freeze(spec);
