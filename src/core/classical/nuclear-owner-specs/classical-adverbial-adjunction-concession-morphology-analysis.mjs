const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-morphology-analysis",
  "prefix": "ClassicalAdverbialAdjunctionConcessionMorphologyAnalysis",
  "operationId": "classical.adverbial.adjunction.concession.morphology.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-morphology-analysis-source",
  "domain": "classical-adverbial-adjunction-concession-morphology-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4767",
    "claim-p4768"
  ],
  "coordinates": {
    "claim-p4767::p4767-the-vnc-titlahtlaco-lpohpolhuilo-z-is-the-passive-voice": {
      "assertionId": "classical-adverbial-adjunction-concession-morphology-analysis:p4767-the-vnc-titlahtlaco-lpohpolhuilo-z-is-the-passive-voice",
      "canonicalPath": "analysis.storedMorphologicalAnalysisAuthorizesAdjunction"
    },
    "claim-p4768::p4768-the-incorporated-object-tla-htlac-o-l-li-damage": {
      "assertionId": "classical-adverbial-adjunction-concession-morphology-analysis:p4768-the-incorporated-object-tla-htlac-o-l-li-damage",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4767": [
      "concession-morphology-analysis"
    ],
    "claim-p4768": [
      "concession-morphology-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4767": "authorized",
    "claim-p4768": "authorized"
  }
};
export default Object.freeze(spec);
