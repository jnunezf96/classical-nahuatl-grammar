const config = {
  "ownerId": "classical-predicate-nominalization-preterit-agentive",
  "operationId": "classical.predicate.nominalization.preterit.agentive.execute",
  "inputContract": "complete-typed-classical-predicate-nominalization-preterit-agentive-source",
  "atomIds": [
    "ACI-P334-L010-E1662A9EBD",
    "ACI-P334-L012-E882A1A0A4",
    "ACI-P334-L016-5FA32D84DF",
    "ACI-P334-L017-1A13076110",
    "ACI-P334-L017-F7B2BB0008",
    "ACI-P334-L018-DBD81A202F",
    "ACI-P334-L019-564C5B2516",
    "ACI-P334-L019-FCBA253D41"
  ],
  "scenariosByAtom": {
    "ACI-P334-L010-E1662A9EBD": [
      "claim-3361"
    ],
    "ACI-P334-L012-E882A1A0A4": [
      "claim-3362"
    ],
    "ACI-P334-L016-5FA32D84DF": [
      "claim-3363"
    ],
    "ACI-P334-L017-1A13076110": [
      "claim-3364"
    ],
    "ACI-P334-L017-F7B2BB0008": [
      "claim-3365"
    ],
    "ACI-P334-L018-DBD81A202F": [
      "claim-3366"
    ],
    "ACI-P334-L019-564C5B2516": [
      "claim-3367"
    ],
    "ACI-P334-L019-FCBA253D41": [
      "claim-3368"
    ]
  },
  "expectedByScenario": {
    "claim-3361": {
      "selection": "claim-p3361",
      "facet": "p3361-the-stem-of-any-kind-of-agentive-nnc-names",
      "participantChoice": "claim-p3361:p3361-the-stem-of-any-kind-of-agentive-nnc-names",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3361-the-stem-of-any-kind-of-agentive-nnc-names",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.agentSemanticRole",
      "oracleExpectation": "agent-of-action"
    },
    "claim-3362": {
      "selection": "claim-p3362",
      "facet": "p3362-the-most-common-kind-of-agentive-nnc-is-the",
      "participantChoice": "claim-p3362:p3362-the-most-common-kind-of-agentive-nnc-is-the",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3362-the-most-common-kind-of-agentive-nnc-is-the",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.agentiveTaxonomyStatus",
      "oracleExpectation": "most-common-agentive-nnc"
    },
    "claim-3363": {
      "selection": "claim-p3363",
      "facet": "p3363-like-all-nounstems-a-preterit-agentive-nounstem-has-two",
      "participantChoice": "claim-p3363:p3363-like-all-nounstems-a-preterit-agentive-nounstem-has-two",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3363-like-all-nounstems-a-preterit-agentive-nounstem-has-two",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.stemShapeInventory",
      "oracleExpectation": [
        "restricted-use",
        "general-use"
      ]
    },
    "claim-3364": {
      "selection": "claim-p3364",
      "facet": "p3364-the-general-use-stem-is-a-compound-that-uses",
      "participantChoice": "claim-p3364:p3364-the-general-use-stem-is-a-compound-that-uses",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3364-the-general-use-stem-is-a-compound-that-uses",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.generalUseCompound",
      "oracleExpectation": {
        "constructionKind": "compound",
        "embedRole": "restricted-use",
        "embedStem": "pix-ca-0",
        "matrixStem": "cā",
        "outputStem": "pix-ca-0-cā",
        "relation": "restricted-use-embed-plus-ca-matrix",
        "satisfied": true
      }
    },
    "claim-3365": {
      "selection": "claim-p3365",
      "facet": "p3365-the-restricted-use-stem-is-simply-the-predicate-of",
      "participantChoice": "claim-p3365:p3365-the-restricted-use-stem-is-simply-the-predicate-of",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3365-the-restricted-use-stem-is-simply-the-predicate-of",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.restrictedUseSourceRelation",
      "oracleExpectation": {
        "sourceUnit": "vnc-core",
        "sourceStage": "preterit-predicate",
        "sourcePredicateStem": "pix-ca",
        "sourceImperfectiveStem": "",
        "sourcePerfectiveStem": "pix-ca",
        "perfectiveChangeRule": "",
        "ownerFrameKind": "",
        "ownerIssuedStageMember": true,
        "outputNounstem": "pix-ca-0",
        "finalConstituent": "0",
        "relation": "preterit-predicate-reanalyzed-as-nounstem",
        "satisfied": true
      }
    },
    "claim-3366": {
      "selection": "claim-p3366",
      "facet": "p3366-the-restricted-use-stem-is-used-in-absolutive-state",
      "participantChoice": "claim-p3366:p3366-the-restricted-use-stem-is-used-in-absolutive-state",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3366-the-restricted-use-stem-is-used-in-absolutive-state",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.stateStemDistribution.absolutive",
      "oracleExpectation": {
        "state": "absolutive",
        "stemRole": "restricted-use",
        "stem": "pix-ca-0",
        "licensed": true
      }
    },
    "claim-3367": {
      "selection": "claim-p3367",
      "facet": "p3367-the-restricted-use-stem-is-discussed-first",
      "participantChoice": "claim-p3367:p3367-the-restricted-use-stem-is-discussed-first",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3367-the-restricted-use-stem-is-discussed-first",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.derivationOrder",
      "oracleExpectation": {
        "orderedRoles": [
          "restricted-use",
          "general-use"
        ],
        "dependency": "general-use-embeds-restricted-use",
        "satisfied": true
      }
    },
    "claim-3368": {
      "selection": "claim-p3368",
      "facet": "p3368-the-general-use-stem-is-used-everywhere-else",
      "participantChoice": "claim-p3368:p3368-the-general-use-stem-is-used-everywhere-else",
      "assertionId": "classical-predicate-nominalization-preterit-agentive:p3368-the-general-use-stem-is-used-everywhere-else",
      "canonicalStatus": "authorized",
      "canonicalPath": "cases.preteritAgentive.proofObservations.stateStemDistribution.nonAbsolutive",
      "oracleExpectation": {
        "stateClass": "non-absolutive",
        "licensedStates": [
          "possessive"
        ],
        "stemRole": "general-use",
        "stem": "pix-ca-0-cā",
        "licensed": true
      }
    }
  },
  "declarationPath": "validation/declarations/lessons35-36/classical-predicate-nominalization-preterit-agentive.json",
  "declarationSchemaVersion": 2
};
export default Object.freeze(config);
