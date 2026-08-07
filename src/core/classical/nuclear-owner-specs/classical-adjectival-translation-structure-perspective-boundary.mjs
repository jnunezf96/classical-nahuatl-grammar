const spec = {
  "ownerId": "classical-adjectival-translation-structure-perspective-boundary",
  "prefix": "ClassicalAdjectivalTranslationStructurePerspectiveBoundary",
  "operationId": "classical.adjectival.translation.structure.perspective.boundary.execute",
  "inputContract": "complete-typed-classical-adjectival-translation-structure-perspective-boundary-source",
  "domain": "classical-adjectival-translation-structure-perspective-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3998",
    "claim-p3999",
    "claim-p4000"
  ],
  "coordinates": {
    "claim-p3998::p3998-concerning-the-mistaken-belief-that-a-translation-reflects-the": {
      "assertionId": "classical-adjectival-translation-structure-perspective-boundary:p3998-concerning-the-mistaken-belief-that-a-translation-reflects-the",
      "canonicalPath": "contract.translationAuthority"
    },
    "claim-p3999::p3999-one-should-train-oneself-to-accept-such-perspectival-differences": {
      "assertionId": "classical-adjectival-translation-structure-perspective-boundary:p3999-one-should-train-oneself-to-accept-such-perspectival-differences",
      "canonicalPath": "contract.storedExampleAuthority"
    },
    "claim-p4000::p4000-only-a-few-nncs-manifest-the-formation": {
      "assertionId": "classical-adjectival-translation-structure-perspective-boundary:p4000-only-a-few-nncs-manifest-the-formation",
      "canonicalPath": "cases.ordinary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3998": [],
    "claim-p3999": [],
    "claim-p4000": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3998": "authorized",
    "claim-p3999": "authorized",
    "claim-p4000": "authorized"
  }
};
export default Object.freeze(spec);
