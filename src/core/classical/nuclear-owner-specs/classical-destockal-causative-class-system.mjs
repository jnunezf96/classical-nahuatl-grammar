const spec = {
  "ownerId": "classical-destockal-causative-class-system",
  "prefix": "ClassicalDestockalCausativeClassSystem",
  "operationId": "classical.destockal.causative.class.system.execute",
  "inputContract": "complete-typed-classical-destockal-causative-class-system-source",
  "domain": "classical-destockal-causative-class-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2341",
    "claim-p2342"
  ],
  "coordinates": {
    "claim-p2341::p2341-causative-destockal-verbstems-of-the-n-a-and-hu": {
      "assertionId": "classical-destockal-causative-class-system:p2341-causative-destockal-verbstems-of-the-n-a-and-hu",
      "canonicalPath": "derivations.chipini.options.0.targetClass"
    },
    "claim-p2342::p2342-those-of-the-ni-a-and-hui-a-kind": {
      "assertionId": "classical-destockal-causative-class-system:p2342-those-of-the-ni-a-and-hui-a-kind",
      "canonicalPath": "derivations.chipini.options.1.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2341": [],
    "claim-p2342": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2341": "authorized",
    "claim-p2342": "authorized"
  }
};
export default Object.freeze(spec);
