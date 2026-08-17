const spec = {
  "ownerId": "classical-ya-uh-compound-matrix-formation",
  "prefix": "ClassicalYaUhCompoundMatrixFormation",
  "operationId": "classical.ya.uh.compound.matrix.formation.execute",
  "inputContract": "complete-typed-classical-ya-uh-compound-matrix-formation-source",
  "domain": "classical-ya-uh-compound-matrix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2783",
    "claim-p2784",
    "claim-p2785",
    "claim-p2786"
  ],
  "coordinates": {
    "claim-p2783::p2783-cuica-ti-uh-to-go-away-singing": {
      "assertionId": "classical-ya-uh-compound-matrix-formation:p2783-cuica-ti-uh-to-go-away-singing",
      "canonicalPath": "cases.intransitiveMatrices.ya-uh.facts.matrixFiniteStem"
    },
    "claim-p2784::p2784-tla-po-uh-ti-uh-to-go-away-counting": {
      "assertionId": "classical-ya-uh-compound-matrix-formation:p2784-tla-po-uh-ti-uh-to-go-away-counting",
      "canonicalPath": "cases.yaPresentPlural.facts.matrixFiniteStem"
    },
    "claim-p2785::p2785-another-possible-translation-for-a-compound-stem-built-on": {
      "assertionId": "classical-ya-uh-compound-matrix-formation:p2785-another-possible-translation-for-a-compound-stem-built-on",
      "canonicalPath": "cases.intransitiveMatrices.ya-uh.facts.matrixReadingOptions"
    },
    "claim-p2786::p2786-tla-man-ti-uh-to-set-s-th-down": {
      "assertionId": "classical-ya-uh-compound-matrix-formation:p2786-tla-man-ti-uh-to-set-s-th-down",
      "canonicalPath": "cases.unsyncopatedYaFuture.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2783": [],
    "claim-p2784": [],
    "claim-p2785": [],
    "claim-p2786": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2783": "authorized",
    "claim-p2784": "authorized",
    "claim-p2785": "authorized",
    "claim-p2786": "authorized"
  }
};
export default Object.freeze(spec);
