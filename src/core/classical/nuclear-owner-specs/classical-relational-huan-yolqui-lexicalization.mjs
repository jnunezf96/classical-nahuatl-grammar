const spec = {
  "ownerId": "classical-relational-huan-yolqui-lexicalization",
  "prefix": "ClassicalRelationalHuanYolquiLexicalization",
  "operationId": "classical.relational.huan.yolqui.lexicalization.execute",
  "inputContract": "complete-typed-classical-relational-huan-yolqui-lexicalization-source",
  "domain": "classical-relational-huan-yolqui-lexicalization",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4281",
    "claim-p4282",
    "claim-p4283",
    "claim-p4285"
  ],
  "coordinates": {
    "claim-p4281::p4281-a-possessive-state-nnc-formed-on-hua-n-may": {
      "assertionId": "classical-relational-huan-yolqui-lexicalization:p4281-a-possessive-state-nnc-formed-on-hua-n-may",
      "canonicalPath": "cases.huan.canonicalResult"
    },
    "claim-p4282::p4282-the-two-nncs-are-usually-written-solid-and-the": {
      "assertionId": "classical-relational-huan-yolqui-lexicalization:p4282-the-two-nncs-are-usually-written-solid-and-the",
      "canonicalPath": "cases.huan.stemId"
    },
    "claim-p4283::p4283-to-create-the-equivalent-of-relative-kinsman": {
      "assertionId": "classical-relational-huan-yolqui-lexicalization:p4283-to-create-the-equivalent-of-relative-kinsman",
      "canonicalPath": "contract.groupingTransfersProof"
    },
    "claim-p4285::p4285-the-strangeness-of-the-collocation-is-also-seen-in": {
      "assertionId": "classical-relational-huan-yolqui-lexicalization:p4285-the-strangeness-of-the-collocation-is-also-seen-in",
      "canonicalPath": "cases.huan.stemId"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4281": [],
    "claim-p4282": [],
    "claim-p4283": [],
    "claim-p4285": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4281": "authorized",
    "claim-p4282": "authorized",
    "claim-p4283": "authorized",
    "claim-p4285": "authorized"
  }
};
export default Object.freeze(spec);
