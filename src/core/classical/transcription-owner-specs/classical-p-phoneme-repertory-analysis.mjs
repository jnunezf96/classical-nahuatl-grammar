const spec = {
  "ownerId": "classical-p-phoneme-repertory-analysis",
  "prefix": "ClassicalPPhonemeRepertoryAnalysis",
  "operationId": "classical.transcription.classical-p-phoneme-repertory-analysis.analyze",
  "inputContract": "complete-typed-classical-p-phoneme-repertory-analysis-source",
  "domain": "classical-p-phoneme-repertory-analysis",
  "mode": "canonical-fact",
  "selections": [
    "/p/"
  ],
  "facets": [
    "stops-p-unaspirated-not-followed-a-puff-air-p",
    "not-like-aspirated-p-pot",
    "pr-p-p"
  ],
  "coordinates": {
    "/p/::stops-p-unaspirated-not-followed-a-puff-air-p": {
      "assertionId": "classical-p-phoneme-repertory-analysis:stops-p-unaspirated-not-followed-a-puff-air-p",
      "canonicalPath": ""
    },
    "/p/::not-like-aspirated-p-pot": {
      "assertionId": "classical-p-phoneme-repertory-analysis:not-like-aspirated-p-pot",
      "canonicalPath": ""
    },
    "/p/::pr-p-p": {
      "assertionId": "classical-p-phoneme-repertory-analysis:pr-p-p",
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
