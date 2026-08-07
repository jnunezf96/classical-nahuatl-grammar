const spec = {
  "ownerId": "classical-personal-name-nnc-quoted-predicate-translation-boundary",
  "prefix": "ClassicalPersonalNameNncQuotedPredicateTranslationBoundary",
  "operationId": "classical.personal.name.nnc.quoted.predicate.translation.boundary.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-quoted-predicate-translation-boundary-source",
  "domain": "classical-personal-name-nnc-quoted-predicate-translation-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5166",
    "claim-p5167",
    "claim-p5168",
    "claim-p5169"
  ],
  "coordinates": {
    "claim-p5166::p5166-since-an-entire-downgraded-statement-serves-as-a-stem": {
      "assertionId": "classical-personal-name-nnc-quoted-predicate-translation-boundary:p5166-since-an-entire-downgraded-statement-serves-as-a-stem",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5167::p5167-nahuatl-personal-name-nncs-are-translated-by-the-formula": {
      "assertionId": "classical-personal-name-nnc-quoted-predicate-translation-boundary:p5167-nahuatl-personal-name-nncs-are-translated-by-the-formula",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5168::p5168-this-formula-can-obviously-be-reduced-to-i-am": {
      "assertionId": "classical-personal-name-nnc-quoted-predicate-translation-boundary:p5168-this-formula-can-obviously-be-reduced-to-i-am",
      "canonicalPath": "result.sourceFamily"
    },
    "claim-p5169::p5169-since-this-strict-translation-is-so-odd-and-unwieldly": {
      "assertionId": "classical-personal-name-nnc-quoted-predicate-translation-boundary:p5169-since-this-strict-translation-is-so-odd-and-unwieldly",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5166": [
      "quoted-predicate-translation-boundary",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5167": [
      "quoted-predicate-translation-boundary",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5168": [
      "quoted-predicate-translation-boundary",
      "preterit-agentive",
      "default",
      ""
    ],
    "claim-p5169": [
      "quoted-predicate-translation-boundary",
      "preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5166": "authorized",
    "claim-p5167": "authorized",
    "claim-p5168": "authorized",
    "claim-p5169": "authorized"
  }
};
export default Object.freeze(spec);
