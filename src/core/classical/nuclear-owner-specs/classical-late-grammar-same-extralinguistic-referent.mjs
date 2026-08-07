const spec = {
  "ownerId": "classical-late-grammar-same-extralinguistic-referent",
  "prefix": "ClassicalLateGrammarSameExtralinguisticReferent",
  "operationId": "classical.late.grammar.same.extralinguistic.referent.execute",
  "inputContract": "complete-typed-classical-late-grammar-same-extralinguistic-referent-source",
  "domain": "classical-late-grammar-same-extralinguistic-referent",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-referent-conditioned-agreement-runtime",
  "selections": [
    "claim-p5265",
    "claim-p5266",
    "claim-p5267",
    "claim-p5268",
    "claim-p5269"
  ],
  "coordinates": {
    "claim-p5265::p5265-the-referent-of-each-of-the-pertinent-personal-pronouns": {
      "assertionId": "classical-late-grammar-same-extralinguistic-referent:p5265-the-referent-of-each-of-the-pertinent-personal-pronouns",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5266::p5266-if-a-difference-in-referents-exists": {
      "assertionId": "classical-late-grammar-same-extralinguistic-referent:p5266-if-a-difference-in-referents-exists",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5267::p5267-at-times-it-is-difficult-to-decide-which-construction": {
      "assertionId": "classical-late-grammar-same-extralinguistic-referent:p5267-at-times-it-is-difficult-to-decide-which-construction",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5268::p5268-the-vnc-opanhuechohuato-is-a-purposive-vnc-in-the": {
      "assertionId": "classical-late-grammar-same-extralinguistic-referent:p5268-the-vnc-opanhuechohuato-is-a-purposive-vnc-in-the",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    },
    "claim-p5269::p5269-as-can-be-seen-the-problem-of-the-identity": {
      "assertionId": "classical-late-grammar-same-extralinguistic-referent:p5269-as-can-be-seen-the-problem-of-the-identity",
      "canonicalPath": "analysis.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5265": [
      "referent-conditioned-agreement",
      "default"
    ],
    "claim-p5266": [
      "referent-conditioned-agreement",
      "default"
    ],
    "claim-p5267": [
      "referent-conditioned-agreement",
      "default"
    ],
    "claim-p5268": [
      "referent-conditioned-agreement",
      "default"
    ],
    "claim-p5269": [
      "referent-conditioned-agreement",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5265": "authorized",
    "claim-p5266": "authorized",
    "claim-p5267": "authorized",
    "claim-p5268": "authorized",
    "claim-p5269": "authorized"
  }
};
export default Object.freeze(spec);
