const spec = {
  "ownerId": "classical-o-intransitive-exception-formation",
  "prefix": "ClassicalOIntransitiveExceptionFormation",
  "operationId": "classical.o.intransitive.exception.formation.execute",
  "inputContract": "complete-typed-classical-o-intransitive-exception-formation-source",
  "domain": "classical-o-intransitive-exception-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2041",
    "claim-p2042",
    "claim-p2043",
    "claim-p2044",
    "claim-p2045"
  ],
  "coordinates": {
    "claim-p2041::p2041-while-the-source-verb-taking-the-o-nonactive-suffix": {
      "assertionId": "classical-o-intransitive-exception-formation:p2041-while-the-source-verb-taking-the-o-nonactive-suffix",
      "canonicalPath": "nonactive.intransitiveTi.authorizationStatus"
    },
    "claim-p2042::p2042-among-them-are-the-following": {
      "assertionId": "classical-o-intransitive-exception-formation:p2042-among-them-are-the-following",
      "canonicalPath": "nonactive.intransitiveTi.selectorRequired"
    },
    "claim-p2043::p2043-cui-ca-to-sing": {
      "assertionId": "classical-o-intransitive-exception-formation:p2043-cui-ca-to-sing",
      "canonicalPath": "nonactive.intransitiveTi.options.0.nonactiveStem"
    },
    "claim-p2044::p2044-tia-miqui-to-do-business": {
      "assertionId": "classical-o-intransitive-exception-formation:p2044-tia-miqui-to-do-business",
      "canonicalPath": "nonactive.intransitiveTi.options.1.nonactiveStem"
    },
    "claim-p2045::p2045-ilo-ti-to-return": {
      "assertionId": "classical-o-intransitive-exception-formation:p2045-ilo-ti-to-return",
      "canonicalPath": "nonactive.intransitiveTi.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2041": [],
    "claim-p2042": [],
    "claim-p2043": [],
    "claim-p2044": [],
    "claim-p2045": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2041": "authorized",
    "claim-p2042": "authorized",
    "claim-p2043": "authorized",
    "claim-p2044": "authorized",
    "claim-p2045": "authorized"
  }
};
export default Object.freeze(spec);
