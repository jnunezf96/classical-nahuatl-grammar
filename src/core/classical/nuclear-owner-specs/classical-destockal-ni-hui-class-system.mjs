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
      "canonicalPath": "constraints.destockalNiHuiClassSystem.intransitiveClassAssignment"
    },
    "claim-p2334::aci-p203-l004-321dd44966-intransitive-destockal-ni-hui-class-b": {
      "assertionId": "classical-destockal-ni-hui-class-system:aci-p203-l004-321dd44966-intransitive-destockal-ni-hui-class-b",
      "canonicalPath": "constraints.destockalNiHuiClassSystem.intransitiveClassAssignment"
    },
    "claim-p2335::p2335-in-order-to-form-the-first-type-causative-stem": {
      "assertionId": "classical-destockal-ni-hui-class-system:p2335-in-order-to-form-the-first-type-causative-stem",
      "canonicalPath": "constraints.destockalNiHuiClassSystem.causativeFormationAlternation"
    },
    "claim-p2335::aci-p203-l005-ac982449b7-two-causative-procedures-with-lexical-preference": {
      "assertionId": "classical-destockal-ni-hui-class-system:aci-p203-l005-ac982449b7-two-causative-procedures-with-lexical-preference",
      "canonicalPath": "constraints.destockalNiHuiClassSystem.causativeFormationAlternation"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDestockalNiHuiClassSystemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDestockalNiHuiClassSystemValidationFrame",
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
