const spec = {
  "ownerId": "classical-relational-locative-affective-order-alternatives",
  "prefix": "ClassicalRelationalLocativeAffectiveOrderAlternatives",
  "operationId": "classical.relational.locative.affective.order.alternatives.execute",
  "inputContract": "complete-typed-classical-relational-locative-affective-order-alternatives-source",
  "domain": "classical-relational-locative-affective-order-alternatives",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4419",
    "claim-p4420",
    "claim-p4421",
    "claim-p4422",
    "claim-p4423",
    "claim-p4424"
  ],
  "coordinates": {
    "claim-p4419::p4419-if-compound-nounstems-have-a-relational-stem-as-matrix": {
      "assertionId": "classical-relational-locative-affective-order-alternatives:p4419-if-compound-nounstems-have-a-relational-stem-as-matrix",
      "canonicalPath": "cases.coAffective.canonicalResult"
    },
    "claim-p4420::p4420-if-compound-nounstems-have-a-relational-stem-as-matrix": {
      "assertionId": "classical-relational-locative-affective-order-alternatives:p4420-if-compound-nounstems-have-a-relational-stem-as-matrix",
      "canonicalPath": "cases.coAffective.stemId"
    },
    "claim-p4421::p4421-when-one-precedes": {
      "assertionId": "classical-relational-locative-affective-order-alternatives:p4421-when-one-precedes",
      "canonicalPath": "cases.coAffective.typedOperationAuthority"
    },
    "claim-p4422::p4422-when-one-precedes-nothing-unusual-happens-e-g-xa": {
      "assertionId": "classical-relational-locative-affective-order-alternatives:p4422-when-one-precedes-nothing-unusual-happens-e-g-xa",
      "canonicalPath": "cases.coAffective.canonicalResult"
    },
    "claim-p4423::p4423-as-in-the-case-of-other-relational-nounstems-when": {
      "assertionId": "classical-relational-locative-affective-order-alternatives:p4423-as-in-the-case-of-other-relational-nounstems-when",
      "canonicalPath": "cases.coAffective.stemId"
    },
    "claim-p4424::p4424-when-co-or-c-tli-serves-as-the-matrix": {
      "assertionId": "classical-relational-locative-affective-order-alternatives:p4424-when-co-or-c-tli-serves-as-the-matrix",
      "canonicalPath": "cases.coAffective.typedOperationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4419": [],
    "claim-p4420": [],
    "claim-p4421": [],
    "claim-p4422": [],
    "claim-p4423": [],
    "claim-p4424": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4419": "authorized",
    "claim-p4420": "authorized",
    "claim-p4421": "authorized",
    "claim-p4422": "authorized",
    "claim-p4423": "authorized",
    "claim-p4424": "authorized"
  }
};
export default Object.freeze(spec);
