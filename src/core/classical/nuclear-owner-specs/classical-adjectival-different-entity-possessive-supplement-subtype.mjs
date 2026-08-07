const spec = {
  "ownerId": "classical-adjectival-different-entity-possessive-supplement-subtype",
  "prefix": "ClassicalAdjectivalDifferentEntityPossessiveSupplementSubtype",
  "operationId": "classical.adjectival.different.entity.possessive.supplement.subtype.execute",
  "inputContract": "complete-typed-classical-adjectival-different-entity-possessive-supplement-subtype-source",
  "domain": "classical-adjectival-different-entity-possessive-supplement-subtype",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3989",
    "claim-p3990",
    "claim-p3991",
    "claim-p3992"
  ],
  "coordinates": {
    "claim-p3989::p3989-in-one-subtype-the-embed-signifies-a-kind-of": {
      "assertionId": "classical-adjectival-different-entity-possessive-supplement-subtype:p3989-in-one-subtype-the-embed-signifies-a-kind-of",
      "canonicalPath": "sources.nominalEmbed.authorizationStatus"
    },
    "claim-p3990::p3990-the-english-translational-formula-or-the-compound-nounstem-is": {
      "assertionId": "classical-adjectival-different-entity-possessive-supplement-subtype:p3990-the-english-translational-formula-or-the-compound-nounstem-is",
      "canonicalPath": "sources.nominalEmbed.typedFrameAuthority"
    },
    "claim-p3991::p3991-the-nnc-s-subject-pronoun-may-be-animate-or": {
      "assertionId": "classical-adjectival-different-entity-possessive-supplement-subtype:p3991-the-nnc-s-subject-pronoun-may-be-animate-or",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    },
    "claim-p3992::p3992-the-matrix-stem-may-have-a-reduplicative-prefix-to": {
      "assertionId": "classical-adjectival-different-entity-possessive-supplement-subtype:p3992-the-matrix-stem-may-have-a-reduplicative-prefix-to",
      "canonicalPath": "sources.nominalEmbed.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3989": [],
    "claim-p3990": [],
    "claim-p3991": [],
    "claim-p3992": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3989": "authorized",
    "claim-p3990": "authorized",
    "claim-p3991": "authorized",
    "claim-p3992": "authorized"
  }
};
export default Object.freeze(spec);
