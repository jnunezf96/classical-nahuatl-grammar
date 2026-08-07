const spec = {
  "ownerId": "classical-adjectival-glottal-reduplication-intensification",
  "prefix": "ClassicalAdjectivalGlottalReduplicationIntensification",
  "operationId": "classical.adjectival.glottal.reduplication.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-glottal-reduplication-intensification-source",
  "domain": "classical-adjectival-glottal-reduplication-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3962",
    "claim-p3963"
  ],
  "coordinates": {
    "claim-p3962::p3962-although-reduplication-with-vowel-length-is-different-in-adjectival": {
      "assertionId": "classical-adjectival-glottal-reduplication-intensification:p3962-although-reduplication-with-vowel-length-is-different-in-adjectival",
      "canonicalPath": "sources.affectiveNnc.authorizationStatus"
    },
    "claim-p3963::p3963-this-formation-is-possible-any-time-the-nnc-s": {
      "assertionId": "classical-adjectival-glottal-reduplication-intensification:p3963-this-formation-is-possible-any-time-the-nnc-s",
      "canonicalPath": "sources.affectiveNnc.typedFrameAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3962": [],
    "claim-p3963": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3962": "authorized",
    "claim-p3963": "authorized"
  }
};
export default Object.freeze(spec);
