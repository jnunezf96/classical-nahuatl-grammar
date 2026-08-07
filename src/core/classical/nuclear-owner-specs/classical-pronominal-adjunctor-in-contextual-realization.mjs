const spec = {
  "ownerId": "classical-pronominal-adjunctor-in-contextual-realization",
  "prefix": "ClassicalPronominalAdjunctorInContextualRealization",
  "operationId": "classical.pronominal.adjunctor.in.contextual.realization.execute",
  "inputContract": "complete-typed-classical-pronominal-adjunctor-in-contextual-realization-source",
  "domain": "classical-pronominal-adjunctor-in-contextual-realization",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1683",
    "claim-p1684",
    "claim-p1685",
    "claim-p1686",
    "claim-p1700",
    "claim-p1701",
    "claim-p1702"
  ],
  "coordinates": {
    "claim-p1683::p1683-the-usage-is-so-frequent-that-fusion-can-take": {
      "assertionId": "classical-pronominal-adjunctor-in-contextual-realization:p1683-the-usage-is-so-frequent-that-fusion-can-take",
      "canonicalPath": "adjunctorFrame.mode"
    },
    "claim-p1684::p1684-nahuatl-speakers-have-become-so-inured-to-this-fusion": {
      "assertionId": "classical-pronominal-adjunctor-in-contextual-realization:p1684-nahuatl-speakers-have-become-so-inured-to-this-fusion",
      "canonicalPath": "adjunctorFrame.fusedSurface"
    },
    "claim-p1685::p1685-result-the-two-constituents-should-be-written-separately-as": {
      "assertionId": "classical-pronominal-adjunctor-in-contextual-realization:p1685-result-the-two-constituents-should-be-written-separately-as",
      "canonicalPath": "adjunctorFrame.writingPolicy"
    },
    "claim-p1686::p1686-whenever-tleh-is-followed-by-a-subordinate-clause-adjoined": {
      "assertionId": "classical-pronominal-adjunctor-in-contextual-realization:p1686-whenever-tleh-is-followed-by-a-subordinate-clause-adjoined",
      "canonicalPath": "adjunctorFrame.writingPolicy"
    },
    "claim-p1700::p1700-the-combination-is-so-frequent-that-the-adjunctor-has": {
      "assertionId": "classical-pronominal-adjunctor-in-contextual-realization:p1700-the-combination-is-so-frequent-that-the-adjunctor-has",
      "canonicalPath": "adjunctorFrame.mode"
    },
    "claim-p1701::p1701-nahuatl-speakers-have-so-lost-awareness-of-the-nature": {
      "assertionId": "classical-pronominal-adjunctor-in-contextual-realization:p1701-nahuatl-speakers-have-so-lost-awareness-of-the-nature",
      "canonicalPath": "adjunctorFrame.fusedSurface"
    },
    "claim-p1702::p1702-it-seems-more-proper-however-to-write-the-two": {
      "assertionId": "classical-pronominal-adjunctor-in-contextual-realization:p1702-it-seems-more-proper-however-to-write-the-two",
      "canonicalPath": "adjunctorFrame.dependentClausePresent"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1683": [
      "l16-tleh-in-fused"
    ],
    "claim-p1684": [
      "l16-tleh-in-fused"
    ],
    "claim-p1685": [
      "l16-tleh-in-fused"
    ],
    "claim-p1686": [
      "l16-tleh-in-dependent"
    ],
    "claim-p1700": [
      "l16-ac-in-fused"
    ],
    "claim-p1701": [
      "l16-ac-in-fused"
    ],
    "claim-p1702": [
      "l16-ac-in-dependent"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1683": "authorized",
    "claim-p1684": "authorized",
    "claim-p1685": "authorized",
    "claim-p1686": "authorized",
    "claim-p1700": "authorized",
    "claim-p1701": "authorized",
    "claim-p1702": "authorized"
  }
};
export default Object.freeze(spec);
