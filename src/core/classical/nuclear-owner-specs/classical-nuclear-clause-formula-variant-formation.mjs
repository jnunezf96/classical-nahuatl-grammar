const spec = {
  "ownerId": "classical-nuclear-clause-formula-variant-formation",
  "prefix": "ClassicalNuclearClauseFormulaVariantFormation",
  "operationId": "classical.nuclear.formula.variant.form",
  "inputContract": "complete-typed-classical-nuclear-clause-formula-variant-formation-source",
  "domain": "classical-nuclear-clause-formula-variant-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nuclear-clause-structure",
  "selections": [
    "claim-p643",
    "claim-p644",
    "claim-p645",
    "claim-p646",
    "claim-p647",
    "claim-p648"
  ],
  "coordinates": {
    "claim-p643::p643-pers1-pers2-va1-va2-stem-tns-num1-num2": {
      "assertionId": "classical-nuclear-clause-formula-variant-formation:p643-pers1-pers2-va1-va2-stem-tns-num1-num2",
      "canonicalPath": "variants.dyadicVnc.formula"
    },
    "claim-p644::p644-pers1-pers2-va-stem-tns-num1-num2": {
      "assertionId": "classical-nuclear-clause-formula-variant-formation:p644-pers1-pers2-va-stem-tns-num1-num2",
      "canonicalPath": "variants.monadicVnc.formula"
    },
    "claim-p645::p645-pers1-pers2-stem-tns-num1-num2-valence-is-dyadic": {
      "assertionId": "classical-nuclear-clause-formula-variant-formation:p645-pers1-pers2-stem-tns-num1-num2-valence-is-dyadic",
      "canonicalPath": "variants.vacantVnc.formula"
    },
    "claim-p646::p646-pers1-pers2-st1-st2-stem-num1-num2": {
      "assertionId": "classical-nuclear-clause-formula-variant-formation:p646-pers1-pers2-st1-st2-stem-num1-num2",
      "canonicalPath": "variants.dyadicNnc.formula"
    },
    "claim-p647::p647-pers1-pers2-st-stem-num1-num2": {
      "assertionId": "classical-nuclear-clause-formula-variant-formation:p647-pers1-pers2-st-stem-num1-num2",
      "canonicalPath": "variants.monadicNnc.formula"
    },
    "claim-p648::p648-pers1-pers2-stem-num1-num2-state-is-dyadic": {
      "assertionId": "classical-nuclear-clause-formula-variant-formation:p648-pers1-pers2-stem-num1-num2-state-is-dyadic",
      "canonicalPath": "variants.vacantNnc.formula"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNuclearFormulaVariantSystemFrame",
  "executionValidatorName": "isClassicalNahuatlNuclearFormulaVariantSystemFrame",
  "executionArgsBySelection": {
    "claim-p643": [],
    "claim-p644": [],
    "claim-p645": [],
    "claim-p646": [],
    "claim-p647": [],
    "claim-p648": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p643": "authorized",
    "claim-p644": "authorized",
    "claim-p645": "authorized",
    "claim-p646": "authorized",
    "claim-p647": "authorized",
    "claim-p648": "authorized"
  }
};
export default Object.freeze(spec);
