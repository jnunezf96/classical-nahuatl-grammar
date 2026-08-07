const spec = {
  "ownerId": "classical-pronominal-compound-plural-variants",
  "prefix": "ClassicalPronominalCompoundPluralVariants",
  "operationId": "classical.pronominal.compound.plural.variants.execute",
  "inputContract": "complete-typed-classical-pronominal-compound-plural-variants-source",
  "domain": "classical-pronominal-compound-plural-variants",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1921",
    "claim-p1922"
  ],
  "coordinates": {
    "claim-p1921::p1921-note-in-addition-to-the-plural-forms-for-tleh": {
      "assertionId": "classical-pronominal-compound-plural-variants:p1921-note-in-addition-to-the-plural-forms-for-tleh",
      "canonicalPath": "compoundVncs.1.normalizedRequest.sourceStem"
    },
    "claim-p1922::p1922-the-perfective-stem-i-h-also-incorporates-the-stem": {
      "assertionId": "classical-pronominal-compound-plural-variants:p1922-the-perfective-stem-i-h-also-incorporates-the-stem",
      "canonicalPath": "compoundVncs.2.normalizedRequest.sourceStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1921": [],
    "claim-p1922": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1921": "authorized",
    "claim-p1922": "authorized"
  }
};
export default Object.freeze(spec);
