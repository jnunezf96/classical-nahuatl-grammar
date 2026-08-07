const spec = {
  "ownerId": "classical-verbstem-final-vowel-category-system",
  "prefix": "ClassicalVerbstemFinalVowelCategorySystem",
  "operationId": "classical.verbstem.final.vowel.category.system.execute",
  "inputContract": "complete-typed-classical-verbstem-final-vowel-category-system-source",
  "domain": "classical-verbstem-final-vowel-category-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2255",
    "claim-p2256",
    "claim-p2257",
    "claim-p2258"
  ],
  "coordinates": {
    "claim-p2255::p2255-a-nahuatl-verbstem-may-end-in-i-a-or": {
      "assertionId": "classical-verbstem-final-vowel-category-system:p2255-a-nahuatl-verbstem-may-end-in-i-a-or",
      "canonicalPath": "sources.nemi.finalVowel"
    },
    "claim-p2256::p2256-a-few-all-of-which-are-variants-of-those": {
      "assertionId": "classical-verbstem-final-vowel-category-system:p2256-a-few-all-of-which-are-variants-of-those",
      "canonicalPath": "sources.choca.finalVowel"
    },
    "claim-p2257::p2257-there-are-a-few-intransitive-stems-that-end-in": {
      "assertionId": "classical-verbstem-final-vowel-category-system:p2257-there-are-a-few-intransitive-stems-that-end-in",
      "canonicalPath": "sources.pano.finalVowel"
    },
    "claim-p2258::p2258-the-relation-between-the-final-vowel-and-the-stem": {
      "assertionId": "classical-verbstem-final-vowel-category-system:p2258-the-relation-between-the-final-vowel-and-the-stem",
      "canonicalPath": "contract.axes.0.axisId"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2255": [],
    "claim-p2256": [],
    "claim-p2257": [],
    "claim-p2258": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2255": "authorized",
    "claim-p2256": "authorized",
    "claim-p2257": "authorized",
    "claim-p2258": "authorized"
  }
};
export default Object.freeze(spec);
