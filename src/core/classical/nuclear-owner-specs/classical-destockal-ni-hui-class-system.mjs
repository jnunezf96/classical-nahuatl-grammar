const spec = {
  "ownerId": "classical-destockal-ni-hui-class-system",
  "prefix": "ClassicalDestockalNiHuiClassSystem",
  "operationId": "classical.destockal.ni.hui.class.system.execute",
  "inputContract": "complete-typed-classical-destockal-ni-hui-class-system-source",
  "domain": "classical-destockal-ni-hui-class-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2334",
    "claim-p2335"
  ],
  "coordinates": {
    "claim-p2334::p2334-intransitive-destockal-ni-and-hui-verbstems-belong-to-class": {
      "assertionId": "classical-destockal-ni-hui-class-system:p2334-intransitive-destockal-ni-and-hui-verbstems-belong-to-class",
      "canonicalPath": "sources.peyoni.classId"
    },
    "claim-p2335::p2335-in-order-to-form-the-first-type-causative-stem": {
      "assertionId": "classical-destockal-ni-hui-class-system:p2335-in-order-to-form-the-first-type-causative-stem",
      "canonicalPath": "sources.cozahui.classId"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2334": [],
    "claim-p2335": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2334": "authorized",
    "claim-p2335": "authorized"
  }
};
export default Object.freeze(spec);
