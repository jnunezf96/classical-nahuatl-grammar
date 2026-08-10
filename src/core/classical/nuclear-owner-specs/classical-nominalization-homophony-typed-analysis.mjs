const spec = {
  "ownerId": "classical-nominalization-homophony-typed-analysis",
  "prefix": "ClassicalNominalizationHomophonyTypedAnalysis",
  "operationId": "classical.nominalization.homophony.typed.analysis.execute",
  "inputContract": "complete-typed-classical-nominalization-homophony-typed-analysis-source",
  "domain": "classical-nominalization-homophony-typed-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3612",
    "claim-p3613",
    "claim-p3614",
    "claim-p3615",
    "claim-p3616",
    "claim-p3617",
    "claim-p3618",
    "claim-p3619",
    "claim-p3620",
    "claim-p3621"
  ],
  "coordinates": {
    "claim-p3612::p3612-the-stem-of-the-possessive-state-active-action-nncs": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3612-the-stem-of-the-possessive-state-active-action-nncs",
      "canonicalPath": "cases.homophonyTypedAnalysis.authorizationStatus"
    },
    "claim-p3613::p3613-they-are-different-in-structure-and-meaning": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3613-they-are-different-in-structure-and-meaning",
      "canonicalPath": "cases.homophonyTypedAnalysis.first.canonicalResult"
    },
    "claim-p3614::p3614-the-possible-phonological-identity-of-the-two-stems-in": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3614-the-possible-phonological-identity-of-the-two-stems-in",
      "canonicalPath": "cases.homophonyTypedAnalysis.second.canonicalResult"
    },
    "claim-p3615::p3615-study-the-following-contrastive-pair-built-on-the-verbstem": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3615-study-the-following-contrastive-pair-built-on-the-verbstem",
      "canonicalPath": "cases.homophonyTypedAnalysis.distinctOperationIds"
    },
    "claim-p3616::p3616-in-the-preterit-agentive-nnc-the-stem-contains-the": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3616-in-the-preterit-agentive-nnc-the-stem-contains-the",
      "canonicalPath": "contract.homophonyCannotCollapseOperationIdentity"
    },
    "claim-p3617::p3617-in-the-active-action-nnc-the-stem-contains-the": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3617-in-the-active-action-nnc-the-stem-contains-the",
      "canonicalPath": "cases.homophonyTypedAnalysis.authorizationStatus"
    },
    "claim-p3618::p3618-the-stem-of-the-active-action-nnc-belongs-to": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3618-the-stem-of-the-active-action-nnc-belongs-to",
      "canonicalPath": "cases.homophonyTypedAnalysis.first.canonicalResult"
    },
    "claim-p3619::p3619-the-stem-of-the-active-action-nnc-signifies-an": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3619-the-stem-of-the-active-action-nnc-signifies-an",
      "canonicalPath": "cases.homophonyTypedAnalysis.second.canonicalResult"
    },
    "claim-p3621::p3621-the-stem-of-the-preterit-patientive-nnc-signifies-a": {
      "assertionId": "classical-nominalization-homophony-typed-analysis:p3621-the-stem-of-the-preterit-patientive-nnc-signifies-a",
      "canonicalPath": "contract.homophonyCannotCollapseOperationIdentity"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3612": [],
    "claim-p3613": [],
    "claim-p3614": [],
    "claim-p3615": [],
    "claim-p3616": [],
    "claim-p3617": [],
    "claim-p3618": [],
    "claim-p3619": [],
    "claim-p3620": [],
    "claim-p3621": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3612": "authorized",
    "claim-p3613": "authorized",
    "claim-p3614": "authorized",
    "claim-p3615": "authorized",
    "claim-p3616": "authorized",
    "claim-p3617": "authorized",
    "claim-p3618": "authorized",
    "claim-p3619": "authorized",
    "claim-p3620": "authorized",
    "claim-p3621": "authorized"
  }
};
export default Object.freeze(spec);
