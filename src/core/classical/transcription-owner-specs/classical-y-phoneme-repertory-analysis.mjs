const spec = {
  "ownerId": "classical-y-phoneme-repertory-analysis",
  "prefix": "ClassicalYPhonemeRepertoryAnalysis",
  "operationId": "classical.transcription.classical-y-phoneme-repertory-analysis.analyze",
  "inputContract": "complete-typed-classical-y-phoneme-repertory-analysis-source",
  "domain": "classical-y-phoneme-repertory-analysis",
  "mode": "canonical-fact",
  "selections": [
    "/y/"
  ],
  "facets": [
    "y-like-english-y-yes",
    "pr-y-y-s-s-l",
    "regular-phone-y-never-occurs-vocable-final-position-s"
  ],
  "coordinates": {
    "/y/::y-like-english-y-yes": {
      "assertionId": "classical-y-phoneme-repertory-analysis:y-like-english-y-yes",
      "canonicalPath": ""
    },
    "/y/::pr-y-y-s-s-l": {
      "assertionId": "classical-y-phoneme-repertory-analysis:pr-y-y-s-s-l",
      "canonicalPath": ""
    },
    "/y/::regular-phone-y-never-occurs-vocable-final-position-s": {
      "assertionId": "classical-y-phoneme-repertory-analysis:regular-phone-y-never-occurs-vocable-final-position-s",
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
