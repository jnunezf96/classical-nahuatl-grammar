const spec = {
  "ownerId": "classical-numeral-classifier-rock",
  "prefix": "ClassicalNumeralClassifierRock",
  "operationId": "classical.numeral.classifier.rock.execute",
  "inputContract": "complete-typed-classical-numeral-classifier-rock-source",
  "domain": "classical-numeral-classifier-rock",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3315",
    "claim-p3316",
    "claim-p3317"
  ],
  "coordinates": {
    "claim-p3315::p3315-the-set-of-numeral-stems-used-in-counting-round": {
      "assertionId": "classical-numeral-classifier-rock:p3315-the-set-of-numeral-stems-used-in-counting-round",
      "canonicalPath": "cases.classifierRock.rules.numeral/classifier-rock"
    },
    "claim-p3316::p3316-when-there-is-a-structure-of-conjunction-the-stem": {
      "assertionId": "classical-numeral-classifier-rock:p3316-when-there-is-a-structure-of-conjunction-the-stem",
      "canonicalPath": "cases.classifierRock.authorizationStatus"
    },
    "claim-p3317::p3317-a-plural-subject-pronoun-of-an-nnc-built-on": {
      "assertionId": "classical-numeral-classifier-rock:p3317-a-plural-subject-pronoun-of-an-nnc-built-on",
      "canonicalPath": "cases.classifierRock.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3315": [],
    "claim-p3316": [],
    "claim-p3317": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3315": "authorized",
    "claim-p3316": "authorized",
    "claim-p3317": "authorized"
  }
};
export default Object.freeze(spec);
