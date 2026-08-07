const spec = {
  "ownerId": "classical-adjectival-el-diligent-adjectival-system",
  "prefix": "ClassicalAdjectivalElDiligentAdjectivalSystem",
  "operationId": "classical.adjectival.el.diligent.adjectival.system.execute",
  "inputContract": "complete-typed-classical-adjectival-el-diligent-adjectival-system-source",
  "domain": "classical-adjectival-el-diligent-adjectival-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3883",
    "claim-p3884",
    "claim-p3885",
    "claim-p3886",
    "claim-p3887"
  ],
  "coordinates": {
    "claim-p3883::p3883-because-the-stem-begins-with-a-vowel-it-is": {
      "assertionId": "classical-adjectival-el-diligent-adjectival-system:p3883-because-the-stem-begins-with-a-vowel-it-is",
      "canonicalPath": "cases.pronominalHead.canonicalResult"
    },
    "claim-p3884::p3884-the-stem-el-is-translated-by-the-english-adjective": {
      "assertionId": "classical-adjectival-el-diligent-adjectival-system:p3884-the-stem-el-is-translated-by-the-english-adjective",
      "canonicalPath": "cases.pronominalHead.headClauseType"
    },
    "claim-p3885::p3885-when-the-subject-pronoun-is-plural": {
      "assertionId": "classical-adjectival-el-diligent-adjectival-system:p3885-when-the-subject-pronoun-is-plural",
      "canonicalPath": "cases.pronominalHead.operationKind"
    },
    "claim-p3886::p3886-when-the-subject-pronoun-is-plural-its-number-position": {
      "assertionId": "classical-adjectival-el-diligent-adjectival-system:p3886-when-the-subject-pronoun-is-plural-its-number-position",
      "canonicalPath": "cases.pronominalHead.canonicalResult"
    },
    "claim-p3887::p3887-the-negative-is-translated-as-lazy": {
      "assertionId": "classical-adjectival-el-diligent-adjectival-system:p3887-the-negative-is-translated-as-lazy",
      "canonicalPath": "cases.pronominalHead.headClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3883": [],
    "claim-p3884": [],
    "claim-p3885": [],
    "claim-p3886": [],
    "claim-p3887": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3883": "authorized",
    "claim-p3884": "authorized",
    "claim-p3885": "authorized",
    "claim-p3886": "authorized",
    "claim-p3887": "authorized"
  }
};
export default Object.freeze(spec);
