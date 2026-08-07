const spec = {
  "ownerId": "classical-type-one-final-i-addition",
  "prefix": "ClassicalTypeOneFinalIAddition",
  "operationId": "classical.type.one.final.i.addition.execute",
  "inputContract": "complete-typed-classical-type-one-final-i-addition-source",
  "domain": "classical-type-one-final-i-addition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2294",
    "claim-p2295"
  ],
  "coordinates": {
    "claim-p2294::p2294-when-derivation-takes-place-by-addition-the-causative-a": {
      "assertionId": "classical-type-one-final-i-addition:p2294-when-derivation-takes-place-by-addition-the-causative-a",
      "canonicalPath": "derivations.ilpi.options.0.targetStem"
    },
    "claim-p2295::p2295-the-derived-causative-stem-of-this-kind-of-verb": {
      "assertionId": "classical-type-one-final-i-addition:p2295-the-derived-causative-stem-of-this-kind-of-verb",
      "canonicalPath": "derivations.ilpi.options.0.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2294": [],
    "claim-p2295": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2294": "authorized",
    "claim-p2295": "authorized"
  }
};
export default Object.freeze(spec);
