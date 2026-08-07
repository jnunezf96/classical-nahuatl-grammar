const spec = {
  "ownerId": "classical-adjectival-pahti-compound-intensification",
  "prefix": "ClassicalAdjectivalPahtiCompoundIntensification",
  "operationId": "classical.adjectival.pahti.compound.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-pahti-compound-intensification-source",
  "domain": "classical-adjectival-pahti-compound-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3964",
    "claim-p3965",
    "claim-p3966"
  ],
  "coordinates": {
    "claim-p3964::p3964-an-intensified-adjectival-stem-may-be-created-by-means": {
      "assertionId": "classical-adjectival-pahti-compound-intensification:p3964-an-intensified-adjectival-stem-may-be-created-by-means",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    },
    "claim-p3965::p3965-the-nounstem-in-the-embed-subposition-carries-the-implication": {
      "assertionId": "classical-adjectival-pahti-compound-intensification:p3965-the-nounstem-in-the-embed-subposition-carries-the-implication",
      "canonicalPath": "sources.compoundNnc.cases.base.canonicalResult"
    },
    "claim-p3966::p3966-the-embed-may-be-a-nounstem-from-which-an": {
      "assertionId": "classical-adjectival-pahti-compound-intensification:p3966-the-embed-may-be-a-nounstem-from-which-an",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3964": [],
    "claim-p3965": [],
    "claim-p3966": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3964": "authorized",
    "claim-p3965": "authorized",
    "claim-p3966": "authorized"
  }
};
export default Object.freeze(spec);
