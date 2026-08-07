const spec = {
  "ownerId": "classical-transitive-vnc-formula-formation",
  "prefix": "ClassicalTransitiveVncFormulaFormation",
  "operationId": "classical.transitive.vnc.formula.form",
  "inputContract": "complete-typed-classical-transitive-vnc-formula-formation-source",
  "domain": "classical-transitive-vnc-formula-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-transitive-vnc-object",
  "selections": [
    "claim-p760",
    "claim-p780",
    "claim-p781",
    "claim-p782",
    "claim-p792",
    "claim-p793",
    "claim-p794",
    "claim-p795",
    "claim-p796"
  ],
  "coordinates": {
    "claim-p760::p760-the-two-transitive-formulas-given-in-4-5-differ": {
      "assertionId": "classical-transitive-vnc-formula-formation:p760-the-two-transitive-formulas-given-in-4-5-differ",
      "canonicalPath": "onlyValenceDiffers"
    },
    "claim-p780::p780-the-second-vnc-formula-in-4-5-is-the": {
      "assertionId": "classical-transitive-vnc-formula-formation:p780-the-second-vnc-formula-in-4-5-is-the",
      "canonicalPath": "monadicArity"
    },
    "claim-p781::p781-linear-format-pers1-pers2-va-stem-tns-num1-num2": {
      "assertionId": "classical-transitive-vnc-formula-formation:p781-linear-format-pers1-pers2-va-stem-tns-num1-num2",
      "canonicalPath": "monadicTemplate"
    },
    "claim-p782::p782-diagrammatic-format-predicate-va-stem": {
      "assertionId": "classical-transitive-vnc-formula-formation:p782-diagrammatic-format-predicate-va-stem",
      "canonicalPath": "monadicFormula"
    },
    "claim-p792::p792-result-four-bits-of-information-become-important-trajectory-person": {
      "assertionId": "classical-transitive-vnc-formula-formation:p792-result-four-bits-of-information-become-important-trajectory-person",
      "canonicalPath": "dyadicArity"
    },
    "claim-p793::p793-when-the-personal-pronoun-in-the-objective-case-is": {
      "assertionId": "classical-transitive-vnc-formula-formation:p793-when-the-personal-pronoun-in-the-objective-case-is",
      "canonicalPath": "dyadicSpecificity"
    },
    "claim-p794::p794-all-of-these-are-combined-into-the-dyadic-subpositions": {
      "assertionId": "classical-transitive-vnc-formula-formation:p794-all-of-these-are-combined-into-the-dyadic-subpositions",
      "canonicalPath": "dyadicCategories"
    },
    "claim-p795::p795-linear-format-pers1-pers2-va1-va2-stem-tns-num1": {
      "assertionId": "classical-transitive-vnc-formula-formation:p795-linear-format-pers1-pers2-va1-va2-stem-tns-num1",
      "canonicalPath": "dyadicTemplate"
    },
    "claim-p796::p796-diagrammatic-format-predicate": {
      "assertionId": "classical-transitive-vnc-formula-formation:p796-diagrammatic-format-predicate",
      "canonicalPath": "dyadicFormula"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlTransitiveVncFormulaSystemFrame",
  "executionValidatorName": "isClassicalNahuatlTransitiveVncFormulaSystemFrame",
  "executionArgsBySelection": {
    "claim-p760": [],
    "claim-p780": [],
    "claim-p781": [],
    "claim-p782": [],
    "claim-p792": [],
    "claim-p793": [],
    "claim-p794": [],
    "claim-p795": [],
    "claim-p796": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p760": "authorized",
    "claim-p780": "authorized",
    "claim-p781": "authorized",
    "claim-p782": "authorized",
    "claim-p792": "authorized",
    "claim-p793": "authorized",
    "claim-p794": "authorized",
    "claim-p795": "authorized",
    "claim-p796": "authorized"
  }
};
export default Object.freeze(spec);
