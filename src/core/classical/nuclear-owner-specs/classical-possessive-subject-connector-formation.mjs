const spec = {
  "ownerId": "classical-possessive-subject-connector-formation",
  "prefix": "ClassicalPossessiveSubjectConnectorFormation",
  "operationId": "classical.possessive.subject.connector.formation.execute",
  "inputContract": "complete-typed-classical-possessive-subject-connector-formation-source",
  "domain": "classical-possessive-subject-connector-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1370",
    "claim-p1371",
    "claim-p1372",
    "claim-p1373",
    "claim-p1374",
    "claim-p1375",
    "claim-p1376",
    "claim-p1377",
    "claim-p1378"
  ],
  "coordinates": {
    "claim-p1370::p1370-the-subject-s-num1-subposition-is-filled-by-one": {
      "assertionId": "classical-possessive-subject-connector-formation:p1370-the-subject-s-num1-subposition-is-filled-by-one",
      "canonicalPath": "contractNumberDyadInventory.length"
    },
    "claim-p1371::p1371-when-the-singular-common-morph-is-occupying-the-num2": {
      "assertionId": "classical-possessive-subject-connector-formation:p1371-when-the-singular-common-morph-is-occupying-the-num2",
      "canonicalPath": "numberFrame.num2"
    },
    "claim-p1372::p1372-the-morphs-uh-hui-and-0-occur-only-when": {
      "assertionId": "classical-possessive-subject-connector-formation:p1372-the-morphs-uh-hui-and-0-occur-only-when",
      "canonicalPath": "numberFrame.subjectNumber"
    },
    "claim-p1373::p1373-the-uh-and-hui-morphs-are-in-complementary-distribution": {
      "assertionId": "classical-possessive-subject-connector-formation:p1373-the-uh-and-hui-morphs-are-in-complementary-distribution",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1374::p1374-besides-this-phonological-conditioning-the-choice-of-the-hui": {
      "assertionId": "classical-possessive-subject-connector-formation:p1374-besides-this-phonological-conditioning-the-choice-of-the-hui",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1375::p1375-the-choice-between-uh-and-is-morphologically-conditioned": {
      "assertionId": "classical-possessive-subject-connector-formation:p1375-the-choice-between-uh-and-is-morphologically-conditioned",
      "canonicalPath": "numberFrame.connectorRule"
    },
    "claim-p1376::p1376-when-the-subject-pronoun-is-plural": {
      "assertionId": "classical-possessive-subject-connector-formation:p1376-when-the-subject-pronoun-is-plural",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1377::p1377-the-uh-and-hu-morphs-are-merely-spelling-variants": {
      "assertionId": "classical-possessive-subject-connector-formation:p1377-the-uh-and-hu-morphs-are-merely-spelling-variants",
      "canonicalPath": "contractNumberDyadInventory.0.identity"
    },
    "claim-p1378::p1378-the-num2-subposition-has-two-morphs": {
      "assertionId": "classical-possessive-subject-connector-formation:p1378-the-num2-subposition-has-two-morphs",
      "canonicalPath": "numberFrame.num2"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1370": [
      "connector-uh"
    ],
    "claim-p1371": [
      "connector-uh"
    ],
    "claim-p1372": [
      "connector-hui"
    ],
    "claim-p1373": [
      "connector-uh"
    ],
    "claim-p1374": [
      "connector-hui"
    ],
    "claim-p1375": [
      "connector-zero"
    ],
    "claim-p1376": [
      "plural-hu-an"
    ],
    "claim-p1377": [
      "connector-uh"
    ],
    "claim-p1378": [
      "plural-hu-an"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1370": "authorized",
    "claim-p1371": "authorized",
    "claim-p1372": "authorized",
    "claim-p1373": "authorized",
    "claim-p1374": "authorized",
    "claim-p1375": "authorized",
    "claim-p1376": "authorized",
    "claim-p1377": "authorized",
    "claim-p1378": "authorized"
  }
};
export default Object.freeze(spec);
