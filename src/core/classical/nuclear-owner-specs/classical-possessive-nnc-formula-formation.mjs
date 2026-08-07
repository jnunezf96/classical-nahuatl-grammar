const spec = {
  "ownerId": "classical-possessive-nnc-formula-formation",
  "prefix": "ClassicalPossessiveNncFormulaFormation",
  "operationId": "classical.possessive.nnc.formula.formation.execute",
  "inputContract": "complete-typed-classical-possessive-nnc-formula-formation-source",
  "domain": "classical-possessive-nnc-formula-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1361",
    "claim-p1362",
    "claim-p1363",
    "claim-p1364",
    "claim-p1365",
    "claim-p1366",
    "claim-p1367"
  ],
  "coordinates": {
    "claim-p1361::p1361-as-pointed-out-in-4-5-a-possessive-state": {
      "assertionId": "classical-possessive-nnc-formula-formation:p1361-as-pointed-out-in-4-5-a-possessive-state",
      "canonicalPath": "contractGreatestCommonDivisor.state"
    },
    "claim-p1362::p1362-monadic-state-position-formula-linear-format-pers1-pers2-st": {
      "assertionId": "classical-possessive-nnc-formula-formation:p1362-monadic-state-position-formula-linear-format-pers1-pers2-st",
      "canonicalPath": "formulaTemplate"
    },
    "claim-p1363::p1363-pers1-pers2-num1-num2-subject": {
      "assertionId": "classical-possessive-nnc-formula-formation:p1363-pers1-pers2-num1-num2-subject",
      "canonicalPath": "diagramFrame.generalRows.1.expression"
    },
    "claim-p1364::p1364-st-stem-predicate": {
      "assertionId": "classical-possessive-nnc-formula-formation:p1364-st-stem-predicate",
      "canonicalPath": "stateFrame.arity"
    },
    "claim-p1365::p1365-linear-format-pers1-pers2-st1-st2-stem-num1-num2": {
      "assertionId": "classical-possessive-nnc-formula-formation:p1365-linear-format-pers1-pers2-st1-st2-stem-num1-num2",
      "canonicalPath": "formulaTemplate"
    },
    "claim-p1366::p1366-pers1-pers2-num1-num2-subject": {
      "assertionId": "classical-possessive-nnc-formula-formation:p1366-pers1-pers2-num1-num2-subject",
      "canonicalPath": "diagramFrame.generalRows.0.expression"
    },
    "claim-p1367::p1367-st1-st2-stem-predicate": {
      "assertionId": "classical-possessive-nnc-formula-formation:p1367-st1-st2-stem-predicate",
      "canonicalPath": "diagramFrame.generalRows.1.expression"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1361": [
      "monadic-te"
    ],
    "claim-p1362": [
      "monadic-te"
    ],
    "claim-p1363": [
      "monadic-te"
    ],
    "claim-p1364": [
      "monadic-te"
    ],
    "claim-p1365": [
      "dyadic-1sg"
    ],
    "claim-p1366": [
      "dyadic-1sg"
    ],
    "claim-p1367": [
      "dyadic-1sg"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1361": "authorized",
    "claim-p1362": "authorized",
    "claim-p1363": "authorized",
    "claim-p1364": "authorized",
    "claim-p1365": "authorized",
    "claim-p1366": "authorized",
    "claim-p1367": "authorized"
  }
};
export default Object.freeze(spec);
