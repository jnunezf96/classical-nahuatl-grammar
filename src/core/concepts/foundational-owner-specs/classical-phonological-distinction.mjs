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
        "dictionary-spelling-cannot-collapse-phonological-identity",
        "molinas-disregard-for-vowel-length-and-glottal-stops-creates-lexical-analysis-problems",
        "failure-to-recognize-vowel-length-can-collapse-two-different-stems-into-one-entry"
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
        "long-and-short-vowel-stems-remain-distinct",
        "molinas-combined-tlatia-entry-must-be-split",
        "reflexive-m-o-tlā-ti-ā-means-to-hide-oneself",
        "reflexive-m-o-tla-ti-ā-means-to-burn-oneself",
        "hide-and-burn-stems-differ-in-vowel-length-and-internal-structure",
        "merging-the-two-tlatia-stems-obscures-distinct-structures-and-results"
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
        "reflexiveRealizations": [
          {
            "form": "m-o-(tlā-ti-ā)",
            "meaning": "to hide oneself"
          },
          {
            "form": "m-o-(tla-ti-ā)",
            "meaning": "to burn oneself"
          }
        ],
        "selectionStatus": "ambiguous-without-length"
      }
    }
  }
};

export default Object.freeze(spec);
