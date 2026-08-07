const spec = {
  "ownerId": "classical-nominal-number",
  "prefix": "ClassicalNominalNumber",
  "operationId": "classical.nounstem.number.common.validate",
  "inputContract": "complete-typed-nominal-common-number-source",
  "domain": "classical-nominal-number",
  "analyses": {
    "common-number-one-or-more": {
      "classification": "common-number",
      "facts": [
        "common-number-allows-one-or-more-than-one",
        "imax-predicate-retains-common-number"
      ],
      "relation": "typed-nounstem-source-precedes-common-number-interpretation",
      "checkpoint": "nominal-common-number-checkpoint",
      "allowedParticipantChoices": [
        "one-or-more"
      ],
      "requiredPrerequisites": [
        {
          "field": "nncResult",
          "ownerId": "classical-nuclear-clause-structure",
          "validatorName": "isClassicalNahuatlOrdinaryNncResult",
          "pathEquals": [
            {
              "path": [
                "sourceFrame",
                "stem"
              ],
              "value": "imax"
            },
            {
              "path": [
                "operationFrame",
                "subject"
              ],
              "value": "3common"
            },
            {
              "path": [
                "authorizationStatus"
              ],
              "value": "authorized"
            }
          ]
        }
      ],
      "payload": {
        "lexicalStem": "imax",
        "numberCategory": "common",
        "readings": [
          "one",
          "more-than-one"
        ]
      },
      "payloadFromPrerequisites": [
        {
          "outputField": "formulaProjection",
          "field": "nncResult",
          "path": [
            "formulaProjection"
          ]
        },
        {
          "outputField": "writtenProjection",
          "field": "nncResult",
          "path": [
            "writtenProjection"
          ]
        }
      ]
    }
  }
};

export default Object.freeze(spec);

