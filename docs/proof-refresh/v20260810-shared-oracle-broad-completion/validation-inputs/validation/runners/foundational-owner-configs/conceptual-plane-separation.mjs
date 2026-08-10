function buildPrerequisites() { return Object.freeze({}); }
const config = {
  "ownerId": "conceptual-plane-separation",
  "prefix": "ClassicalConceptualPlaneSeparation",
  "operationId": "classical.structure.conceptual-plane.separate",
  "inputContract": "complete-typed-conceptual-plane-separation-source",
  "domain": "conceptual-plane-separation",
  "scenarios": [
    "plane-inventory",
    "nonintermingling",
    "function-form-confusion-rejected"
  ],
  "atomIds": [
    "ACI-P032-L035-8614AE1561",
    "ACI-P032-L036-1DB4314953",
    "ACI-P032-L038-5CFADB0FE4-04"
  ],
  "atomByScenario": {
    "plane-inventory": "ACI-P032-L035-8614AE1561",
    "nonintermingling": "ACI-P032-L036-1DB4314953",
    "function-form-confusion-rejected": "ACI-P032-L038-5CFADB0FE4-04"
  },
  "relatedAtomByScenario": {
    "nonintermingling": "ACI-P032-L035-8614AE1561",
    "function-form-confusion-rejected": "ACI-P032-L036-1DB4314953"
  },
  "participantChoiceByScenario": {
    "plane-inventory": "function-unit+form-class+lexical-item+participant-role",
    "nonintermingling": "keep-planes-distinct",
    "function-form-confusion-rejected": "subject-of-the-verb"
  },
  "engineDependencyPaths": [],
  "prerequisiteFields": [],
  "hasPrerequisites": false,
  "prerequisiteRejectionReason": "",
  "mutationValues": {
    "fact": [
      "function-units-form-classes-lexical-items-and-participant-roles-occupy-different-conceptual-planes",
      "function-units-form-classes-lexical-items-and-participant-roles-occupy-one-conceptual-plane"
    ],
    "classification": [
      "distinct-conceptual-plane-inventory",
      "single-conceptual-plane-inventory"
    ],
    "relation": [
      "each-listed-category-retains-its-own-conceptual-plane",
      "each-listed-category-shares-one-conceptual-plane"
    ]
  }
};
config.buildPrerequisites = buildPrerequisites;
export default config;
