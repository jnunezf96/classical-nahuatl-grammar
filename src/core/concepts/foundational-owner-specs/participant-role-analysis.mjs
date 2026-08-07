const spec = {
  "ownerId": "participant-role-analysis",
  "prefix": "ClassicalParticipantRoleAnalysis",
  "operationId": "classical.structure.participant-role.analyze",
  "inputContract": "complete-typed-participant-role-analysis-source",
  "domain": "participant-role-analysis",
  "analyses": {
    "event-relation-units": {
      "classification": "participant-event-relation-unit",
      "facts": [
        "participant-related-units-are-distinct-from-grammatical-function-units",
        "participant-analysis-includes-participants-events-and-relations"
      ],
      "relation": "participant-event-relation-analysis-remains-distinct-from-grammatical-function-unit-analysis",
      "checkpoint": "participant-event-relation-unit-checkpoint",
      "allowedParticipantChoices": [
        "participants-events-relations"
      ],
      "payload": {
        "unitFamily": "participant-event-relation"
      }
    },
    "participant-role-inventory": {
      "classification": "participant-role-inventory",
      "facts": [
        "participant-roles-include-agent-patient-goal-and-instrument",
        "participant-roles-relate-to-entitive-type-function-units"
      ],
      "relation": "participant-roles-relate-to-events-through-entitive-function-units",
      "checkpoint": "participant-role-inventory-checkpoint",
      "allowedParticipantChoices": [
        "agent-patient-goal-instrument"
      ],
      "payload": {
        "roles": [
          "agent",
          "patient",
          "goal",
          "instrument"
        ]
      }
    }
  }
};

export default Object.freeze(spec);

