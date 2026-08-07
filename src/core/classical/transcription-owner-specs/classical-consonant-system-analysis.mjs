const spec = {
  "ownerId": "classical-consonant-system-analysis",
  "prefix": "ClassicalConsonantSystemAnalysis",
  "operationId": "classical.transcription.classical-consonant-system-analysis.analyze",
  "inputContract": "complete-typed-classical-consonant-system-analysis-source",
  "domain": "classical-consonant-system-analysis",
  "mode": "canonical-fact",
  "selections": [
    "system"
  ],
  "facets": [
    "fifteen-consonant-phonemes-divided-sonorants-fricatives-stops-affricates",
    "voiced-consonant-phonemes-a-devoiced-phone-phonic-repertories",
    "a-devoiced-phone-symbolized-a-small-circle-beneath-consonant"
  ],
  "coordinates": {
    "system::fifteen-consonant-phonemes-divided-sonorants-fricatives-stops-affricates": {
      "assertionId": "classical-consonant-system-analysis:fifteen-consonant-phonemes-divided-sonorants-fricatives-stops-affricates",
      "canonicalPath": ""
    },
    "system::voiced-consonant-phonemes-a-devoiced-phone-phonic-repertories": {
      "assertionId": "classical-consonant-system-analysis:voiced-consonant-phonemes-a-devoiced-phone-phonic-repertories",
      "canonicalPath": ""
    },
    "system::a-devoiced-phone-symbolized-a-small-circle-beneath-consonant": {
      "assertionId": "classical-consonant-system-analysis:a-devoiced-phone-symbolized-a-small-circle-beneath-consonant",
      "canonicalPath": ""
    }
  },
  "systemCapabilityName": "CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_SYSTEM_FACTS",
  "collectionCapabilityName": "CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS"
};
export default Object.freeze(spec);
