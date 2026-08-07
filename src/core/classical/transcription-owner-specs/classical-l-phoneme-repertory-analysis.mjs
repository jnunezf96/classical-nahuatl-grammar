const spec = {
  "ownerId": "classical-l-phoneme-repertory-analysis",
  "prefix": "ClassicalLPhonemeRepertoryAnalysis",
  "operationId": "classical.transcription.classical-l-phoneme-repertory-analysis.analyze",
  "inputContract": "complete-typed-classical-l-phoneme-repertory-analysis-source",
  "domain": "classical-l-phoneme-repertory-analysis",
  "mode": "canonical-fact",
  "selections": [
    "/l/"
  ],
  "facets": [
    "consonant-never-occurs-vocable-initial-position",
    "never-pronounced-like-english-l-dull-dark-l",
    "pr-l-l-l",
    "irregular-phone-voiceless-occurs-syllable-final-position-n-like"
  ],
  "coordinates": {
    "/l/::consonant-never-occurs-vocable-initial-position": {
      "assertionId": "classical-l-phoneme-repertory-analysis:consonant-never-occurs-vocable-initial-position",
      "canonicalPath": ""
    },
    "/l/::never-pronounced-like-english-l-dull-dark-l": {
      "assertionId": "classical-l-phoneme-repertory-analysis:never-pronounced-like-english-l-dull-dark-l",
      "canonicalPath": ""
    },
    "/l/::pr-l-l-l": {
      "assertionId": "classical-l-phoneme-repertory-analysis:pr-l-l-l",
      "canonicalPath": ""
    },
    "/l/::irregular-phone-voiceless-occurs-syllable-final-position-n-like": {
      "assertionId": "classical-l-phoneme-repertory-analysis:irregular-phone-voiceless-occurs-syllable-final-position-n-like",
      "canonicalPath": ""
    }
  },
  "collectionCapabilityName": "CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS",
  "selectionRecords": {
    "p-t-pair": [
      "/p/",
      "/t/"
    ],
    "ch-kw-sequence": [
      "/č/",
      "/kʷ/"
    ]
  }
};
export default Object.freeze(spec);
