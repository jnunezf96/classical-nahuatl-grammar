const spec = {
  "ownerId": "classical-adverbial-adjunction-mach-recursive-interrogative",
  "prefix": "ClassicalAdverbialAdjunctionMachRecursiveInterrogative",
  "operationId": "classical.adverbial.adjunction.mach.recursive.interrogative.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-mach-recursive-interrogative-source",
  "domain": "classical-adverbial-adjunction-mach-recursive-interrogative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4670"
  ],
  "coordinates": {
    "claim-p4670::p4670-inherently-interrogative-nncs-can-also-modify-a-structure-of": {
      "assertionId": "classical-adverbial-adjunction-mach-recursive-interrogative:p4670-inherently-interrogative-nncs-can-also-modify-a-structure-of",
      "canonicalPath": "analysis.inherentlyInterrogativeModifierMayModifyMachStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4670": [
      "mach-recursive-interrogative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4670": "authorized"
  }
};
export default Object.freeze(spec);
