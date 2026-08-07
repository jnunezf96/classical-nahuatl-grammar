const spec = {
  "ownerId": "classical-specific-possessor-pronoun-paradigm",
  "prefix": "ClassicalSpecificPossessorPronounParadigm",
  "operationId": "classical.specific.possessor.pronoun.paradigm.execute",
  "inputContract": "complete-typed-classical-specific-possessor-pronoun-paradigm-source",
  "domain": "classical-specific-possessor-pronoun-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1415",
    "claim-p1416",
    "claim-p1417",
    "claim-p1418",
    "claim-p1419",
    "claim-p1420",
    "claim-p1421"
  ],
  "coordinates": {
    "claim-p1415::p1415-the-following-is-a-list-of-the-specific-personal": {
      "assertionId": "classical-specific-possessor-pronoun-paradigm:p1415-the-following-is-a-list-of-the-specific-personal",
      "canonicalPath": "contractPossessorStateShapeInventory.length"
    },
    "claim-p1416::p1416-n-o-n-lsg-poss-my": {
      "assertionId": "classical-specific-possessor-pronoun-paradigm:p1416-n-o-n-lsg-poss-my",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.1sg"
    },
    "claim-p1417::p1417-t-o-t-lpl-poss-our": {
      "assertionId": "classical-specific-possessor-pronoun-paradigm:p1417-t-o-t-lpl-poss-our",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.1pl"
    },
    "claim-p1418::p1418-m-o-m-2sg-poss-your-sg": {
      "assertionId": "classical-specific-possessor-pronoun-paradigm:p1418-m-o-m-2sg-poss-your-sg",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.2sg"
    },
    "claim-p1419::p1419-am-o-am-2pl-poss-your-pl": {
      "assertionId": "classical-specific-possessor-pronoun-paradigm:p1419-am-o-am-2pl-poss-your-pl",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.2pl"
    },
    "claim-p1420::p1420-i-3poss-sg-his-her-its-also-3poss-com": {
      "assertionId": "classical-specific-possessor-pronoun-paradigm:p1420-i-3poss-sg-his-her-its-also-3poss-com",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.3sg"
    },
    "claim-p1421::p1421-i-m-i-n-3poss-pl-their-the-plural": {
      "assertionId": "classical-specific-possessor-pronoun-paradigm:p1421-i-m-i-n-3poss-pl-their-the-plural",
      "canonicalPath": "contractPossessorShapeIdentitiesByPossessor.3pl"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1415": [
      "dyadic-1sg"
    ],
    "claim-p1416": [
      "dyadic-1sg"
    ],
    "claim-p1417": [
      "dyadic-1pl"
    ],
    "claim-p1418": [
      "dyadic-2sg"
    ],
    "claim-p1419": [
      "dyadic-2pl"
    ],
    "claim-p1420": [
      "dyadic-3sg"
    ],
    "claim-p1421": [
      "dyadic-3pl-n"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1415": "authorized",
    "claim-p1416": "authorized",
    "claim-p1417": "authorized",
    "claim-p1418": "authorized",
    "claim-p1419": "authorized",
    "claim-p1420": "authorized",
    "claim-p1421": "authorized"
  }
};
export default Object.freeze(spec);
