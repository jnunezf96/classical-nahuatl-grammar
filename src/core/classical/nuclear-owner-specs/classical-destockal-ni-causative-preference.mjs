const spec = {
  "ownerId": "classical-destockal-ni-causative-preference",
  "prefix": "ClassicalDestockalNiCausativePreference",
  "operationId": "classical.destockal.ni.causative.preference.execute",
  "inputContract": "complete-typed-classical-destockal-ni-causative-preference-source",
  "domain": "classical-destockal-ni-causative-preference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2336",
    "claim-p2337",
    "claim-p2338"
  ],
  "coordinates": {
    "claim-p2336::p2336-the-majority-of-the-ni-destockal-stems-prefer-to": {
      "assertionId": "classical-destockal-ni-causative-preference:p2336-the-majority-of-the-ni-destockal-stems-prefer-to",
      "canonicalPath": "derivations.chipini.options.1.derivationRoute"
    },
    "claim-p2337::p2337-of-the-ni-stems-listed-in-subsections-1-through": {
      "assertionId": "classical-destockal-ni-causative-preference:p2337-of-the-ni-stems-listed-in-subsections-1-through",
      "canonicalPath": "derivations.cualani.options.0.derivationRoute"
    },
    "claim-p2338::p2338-there-are-of-course-others-in-addition-to-those": {
      "assertionId": "classical-destockal-ni-causative-preference:p2338-there-are-of-course-others-in-addition-to-those",
      "canonicalPath": "derivations.chipini.options.0.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2336": [],
    "claim-p2337": [],
    "claim-p2338": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2336": "authorized",
    "claim-p2337": "authorized",
    "claim-p2338": "authorized"
  }
};
export default Object.freeze(spec);
