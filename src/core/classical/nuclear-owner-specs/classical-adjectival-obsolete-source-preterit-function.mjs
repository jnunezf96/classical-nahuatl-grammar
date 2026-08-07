const spec = {
  "ownerId": "classical-adjectival-obsolete-source-preterit-function",
  "prefix": "ClassicalAdjectivalObsoleteSourcePreteritFunction",
  "operationId": "classical.adjectival.obsolete.source.preterit.function.execute",
  "inputContract": "complete-typed-classical-adjectival-obsolete-source-preterit-function-source",
  "domain": "classical-adjectival-obsolete-source-preterit-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3915",
    "claim-p3916",
    "claim-p3917"
  ],
  "coordinates": {
    "claim-p3915::p3915-occasionally-the-source-vnc-is-no-longer-used": {
      "assertionId": "classical-adjectival-obsolete-source-preterit-function:p3915-occasionally-the-source-vnc-is-no-longer-used",
      "canonicalPath": "sources.deverbal.authorizationStatus"
    },
    "claim-p3916::p3916-the-preterit-predicate-formed-on-the-verbstem-iyo-a": {
      "assertionId": "classical-adjectival-obsolete-source-preterit-function:p3916-the-preterit-predicate-formed-on-the-verbstem-iyo-a",
      "canonicalPath": "sources.deverbal.typedFrameAuthority"
    },
    "claim-p3917::p3917-the-verb-iyo-a-also-occurs-in-an-adverbial": {
      "assertionId": "classical-adjectival-obsolete-source-preterit-function:p3917-the-verb-iyo-a-also-occurs-in-an-adverbial",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3915": [],
    "claim-p3916": [],
    "claim-p3917": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3915": "authorized",
    "claim-p3916": "authorized",
    "claim-p3917": "authorized"
  }
};
export default Object.freeze(spec);
