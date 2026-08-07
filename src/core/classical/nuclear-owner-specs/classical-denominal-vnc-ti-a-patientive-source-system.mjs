const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-patientive-source-system",
  "prefix": "ClassicalDenominalVncTiAPatientiveSourceSystem",
  "operationId": "classical.denominal.vnc.ti.a.patientive.source.system.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-patientive-source-system-source",
  "domain": "classical-denominal-vnc-ti-a-patientive-source-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5101"
  ],
  "coordinates": {
    "claim-p5101::p5101-when-a-patientive-nounstem-is-involved": {
      "assertionId": "classical-denominal-vnc-ti-a-patientive-source-system:p5101-when-a-patientive-nounstem-is-involved",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5101": [
      "ti-a-patientive-source-system",
      "patientive-chain-ti-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5101": "authorized"
  }
};
export default Object.freeze(spec);
