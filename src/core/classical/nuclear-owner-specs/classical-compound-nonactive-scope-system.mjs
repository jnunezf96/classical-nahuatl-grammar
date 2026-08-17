const spec = {
  "ownerId": "classical-compound-nonactive-scope-system",
  "prefix": "ClassicalCompoundNonactiveScopeSystem",
  "operationId": "classical.compound.nonactive.scope.system.execute",
  "inputContract": "complete-typed-classical-compound-nonactive-scope-system-source",
  "domain": "classical-compound-nonactive-scope-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2838",
    "claim-p2839",
    "claim-p2840",
    "claim-p2841",
    "claim-p2842",
    "claim-p2843",
    "claim-p2844"
  ],
  "coordinates": {
    "claim-p2838::p2838-connective-t-compound-stems-may-have-two-passive-formations": {
      "assertionId": "classical-compound-nonactive-scope-system:p2838-connective-t-compound-stems-may-have-two-passive-formations",
      "canonicalPath": "cases.passiveEmbed.facts.passiveScopeOptions"
    },
    "claim-p2839::p2839-either-the-embed-subposition-or-both-it-and-the": {
      "assertionId": "classical-compound-nonactive-scope-system:p2839-either-the-embed-subposition-or-both-it-and-the",
      "canonicalPath": "cases.passiveBoth.facts.nonactiveScope"
    },
    "claim-p2840::p2840-huico-tinemi-huic-o-ti-nemi-huico-tinemohua-huic": {
      "assertionId": "classical-compound-nonactive-scope-system:p2840-huico-tinemi-huic-o-ti-nemi-huico-tinemohua-huic",
      "canonicalPath": "cases.passiveBoth.targetStem"
    },
    "claim-p2841::p2841-connective-t-compound-stems-may-have-three-impersonal-formations": {
      "assertionId": "classical-compound-nonactive-scope-system:p2841-connective-t-compound-stems-may-have-three-impersonal-formations",
      "canonicalPath": "cases.nonactiveEmbed.facts.impersonalScopeOptions"
    },
    "claim-p2842::p2842-the-following-three-vncs-are-translated-people-arrive-and": {
      "assertionId": "classical-compound-nonactive-scope-system:p2842-the-following-three-vncs-are-translated-people-arrive-and",
      "canonicalPath": "cases.impersonalBoth.facts.nonactiveScope"
    },
    "claim-p2843::p2843-if-the-matrix-stem-is-a-stative-verb-however": {
      "assertionId": "classical-compound-nonactive-scope-system:p2843-if-the-matrix-stem-is-a-stative-verb-however",
      "canonicalPath": "cases.stativeImpersonalBoth.facts.stativeMatrixPrefersEmbedOnly"
    },
    "claim-p2844::p2844-but-even-here-both-stems-can-be-impersonalized": {
      "assertionId": "classical-compound-nonactive-scope-system:p2844-but-even-here-both-stems-can-be-impersonalized",
      "canonicalPath": "cases.stativeImpersonalBoth.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2838": [],
    "claim-p2839": [],
    "claim-p2840": [],
    "claim-p2841": [],
    "claim-p2842": [],
    "claim-p2843": [],
    "claim-p2844": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2838": "authorized",
    "claim-p2839": "authorized",
    "claim-p2840": "authorized",
    "claim-p2841": "authorized",
    "claim-p2842": "authorized",
    "claim-p2843": "authorized",
    "claim-p2844": "authorized"
  }
};
export default Object.freeze(spec);
