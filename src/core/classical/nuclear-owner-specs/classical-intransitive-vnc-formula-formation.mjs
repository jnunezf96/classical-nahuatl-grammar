const spec = {
  "ownerId": "classical-intransitive-vnc-formula-formation",
  "prefix": "ClassicalIntransitiveVncFormulaFormation",
  "operationId": "classical.intransitive.vnc.formula.form",
  "inputContract": "complete-typed-classical-intransitive-vnc-formula-formation-source",
  "domain": "classical-intransitive-vnc-formula-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-finite-vnc-slots",
  "selections": [
    "claim-p681",
    "claim-p682",
    "claim-p683"
  ],
  "coordinates": {
    "claim-p681::p681-the-simplest-vnc-formula-is-the-intransitive-which-is": {
      "assertionId": "classical-intransitive-vnc-formula-formation:p681-the-simplest-vnc-formula-is-the-intransitive-which-is",
      "canonicalPath": "transitivity"
    },
    "claim-p682::p682-linear-format-pers1-pers2-stem-tns-num1-num2": {
      "assertionId": "classical-intransitive-vnc-formula-formation:p682-linear-format-pers1-pers2-stem-tns-num1-num2",
      "canonicalPath": "structuralFormula"
    },
    "claim-p683::p683-pers1-pers2-num1-num2-subject-predicate-the-implicit": {
      "assertionId": "classical-intransitive-vnc-formula-formation:p683-pers1-pers2-num1-num2-subject-predicate-the-implicit",
      "canonicalPath": "formulaSlots"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIntransitiveVncFormulaSystemFrame",
  "executionValidatorName": "isClassicalNahuatlIntransitiveVncFormulaSystemFrame",
  "executionArgsBySelection": {
    "claim-p681": [],
    "claim-p682": [],
    "claim-p683": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p681": "authorized",
    "claim-p682": "authorized",
    "claim-p683": "authorized"
  }
};
export default Object.freeze(spec);
