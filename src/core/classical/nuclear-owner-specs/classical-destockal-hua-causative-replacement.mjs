const spec = {
  "ownerId": "classical-destockal-hua-causative-replacement",
  "prefix": "ClassicalDestockalHuaCausativeReplacement",
  "operationId": "classical.destockal.hua.causative.replacement.execute",
  "inputContract": "complete-typed-classical-destockal-hua-causative-replacement-source",
  "domain": "classical-destockal-hua-causative-replacement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2371",
    "claim-p2372",
    "claim-p2373",
    "claim-p2374"
  ],
  "coordinates": {
    "claim-p2371::p2371-the-type-one-causative-verbstem-for-both-a-hua": {
      "assertionId": "classical-destockal-hua-causative-replacement:p2371-the-type-one-causative-verbstem-for-both-a-hua",
      "canonicalPath": "derivations.ehua.options.0.procedure"
    },
    "claim-p2372::p2372-in-other-words-there-is-no-phonological-contrast-to": {
      "assertionId": "classical-destockal-hua-causative-replacement:p2372-in-other-words-there-is-no-phonological-contrast-to",
      "canonicalPath": "derivations.pinahua.options.0.procedure"
    },
    "claim-p2373::p2373-te-top-e-hu-a-to-push-s-o": {
      "assertionId": "classical-destockal-hua-causative-replacement:p2373-te-top-e-hu-a-to-push-s-o",
      "canonicalPath": "derivations.pinahua.options.0.targetClass"
    },
    "claim-p2374::p2374-causative-destockal-verbstems-of-the-a-hu-a-and": {
      "assertionId": "classical-destockal-hua-causative-replacement:p2374-causative-destockal-verbstems-of-the-a-hu-a-and",
      "canonicalPath": "derivations.ehua.options.0.procedure"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2371": [],
    "claim-p2372": [],
    "claim-p2373": [],
    "claim-p2374": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2371": "authorized",
    "claim-p2372": "authorized",
    "claim-p2373": "authorized",
    "claim-p2374": "authorized"
  }
};
export default Object.freeze(spec);
