const config = {
  "ownerId": "conceptual-plane-separation",
  "operationId": "classical.structure.conceptual-plane.separate",
  "inputContract": "complete-typed-conceptual-plane-separation-source",
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
  "prerequisiteRejectionReason": "",
  "expectedByScenario": {
    "plane-inventory": {
      "participantChoice": "function-unit+form-class+lexical-item+participant-role",
      "classification": "distinct-conceptual-plane-inventory",
      "facts": [
        "function-units-form-classes-lexical-items-and-participant-roles-occupy-different-conceptual-planes"
      ],
      "relation": "each-listed-category-retains-its-own-conceptual-plane",
      "checkpoint": "conceptual-plane-inventory-checkpoint",
      "prerequisiteOwnerIds": [],
      "payload": {
        "planes": [
          "function-unit",
          "form-class",
          "lexical-item",
          "participant-role"
        ]
      }
    },
    "nonintermingling": {
      "participantChoice": "keep-planes-distinct",
      "classification": "conceptual-plane-nonintermingling-constraint",
      "facts": [
        "different-conceptual-planes-must-not-be-treated-as-conceptual-mates"
      ],
      "relation": "conceptual-plane-separation-precedes-cross-category-description",
      "checkpoint": "conceptual-plane-nonintermingling-checkpoint",
      "prerequisiteOwnerIds": [],
      "payload": {
        "interminglingAllowed": false
      }
    },
    "function-form-confusion-rejected": {
      "participantChoice": "subject-of-the-verb",
      "classification": "function-unit-form-class-conflation-rejected",
      "facts": [
        "subject-cooperates-with-predicate-or-predicator-not-verb",
        "subject-of-the-verb-conflates-function-unit-with-form-class"
      ],
      "relation": "function-unit-and-form-class-analysis-remain-separate",
      "checkpoint": "function-unit-form-class-confusion-checkpoint",
      "prerequisiteOwnerIds": [],
      "payload": {
        "rejectedExpression": "subject-of-the-verb"
      }
    }
  }
};
export default Object.freeze(config);

