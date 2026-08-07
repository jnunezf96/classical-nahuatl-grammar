const spec = {
  "ownerId": "classical-purposive-silent-future-embed",
  "prefix": "ClassicalPurposiveSilentFutureEmbed",
  "operationId": "classical.purposive.silent.future.embed.execute",
  "inputContract": "complete-typed-classical-purposive-silent-future-embed-source",
  "domain": "classical-purposive-silent-future-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2894",
    "claim-p2895",
    "claim-p2896",
    "claim-p2897"
  ],
  "coordinates": {
    "claim-p2894::p2894-the-filler-in-the-embed-subposition-is-a-future": {
      "assertionId": "classical-purposive-silent-future-embed:p2894-the-filler-in-the-embed-subposition-is-a-future",
      "canonicalPath": "contract.embedTense"
    },
    "claim-p2895::p2895-the-imperfective-stem-has-the-same-shape-it-would": {
      "assertionId": "classical-purposive-silent-future-embed:p2895-the-imperfective-stem-has-the-same-shape-it-would",
      "canonicalPath": "contract.soundedFutureMorphReplacedBy"
    },
    "claim-p2896::p2896-the-appropriateness-of-having-a-future-tense-predicate-as": {
      "assertionId": "classical-purposive-silent-future-embed:p2896-the-appropriateness-of-having-a-future-tense-predicate-as",
      "canonicalPath": "contract.imperfectiveStemShapePreserved"
    },
    "claim-p2897::p2897-note-occasionally-in-texts-not-noted-for-stylistic-quality": {
      "assertionId": "classical-purposive-silent-future-embed:p2897-note-occasionally-in-texts-not-noted-for-stylistic-quality",
      "canonicalPath": "contract.embedTense"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2894": [],
    "claim-p2895": [],
    "claim-p2896": [],
    "claim-p2897": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2894": "authorized",
    "claim-p2895": "authorized",
    "claim-p2896": "authorized",
    "claim-p2897": "authorized"
  }
};
export default Object.freeze(spec);
