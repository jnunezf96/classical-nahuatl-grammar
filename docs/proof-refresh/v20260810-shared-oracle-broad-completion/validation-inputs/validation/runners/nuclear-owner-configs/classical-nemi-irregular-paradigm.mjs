const config = {
  "ownerId": "classical-nemi-irregular-paradigm",
  "prefix": "ClassicalNemiIrregularParadigm",
  "operationId": "classical.nemi.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-nemi-irregular-paradigm-source",
  "domain": "classical-nemi-irregular-paradigm",
  "scenarios": [
    "claim-1216",
    "claim-1217"
  ],
  "atomIds": [
    "ACI-P109-L016-5287F30C12",
    "ACI-P109-L018-813CB3CE7E"
  ],
  "atomIdsByScenario": {
    "claim-1216": [
      "ACI-P109-L016-5287F30C12"
    ],
    "claim-1217": [
      "ACI-P109-L018-813CB3CE7E"
    ]
  },
  "relatedAtomIdsByScenario": {
    "claim-1216": [],
    "claim-1217": [
      "ACI-P109-L016-5287F30C12"
    ]
  },
  "expectedByScenario": {
    "claim-1216": {
      "selection": "claim-p1216",
      "facet": "p1216-nemi-nen-to-live-vncs-built-on-these-stems",
      "participantChoice": "claim-p1216:p1216-nemi-nen-to-live-vncs-built-on-these-stems",
      "assertionId": "classical-nemi-irregular-paradigm:p1216-nemi-nen-to-live-vncs-built-on-these-stems",
      "canonicalStatus": "authorized",
      "canonicalPath": "lesson11.selectedStem",
      "oracleExpectation": "nen"
    },
    "claim-1217": {
      "selection": "claim-p1217",
      "facet": "p1217-finds-vncs-with-a-distant-past-tense-used-with",
      "participantChoice": "claim-p1217:p1217-finds-vncs-with-a-distant-past-tense-used-with",
      "assertionId": "classical-nemi-irregular-paradigm:p1217-finds-vncs-with-a-distant-past-tense-used-with",
      "canonicalStatus": "authorized",
      "canonicalPath": "lesson11.tenseMapping",
      "oracleExpectation": {
        "lexemeId": "nemi",
        "selectedStem": "nen",
        "morphologicalTense": "distant-past",
        "semanticTenseValue": "general-past",
        "interpretation": "distant-past-as-past",
        "remapped": true,
        "relation": "(nemi) > (nen)"
      }
    }
  },
  "declarationPath": "validation/declarations/lessons4-6/classical-nemi-irregular-paradigm.json",
  "ownerFamily": "nuclear",
  "productionSpecPath": "src/core/classical/nuclear-owner-specs/classical-nemi-irregular-paradigm.mjs",
  "engineInputPaths": [
    "src/core/classical/vnc_lessons9_11_semantic_operations.mjs",
    "src/core/classical/verbstem_classes.mjs",
    "src/core/classical/finite_vnc_slots.mjs",
    "src/core/classical/vnc_layer_evaluator.mjs",
    "src/core/classical/irregular_vnc.mjs",
    "src/core/classical/nnc_layer_evaluator.mjs",
    "src/core/classical/nuclear_clause_source.mjs"
  ],
  "planGroup": "nuclear",
  "configGroup": "nuclear-owner-configs"
};
export default Object.freeze(config);
