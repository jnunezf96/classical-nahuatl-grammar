const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-nonpatientive-restriction",
  "prefix": "ClassicalDenominalVncTiANonpatientiveRestriction",
  "operationId": "classical.denominal.vnc.ti.a.nonpatientive.restriction.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-nonpatientive-restriction-source",
  "domain": "classical-denominal-vnc-ti-a-nonpatientive-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5099",
    "claim-p5100"
  ],
  "coordinates": {
    "claim-p5099::p5099-when-the-source-nounstem-is-not-a-patientive-nounstem": {
      "assertionId": "classical-denominal-vnc-ti-a-nonpatientive-restriction:p5099-when-the-source-nounstem-is-not-a-patientive-nounstem",
      "canonicalPath": "result.operationId"
    },
    "claim-p5100::p5100-when-the-source-nounstem-is-not-a-patientive-nounstem": {
      "assertionId": "classical-denominal-vnc-ti-a-nonpatientive-restriction:p5100-when-the-source-nounstem-is-not-a-patientive-nounstem",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5099": [
      "ti-a-nonpatientive-restriction",
      "ti-a-causative-single",
      "default"
    ],
    "claim-p5100": [
      "ti-a-nonpatientive-restriction",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5099": "authorized",
    "claim-p5100": "authorized"
  }
};
export default Object.freeze(spec);
