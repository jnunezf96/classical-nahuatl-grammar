const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-make-for-translation",
  "prefix": "ClassicalDenominalVncTiAMakeForTranslation",
  "operationId": "classical.denominal.vnc.ti.a.make.for.translation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-make-for-translation-source",
  "domain": "classical-denominal-vnc-ti-a-make-for-translation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5071"
  ],
  "coordinates": {
    "claim-p5071::p5071-the-meaning-of-to-cause-s-o-s-th": {
      "assertionId": "classical-denominal-vnc-ti-a-make-for-translation:p5071-the-meaning-of-to-cause-s-o-s-th",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5071": [
      "ti-a-make-for-translation",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5071": "authorized"
  }
};
export default Object.freeze(spec);
