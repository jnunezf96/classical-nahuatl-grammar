const spec = {
  "ownerId": "classical-absolutive-singular-connector-formation",
  "prefix": "ClassicalAbsolutiveSingularConnectorFormation",
  "operationId": "classical.absolutive.singular.connector.formation.execute",
  "inputContract": "complete-typed-classical-absolutive-singular-connector-formation-source",
  "domain": "classical-absolutive-singular-connector-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1274",
    "claim-p1275",
    "claim-p1276",
    "claim-p1277",
    "claim-p1278",
    "claim-p1279",
    "claim-p1280",
    "claim-p1281",
    "claim-p1282",
    "claim-p1283",
    "claim-p1284"
  ],
  "coordinates": {
    "claim-p1274::p1274-when-an-nnc-s-predicate-is-in-the-absolutive": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1274-when-an-nnc-s-predicate-is-in-the-absolutive",
      "canonicalPath": "numberFrame.subjectNumber"
    },
    "claim-p1275::p1275-result-when-no-possessor-pronoun-occurs-and-the-nnc": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1275-result-when-no-possessor-pronoun-occurs-and-the-nnc",
      "canonicalPath": "contractNumberDyadInventory.0.identity"
    },
    "claim-p1276::p1276-these-four-morphs-are-ti-tli-or-ii-in": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1276-these-four-morphs-are-ti-tli-or-ii-in",
      "canonicalPath": "contractNumberDyadInventory.3.identity"
    },
    "claim-p1277::p1277-the-i-in-tli-or-ii-and-in-is": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1277-the-i-in-tli-or-ii-and-in-is",
      "canonicalPath": "numberFrame.supportiveVowelRoles"
    },
    "claim-p1278::p1278-the-ti-morph-and-the-tli-or-ii-morph": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1278-the-ti-morph-and-the-tli-or-ii-morph",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1279::p1279-both-in-and-0-are-suppletive-morphs": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1279-both-in-and-0-are-suppletive-morphs",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1280::p1280-the-in-occurs-only-after-a-consonant-but-the": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1280-the-in-occurs-only-after-a-consonant-but-the",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1281::p1281-the-a-of-the-tli-variant-undergoes-assimilation-after": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1281-the-a-of-the-tli-variant-undergoes-assimilation-after",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1282::p1282-since-as-explained-in-2-10-1-ia-11": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1282-since-as-explained-in-2-10-1-ia-11",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1283::p1283-when-one-of-the-above-morphs-occupies-the-subject": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1283-when-one-of-the-above-morphs-occupies-the-subject",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1284::p1284-result-that-pronoun-s-num2-subposition-is-filled-by": {
      "assertionId": "classical-absolutive-singular-connector-formation:p1284-result-that-pronoun-s-num2-subposition-is-filled-by",
      "canonicalPath": "numberFrame.num2"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1274": [
      "common-tl"
    ],
    "claim-p1275": [
      "common-tl"
    ],
    "claim-p1276": [
      "common-tl"
    ],
    "claim-p1277": [
      "common-tli"
    ],
    "claim-p1278": [
      "common-tl"
    ],
    "claim-p1279": [
      "common-in"
    ],
    "claim-p1280": [
      "common-in"
    ],
    "claim-p1281": [
      "common-tli"
    ],
    "claim-p1282": [
      "common-tli"
    ],
    "claim-p1283": [
      "common-tl"
    ],
    "claim-p1284": [
      "common-zero"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1274": "authorized",
    "claim-p1275": "authorized",
    "claim-p1276": "authorized",
    "claim-p1277": "authorized",
    "claim-p1278": "authorized",
    "claim-p1279": "authorized",
    "claim-p1280": "authorized",
    "claim-p1281": "authorized",
    "claim-p1282": "authorized",
    "claim-p1283": "authorized",
    "claim-p1284": "authorized"
  }
};
export default Object.freeze(spec);
