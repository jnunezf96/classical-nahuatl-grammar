const spec = {
  "ownerId": "classical-place-nnc-formation",
  "prefix": "ClassicalPlaceNncFormation",
  "operationId": "classical.nnc.place.form",
  "inputContract": "complete-typed-place-nnc-formation-source",
  "domain": "classical-place-nnc-formation",
  "operationType": "compose",
  "analyses": {
    "singular-place-reading": {
      "classification": "place-of-abundant-trees-nnc",
      "facts": [
        "cuauhtlah-is-a-place-name-nuclear-clause",
        "cuauhtlah-allows-a-singular-place-reading"
      ],
      "relation": "cuauh-tree-embed-precedes-abundance-tlah-place-formation",
      "checkpoint": "cuauhtlah-singular-reading-checkpoint",
      "allowedParticipantChoices": [
        "one-place"
      ],
      "requiredPrerequisites": [
        {
          "field": "placeResult",
          "ownerId": "canonical-place-gentilic-evaluator",
          "validatorName": "isPlaceGentilicNncFrame",
          "pathEquals": [
            {
              "path": [
                "authorizationStatus"
              ],
              "value": "authorized"
            },
            {
              "path": [
                "formation"
              ],
              "value": "tlah"
            },
            {
              "path": [
                "formationFrame",
                "sourceStem"
              ],
              "value": "Cuauh"
            },
            {
              "path": [
                "formationFrame",
                "derivedStem"
              ],
              "value": "Cuauh-tlah"
            },
            {
              "path": [
                "wordSurface"
              ],
              "value": "Cuauhtlah"
            }
          ]
        }
      ],
      "payload": {
        "subjectNumberReading": "singular",
        "semanticReading": "one-place-of-abundant-trees"
      },
      "payloadFromPrerequisites": [
        {
          "outputField": "formulaProjection",
          "field": "placeResult",
          "path": [
            "formulaRealization"
          ]
        },
        {
          "outputField": "writtenProjection",
          "field": "placeResult",
          "path": [
            "wordSurface"
          ]
        },
        {
          "outputField": "canonicalStageOrder",
          "field": "placeResult",
          "path": [
            "stageOrder"
          ]
        }
      ]
    },
    "plural-place-reading": {
      "classification": "place-of-abundant-trees-nnc",
      "facts": [
        "cuauhtlah-allows-a-plural-subject-reading",
        "common-number-reading-does-not-require-a-different-written-form"
      ],
      "relation": "common-number-interpretation-follows-canonical-cuauh-tlah-formation",
      "checkpoint": "cuauhtlah-plural-reading-checkpoint",
      "allowedParticipantChoices": [
        "more-than-one-place"
      ],
      "requiredPrerequisites": [
        {
          "field": "placeResult",
          "ownerId": "canonical-place-gentilic-evaluator",
          "validatorName": "isPlaceGentilicNncFrame",
          "pathEquals": [
            {
              "path": [
                "authorizationStatus"
              ],
              "value": "authorized"
            },
            {
              "path": [
                "formation"
              ],
              "value": "tlah"
            },
            {
              "path": [
                "formationFrame",
                "sourceStem"
              ],
              "value": "Cuauh"
            },
            {
              "path": [
                "formationFrame",
                "derivedStem"
              ],
              "value": "Cuauh-tlah"
            },
            {
              "path": [
                "wordSurface"
              ],
              "value": "Cuauhtlah"
            }
          ]
        }
      ],
      "payload": {
        "subjectNumberReading": "plural",
        "semanticReading": "more-than-one-place-of-abundant-trees"
      },
      "payloadFromPrerequisites": [
        {
          "outputField": "formulaProjection",
          "field": "placeResult",
          "path": [
            "formulaRealization"
          ]
        },
        {
          "outputField": "writtenProjection",
          "field": "placeResult",
          "path": [
            "wordSurface"
          ]
        },
        {
          "outputField": "canonicalStageOrder",
          "field": "placeResult",
          "path": [
            "stageOrder"
          ]
        }
      ]
    }
  }
};

export default Object.freeze(spec);

