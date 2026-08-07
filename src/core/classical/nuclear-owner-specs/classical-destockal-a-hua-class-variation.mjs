const spec = {
  "ownerId": "classical-destockal-a-hua-class-variation",
  "prefix": "ClassicalDestockalAHuaClassVariation",
  "operationId": "classical.destockal.a.hua.class.variation.execute",
  "inputContract": "complete-typed-classical-destockal-a-hua-class-variation-source",
  "domain": "classical-destockal-a-hua-class-variation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2362",
    "claim-p2363"
  ],
  "coordinates": {
    "claim-p2362::p2362-in-certain-instances-however-they-may-belong-to-either": {
      "assertionId": "classical-destockal-a-hua-class-variation:p2362-in-certain-instances-however-they-may-belong-to-either",
      "canonicalPath": "sources.pinahua.classId"
    },
    "claim-p2363::p2363-destockal-a-hua-verbstems-normally-belong-to-class-a": {
      "assertionId": "classical-destockal-a-hua-class-variation:p2363-destockal-a-hua-verbstems-normally-belong-to-class-a",
      "canonicalPath": "derivations.pinahua.options.0.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2362": [],
    "claim-p2363": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2362": "authorized",
    "claim-p2363": "authorized"
  }
};
export default Object.freeze(spec);
