const spec = {
  "ownerId": "classical-hualo-variant-licensing",
  "prefix": "ClassicalHualoVariantLicensing",
  "operationId": "classical.hualo.variant.licensing.execute",
  "inputContract": "complete-typed-classical-hualo-variant-licensing-source",
  "domain": "classical-hualo-variant-licensing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2092",
    "claim-p2093",
    "claim-p2094",
    "claim-p2095"
  ],
  "coordinates": {
    "claim-p2092::p2092-the-suffixal-combination-hua-lo-is-not-as-frequent": {
      "assertionId": "classical-hualo-variant-licensing:p2092-the-suffixal-combination-hua-lo-is-not-as-frequent",
      "canonicalPath": "nonactive.hualo.selectorRequired"
    },
    "claim-p2093::p2093-the-stems-formed-with-it-are-free-variants-of": {
      "assertionId": "classical-hualo-variant-licensing:p2093-the-stems-formed-with-it-are-free-variants-of",
      "canonicalPath": "nonactive.records.hualo.suffixFamily"
    },
    "claim-p2094::p2094-tla-mamali-to-drills-th": {
      "assertionId": "classical-hualo-variant-licensing:p2094-tla-mamali-to-drills-th",
      "canonicalPath": "nonactive.records.hualo.formationSequence"
    },
    "claim-p2095::p2095-tla-cui-to-takes-th": {
      "assertionId": "classical-hualo-variant-licensing:p2095-tla-cui-to-takes-th",
      "canonicalPath": "nonactive.hualo.selectorRequired"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2092": [],
    "claim-p2093": [],
    "claim-p2094": [],
    "claim-p2095": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2092": "authorized",
    "claim-p2093": "authorized",
    "claim-p2094": "authorized",
    "claim-p2095": "authorized"
  }
};
export default Object.freeze(spec);
