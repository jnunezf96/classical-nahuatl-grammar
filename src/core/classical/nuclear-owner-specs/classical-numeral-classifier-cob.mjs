const spec = {
  "ownerId": "classical-numeral-classifier-cob",
  "prefix": "ClassicalNumeralClassifierCob",
  "operationId": "classical.numeral.classifier.cob.execute",
  "inputContract": "complete-typed-classical-numeral-classifier-cob-source",
  "domain": "classical-numeral-classifier-cob",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3324",
    "claim-p3325",
    "claim-p3326",
    "claim-p3327",
    "claim-p3328",
    "claim-p3329"
  ],
  "coordinates": {
    "claim-p3324::p3324-the-set-of-numeral-stems-used-in-counting-things": {
      "assertionId": "classical-numeral-classifier-cob:p3324-the-set-of-numeral-stems-used-in-counting-things",
      "canonicalPath": "cases.classifierCob.rules.numeral/classifier-cob"
    },
    "claim-p3325::p3325-the-set-is-used-to-count-only-through-nineteen": {
      "assertionId": "classical-numeral-classifier-cob:p3325-the-set-is-used-to-count-only-through-nineteen",
      "canonicalPath": "cases.classifierCob.authorizationStatus"
    },
    "claim-p3326::p3326-when-there-is-a-structure-of-conjunction-the-stem": {
      "assertionId": "classical-numeral-classifier-cob:p3326-when-there-is-a-structure-of-conjunction-the-stem",
      "canonicalPath": "cases.classifierCob.gcdSatisfied"
    },
    "claim-p3327::p3327-to-continue-the-count-beyond-nineteen-and-on-through": {
      "assertionId": "classical-numeral-classifier-cob:p3327-to-continue-the-count-beyond-nineteen-and-on-through",
      "canonicalPath": "cases.classifierCob.lcmComplete"
    },
    "claim-p3328::p3328-tlainic-is-a-preterit-agentive-nnc-see-35-2": {
      "assertionId": "classical-numeral-classifier-cob:p3328-tlainic-is-a-preterit-agentive-nnc-see-35-2",
      "canonicalPath": "cases.classifierCob.typedCobPrerequisite"
    },
    "claim-p3329::p3329-to-continue-the-count-beyond-thirty-nine-the-stems": {
      "assertionId": "classical-numeral-classifier-cob:p3329-to-continue-the-count-beyond-thirty-nine-the-stems",
      "canonicalPath": "cases.classifierCob.rules.numeral/classifier-cob"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3324": [],
    "claim-p3325": [],
    "claim-p3326": [],
    "claim-p3327": [],
    "claim-p3328": [],
    "claim-p3329": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3324": "authorized",
    "claim-p3325": "authorized",
    "claim-p3326": "authorized",
    "claim-p3327": "authorized",
    "claim-p3328": "authorized",
    "claim-p3329": "authorized"
  }
};
export default Object.freeze(spec);
