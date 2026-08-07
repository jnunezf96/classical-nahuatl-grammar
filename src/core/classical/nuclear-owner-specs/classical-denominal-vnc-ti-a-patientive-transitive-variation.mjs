const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-patientive-transitive-variation",
  "prefix": "ClassicalDenominalVncTiAPatientiveTransitiveVariation",
  "operationId": "classical.denominal.vnc.ti.a.patientive.transitive.variation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-patientive-transitive-variation-source",
  "domain": "classical-denominal-vnc-ti-a-patientive-transitive-variation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5104",
    "claim-p5105"
  ],
  "coordinates": {
    "claim-p5104::p5104-if-the-source-verbstem-is-transitive-the-translation-value": {
      "assertionId": "classical-denominal-vnc-ti-a-patientive-transitive-variation:p5104-if-the-source-verbstem-is-transitive-the-translation-value",
      "canonicalPath": "result.operationId"
    },
    "claim-p5105::p5105-if-the-source-verbstem-is-transitive": {
      "assertionId": "classical-denominal-vnc-ti-a-patientive-transitive-variation:p5105-if-the-source-verbstem-is-transitive",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5104": [
      "ti-a-patientive-transitive-variation",
      "patientive-chain-ti-a",
      "default"
    ],
    "claim-p5105": [
      "ti-a-patientive-transitive-variation",
      "patientive-chain-ti-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5104": "authorized",
    "claim-p5105": "authorized"
  }
};
export default Object.freeze(spec);
