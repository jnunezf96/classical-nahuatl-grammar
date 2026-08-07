const spec = {
  "ownerId": "classical-adverbial-nohmat-embed-lexicalization",
  "prefix": "ClassicalAdverbialNohmatEmbedLexicalization",
  "operationId": "classical.adverbial.nohmat.embed.lexicalization.execute",
  "inputContract": "complete-typed-classical-adverbial-nohmat-embed-lexicalization-source",
  "domain": "classical-adverbial-nohmat-embed-lexicalization",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4221",
    "claim-p4222",
    "claim-p4223",
    "claim-p4224"
  ],
  "coordinates": {
    "claim-p4221::p4221-when-no-longer-vocable-final-in-i-nohmahtzinco-is": {
      "assertionId": "classical-adverbial-nohmat-embed-lexicalization:p4221-when-no-longer-vocable-final-in-i-nohmahtzinco-is",
      "canonicalPath": "cases.possessivePatientive.canonicalResult"
    },
    "claim-p4222::p4222-incidentally-the-failure-of-the-h-to-revert-to": {
      "assertionId": "classical-adverbial-nohmat-embed-lexicalization:p4222-incidentally-the-failure-of-the-h-to-revert-to",
      "canonicalPath": "contract.uncertaintyAuthorizesGrammar"
    },
    "claim-p4223::p4223-all-of-the-following-verbstems-are-formed-according-to": {
      "assertionId": "classical-adverbial-nohmat-embed-lexicalization:p4223-all-of-the-following-verbstems-are-formed-according-to",
      "canonicalPath": "contract.translationAuthority"
    },
    "claim-p4224::p4224-perhaps-the-explanation-is-that-the-shape-has-become": {
      "assertionId": "classical-adverbial-nohmat-embed-lexicalization:p4224-perhaps-the-explanation-is-that-the-shape-has-become",
      "canonicalPath": "cases.possessivePatientive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4221": [],
    "claim-p4222": [],
    "claim-p4223": [],
    "claim-p4224": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4221": "authorized",
    "claim-p4222": "authorized",
    "claim-p4223": "authorized",
    "claim-p4224": "authorized"
  }
};
export default Object.freeze(spec);
