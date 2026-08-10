const spec = {
  "ownerId": "classical-nnc-subject-predicate-number-compartment",
  "prefix": "ClassicalNncSubjectPredicateNumberCompartment",
  "operationId": "classical.nnc.subject.predicate.number.compartment.execute",
  "inputContract": "complete-typed-classical-nnc-subject-predicate-number-compartment-source",
  "domain": "classical-nnc-subject-predicate-number-compartment",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1346",
    "claim-p1347",
    "claim-p1348",
    "claim-p1349",
    "claim-p1350",
    "claim-p1351",
    "claim-p1352",
    "claim-p1353",
    "claim-p1354",
    "claim-p1355",
    "claim-p1356"
  ],
  "coordinates": {
    "claim-p1346::p1346-a-nounstem-selects-the-shape-of-the-morphs-filling": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1346-a-nounstem-selects-the-shape-of-the-morphs-filling",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1347::p1347-warning-the-number-position-on-an-nnc-i-e": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1347-warning-the-number-position-on-an-nnc-i-e",
      "canonicalPath": "numberFrame.numberBelongsTo"
    },
    "claim-p1349::p1349-it-is-a-constituent-of-the-subject-personal-pronoun": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1349-it-is-a-constituent-of-the-subject-personal-pronoun",
      "canonicalPath": "slotFrame.slots.number.belongsTo"
    },
    "claim-p1350::p1350-as-has-been-made-clear-earlier-a-nuclear-clause": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1350-as-has-been-made-clear-earlier-a-nuclear-clause",
      "canonicalPath": "slotFrame.slots.predicate.stem"
    },
    "claim-p1351::p1351-this-is-most-obvious-when-the-nounstem-of-an": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1351-this-is-most-obvious-when-the-nounstem-of-an",
      "canonicalPath": "contractGreatestCommonDivisor.clauseKind"
    },
    "claim-p1352::p1352-result-this-is-most-obvious": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1352-result-this-is-most-obvious",
      "canonicalPath": "numberFrame.subjectNumber"
    },
    "claim-p1353::p1353-in-these-examples-the-morph-cem-one-clearly-proves": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1353-in-these-examples-the-morph-cem-one-clearly-proves",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1354::p1354-ti-m-eh-subject-we": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1354-ti-m-eh-subject-we",
      "canonicalPath": "numberFrame.numberIsNounInflection"
    },
    "claim-p1355::p1355-cem-ihti-predicate-one-belly": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1355-cem-ihti-predicate-one-belly",
      "canonicalPath": "formulaRealization"
    },
    "claim-p1356::p1356-the-same-airtight-compartmentalization-of-subject-and-predicate-that": {
      "assertionId": "classical-nnc-subject-predicate-number-compartment:p1356-the-same-airtight-compartmentalization-of-subject-and-predicate-that",
      "canonicalPath": "slotFrame.slots.predicate.tenseSlot"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1346": [
      "common-tli"
    ],
    "claim-p1347": [
      "common-tli"
    ],
    "claim-p1348": [
      "common-tli"
    ],
    "claim-p1349": [
      "common-tli"
    ],
    "claim-p1350": [
      "common-tli"
    ],
    "claim-p1351": [
      "common-tli"
    ],
    "claim-p1352": [
      "plural-t-in"
    ],
    "claim-p1353": [
      "plural-t-in"
    ],
    "claim-p1354": [
      "plural-t-in"
    ],
    "claim-p1355": [
      "plural-m-eh"
    ],
    "claim-p1356": [
      "plural-t-in"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1346": "authorized",
    "claim-p1347": "authorized",
    "claim-p1348": "authorized",
    "claim-p1349": "authorized",
    "claim-p1350": "authorized",
    "claim-p1351": "authorized",
    "claim-p1352": "authorized",
    "claim-p1353": "authorized",
    "claim-p1354": "authorized",
    "claim-p1355": "authorized",
    "claim-p1356": "authorized"
  }
};
export default Object.freeze(spec);
