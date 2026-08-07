const spec = {
  "ownerId": "classical-object-embed-distinction",
  "prefix": "ClassicalObjectEmbedDistinction",
  "operationId": "classical.verbstem.object-embed.validate",
  "inputContract": "complete-typed-object-embed-distinction-source",
  "domain": "classical-object-embed-distinction",
  "analyses": {
    "xima-valence-contrast": {
      "classification": "simple-transitive-versus-compound-intransitive",
      "facts": [
        "teh-object-prefix-xima-is-simple-transitive",
        "te-stone-embed-xima-is-compound-intransitive"
      ],
      "relation": "typed-object-prefix-and-embedded-nounstem-select-distinct-valence-structures",
      "checkpoint": "xima-valence-contrast-checkpoint",
      "allowedParticipantChoices": [
        "tē-xīma≠te-xīma"
      ],
      "payload": {
        "simpleTransitive": {
          "objectPrefix": "tē",
          "matrixStem": "xīma",
          "valence": "transitive"
        },
        "compoundIntransitive": {
          "embedStem": "te",
          "matrixStem": "xīma",
          "valence": "intransitive",
          "embedRole": "incorporated-object"
        }
      }
    },
    "te-xima-inventory": {
      "classification": "compound-intransitive-verbstem-source",
      "facts": [
        "te-xima-must-be-listed-as-an-intransitive-compound-source",
        "quauh-xima-provides-comparative-lexicographic-evidence-only"
      ],
      "relation": "typed-compound-source-precedes-dictionary-entry-classification",
      "checkpoint": "te-xima-intransitive-source-checkpoint",
      "allowedParticipantChoices": [
        "te-xīma"
      ],
      "payload": {
        "stem": "te-xīma",
        "valence": "intransitive",
        "sourceKind": "compound-verbstem"
      }
    },
    "te-embed-not-teh-pronoun": {
      "classification": "embedded-stone-nounstem",
      "facts": [
        "te-is-the-stone-rock-nounstem-embed",
        "te-embed-must-not-be-reclassified-as-teh-someone-object-prefix"
      ],
      "relation": "stem-internal-embed-identity-precedes-object-prefix-analysis",
      "checkpoint": "te-embed-versus-teh-object-checkpoint",
      "allowedParticipantChoices": [
        "te≠tē"
      ],
      "payload": {
        "embedStem": "te",
        "embedMeaning": "stone-rock",
        "rejectedObjectPrefix": "tē"
      }
    },
    "texolouia-source": {
      "classification": "stone-pestle-instrument-verbstem-source",
      "facts": [
        "texolouia-retains-stem-internal-te-stone-source",
        "dictionary-placement-outside-the-stem-is-rejected"
      ],
      "relation": "te-xolo-nounstem-source-precedes-texolouia-verbstem-analysis",
      "checkpoint": "texolouia-correct-source-checkpoint",
      "allowedParticipantChoices": [
        "te-xōlo-uiā"
      ],
      "payload": {
        "stem": "te-xōlo-uiā",
        "embedStem": "te-xōlo",
        "valence": "transitive"
      }
    },
    "te-xolo-nounstem": {
      "classification": "compound-stone-pestle-nounstem",
      "facts": [
        "te-xolo-tl-is-a-compound-nounstem",
        "te-xolo-tl-denotes-a-stone-pestle"
      ],
      "relation": "te-stone-embed-precedes-xolo-servant-matrix",
      "checkpoint": "te-xolo-stone-pestle-checkpoint",
      "allowedParticipantChoices": [
        "te-xōlo-tl"
      ],
      "payload": {
        "embedStem": "te",
        "matrixStem": "xōlo",
        "nounClass": "tl",
        "stem": "te-xōlo"
      }
    }
  }
};

export default Object.freeze(spec);

