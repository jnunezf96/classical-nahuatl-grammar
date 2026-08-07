const spec = {
  "ownerId": "classical-ordinary-frequentative-shape-selection",
  "prefix": "ClassicalOrdinaryFrequentativeShapeSelection",
  "operationId": "classical.ordinary.frequentative.shape.selection.execute",
  "inputContract": "complete-typed-classical-ordinary-frequentative-shape-selection-source",
  "domain": "classical-ordinary-frequentative-shape-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2656",
    "claim-p2657",
    "claim-p2658"
  ],
  "coordinates": {
    "claim-p2656::p2656-the-most-general-type-offrequentative-verbstem-consists-of-merely": {
      "assertionId": "classical-ordinary-frequentative-shape-selection:p2656-the-most-general-type-offrequentative-verbstem-consists-of-merely",
      "canonicalPath": "contract.lexicalShapeChoice"
    },
    "claim-p2657::p2657-there-are-however-no-strict-rules-for-deciding-which": {
      "assertionId": "classical-ordinary-frequentative-shape-selection:p2657-there-are-however-no-strict-rules-for-deciding-which",
      "canonicalPath": "cases.ordinaryLong.ruleFamily"
    },
    "claim-p2658::p2658-the-following-remarks-merely-outline-the-possibilities": {
      "assertionId": "classical-ordinary-frequentative-shape-selection:p2658-the-following-remarks-merely-outline-the-possibilities",
      "canonicalPath": "cases.ordinaryShort.variant"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2656": [],
    "claim-p2657": [],
    "claim-p2658": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2656": "authorized",
    "claim-p2657": "authorized",
    "claim-p2658": "authorized"
  }
};
export default Object.freeze(spec);
