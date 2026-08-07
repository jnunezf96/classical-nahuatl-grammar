const spec = {
  "ownerId": "classical-adjectival-nominalized-vnc-adjectival-reanalysis",
  "prefix": "ClassicalAdjectivalNominalizedVncAdjectivalReanalysis",
  "operationId": "classical.adjectival.nominalized.vnc.adjectival.reanalysis.execute",
  "inputContract": "complete-typed-classical-adjectival-nominalized-vnc-adjectival-reanalysis-source",
  "domain": "classical-adjectival-nominalized-vnc-adjectival-reanalysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3895",
    "claim-p3896",
    "claim-p3897"
  ],
  "coordinates": {
    "claim-p3895::p3895-nominalized-vncs-are-another-group-of-nncs-whose-predicates": {
      "assertionId": "classical-adjectival-nominalized-vnc-adjectival-reanalysis:p3895-nominalized-vncs-are-another-group-of-nncs-whose-predicates",
      "canonicalPath": "sources.deverbal.authorizationStatus"
    },
    "claim-p3896::p3896-since-as-was-stated-in-40-3-vncs-can": {
      "assertionId": "classical-adjectival-nominalized-vnc-adjectival-reanalysis:p3896-since-as-was-stated-in-40-3-vncs-can",
      "canonicalPath": "sources.deverbal.typedFrameAuthority"
    },
    "claim-p3897::p3897-the-analysis-is-justified-however-by-the-fact-that": {
      "assertionId": "classical-adjectival-nominalized-vnc-adjectival-reanalysis:p3897-the-analysis-is-justified-however-by-the-fact-that",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3895": [],
    "claim-p3896": [],
    "claim-p3897": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3895": "authorized",
    "claim-p3896": "authorized",
    "claim-p3897": "authorized"
  }
};
export default Object.freeze(spec);
