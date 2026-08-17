const spec = {
  "ownerId": "classical-ca-compound-matrix-formation",
  "prefix": "ClassicalCaCompoundMatrixFormation",
  "operationId": "classical.ca.compound.matrix.formation.execute",
  "inputContract": "complete-typed-classical-ca-compound-matrix-formation-source",
  "domain": "classical-ca-compound-matrix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2775",
    "claim-p2776",
    "claim-p2777",
    "claim-p2778",
    "claim-p2779",
    "claim-p2780"
  ],
  "coordinates": {
    "claim-p2775::p2775-coh-coch-ti-ca-h-to-doze-to-nod": {
      "assertionId": "classical-ca-compound-matrix-formation:p2775-coh-coch-ti-ca-h-to-doze-to-nod",
      "canonicalPath": "cases.intransitiveMatrices.ca.facts.matrixFiniteStem"
    },
    "claim-p2776::p2776-cop-ti-ca-h-to-be-blinking-to-be": {
      "assertionId": "classical-ca-compound-matrix-formation:p2776-cop-ti-ca-h-to-be-blinking-to-be",
      "canonicalPath": "cases.intransitiveMatrices.ca.facts.matrixConstruction"
    },
    "claim-p2777::p2777-to-sleep-admonitive-vnc-ti-cop-ti-ye-h": {
      "assertionId": "classical-ca-compound-matrix-formation:p2777-to-sleep-admonitive-vnc-ti-cop-ti-ye-h",
      "canonicalPath": "cases.caOptative.facts.matrixFiniteStem"
    },
    "claim-p2778::p2778-ti-c-chiuh-ti-ye-h": {
      "assertionId": "classical-ca-compound-matrix-formation:p2778-ti-c-chiuh-ti-ye-h",
      "canonicalPath": "cases.caOptative.targetStem"
    },
    "claim-p2779::p2779-when-used-as-the-embed-of-a-compound-with": {
      "assertionId": "classical-ca-compound-matrix-formation:p2779-when-used-as-the-embed-of-a-compound-with",
      "canonicalPath": "cases.eHuaCa.facts.eHuaCaIdiomaticReadingAvailable"
    },
    "claim-p2780::p2780-e-hua-ti-ca-h-to-be-sitting-to": {
      "assertionId": "classical-ca-compound-matrix-formation:p2780-e-hua-ti-ca-h-to-be-sitting-to",
      "canonicalPath": "cases.eHuaCa.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2775": [],
    "claim-p2776": [],
    "claim-p2777": [],
    "claim-p2778": [],
    "claim-p2779": [],
    "claim-p2780": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2775": "authorized",
    "claim-p2776": "authorized",
    "claim-p2777": "authorized",
    "claim-p2778": "authorized",
    "claim-p2779": "authorized",
    "claim-p2780": "authorized"
  }
};
export default Object.freeze(spec);
