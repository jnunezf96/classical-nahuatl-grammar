const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-double-role-projection",
  "prefix": "ClassicalDenominalVncTiADoubleRoleProjection",
  "operationId": "classical.denominal.vnc.ti.a.double.role.projection.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-double-role-projection-source",
  "domain": "classical-denominal-vnc-ti-a-double-role-projection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5085",
    "claim-p5086"
  ],
  "coordinates": {
    "claim-p5085::p5085-the-suffix-ti-and-the-causative-suffix-a-combine": {
      "assertionId": "classical-denominal-vnc-ti-a-double-role-projection:p5085-the-suffix-ti-and-the-causative-suffix-a-combine",
      "canonicalPath": "result.objectCount"
    },
    "claim-p5086::p5086-the-former-fills-the-causative-object-function-and-the": {
      "assertionId": "classical-denominal-vnc-ti-a-double-role-projection:p5086-the-former-fills-the-causative-object-function-and-the",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5085": [
      "ti-a-double-role-projection",
      "ti-a-causative-double-inceptive",
      "default"
    ],
    "claim-p5086": [
      "ti-a-double-role-projection",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5085": "authorized",
    "claim-p5086": "authorized"
  }
};
export default Object.freeze(spec);
