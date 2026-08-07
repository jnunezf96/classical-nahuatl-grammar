const spec = {
  "ownerId": "classical-absolutive-nnc-formula-formation",
  "prefix": "ClassicalAbsolutiveNncFormulaFormation",
  "operationId": "classical.absolutive.nnc.formula.formation.execute",
  "inputContract": "complete-typed-classical-absolutive-nnc-formula-formation-source",
  "domain": "classical-absolutive-nnc-formula-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1266",
    "claim-p1267",
    "claim-p1268",
    "claim-p1269"
  ],
  "coordinates": {
    "claim-p1266::p1266-as-is-clear-in-the-three-nnc-formulas-presented": {
      "assertionId": "classical-absolutive-nnc-formula-formation:p1266-as-is-clear-in-the-three-nnc-formulas-presented",
      "canonicalPath": "stateFrame.arity"
    },
    "claim-p1267::p1267-it-is-the-absolutive-state-nnc-formula-which-is": {
      "assertionId": "classical-absolutive-nnc-formula-formation:p1267-it-is-the-absolutive-state-nnc-formula-which-is",
      "canonicalPath": "state"
    },
    "claim-p1268::p1268-linear-format-pers1-pers2-stem-num1-num2": {
      "assertionId": "classical-absolutive-nnc-formula-formation:p1268-linear-format-pers1-pers2-stem-num1-num2",
      "canonicalPath": "formulaTemplate"
    },
    "claim-p1269::p1269-pers1-pers2-num1-num2-subject-stem-predicate": {
      "assertionId": "classical-absolutive-nnc-formula-formation:p1269-pers1-pers2-num1-num2-subject-stem-predicate",
      "canonicalPath": "diagramFrame.generalRows.0.expression"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1266": [
      "common-tli"
    ],
    "claim-p1267": [
      "common-tli"
    ],
    "claim-p1268": [
      "common-tli"
    ],
    "claim-p1269": [
      "common-tli"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1266": "authorized",
    "claim-p1267": "authorized",
    "claim-p1268": "authorized",
    "claim-p1269": "authorized"
  }
};
export default Object.freeze(spec);
