const spec = {
  "ownerId": "classical-stem-composition",
  "prefix": "ClassicalStemComposition",
  "operationId": "classical.stem.compound.compose",
  "inputContract": "complete-typed-classical-compound-stem-source",
  "domain": "classical-stem-composition",
  "operationType": "compose",
  "analyses": {
    "cal-tech-compound": {
      "classification": "compound-nounstem",
      "facts": [
        "caltechtli-has-cal-house-as-embed",
        "caltechtli-has-tech-side-surface-as-matrix",
        "dictionary-gloss-does-not-authorize-compound-structure"
      ],
      "relation": "cal-embed-precedes-tech-matrix-in-compound-stem",
      "checkpoint": "cal-tech-compound-structure-checkpoint",
      "allowedParticipantChoices": [
        "cal+tech"
      ],
      "requiredPrerequisites": [
        {
          "field": "compoundStructureResult",
          "ownerId": "compound-stem-formation",
          "validatorName": "isClassicalCompoundStemFormationResult",
          "pathEquals": [
            {
              "path": [
                "authorizationStatus"
              ],
              "value": "authorized"
            },
            {
              "path": [
                "classification"
              ],
              "value": "compound-stem"
            }
          ]
        }
      ],
      "payload": {
        "sourceConstituents": [
          "cal",
          "tech"
        ],
        "embedStem": "cal",
        "matrixStem": "tech",
        "composedStem": "cal-tech"
      },
      "unitConstructed": true
    }
  }
};

export default Object.freeze(spec);

