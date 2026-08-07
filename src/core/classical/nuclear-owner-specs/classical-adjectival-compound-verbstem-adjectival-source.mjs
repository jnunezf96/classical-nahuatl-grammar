const spec = {
  "ownerId": "classical-adjectival-compound-verbstem-adjectival-source",
  "prefix": "ClassicalAdjectivalCompoundVerbstemAdjectivalSource",
  "operationId": "classical.adjectival.compound.verbstem.adjectival.source.execute",
  "inputContract": "complete-typed-classical-adjectival-compound-verbstem-adjectival-source-source",
  "domain": "classical-adjectival-compound-verbstem-adjectival-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3982",
    "claim-p3983",
    "claim-p3984",
    "claim-p3985"
  ],
  "coordinates": {
    "claim-p3982::p3982-the-matrix-verbstem-in-the-various-types-of-compound": {
      "assertionId": "classical-adjectival-compound-verbstem-adjectival-source:p3982-the-matrix-verbstem-in-the-various-types-of-compound",
      "canonicalPath": "sources.nominalEmbed.authorizationStatus"
    },
    "claim-p3983::p3983-the-nnc-built-on-the-resultant-compound-nounstem-can": {
      "assertionId": "classical-adjectival-compound-verbstem-adjectival-source:p3983-the-nnc-built-on-the-resultant-compound-nounstem-can",
      "canonicalPath": "sources.nominalEmbed.typedFrameAuthority"
    },
    "claim-p3984::p3984-this-kind-of-compound-verbstem-is-the-most-frequent": {
      "assertionId": "classical-adjectival-compound-verbstem-adjectival-source:p3984-this-kind-of-compound-verbstem-is-the-most-frequent",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    },
    "claim-p3985::p3985-there-are-two-possible-constructions": {
      "assertionId": "classical-adjectival-compound-verbstem-adjectival-source:p3985-there-are-two-possible-constructions",
      "canonicalPath": "sources.nominalEmbed.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3982": [],
    "claim-p3983": [],
    "claim-p3984": [],
    "claim-p3985": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3982": "authorized",
    "claim-p3983": "authorized",
    "claim-p3984": "authorized",
    "claim-p3985": "authorized"
  }
};
export default Object.freeze(spec);
