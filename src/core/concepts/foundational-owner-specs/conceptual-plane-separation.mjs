const spec = {
  "ownerId": "conceptual-plane-separation",
  "prefix": "ClassicalConceptualPlaneSeparation",
  "operationId": "classical.structure.conceptual-plane.separate",
  "inputContract": "complete-typed-conceptual-plane-separation-source",
  "domain": "conceptual-plane-separation",
  "analyses": {
    "plane-inventory": {
      "classification": "distinct-conceptual-plane-inventory",
      "facts": [
        "function-units-form-classes-lexical-items-and-participant-roles-occupy-different-conceptual-planes"
      ],
      "relation": "each-listed-category-retains-its-own-conceptual-plane",
      "checkpoint": "conceptual-plane-inventory-checkpoint",
      "allowedParticipantChoices": [
        "function-unit+form-class+lexical-item+participant-role"
      ],
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
      "classification": "conceptual-plane-nonintermingling-constraint",
      "facts": [
        "different-conceptual-planes-must-not-be-treated-as-conceptual-mates"
      ],
      "relation": "conceptual-plane-separation-precedes-cross-category-description",
      "checkpoint": "conceptual-plane-nonintermingling-checkpoint",
      "allowedParticipantChoices": [
        "keep-planes-distinct"
      ],
      "payload": {
        "interminglingAllowed": false
      }
    },
    "function-form-confusion-rejected": {
      "classification": "function-unit-form-class-conflation-rejected",
      "facts": [
        "subject-cooperates-with-predicate-or-predicator-not-verb",
        "subject-of-the-verb-conflates-function-unit-with-form-class"
      ],
      "relation": "function-unit-and-form-class-analysis-remain-separate",
      "checkpoint": "function-unit-form-class-confusion-checkpoint",
      "allowedParticipantChoices": [
        "subject-of-the-verb"
      ],
      "payload": {
        "rejectedExpression": "subject-of-the-verb"
      }
    }
  }
};

export default Object.freeze(spec);

