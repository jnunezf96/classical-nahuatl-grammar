const spec = {
  "ownerId": "classical-place-gentilic-place-translation-uncertainty",
  "prefix": "ClassicalPlaceGentilicPlaceTranslationUncertainty",
  "operationId": "classical.place.gentilic.place.translation.uncertainty.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-translation-uncertainty-source",
  "domain": "classical-place-gentilic-place-translation-uncertainty",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4558",
    "claim-p4559",
    "claim-p4560",
    "claim-p4561",
    "claim-p4562",
    "claim-p4563"
  ],
  "coordinates": {
    "claim-p4558::p4558-the-problem-is-often-due-to-inadequate-spelling-practices": {
      "assertionId": "classical-place-gentilic-place-translation-uncertainty:p4558-the-problem-is-often-due-to-inadequate-spelling-practices",
      "canonicalPath": "analyses.translationUncertainty.translationAuthorizesMorphology"
    },
    "claim-p4559::p4559-or-the-problem-may-be-due-to-sound-changes": {
      "assertionId": "classical-place-gentilic-place-translation-uncertainty:p4559-or-the-problem-may-be-due-to-sound-changes",
      "canonicalPath": "analyses.translationUncertainty.spellingGuessAuthorizesMorphology"
    },
    "claim-p4560::p4560-moreover-even-when-place-name-glyphs-exist-one-cannot": {
      "assertionId": "classical-place-gentilic-place-translation-uncertainty:p4560-moreover-even-when-place-name-glyphs-exist-one-cannot",
      "canonicalPath": "analyses.translationUncertainty.canonicalPlaceFrame"
    },
    "claim-p4561::p4561-when-place-name-glyphs-exist": {
      "assertionId": "classical-place-gentilic-place-translation-uncertainty:p4561-when-place-name-glyphs-exist",
      "canonicalPath": "analyses.translationUncertainty.translationAuthorizesMorphology"
    },
    "claim-p4562::p4562-furthermore-the-circumstances-and-rationale-behind-a-naming-are": {
      "assertionId": "classical-place-gentilic-place-translation-uncertainty:p4562-furthermore-the-circumstances-and-rationale-behind-a-naming-are",
      "canonicalPath": "analyses.translationUncertainty.spellingGuessAuthorizesMorphology"
    },
    "claim-p4563::p4563-in-the-examples-the-translation-ignores-the-nnc-structure": {
      "assertionId": "classical-place-gentilic-place-translation-uncertainty:p4563-in-the-examples-the-translation-ignores-the-nnc-structure",
      "canonicalPath": "analyses.translationUncertainty.canonicalPlaceFrame"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4558": [],
    "claim-p4559": [],
    "claim-p4560": [],
    "claim-p4561": [],
    "claim-p4562": [],
    "claim-p4563": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4558": "authorized",
    "claim-p4559": "authorized",
    "claim-p4560": "authorized",
    "claim-p4561": "authorized",
    "claim-p4562": "authorized",
    "claim-p4563": "authorized"
  }
};
export default Object.freeze(spec);
