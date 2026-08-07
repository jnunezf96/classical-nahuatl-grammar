const spec = {
  "ownerId": "classical-numeral-number-gate",
  "prefix": "ClassicalNumeralNumberGate",
  "operationId": "classical.numeral.number.gate.execute",
  "inputContract": "complete-typed-classical-numeral-number-gate-source",
  "domain": "classical-numeral-number-gate",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3262",
    "claim-p3263",
    "claim-p3264"
  ],
  "coordinates": {
    "claim-p3262::p3262-an-nnc-built-on-a-gross-count-stem-can": {
      "assertionId": "classical-numeral-number-gate:p3262-an-nnc-built-on-a-gross-count-stem-can",
      "canonicalPath": "cases.numberGate.rules.numeral/number-gate"
    },
    "claim-p3263::p3263-this-is-a-violation-of-the-rule-that-nonanimate": {
      "assertionId": "classical-numeral-number-gate:p3263-this-is-a-violation-of-the-rule-that-nonanimate",
      "canonicalPath": "cases.numberGate.authorizationStatus"
    },
    "claim-p3264::p3264-an-nnc-built-on-an-ordinary-count-stem-follows": {
      "assertionId": "classical-numeral-number-gate:p3264-an-nnc-built-on-an-ordinary-count-stem-follows",
      "canonicalPath": "cases.numberGate.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3262": [],
    "claim-p3263": [],
    "claim-p3264": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3262": "authorized",
    "claim-p3263": "authorized",
    "claim-p3264": "authorized"
  }
};
export default Object.freeze(spec);
