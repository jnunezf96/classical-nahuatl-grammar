const spec = {
  "ownerId": "classical-adjectival-affective-matrix-intensification-source",
  "prefix": "ClassicalAdjectivalAffectiveMatrixIntensificationSource",
  "operationId": "classical.adjectival.affective.matrix.intensification.source.execute",
  "inputContract": "complete-typed-classical-adjectival-affective-matrix-intensification-source-source",
  "domain": "classical-adjectival-affective-matrix-intensification-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3974",
    "claim-p3975",
    "claim-p3976"
  ],
  "coordinates": {
    "claim-p3974::p3974-another-type-of-intensified-adjectival-nounstem-is-created-by": {
      "assertionId": "classical-adjectival-affective-matrix-intensification-source:p3974-another-type-of-intensified-adjectival-nounstem-is-created-by",
      "canonicalPath": "sources.affectiveNnc.authorizationStatus"
    },
    "claim-p3975::p3975-when-serving-as-an-embed": {
      "assertionId": "classical-adjectival-affective-matrix-intensification-source:p3975-when-serving-as-an-embed",
      "canonicalPath": "sources.affectiveNnc.typedFrameAuthority"
    },
    "claim-p3976::p3976-when-serving-as-an-embed-a-preterit-agentive-nounstem": {
      "assertionId": "classical-adjectival-affective-matrix-intensification-source:p3976-when-serving-as-an-embed-a-preterit-agentive-nounstem",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3974": [],
    "claim-p3975": [],
    "claim-p3976": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3974": "authorized",
    "claim-p3975": "authorized",
    "claim-p3976": "authorized"
  }
};
export default Object.freeze(spec);
