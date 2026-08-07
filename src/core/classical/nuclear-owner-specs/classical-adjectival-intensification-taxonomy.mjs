const spec = {
  "ownerId": "classical-adjectival-intensification-taxonomy",
  "prefix": "ClassicalAdjectivalIntensificationTaxonomy",
  "operationId": "classical.adjectival.intensification.taxonomy.execute",
  "inputContract": "complete-typed-classical-adjectival-intensification-taxonomy-source",
  "domain": "classical-adjectival-intensification-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3959",
    "claim-p3960"
  ],
  "coordinates": {
    "claim-p3959::p3959-some-adjectival-nncs-are-built-on-intensified-stems": {
      "assertionId": "classical-adjectival-intensification-taxonomy:p3959-some-adjectival-nncs-are-built-on-intensified-stems",
      "canonicalPath": "sources.affectiveNnc.authorizationStatus"
    },
    "claim-p3960::p3960-these-may-be-created-in-several-different-ways": {
      "assertionId": "classical-adjectival-intensification-taxonomy:p3960-these-may-be-created-in-several-different-ways",
      "canonicalPath": "sources.affectiveNnc.typedFrameAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3959": [],
    "claim-p3960": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3959": "authorized",
    "claim-p3960": "authorized"
  }
};
export default Object.freeze(spec);
