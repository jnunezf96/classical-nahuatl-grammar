const spec = {
  "ownerId": "classical-adjectival-ownerhood-hua-adjectival-function",
  "prefix": "ClassicalAdjectivalOwnerhoodHuaAdjectivalFunction",
  "operationId": "classical.adjectival.ownerhood.hua.adjectival.function.execute",
  "inputContract": "complete-typed-classical-adjectival-ownerhood-hua-adjectival-function-source",
  "domain": "classical-adjectival-ownerhood-hua-adjectival-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3920",
    "claim-p3921"
  ],
  "coordinates": {
    "claim-p3920::p3920-the-predicates-of-preterit-agentive-nncs-of-ownerhood-formed": {
      "assertionId": "classical-adjectival-ownerhood-hua-adjectival-function:p3920-the-predicates-of-preterit-agentive-nncs-of-ownerhood-formed",
      "canonicalPath": "sources.deverbal.authorizationStatus"
    },
    "claim-p3921::p3921-the-stem-icn-o-yo-h-is-also-used": {
      "assertionId": "classical-adjectival-ownerhood-hua-adjectival-function:p3921-the-stem-icn-o-yo-h-is-also-used",
      "canonicalPath": "sources.deverbal.typedFrameAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3920": [],
    "claim-p3921": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3920": "authorized",
    "claim-p3921": "authorized"
  }
};
export default Object.freeze(spec);
