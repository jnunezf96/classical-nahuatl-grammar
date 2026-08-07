const spec = {
  "ownerId": "classical-adjectival-shared-referent-rank-reversal",
  "prefix": "ClassicalAdjectivalSharedReferentRankReversal",
  "operationId": "classical.adjectival.shared.referent.rank.reversal.execute",
  "inputContract": "complete-typed-classical-adjectival-shared-referent-rank-reversal-source",
  "domain": "classical-adjectival-shared-referent-rank-reversal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4016",
    "claim-p4017",
    "claim-p4018"
  ],
  "coordinates": {
    "claim-p4016::p4016-this-kind-of-device-is-not-needed-since-in": {
      "assertionId": "classical-adjectival-shared-referent-rank-reversal:p4016-this-kind-of-device-is-not-needed-since-in",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p4017::p4017-that-is-the-principal-clause-of-the-source-becomes": {
      "assertionId": "classical-adjectival-shared-referent-rank-reversal:p4017-that-is-the-principal-clause-of-the-source-becomes",
      "canonicalPath": "cases.ordinary.operationKind"
    },
    "claim-p4018::p4018-head-core-in-an-nnc-functioning-as-the-principal": {
      "assertionId": "classical-adjectival-shared-referent-rank-reversal:p4018-head-core-in-an-nnc-functioning-as-the-principal",
      "canonicalPath": "cases.ordinary.headRank"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4016": [],
    "claim-p4017": [],
    "claim-p4018": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4016": "authorized",
    "claim-p4017": "authorized",
    "claim-p4018": "authorized"
  }
};
export default Object.freeze(spec);
