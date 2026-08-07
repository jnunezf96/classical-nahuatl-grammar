const spec = {
  "ownerId": "classical-gcd-structural-nominalization",
  "prefix": "ClassicalGcdStructuralNominalization",
  "operationId": "classical.gcd.structural.nominalization.execute",
  "inputContract": "complete-typed-classical-gcd-structural-nominalization-source",
  "domain": "classical-gcd-structural-nominalization",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3357",
    "claim-p3358",
    "claim-p3359",
    "claim-p3360"
  ],
  "coordinates": {
    "claim-p3357::p3357-nominalization-is-a-conversion-process-whereby-a-vnc-takes": {
      "assertionId": "classical-gcd-structural-nominalization:p3357-nominalization-is-a-conversion-process-whereby-a-vnc-takes",
      "canonicalPath": "cases.structuralNominalization.authorizationStatus"
    },
    "claim-p3358::p3358-since-supplementation-is-one-of-the-natural-functions-of": {
      "assertionId": "classical-gcd-structural-nominalization:p3358-since-supplementation-is-one-of-the-natural-functions-of",
      "canonicalPath": "cases.structuralNominalization.canonicalResult"
    },
    "claim-p3359::p3359-at-this-point-however-the-focus-is-on-structural": {
      "assertionId": "classical-gcd-structural-nominalization:p3359-at-this-point-however-the-focus-is-on-structural",
      "canonicalPath": "cases.structuralNominalization.gcdSatisfied"
    },
    "claim-p3360::p3360-there-are-eight-kinds-of-nominalized-vncs": {
      "assertionId": "classical-gcd-structural-nominalization:p3360-there-are-eight-kinds-of-nominalized-vncs",
      "canonicalPath": "cases.structuralNominalization.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3357": [],
    "claim-p3358": [],
    "claim-p3359": [],
    "claim-p3360": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3357": "authorized",
    "claim-p3358": "authorized",
    "claim-p3359": "authorized",
    "claim-p3360": "authorized"
  }
};
export default Object.freeze(spec);
