const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-patientive-intransitive-synonymy",
  "prefix": "ClassicalDenominalVncTiAPatientiveIntransitiveSynonymy",
  "operationId": "classical.denominal.vnc.ti.a.patientive.intransitive.synonymy.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-patientive-intransitive-synonymy-source",
  "domain": "classical-denominal-vnc-ti-a-patientive-intransitive-synonymy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5102",
    "claim-p5103"
  ],
  "coordinates": {
    "claim-p5102::p5102-if-the-source-verbstem-is-intransitive-the-translation-value": {
      "assertionId": "classical-denominal-vnc-ti-a-patientive-intransitive-synonymy:p5102-if-the-source-verbstem-is-intransitive-the-translation-value",
      "canonicalPath": "result.operationId"
    },
    "claim-p5103::p5103-if-the-source-verbstem-is-intransitive": {
      "assertionId": "classical-denominal-vnc-ti-a-patientive-intransitive-synonymy:p5103-if-the-source-verbstem-is-intransitive",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5102": [
      "ti-a-patientive-intransitive-synonymy",
      "patientive-chain-ti-a",
      "default"
    ],
    "claim-p5103": [
      "ti-a-patientive-intransitive-synonymy",
      "patientive-chain-ti-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5102": "authorized",
    "claim-p5103": "authorized"
  }
};
export default Object.freeze(spec);
