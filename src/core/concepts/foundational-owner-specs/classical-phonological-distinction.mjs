const spec = {
  "ownerId": "classical-phonological-distinction",
  "prefix": "ClassicalPhonologicalDistinction",
  "operationId": "classical.source.phonological-identity.validate",
  "inputContract": "complete-typed-classical-phonological-identity-source",
  "domain": "classical-phonological-distinction",
  "analyses": {
    "length-and-glottal-distinctiveness": {
      "classification": "phonological-identity-distinctions-required",
      "facts": [
        "vowel-length-is-part-of-classical-lexical-identity",
        "glottal-stop-is-part-of-classical-lexical-identity",
        "dictionary-spelling-cannot-collapse-phonological-identity"
      ],
      "relation": "phonological-identity-precedes-lexical-source-selection",
      "checkpoint": "vowel-length-glottal-identity-checkpoint",
      "allowedParticipantChoices": [
        "vowel-length+glottal-stop"
      ],
      "payload": {
        "identityCoordinates": [
          "vowel-length",
          "glottal-stop"
        ],
        "collapseAllowed": false
      }
    },
    "length-collapse-split": {
      "classification": "collapsed-dictionary-entry-rejected",
      "facts": [
        "unmarked-tlatia-does-not-identify-a-unique-stem",
        "long-and-short-vowel-stems-remain-distinct"
      ],
      "relation": "distinct-vowel-length-coordinates-select-distinct-stem-identities",
      "checkpoint": "vowel-length-collapse-rejection-checkpoint",
      "allowedParticipantChoices": [
        "tlātiā≠tlatiā"
      ],
      "payload": {
        "collapsedForm": "tlatia",
        "sourceIdentities": [
          "tlātiā",
          "tlatiā"
        ],
        "selectionStatus": "ambiguous-without-length"
      }
    }
  }
};

export default Object.freeze(spec);

