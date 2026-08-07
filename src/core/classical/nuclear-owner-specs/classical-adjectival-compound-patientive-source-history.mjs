const spec = {
  "ownerId": "classical-adjectival-compound-patientive-source-history",
  "prefix": "ClassicalAdjectivalCompoundPatientiveSourceHistory",
  "operationId": "classical.adjectival.compound.patientive.source.history.execute",
  "inputContract": "complete-typed-classical-adjectival-compound-patientive-source-history-source",
  "domain": "classical-adjectival-compound-patientive-source-history",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4002",
    "claim-p4003",
    "claim-p4004",
    "claim-p4005"
  ],
  "coordinates": {
    "claim-p4002::p4002-when-the-adjectival-nnc-has-a-patientive-structure-it": {
      "assertionId": "classical-adjectival-compound-patientive-source-history:p4002-when-the-adjectival-nnc-has-a-patientive-structure-it",
      "canonicalPath": "sources.patientive.authorizationStatus"
    },
    "claim-p4003::p4003-when-the-adjectival-nnc-has-a-patientive-structure": {
      "assertionId": "classical-adjectival-compound-patientive-source-history:p4003-when-the-adjectival-nnc-has-a-patientive-structure",
      "canonicalPath": "sources.patientive.typedFrameAuthority"
    },
    "claim-p4004::p4004-a-morphological-analysis-of-the-two-is-unable-to": {
      "assertionId": "classical-adjectival-compound-patientive-source-history:p4004-a-morphological-analysis-of-the-two-is-unable-to",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    },
    "claim-p4005::p4005-the-adjectival-use-of-the-compound-stemmed-patientive-nncs": {
      "assertionId": "classical-adjectival-compound-patientive-source-history:p4005-the-adjectival-use-of-the-compound-stemmed-patientive-nncs",
      "canonicalPath": "sources.patientive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4002": [],
    "claim-p4003": [],
    "claim-p4004": [],
    "claim-p4005": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4002": "authorized",
    "claim-p4003": "authorized",
    "claim-p4004": "authorized",
    "claim-p4005": "authorized"
  }
};
export default Object.freeze(spec);
