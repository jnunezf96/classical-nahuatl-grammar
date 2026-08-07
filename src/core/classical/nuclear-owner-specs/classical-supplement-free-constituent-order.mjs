const spec = {
  "ownerId": "classical-supplement-free-constituent-order",
  "prefix": "ClassicalSupplementFreeConstituentOrder",
  "operationId": "classical.supplement.free.constituent.order.execute",
  "inputContract": "complete-typed-classical-supplement-free-constituent-order-source",
  "domain": "classical-supplement-free-constituent-order",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1876",
    "claim-p1877",
    "claim-p1878",
    "claim-p1879",
    "claim-p1880",
    "claim-p1881",
    "claim-p1882",
    "claim-p1883",
    "claim-p1884",
    "claim-p1885"
  ],
  "coordinates": {
    "claim-p1876::p1876-in-nahuatl-the-order-of-sentence-constituents-is-quite": {
      "assertionId": "classical-supplement-free-constituent-order:p1876-in-nahuatl-the-order-of-sentence-constituents-is-quite",
      "canonicalPath": "discontinuous.operationFrames.0.order"
    },
    "claim-p1877::p1877-they-are-frequently-placed-at-a-distance-from-the": {
      "assertionId": "classical-supplement-free-constituent-order:p1877-they-are-frequently-placed-at-a-distance-from-the",
      "canonicalPath": "extractedFrames.topicOrder.order"
    },
    "claim-p1878::p1878-moreover-there-are-no-markers-to-distinguish-the-function": {
      "assertionId": "classical-supplement-free-constituent-order:p1878-moreover-there-are-no-markers-to-distinguish-the-function",
      "canonicalPath": "shared.operationFrames.0.order"
    },
    "claim-p1879::p1879-there-are-no-obligatory-markers-even-to-distinguish-the": {
      "assertionId": "classical-supplement-free-constituent-order:p1879-there-are-no-obligatory-markers-even-to-distinguish-the",
      "canonicalPath": "discontinuous.operationFrames.0.interveningClauseCount"
    },
    "claim-p1880::p1880-there-may-also-be-more-than-one-supplement-in": {
      "assertionId": "classical-supplement-free-constituent-order:p1880-there-may-also-be-more-than-one-supplement-in",
      "canonicalPath": "extractedFrames.recursiveGraph.acyclic"
    },
    "claim-p1881::p1881-and-finally-since-the-adjunctive-transformation-is-recursive-a": {
      "assertionId": "classical-supplement-free-constituent-order:p1881-and-finally-since-the-adjunctive-transformation-is-recursive-a",
      "canonicalPath": "discontinuous.operationFrames.0.order"
    },
    "claim-p1882::p1882-the-freedom-of-order-combined-with-the-absence-of": {
      "assertionId": "classical-supplement-free-constituent-order:p1882-the-freedom-of-order-combined-with-the-absence-of",
      "canonicalPath": "extractedFrames.topicOrder.order"
    },
    "claim-p1883::p1883-in-addition-to-relying-on-the-context-of-the": {
      "assertionId": "classical-supplement-free-constituent-order:p1883-in-addition-to-relying-on-the-context-of-the",
      "canonicalPath": "shared.operationFrames.0.order"
    },
    "claim-p1884::p1884-remark-the-freedom-of-position-of-supplementary-elements-in": {
      "assertionId": "classical-supplement-free-constituent-order:p1884-remark-the-freedom-of-position-of-supplementary-elements-in",
      "canonicalPath": "discontinuous.operationFrames.0.interveningClauseCount"
    },
    "claim-p1885::p1885-it-is-only-when-they-are-thought-of-in": {
      "assertionId": "classical-supplement-free-constituent-order:p1885-it-is-only-when-they-are-thought-of-in",
      "canonicalPath": "extractedFrames.recursiveGraph.acyclic"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1876": [],
    "claim-p1877": [],
    "claim-p1878": [],
    "claim-p1879": [],
    "claim-p1880": [],
    "claim-p1881": [],
    "claim-p1882": [],
    "claim-p1883": [],
    "claim-p1884": [],
    "claim-p1885": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1876": "authorized",
    "claim-p1877": "authorized",
    "claim-p1878": "authorized",
    "claim-p1879": "authorized",
    "claim-p1880": "authorized",
    "claim-p1881": "authorized",
    "claim-p1882": "authorized",
    "claim-p1883": "authorized",
    "claim-p1884": "authorized",
    "claim-p1885": "authorized"
  }
};
export default Object.freeze(spec);
