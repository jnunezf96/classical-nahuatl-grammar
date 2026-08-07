const spec = {
  "ownerId": "classical-adjectival-same-entity-possessive-supplement-subtype",
  "prefix": "ClassicalAdjectivalSameEntityPossessiveSupplementSubtype",
  "operationId": "classical.adjectival.same.entity.possessive.supplement.subtype.execute",
  "inputContract": "complete-typed-classical-adjectival-same-entity-possessive-supplement-subtype-source",
  "domain": "classical-adjectival-same-entity-possessive-supplement-subtype",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3993",
    "claim-p3994",
    "claim-p3995",
    "claim-p3996",
    "claim-p3997"
  ],
  "coordinates": {
    "claim-p3993::p3993-in-the-other-subtype-the-embed-signifies-the-same": {
      "assertionId": "classical-adjectival-same-entity-possessive-supplement-subtype:p3993-in-the-other-subtype-the-embed-signifies-the-same",
      "canonicalPath": "sources.nominalEmbed.authorizationStatus"
    },
    "claim-p3994::p3994-the-english-translational-formula-for-the-compound-stem-is": {
      "assertionId": "classical-adjectival-same-entity-possessive-supplement-subtype:p3994-the-english-translational-formula-for-the-compound-stem-is",
      "canonicalPath": "sources.nominalEmbed.typedFrameAuthority"
    },
    "claim-p3995::p3995-this-kind-of-compound-nounstem-is-similar-to-the": {
      "assertionId": "classical-adjectival-same-entity-possessive-supplement-subtype:p3995-this-kind-of-compound-nounstem-is-similar-to-the",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    },
    "claim-p3996::p3996-here-as-there-english-reverses-the-governed-and-governor": {
      "assertionId": "classical-adjectival-same-entity-possessive-supplement-subtype:p3996-here-as-there-english-reverses-the-governed-and-governor",
      "canonicalPath": "sources.nominalEmbed.authorizationStatus"
    },
    "claim-p3997::p3997-nncs-of-the-two-subtypes-can-be-ambiguous-both": {
      "assertionId": "classical-adjectival-same-entity-possessive-supplement-subtype:p3997-nncs-of-the-two-subtypes-can-be-ambiguous-both",
      "canonicalPath": "sources.nominalEmbed.typedFrameAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3993": [],
    "claim-p3994": [],
    "claim-p3995": [],
    "claim-p3996": [],
    "claim-p3997": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3993": "authorized",
    "claim-p3994": "authorized",
    "claim-p3995": "authorized",
    "claim-p3996": "authorized",
    "claim-p3997": "authorized"
  }
};
export default Object.freeze(spec);
