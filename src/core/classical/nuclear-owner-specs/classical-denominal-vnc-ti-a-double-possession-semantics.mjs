const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-double-possession-semantics",
  "prefix": "ClassicalDenominalVncTiADoublePossessionSemantics",
  "operationId": "classical.denominal.vnc.ti.a.double.possession.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-double-possession-semantics-source",
  "domain": "classical-denominal-vnc-ti-a-double-possession-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5095",
    "claim-p5096"
  ],
  "coordinates": {
    "claim-p5095::p5095-when-a-ti-of-possession-verbstem-is-the-source": {
      "assertionId": "classical-denominal-vnc-ti-a-double-possession-semantics:p5095-when-a-ti-of-possession-verbstem-is-the-source",
      "canonicalPath": "result.objectCount"
    },
    "claim-p5096::p5096-when-a-ti-of-possession-verbstem-is-the-source": {
      "assertionId": "classical-denominal-vnc-ti-a-double-possession-semantics:p5096-when-a-ti-of-possession-verbstem-is-the-source",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5095": [
      "ti-a-double-possession-semantics",
      "ti-a-causative-double-possession",
      "default"
    ],
    "claim-p5096": [
      "ti-a-double-possession-semantics",
      "ti-a-causative-double-possession",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5095": "authorized",
    "claim-p5096": "authorized"
  }
};
export default Object.freeze(spec);
