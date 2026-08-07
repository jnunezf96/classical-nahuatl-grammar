const spec = {
  "ownerId": "classical-denominal-vnc-patientive-chain-ti-a",
  "prefix": "ClassicalDenominalVncPatientiveChainTiA",
  "operationId": "classical.denominal.vnc.patientive.chain.ti.a.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-patientive-chain-ti-a-source",
  "domain": "classical-denominal-vnc-patientive-chain-ti-a",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5077"
  ],
  "coordinates": {
    "claim-p5077::p5077-note-2-a-few-exceptional-causative-stems-presuppose-an": {
      "assertionId": "classical-denominal-vnc-patientive-chain-ti-a:p5077-note-2-a-few-exceptional-causative-stems-presuppose-an",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5077": [
      "patientive-chain-ti-a",
      "patientive-chain-ti-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5077": "authorized"
  }
};
export default Object.freeze(spec);
