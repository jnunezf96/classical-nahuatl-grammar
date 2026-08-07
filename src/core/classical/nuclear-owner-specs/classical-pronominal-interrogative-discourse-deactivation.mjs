const spec = {
  "ownerId": "classical-pronominal-interrogative-discourse-deactivation",
  "prefix": "ClassicalPronominalInterrogativeDiscourseDeactivation",
  "operationId": "classical.pronominal.interrogative.discourse.deactivation.execute",
  "inputContract": "complete-typed-classical-pronominal-interrogative-discourse-deactivation-source",
  "domain": "classical-pronominal-interrogative-discourse-deactivation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1687",
    "claim-p1688",
    "claim-p1689",
    "claim-p1703",
    "claim-p1704",
    "claim-p1705",
    "claim-p1747",
    "claim-p1748",
    "claim-p1760",
    "claim-p1761"
  ],
  "coordinates": {
    "claim-p1687::p1687-result-like-all-interrogatives-an-nnc-built-on-tl": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1687-result-like-all-interrogatives-an-nnc-built-on-tl",
      "canonicalPath": "discourseFrame.interrogativeReadingActive"
    },
    "claim-p1688::p1688-like-all-interrogatives-an-nnc-built-on-tl-eh": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1688-like-all-interrogatives-an-nnc-built-on-tl-eh",
      "canonicalPath": "discourseFrame.noninterrogativeReason"
    },
    "claim-p1689::p1689-notice-that-the-subordinate-clause-that-in-leads-one": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1689-notice-that-the-subordinate-clause-that-in-leads-one",
      "canonicalPath": "discourseFrame.clauseInitial"
    },
    "claim-p1703::p1703-when-not-initial-in-a-clause-group-a-c": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1703-when-not-initial-in-a-clause-group-a-c",
      "canonicalPath": "discourseFrame.interrogativeReadingActive"
    },
    "claim-p1704::p1704-when-not-initial-in-a-clause-group": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1704-when-not-initial-in-a-clause-group",
      "canonicalPath": "discourseFrame.noninterrogativeReason"
    },
    "claim-p1705::p1705-notice-the-ellipsis-of-the-expected-adjoined-clause": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1705-notice-the-ellipsis-of-the-expected-adjoined-clause",
      "canonicalPath": "discourseFrame.polarity"
    },
    "claim-p1747::p1747-result-nncs-formed-on-que-x-qui-ch-lose": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1747-result-nncs-formed-on-que-x-qui-ch-lose",
      "canonicalPath": "discourseFrame.interrogativeReadingActive"
    },
    "claim-p1748::p1748-when-not-sentence-initial-nncs-formed-on-que-x": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1748-when-not-sentence-initial-nncs-formed-on-que-x",
      "canonicalPath": "discourseFrame.clauseInitial"
    },
    "claim-p1760::p1760-result-an-nnc-formed-on-que-z-qui-loses": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1760-result-an-nnc-formed-on-que-z-qui-loses",
      "canonicalPath": "discourseFrame.noninterrogativeReason"
    },
    "claim-p1761::p1761-when-not-sentence-initial-an-nnc-formed-on-que": {
      "assertionId": "classical-pronominal-interrogative-discourse-deactivation:p1761-when-not-sentence-initial-an-nnc-formed-on-que",
      "canonicalPath": "discourseFrame.interrogativeReadingActive"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1687": [
      "l16-tleh-noninitial"
    ],
    "claim-p1688": [
      "l16-tleh-noninitial"
    ],
    "claim-p1689": [
      "l16-tleh-noninitial"
    ],
    "claim-p1703": [
      "l16-ac-negative"
    ],
    "claim-p1704": [
      "l16-ac-negative"
    ],
    "claim-p1705": [
      "l16-ac-negative"
    ],
    "claim-p1747": [
      "l16-quexquich-noninitial"
    ],
    "claim-p1748": [
      "l16-quexquich-noninitial"
    ],
    "claim-p1760": [
      "l16-quezqui-noninitial"
    ],
    "claim-p1761": [
      "l16-quezqui-noninitial"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1687": "authorized",
    "claim-p1688": "authorized",
    "claim-p1689": "authorized",
    "claim-p1703": "authorized",
    "claim-p1704": "authorized",
    "claim-p1705": "authorized",
    "claim-p1747": "authorized",
    "claim-p1748": "authorized",
    "claim-p1760": "authorized",
    "claim-p1761": "authorized"
  }
};
export default Object.freeze(spec);
