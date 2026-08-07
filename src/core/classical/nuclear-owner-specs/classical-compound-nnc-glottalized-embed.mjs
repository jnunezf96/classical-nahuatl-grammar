const spec = {
  "ownerId": "classical-compound-nnc-glottalized-embed",
  "prefix": "ClassicalCompoundNncGlottalizedEmbed",
  "operationId": "classical.compound.nnc.glottalized.embed.execute",
  "inputContract": "complete-typed-classical-compound-nnc-glottalized-embed-source",
  "domain": "classical-compound-nnc-glottalized-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3100"
  ],
  "coordinates": {
    "claim-p3100::p3100-nounstems-of-the-ti-class-of-either-subclass-that": {
      "assertionId": "classical-compound-nnc-glottalized-embed:p3100-nounstems-of-the-ti-class-of-either-subclass-that",
      "canonicalPath": "cases.glottalizedEmbed.rules.compound-nnc/glottalized-embed"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3100": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3100": "authorized"
  }
};
export default Object.freeze(spec);
